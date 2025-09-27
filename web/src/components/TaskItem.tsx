import { TaskStatus, type Task } from '../types'

type Props = {
  task: Task
  onUpdateStatus: (status: Task['status']) => void
  onDelete: () => void
}

const TaskItem = ({ task, onUpdateStatus, onDelete }: Props) => {
  const nextStatus = () => {
    if (task.status === TaskStatus.TODO) return TaskStatus.IN_PROGRESS
    if (task.status === TaskStatus.IN_PROGRESS) return TaskStatus.DONE
    return TaskStatus.TODO
  }

  const nextLabel = () => {
    if (task.status === TaskStatus.TODO) return 'Start'
    if (task.status === TaskStatus.IN_PROGRESS) return 'Mark Done'
    return 'Reopen'
  }

  return (
    <div
      className="group p-4 bg-white rounded-xl shadow-md border border-gray-100 
             cursor-pointer hover:shadow-xl hover:border-indigo-200 transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <h3
          className={`font-semibold ${
            task.status === TaskStatus.DONE
              ? 'line-through text-gray-400'
              : 'text-gray-800'
          }`}
        >
          {task.title}
        </h3>
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium
        ${task.status === TaskStatus.TODO ? 'bg-indigo-100 text-indigo-700' : ''}
        ${task.status === TaskStatus.IN_PROGRESS ? 'bg-amber-100 text-amber-700' : ''}
        ${task.status === TaskStatus.DONE ? 'bg-emerald-100 text-emerald-700' : ''}`}
        >
          {task.status.replace('-', ' ')}
        </span>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
      )}
      <p className="text-xs text-gray-400 mb-3">
        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
      </p>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onUpdateStatus(nextStatus())}
          className="px-3 py-1 text-xs font-medium rounded 
                 bg-indigo-500 text-white hover:bg-indigo-600"
        >
          {nextLabel()}
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-xs font-medium rounded 
                 bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
