import type { Task } from '../types'

export const taskColumns: {
  key: Task['status']
  title: string
  color: string
}[] = [
  { key: 'todo', title: 'To Do', color: 'text-indigo-600' },
  { key: 'in-progress', title: 'In Progress', color: 'text-amber-600' },
  { key: 'done', title: 'Done', color: 'text-emerald-600' },
]
