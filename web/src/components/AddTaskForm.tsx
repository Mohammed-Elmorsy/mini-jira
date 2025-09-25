import { useState } from 'react'

import type { Task } from '../types'

type Props = {
  status: Task['status']
  onAdd: (task: Partial<Task>) => void
  onCancel: () => void
}

const AddTaskForm = ({ status, onAdd, onCancel }: Props) => {
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' })

  return (
    <form
      className="mt-3 space-y-2 bg-white p-3 rounded shadow"
      onSubmit={(e) => {
        e.preventDefault()
        onAdd({
          title: form.title,
          description: form.description,
          dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
          status,
        })
      }}
    >
      <input
        type="text"
        placeholder="Title"
        className="w-full border rounded px-2 py-1 text-sm"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full border rounded px-2 py-1 text-sm"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        className="w-full border rounded px-2 py-1 text-sm"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddTaskForm
