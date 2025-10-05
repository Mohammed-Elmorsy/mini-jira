import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  reorderTask,
} from '../api/tasks'
import type { Task } from '../types'

export function useTasks() {
  const queryClient = useQueryClient()

  // ---- Fetch Tasks ----
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  // ---- Create Task ----
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const prevTasks = queryClient.getQueryData<Task[]>(['tasks']) || []

      const optimisticTask = {
        id: Date.now(),
        ...newTask,
      } as Task

      queryClient.setQueryData<Task[]>(
        ['tasks'],
        [...prevTasks, optimisticTask],
      )
      toast.loading('Creating task...', { id: 'create' })
      return { prevTasks }
    },
    onError: (_err, _newTask, ctx) => {
      if (ctx?.prevTasks) queryClient.setQueryData(['tasks'], ctx.prevTasks)
      toast.error('Failed to create task', { id: 'create' })
    },
    onSuccess: () => {
      toast.success('Task created!', { id: 'create' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  // ---- Update Task ----
  const updateTaskMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Task> }) =>
      updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const prevTasks = queryClient.getQueryData<Task[]>(['tasks']) || []

      queryClient.setQueryData<Task[]>(['tasks'], (old = []) =>
        old.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      )
      toast.loading('Updating task...', { id: `update-${id}` })
      return { prevTasks }
    },
    onError: (_err, vars, ctx) => {
      if (ctx?.prevTasks) queryClient.setQueryData(['tasks'], ctx.prevTasks)
      toast.error('Failed to update task', { id: `update-${vars.id}` })
    },
    onSuccess: (_data, vars) => {
      toast.success('Task updated!', { id: `update-${vars.id}` })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  // ---- Delete Task ----
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const prevTasks = queryClient.getQueryData<Task[]>(['tasks']) || []

      queryClient.setQueryData<Task[]>(['tasks'], (old = []) =>
        old.filter((t) => t.id !== id),
      )
      toast.loading('Deleting task...', { id: `delete-${id}` })
      return { prevTasks }
    },
    onError: (_err, id, ctx) => {
      if (ctx?.prevTasks) queryClient.setQueryData(['tasks'], ctx.prevTasks)
      toast.error('Failed to delete task', { id: `delete-${id}` })
    },
    onSuccess: (_data, id) => {
      toast.success('Task deleted!', { id: `delete-${id}` })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  // ---- Reorder Tasks (backend only, no UI mutation here) ----
  const reorderTasksMutation = useMutation({
    mutationFn: reorderTask,
    onSuccess: () => {
      toast.success('Tasks reordered!', { id: 'reorder' })
    },
    onError: () => {
      toast.error('Failed to reorder tasks', { id: 'reorder' })
    },
  })

  return {
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    reorderTasks: reorderTasksMutation.mutate,
  }
}
