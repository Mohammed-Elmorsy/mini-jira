export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface User {
  id: number
  email: string
  name?: string | null
}
export interface Task {
  id: number
  title: string
  order: number
  description?: string | null
  status: TaskStatus
  dueDate?: string | null
  createdAt: string
  updatedAt: string
  userId: number
}
