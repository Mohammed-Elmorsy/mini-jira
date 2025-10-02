import api from './axios'
import type { Task } from '../types'
import type { CreateTaskDto } from '../types/dtos'

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/tasks')
  return data
}

export const createTask = async (task: CreateTaskDto): Promise<Task> => {
  const { data } = await api.post('/tasks', task)
  return data
}

export const updateTask = async (
  id: number,
  updates: Partial<Task>,
): Promise<Task> => {
  const { data } = await api.patch(`/tasks/${id}`, updates)
  return data
}

export const reorderTask = async (
  updates: { id: number; order: number }[],
): Promise<Task[]> => {
  const { data } = await api.patch('/tasks/reorder', { tasks: updates })
  return data
}

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}
