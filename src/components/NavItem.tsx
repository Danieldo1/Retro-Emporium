'use client'

import React from 'react'
import { Button } from './ui/button'
import { PROD_CATEGORIES } from '@/config'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

type Category =  typeof PROD_CATEGORIES[number]

interface NavItemProps {
    category: Category
    handleOpen: () => void
    isOpen: boolean
    isAnyOpen: boolean
}

const NavItem = ({
    category,
    handleOpen,
    isOpen,
    isAnyOpen
}:NavItemProps) => {
  return (
    <div className='flex '>
        <div className='relative flex items-center'>
            <Button className='gap-1.5 text2 font-bold text-foreground' onClick={handleOpen} variant={isOpen ? 'default' : 'ghost'}>
                {category.label}
                <ChevronDownIcon className={cn('w-6 h-6 transition-all text-primary', { '-rotate-180 text-white': isOpen })} />
            </Button>
        </div>

        {isOpen ? (
            <div className={cn('absolute inset-x-0 top-full text-sm text-muted-foreground',  {'animate-in fade-in-10 slide-in-from-top-5': !isAnyOpen})}>
                <div className='absolute inset-0 top-1/2 bg-[#f0f5ff] shadow-xl' aria-hidden="true"/>

                <div className='relative bg-[#f0f5ff]'>
                    <div className='mx-auto max-w-7xl px-8'>
                        <div className='grid grid-cols-4 gap-x-8 gap-y-10 py-16'>
                            <div className='col-span-4 col-start-1 grid grid-cols-3 gap-x-8'>
                                {category.featured.map((item) => (
                                    <div key={item.name} className='group relative text-base sm:text-sm' >
                                        <Link 
                                        href={item.href} 
                                        className='mt-6 block text2 font-medium text-primary'>
                                        <div className='relative aspect-video overflow-hidden rounded-lg bg-muted group-hover:opacity-75'>
                                            <Image 
                                            src={item.imageSrc}
                                            alt='product category'
                                            fill
                                            className='object-cover object-center grayscale group-hover:grayscale-0'
                                            />
                                        </div>
                                       
                                            {item.name}
                                            <p className='mt-1 text-primary/50 ' aria-hidden="true">Shop Now</p>
                                        </Link>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null}
    </div>
  )
}

export default NavItem