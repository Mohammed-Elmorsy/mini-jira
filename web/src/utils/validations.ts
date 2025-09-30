export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required'
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) return 'Enter a valid email address'
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required'
  }

  // Must contain at least:
  // - 8 characters
  // - 1 lowercase
  // - 1 uppercase
  // - 1 number
  // - 1 special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

  if (!strongPasswordRegex.test(password)) {
    return 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
  }

  return null
}

export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Name cannot be empty'
  return null
}

export const validateTaskTitle = (title: string): string | null => {
  if (!title.trim()) return 'Task title is required'
  return null
}

export const validateTaskDescription = (description: string): string | null => {
  if (!description.trim()) return 'Task description cannot be empty'
  return null
}
