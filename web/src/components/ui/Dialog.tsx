import {
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  DialogTitle as HeadlessDialogTitle,
} from '@headlessui/react'
import type { JSX, ReactNode } from 'react'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const Dialog = ({
  open,
  onClose,
  title,
  children,
}: DialogProps): JSX.Element => {
  return (
    <HeadlessDialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <HeadlessDialogPanel className="mx-auto max-w-md w-full rounded-xl bg-white p-6 shadow-xl">
          <HeadlessDialogTitle className="text-lg font-semibold text-gray-800 mb-4">
            {title}
          </HeadlessDialogTitle>
          {children}
        </HeadlessDialogPanel>
      </div>
    </HeadlessDialog>
  )
}

export default Dialog
