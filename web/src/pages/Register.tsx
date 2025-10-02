import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { useAuth } from '../contexts/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../utils/validations'
import type { RegisterDto } from '../types/dtos'

const Register = () => {
  const { register } = useAuth()
  const [form, setForm] = useState<RegisterDto>({
    email: '',
    password: '',
    name: '',
  })
  const [errors, setErrors] = useState<Partial<RegisterDto>>({})
  const navigate = useNavigate()

  const handleChange = (field: keyof RegisterDto, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))

    if (field === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) || undefined,
      }))
    }
    if (field === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value) || undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<RegisterDto> = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      name: validateName(form.name || ''),
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some(Boolean)) return

    try {
      await register(form.email, form.password, form.name)
      toast.success('Registered successfully')
      navigate('/tasks')
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || 'Failed to register'
      toast.error(errorMessage)
    }
  }

  return (
    <div className="flex items-center justify-center flex-1 px-4 h-[calc(100vh-112px)] bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>

        <Input
          name="name"
          label="Name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          placeholder="Enter your name"
        />

        <Input
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          placeholder="Enter your email"
          required={true}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          placeholder="Enter your password"
          required={true}
        />

        <Button type="submit" variant="primary" className="w-full">
          Register
        </Button>
      </form>
    </div>
  )
}

export default Register
