import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { useProfile } from '../hooks/useProfile'
import Dialog from '../components/ui/Dialog'
import Spinner from '../components/ui/Spinner'
import Input from '../components/ui/Input'
import { validateName } from '../utils/validations'
import type { UpdateUserDto } from '../types/dtos'

const Profile = () => {
  const navigate = useNavigate()
  const { profile, isLoading, updateProfile, isUpdating } = useProfile()
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState<UpdateUserDto>({ name: profile?.name ?? '' })
  const [errors, setErrors] = useState<Partial<UpdateUserDto>>({})

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[70vh]">
        <Spinner size="h-8 w-8" color="text-indigo-600" />
      </div>
    )
  }

  if (!profile) {
    navigate('/login')
    return null
  }

  const handleChange = (field: keyof UpdateUserDto, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(value) || undefined }))
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const nameError = validateName(form.name || '')
    setErrors({ name: nameError || undefined })
    if (nameError) return

    try {
      await updateProfile({ name: form.name })
      toast.success('Profile updated successfully 🎉')
      setIsOpen(false)
    } catch {
      toast.error('Failed to update profile')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full border border-gray-100">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          My Profile
        </h1>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">User ID</p>
            <p className="text-gray-800">{profile.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-gray-800">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p className="text-gray-800">{profile.name || '—'}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Reusable Dialog for editing */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
      >
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            label="Name"
            value={form.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            placeholder="Enter your name"
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className={`px-4 py-2 rounded-md flex items-center justify-center space-x-2 text-white transition ${
                isUpdating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
            >
              {isUpdating ? (
                <>
                  <Spinner size="h-4 w-4" />
                  <span>Saving...</span>
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}

export default Profile
