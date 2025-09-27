import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import AddTaskForm from './AddTaskForm'
import type { Task } from '../types'

interface AddTaskModalProps {
  onSubmit: (task: Partial<Task>) => void
}

export default function AddTaskModal({ onSubmit }: AddTaskModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (task: Partial<Task>) => {
    onSubmit(task)
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        + Add Task
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        {/* Centered modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-lg w-full rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold mb-4">
              Create New Task
            </DialogTitle>

            <AddTaskForm
              onSubmit={handleSubmit}
              onCancel={() => setIsOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
