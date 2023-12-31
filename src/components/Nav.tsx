import React from 'react'
import Wrapper from './Wrapper'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'
import { getServerSideUser } from '@/lib/payload'
import { cookies } from 'next/headers'
import UserNav from './UserNav'
import MobileNav from './MobileNav'

const Nav = async () => {

    const nextCookies = cookies()

const {user}= await getServerSideUser(nextCookies)

  return (
    <div className='bg-background sticky z-50 top-0 inset-0 h-16'>
        <header className='relative bg-background'>
            <Wrapper>
                <div className='border-b  border-[#c0c4cc]'>
                    <div className='flex h-16 items-center'>
                    <MobileNav />

{/* logo img */}
                        <div className='ml-4 flex lg:ml-0'>
                            <Link href={'/'} >
                                <Image 
                                src={'/logo.png'} 
                                alt={'logo'}
                                width={80}
                                height={80}
                                />
                            </Link>
                        </div>

{/* left side of nav */}
                        <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                            <NavItems />
                        </div>
{/* right side of nav */}
                        <div className='ml-auto flex items-center'>
                            <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-6'>
                                {user ? null : <Link href='/sign-in' className={buttonVariants({ variant: 'default' })}>Sign in</Link>}

                                {user ? null : <span className='h-6 w-px bg-secondary' aria-hidden="true" />}

                                {user ? <UserNav user={user} />: <Link href='/sign-up' className={buttonVariants({ variant: 'ghost' })}>Sign up</Link> }

                                {user ? <span className='h-6 w-px bg-secondary' aria-hidden="true"/> :null}

                                {user ? null : <div className='flex lg:ml-6'><span className='h-6 w-px bg-secondary' aria-hidden="true"/></div>}

                                <div className='ml-4 flow-root lg:ml-6'>
                                    <Cart />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Wrapper>
        </header>
    </div>
  )
}

export default Nav