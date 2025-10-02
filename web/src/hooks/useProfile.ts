import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProfile } from '../api/auth'
import { updateUser } from '../api/user'
import type { User } from '../types'

export const useProfile = () => {
  const token = localStorage.getItem('token')
  const queryClient = useQueryClient()

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!token,
  })

  const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (updates: { name?: string }) =>
      updateUser(profile!.id, updates),
    onSuccess: () => {
      refetch()
    },
  })

  const clearProfile = () => {
    queryClient.removeQueries({ queryKey: ['profile'] })
  }

  return {
    profile,
    isLoading,
    isError,
    updateProfile,
    isUpdating,
    refetchUser: refetch,
    clearProfile,
  }
}
