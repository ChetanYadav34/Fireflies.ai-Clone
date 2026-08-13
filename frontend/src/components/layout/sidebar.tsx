import Link from 'next/link'
import { Home, Settings, Video, FileText, Users } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="w-[260px] bg-gray-50 border-r h-screen fixed left-0 top-0 hidden md:flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 font-semibold text-lg text-primary">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white text-xs">
            F
          </div>
          Fireflies Clone
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-white border shadow-sm text-gray-900"
        >
          <Home className="w-4 h-4 text-indigo-600" />
          Notebook
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-600"
        >
          <Video className="w-4 h-4" />
          Meetings
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-600"
        >
          <FileText className="w-4 h-4" />
          Transcripts
        </Link>
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-600"
        >
          <Users className="w-4 h-4" />
          Team
        </Link>
      </nav>

      <div className="p-4 border-t">
        <Link 
          href="#" 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 text-gray-600"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </aside>
  )
}
