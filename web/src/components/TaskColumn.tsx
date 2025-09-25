import { Droppable, Draggable } from '@hello-pangea/dnd'

import type { Task } from '../types'
import TaskItem from './TaskItem'
import AddTaskForm from './AddTaskForm'

type Props = {
  col: { key: Task['status']; title: string; color: string }
  tasks: Task[]
  adding: Task['status'] | null
  onAddClick: (status: Task['status']) => void
  onAddCancel: () => void
  onAddSubmit: (task: Partial<Task>) => void
  onUpdateStatus: (task: Task, newStatus: Task['status']) => void
  onDelete: (id: number) => void
  isLoading?: boolean
  isError?: boolean
}

const TaskColumn = ({
  col,
  tasks,
  adding,
  onAddClick,
  onAddCancel,
  onAddSubmit,
  onUpdateStatus,
  onDelete,
  isLoading,
  isError,
}: Props) => (
  <Droppable droppableId={col.key}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="flex-1 p-4 bg-gray-50 rounded-lg shadow-inner"
      >
        <h2 className={`text-lg font-bold mb-4 ${col.color}`}>{col.title}</h2>

        {/* Error state */}
        {isError && (
          <div className="p-2 mb-3 text-sm text-red-800 bg-red-100 rounded">
            Failed to load tasks
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      onUpdateStatus={(newStatus) =>
                        onUpdateStatus(task, newStatus)
                      }
                      onDelete={() => onDelete(task.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}

        {/* Add task form */}
        {adding === col.key ? (
          <AddTaskForm
            status={col.key}
            onAdd={onAddSubmit}
            onCancel={onAddCancel}
          />
        ) : (
          <button
            onClick={() => onAddClick(col.key)}
            className="mt-3 text-sm text-blue-500 hover:underline"
          >
            + Add Task
          </button>
        )}
      </div>
    )}
  </Droppable>
)

export default TaskColumn
