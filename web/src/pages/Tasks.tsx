import { useState, useMemo, type JSX } from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'
import { useQueryClient } from '@tanstack/react-query'

import { useTasks } from '../hooks/useTasks'
import type { Task, TaskStatus } from '../types'
import TaskColumn from '../components/TaskColumn'
import { taskColumns } from '../constants/task-columns'
import AddTaskModal from '../components/AddTaskModal'
import type { CreateTaskDto } from '../types/dtos'
import { debounce } from '../utils/debounce'

const Tasks = (): JSX.Element => {
  const queryClient = useQueryClient()
  const [addingColumn, setAddingColumn] = useState<TaskStatus | null>(null)
  const {
    tasks,
    isLoading,
    isError,
    createTask,
    updateTask,
    deleteTask,
    reorderTasks,
  } = useTasks()

  // Debounce backend call only (UI already updated instantly)
  const debouncedReorder = useMemo(
    () => debounce(reorderTasks, 1500),
    [reorderTasks],
  )

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { draggableId, source, destination } = result
    const draggedTask = tasks.find((t) => t.id.toString() === draggableId)
    if (!draggedTask) return

    // Case 1: Move between columns
    if (draggedTask.status !== destination.droppableId) {
      updateTask({
        id: draggedTask.id,
        updates: { status: destination.droppableId as TaskStatus },
      })
      return
    }

    // Case 2: Reorder within same column
    if (source.droppableId === destination.droppableId) {
      // 1. get the tasks of the column and sort by current order
      const columnTasks = tasks
        .filter((t) => t.status === source.droppableId)
        .slice() // copy
        .sort((a, b) => a.order - b.order)

      // 2. do the array move
      const [removed] = columnTasks.splice(source.index, 1)
      columnTasks.splice(destination.index, 0, removed)

      // 3. assign new orders for that column
      const reorderedColumnTasks = columnTasks.map((t, idx) => ({
        ...t,
        order: idx,
      }))

      // 4. update global cache - replace items by id with the updated ones
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) => {
        const updatedMap = new Map(reorderedColumnTasks.map((t) => [t.id, t]))
        return old.map((t) =>
          updatedMap.has(t.id) ? (updatedMap.get(t.id) as Task) : t,
        )
      })

      // 5. call backend (debounced) with minimal payload
      const payload = reorderedColumnTasks.map((t) => ({
        id: t.id,
        order: t.order,
      }))
      debouncedReorder(payload)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddTaskModal onSubmit={createTask} />
      <div className="grid grid-cols-3 gap-6 p-6">
        {taskColumns.map((col) => (
          <TaskColumn
            key={col.key}
            col={col}
            // NOTE: sort by order BEFORE passing to column
            tasks={tasks
              .filter((t) => t.status === col.key)
              .slice()
              .sort((a, b) => a.order - b.order)}
            adding={addingColumn}
            onAddClick={(status) => setAddingColumn(status)}
            onAddCancel={() => setAddingColumn(null)}
            onAddSubmit={(task) => {
              createTask(task as CreateTaskDto)
              setAddingColumn(null)
            }}
            onUpdateStatus={(task, newStatus) =>
              updateTask({ id: task.id, updates: { status: newStatus } })
            }
            onDelete={(id) => deleteTask(id)}
            isLoading={isLoading}
            isError={isError}
          />
        ))}
      </div>
    </DragDropContext>
  )
}

export default Tasks
