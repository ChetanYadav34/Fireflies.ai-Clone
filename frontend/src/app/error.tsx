'use client'
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Something went wrong!</h1>
        <p className="text-gray-500">
          We apologize, but an unexpected error occurred while loading this page. Our team has been notified.
        </p>
        <div className="pt-6">
          <Button onClick={() => reset()} className="bg-indigo-600 hover:bg-indigo-700">
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}

