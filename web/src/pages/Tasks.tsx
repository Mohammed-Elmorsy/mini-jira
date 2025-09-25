import { useState } from 'react'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'

import { useTasks } from '../hooks/useTasks'
import type { Task } from '../types'
import TaskColumn from '../components/TaskColumn'
import { taskColumns } from '../constants/task-columns'

export default function Tasks() {
  const [addingColumn, setAddingColumn] = useState<Task['status'] | null>(null)
  const { tasks, isLoading, isError, createTask, updateTask, deleteTask } =
    useTasks()

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { draggableId, destination } = result
    const task = tasks.find((t) => t.id.toString() === draggableId)
    if (task && task.status !== destination.droppableId) {
      updateTask({
        id: task.id,
        updates: { status: destination.droppableId as Task['status'] },
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
              createTask(task as Task)
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
