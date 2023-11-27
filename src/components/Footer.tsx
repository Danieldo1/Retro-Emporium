'use client'

import React from 'react'
import Wrapper from './Wrapper'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {

    const pathname = usePathname()
    const paths = [
        '/verify-email',
        '/sign-up',
        '/sign-in',
    ]
  return (
    <footer className='bg-white flex-grow-0 '>
 
            <div className='border-t border-gray-200 '>
                {paths.includes(pathname) ? null : (
                <div className=' pb-4 pt-4'>
                    <div className='flex justify-center'>
                    <Image 
                    src={'/logo.png'}
                    alt={'logo'}
                    width={100}
                    height={100}
                    />
                    </div>
                </div>
                )}

                {paths.includes(pathname) ? null : (
                <div>
                    <div className='relative flex items-center px-6 py-6 sm:py-8 lg:mt-0'>
                        <div className='absolute inset-0 overflow-hidden rounded-lg '>
                            <div className='absolute inset-0 bg-[#f0f5ff] bg-gradient-to-br bg-opacity-90' />
                        </div>

                        <div className='text-center relative mx-auto max-w-sm'>
                            <h3 className='font-bold text-foreground'>Become a part of us </h3>
                            <p className='mt-2 text-sm text-muted-foreground'>
                                Join our sellers community {' '}
                            </p>
                                <Link href='/sign-in?as=seller' className='whitespace-nowrap font-medium text-foreground hover:text-primary'>
                                    <br />
                                Get started now &rarr;
                                </Link>
                        </div>
                    </div>
                </div>)}
            </div>

            <div className='py-10 md:px-16 md:flex md:items-center md:justify-between'>
                    <div className='text-center md:text-left'>
                        <p className='text-sm text-muted-foreground'>&copy; {new Date().getFullYear()} All Rights Reserved</p>
                    </div>

                    <div className='mt-4 flex items-center justify-center md:mt-0'>
                        <div className='flex space-x-8'>
                            <Link className='text-sm text-muted-foreground hover:text-primary' href='#'>
                            Cookie Policy
                            </Link>
                            <Link className='text-sm text-muted-foreground hover:text-primary' href='#'>
                            Terms of Sale
                            </Link>
                            <Link className='text-sm text-muted-foreground hover:text-primary' href='#'>
                            Privacy Policy
                            </Link>
                            <Link className='text-sm text-muted-foreground hover:text-primary' href='#'>
                            Legal
                            </Link>
                        </div>
                    </div>
            </div>

    </footer>
  )
}

export default Footer