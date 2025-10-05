import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProfile, updateUser } from '../api/user'
import type { User } from '../types'

export const useProfile = () => {
  const queryClient = useQueryClient()
  const token = localStorage.getItem('token')

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (updates: { name?: string }) =>
      updateUser(profile!.id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
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
