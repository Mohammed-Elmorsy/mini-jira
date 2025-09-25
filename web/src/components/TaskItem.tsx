import type { Task } from '../types'

type Props = {
  task: Task
  onUpdateStatus: (status: Task['status']) => void
  onDelete: () => void
}

const TaskItem = ({ task, onUpdateStatus, onDelete }: Props) => {
  const nextStatus = () => {
    if (task.status === 'todo') return 'in-progress'
    if (task.status === 'in-progress') return 'done'
    return 'todo'
  }

  const nextLabel = () => {
    if (task.status === 'todo') return 'Start'
    if (task.status === 'in-progress') return 'Mark Done'
    return 'Reopen'
  }

  return (
    <div
      className="group p-4 bg-white rounded-xl shadow-md border border-gray-200 
                 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <h3
        className={`font-semibold mb-1 ${
          task.status === 'done'
            ? 'line-through text-gray-400'
            : 'text-gray-800'
        }`}
      >
        {task.title}
      </h3>
      {task.description && (
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
      )}
      <p className="text-xs text-gray-400 mb-3">
        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
      </p>

      {/* Buttons hidden by default, visible on hover */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onUpdateStatus(nextStatus())}
          className="px-3 py-1 text-xs font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {nextLabel()}
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
