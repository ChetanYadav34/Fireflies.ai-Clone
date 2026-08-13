import { Search, Bell, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function TopNavbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search meetings, transcripts, and topics..." 
            className="pl-9 bg-gray-50 border-transparent focus-visible:ring-indigo-600 focus-visible:border-indigo-600 focus-visible:bg-white transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-500">
          <HelpCircle className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell className="w-5 h-5" />
        </Button>
        <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-transparent hover:ring-indigo-600 transition-all">
          <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
