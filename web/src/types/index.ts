export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: number
  title: string
  description?: string | null
  status: TaskStatus
  dueDate?: string | null
  createdAt: string
  updatedAt: string
  userId: number
}
