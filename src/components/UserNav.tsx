'use client'

import { User } from "@/payload-types"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

const UserNav = ({user}:{user:User}) => {

    const {signOut} = useAuth()
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className='overflow-visible'>
            <Button variant='ghost' size='sm' className='relative text2 font-bold text-foreground'>My Account <ChevronDownIcon className={cn('w-6 h-6 transition-all text-primary')} /></Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white w-60 " align="end">
            <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium text-sm text-foreground">{user.email}</p>
                </div>
            </div>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="cursor-pointer text-primary">

                    <Link href='/sell'>
                        Seller Dashboard
                    </Link>
              
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer text-red-600 " onClick={signOut} >
                Sign out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav