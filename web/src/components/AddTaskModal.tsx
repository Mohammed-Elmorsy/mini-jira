import { useState, type JSX } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import AddTaskForm from './AddTaskForm'
import type { CreateTaskDto } from '../types/dtos'
import Button from './ui/Button'

interface AddTaskModalProps {
  onSubmit: (task: CreateTaskDto) => void
}

const AddTaskModal = ({ onSubmit }: AddTaskModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (task: CreateTaskDto) => {
    onSubmit(task)
    setIsOpen(false)
  }

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        + Add Task
      </Button>

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

export default AddTaskModal
