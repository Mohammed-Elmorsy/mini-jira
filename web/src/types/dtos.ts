export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  name?: string
}

export interface UpdateUserDto {
  name?: string
}

export interface CreateTaskDto {
  title: string
  description?: string
  status?: string
  dueDate?: string | null
}
