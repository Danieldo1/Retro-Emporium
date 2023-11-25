import React from 'react'
import Image from 'next/image'
import { getServerSideUser } from '@/lib/payload'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayload'
import { notFound, redirect } from 'next/navigation'

interface PageProps {
    searchParams:{[
        key:string
    ]:string | string[] | undefined}
}

const Success = async ({searchParams}:PageProps) => {

const orderId = searchParams.orderId
const nextCookies = cookies()

const {user} = await getServerSideUser(nextCookies)
const payload = await getPayloadClient()

const {docs:orders} = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
        id: {
            equals: orderId
        }
    }
})

const [order] = orders

if(!orderId) return notFound()

const orderedUserId = typeof order.user === 'string' ? order.user : order.user.id

if(orderedUserId !== user?.id) {
    return redirect(`/sign-in?origin=success?orderId=${order.id}`)
}



  return (
    <main className='relative lg:min-h-full'>
        <div className='hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
            <Image 
            fill
            src='/success.jpeg'
            alt='success'
            className='h-full w-full object-cover object-center'
            />
        </div>

        <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-32 xl:gap-x-24 lg:px-8 lg:max-w-7xl'>
                <div className='lg:col-start-2 '>
                    <p className='mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>Your order has been successful.</p>
                    <h1 className='text-sm font-medium text-primary text2'>Thank you for your order</h1>

                    {order._isPaid ? (
                        <p className='mt-2 text-lg text-foreground'>
                            Your order is confirmed. We&apos;ve sent you an email to {typeof order.user !== 'string' ? <span className='font-bold text-gray-900'>{order.user.email}</span> :null} with all of the details of your order.
                        </p>
                    ) : (
                    <p>
                        
                    </p>
                    )}
                </div>
        </div>
    </main>
  )
}

export default Success