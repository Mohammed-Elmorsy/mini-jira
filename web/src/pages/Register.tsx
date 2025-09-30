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

const Register = () => {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    name?: string
  }>({})
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: typeof errors = {}

    const emailError = validateEmail(email)
    if (emailError) newErrors.email = emailError

    const passwordError = validatePassword(password)
    if (passwordError) newErrors.password = passwordError

    const nameError = validateName(name)
    if (nameError) newErrors.name = nameError

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      await register(email, password, name)
      toast.success('Registered successfully 🎉')
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
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="Enter your name"
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Enter your password"
        />

        <Button type="submit" variant="primary" className="w-full">
          Register
        </Button>
      </form>
    </div>
  )
}

export default Register
