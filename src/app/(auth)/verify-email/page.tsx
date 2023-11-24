import Image from 'next/image'
import React from 'react'
import VerifyEmailPage from '@/components/VerifyEmail'

interface PageProps {
    searchParams: {[
        key: string
    ]: string | string[] | undefined} 
}

const VerifyEmail = ({searchParams}: PageProps) => {

    const token = searchParams.token
    const toEmail = searchParams.to


  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            {token && typeof token === "string" ? (
                <div className='grid gap-6'>
                    <VerifyEmailPage token={token} />
                </div>
            ): (
                <div className='flex h-full flex-col items-center justify-center space-y-1'>
                    <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
                        <Image 
                        src='/verify-email.png'
                        alt='verify-email'
                        fill
                        />
                    </div>

                    <h3 className='text-2xl font-semibold'>Verify your email</h3>

                    {toEmail ? <p className='text-muted-foreground text-center'>We have sent a verification link to <span className='font-semibold'>{toEmail}</span>.</p>: <p className='text-muted-foreground text-center'>We have send a verification link to your email address.</p>}
                </div>
            )}
        </div>
    </div>
  )
}

export default VerifyEmail