import type { JSX } from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'

import type { Task } from '../types'
import { TaskStatus } from '../types'
import TaskItem from './TaskItem'

type Props = {
  col: { key: TaskStatus; title: string; color: string }
  tasks: Task[]
  adding: TaskStatus | null
  onAddClick: (status: TaskStatus) => void
  onAddCancel: () => void
  onAddSubmit: (task: Partial<Task>) => void
  onUpdateStatus: (task: Task, newStatus: TaskStatus) => void
  onDelete: (id: number) => void
  isLoading?: boolean
  isError?: boolean
}

const TaskColumn = (props: Props): JSX.Element => {
  const { col, tasks, onUpdateStatus, onDelete, isLoading, isError } = props

  return (
    <Droppable droppableId={col.key}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex-1 p-4 bg-gray-50 rounded-lg shadow-inner"
        >
          <h2
            className={`text-lg font-bold mb-4 px-2 py-1 rounded-md
            ${col.key === TaskStatus.TODO ? 'bg-indigo-100 text-indigo-700' : ''}
            ${col.key === TaskStatus.IN_PROGRESS ? 'bg-amber-100 text-amber-700' : ''}
            ${col.key === TaskStatus.DONE ? 'bg-emerald-100 text-emerald-700' : ''}`}
          >
            {col.title}
          </h2>

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
                <div
                  key={i}
                  className="h-16 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {tasks
                .sort((a, b) => a.order - b.order)
                .map((task, index) => (
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
        </div>
      )}
    </Droppable>
  )
}

export default TaskColumn
