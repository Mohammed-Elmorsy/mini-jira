import Spinner from './Spinner'

interface LoadingScreenProps {
  message?: string
  color?: string
}

const LoadingScreen = ({
  message = 'Loading...',
  color = 'text-blue-500',
}: LoadingScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 opacity-0 animate-fade-in">
      <Spinner size="h-12 w-12" color={color} />
      <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300 animate-pulse">
        {message}
      </p>
    </div>
  )
}

export default LoadingScreen
