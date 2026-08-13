import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Page not found</h1>
        <p className="text-gray-500">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="pt-6">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
