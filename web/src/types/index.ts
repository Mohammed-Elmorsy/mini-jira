export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

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
