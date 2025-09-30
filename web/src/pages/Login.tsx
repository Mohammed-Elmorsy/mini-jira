import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { useAuth } from '../contexts/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { validateEmail, validatePassword } from '../utils/validations'
import type { LoginDto } from '../types/dtos'

const Login = () => {
  const { login } = useAuth()
  const [form, setForm] = useState<LoginDto>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<LoginDto>>({})
  const navigate = useNavigate()

  const handleChange = (field: keyof LoginDto, value: string) => {
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
    const newErrors: Partial<LoginDto> = {
      email: validateEmail(form.email) || undefined,
      password: validatePassword(form.password) || undefined,
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    try {
      await login(form.email, form.password)
      toast.success('Logged in successfully', { id: 'login' })
      navigate('/tasks')
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || 'Failed to login'
      toast.error(errorMessage, { id: 'login' })
    }
  }

  return (
    <div className="flex items-center justify-center flex-1 px-4 h-[calc(100vh-112px)] bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          placeholder="Enter your password"
        />

        <Button type="submit" variant="success" className="w-full">
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
