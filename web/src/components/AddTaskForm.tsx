import { useState } from 'react'

import Input from './ui/Input'
import Button from './ui/Button'
import type { CreateTaskDto } from '../types/dtos'
import { validateTaskTitle } from '../utils/validations'
import { TaskStatus } from '../types'
import TextArea from './ui/TextArea'

interface Props {
  onSubmit: (task: CreateTaskDto) => void
  onCancel: () => void
}

const AddTaskForm = ({ onSubmit, onCancel }: Props) => {
  const [form, setForm] = useState<CreateTaskDto>({
    title: '',
    description: '',
    status: TaskStatus.TODO,
    dueDate: null,
  })
  const [errors, setErrors] = useState<Partial<CreateTaskDto>>({})

  const handleChange = (field: keyof CreateTaskDto, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'title') {
      setErrors((prev) => ({
        ...prev,
        title: validateTaskTitle(value) || undefined,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const titleError = validateTaskTitle(form.title)
    setErrors({ title: titleError || undefined })
    if (titleError) return

    onSubmit(form)
    setForm({ title: '', description: '', status: 'todo', dueDate: null })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4"
    >
      <Input
        name="title"
        label="Title"
        value={form.title}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        placeholder="Enter task title"
      />
      <TextArea
        name="description"
        label="Description"
        value={form.description || ''}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Enter task description"
        height="300px"
      />
      <div className="flex justify-end space-x-3 pt-3">
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={!!errors.title}
        >
          Add Task
        </Button>
      </div>
    </form>
  )
}

export default AddTaskForm
