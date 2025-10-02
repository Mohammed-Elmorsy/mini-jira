export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required'
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) return 'Enter a valid email address'
}

export const validatePassword = (password: string): string | undefined => {
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
}

export const validateName = (name: string): string | undefined => {
  if (!name.trim()) return 'Name cannot be empty'
}

export const validateTaskTitle = (title: string): string | undefined => {
  if (!title.trim()) return 'Task title is required'
}

export const validateTaskDescription = (
  description: string,
): string | undefined => {
  if (!description.trim()) return 'Task description cannot be empty'
}
