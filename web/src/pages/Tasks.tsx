import { useState, useMemo, type JSX } from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'

import { useTasks } from '../hooks/useTasks'
import type { TaskStatus } from '../types'
import TaskColumn from '../components/TaskColumn'
import { taskColumns } from '../constants/task-columns'
import AddTaskModal from '../components/AddTaskModal'
import type { CreateTaskDto } from '../types/dtos'
import { debounce } from '../utils/debounce'

const Tasks = (): JSX.Element => {
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

  // Debounce reorder API calls (2s)
  const debouncedReorder = useMemo(
    () => debounce(reorderTasks, 2000),
    [reorderTasks],
  )

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { draggableId, source, destination } = result
    const draggedTask = tasks.find((t) => t.id.toString() === draggableId)
    if (!draggedTask) return

    // Case 1: Different column → update status immediately
    if (draggedTask.status !== destination.droppableId) {
      updateTask({
        id: draggedTask.id,
        updates: { status: destination.droppableId as TaskStatus },
      })
      return
    }

    // Case 2: Same column → reorder full column
    if (source.droppableId === destination.droppableId) {
      const columnTasks = tasks
        .filter((t) => t.status === source.droppableId)
        .sort((a, b) => a.order - b.order)

      // move task locally
      const [removed] = columnTasks.splice(source.index, 1)
      columnTasks.splice(destination.index, 0, removed)

      // assign new orders
      const reorderedTasks = columnTasks.map((t, index) => ({
        id: t.id,
        order: index,
      }))

      // debounce API call
      debouncedReorder(reorderedTasks)
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
            tasks={tasks.filter((t) => t.status === col.key)}
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
