import type { InputHTMLAttributes, JSX } from 'react'
import clsx from 'clsx'

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

const TextArea = ({
  label,
  error,
  className,
  ...props
}: TextAreaProps): JSX.Element => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 mb-1 font-medium"
        htmlFor={props.name}
      >
        {label}
      </label>
      <textarea
        {...props}
        className={clsx(
          'w-full border rounded-lg p-3 focus:outline-none focus:ring-2 transition',
          error
            ? 'border-pink-500 focus:ring-pink-400 focus:border-pink-500'
            : 'border-gray-300 focus:ring-indigo-400 focus:border-indigo-500',
          className,
        )}
      ></textarea>
      {error && <p className="text-pink-600 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default TextArea
