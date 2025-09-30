import { useQuery, useMutation } from '@tanstack/react-query'

import { getProfile } from '../api/auth'
import { updateUser } from '../api/user'
import type { User } from '../types'

export const useProfile = () => {
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
  })

  const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (updates: { name?: string }) =>
      updateUser(profile!.id, updates),
    onSuccess: () => {
      refetch()
    },
  })

  return {
    profile,
    isLoading,
    isError,
    updateProfile,
    isUpdating,
    refetchUser: refetch,
  }
}
