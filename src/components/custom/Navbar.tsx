"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ArrowRight, Menu } from 'lucide-react'
import useAuthStore from '@/store/useStore'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ModeToggle } from './ModeToggle'

const NavItems = () => (
  <>
    <Link href="/playground" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 transition-colors">
      Play Now
    </Link>
    <Link href="/lobby" className="text-gray-600 dark:text-gray-200 hover:text-gray-900 transition-colors">
      Play with friends
    </Link>
    <Link href='/subscription' className="text-gray-600 dark:text-gray-200 hover:text-gray-900 transition-colors">
      Pricing
    </Link>
    <Link href='/leaderboard' className="text-gray-600 dark:text-gray-200 hover:text-gray-900 transition-colors">
      leaderboard
    </Link>
    <ModeToggle />
    
  </>
)

export function Navbar() {
  const router = useRouter();
  const { isAuthenticated, logout,user } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  
  const handleLogout = async () => {
    // api call for logout 
    const response = await axios.get('/api/logout')
    console.log("response:", response.data)
    // Call the logout function from your auth store
    logout()

    router.push('/login')
  }

  return (
    <header className="mx-auto dark:bg-background p-6 border-b  w-full ">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl dark:text-black font-bold text-gray-900">
        <Link href="/" className="text-2xl font-semibold text-blue-500">
            TypeBlaze
          </Link>
        </h1>
        <div className="hidden md:flex justify-center items-center space-x-6">
          <NavItems />
          {/* Conditional Rendering for Auth Button */}
          {isAuthenticated ? (
            <Button className=' bg-blue-500 text-white' onClick={handleLogout}>Logout</Button>
          ) : (
            <Link
            href="/signup"
            className="text-sm bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center"
          >
            Join Now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col space-y-4 mt-8">
              <NavItems />
              {/* Conditional Rendering for Auth Button */}
              {user?.token ? (
                <Button className='bg-blue-500 text-white' onClick={handleLogout}>Logout</Button>
              ) : (
                <Link href="/signup">Join Now</Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
