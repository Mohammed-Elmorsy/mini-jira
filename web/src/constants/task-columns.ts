import { TaskStatus } from '../types'

export const taskColumns: {
  key: TaskStatus
  title: string
  color: string
}[] = [
  { key: TaskStatus.TODO, title: 'To Do', color: 'text-indigo-600' },
  {
    key: TaskStatus.IN_PROGRESS,
    title: 'In Progress',
    color: 'text-amber-600',
  },
  { key: TaskStatus.DONE, title: 'Done', color: 'text-emerald-600' },
]
