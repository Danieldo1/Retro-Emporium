import React from 'react'
import Image from 'next/image'
import { getServerSideUser } from '@/lib/payload'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/getPayload'
import { notFound, redirect } from 'next/navigation'
import { Product, ProductFile, User } from '@/payload-types'
import { PROD_CATEGORIES } from '@/config'
import { ArrowDownCircle, ArrowDownIcon } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PaymentStatus from '@/components/PaymentStatus'

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

const products = order.products as Product[]

const subTotal = products.reduce((total, product) => {
    return total + product.price 
},0)

  return (
    <main className='relative lg:min-h-full bg-background'>
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
                    <p className='mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text2'>Your order has been successful.</p>
                    <h1 className='text-sm font-medium text-primary text2'>Thank you for your order</h1>

                    {order._isPaid ? (
                        <p className='mt-2 text-lg text-foreground'>
                            Your order is confirmed.<br className='mt-5'/> We&apos;ve sent you an email to {typeof order.user !== 'string' ? <span className='font-bold text-gray-900'>{order.user.email}</span> :null} with all of the details about your order.
                        </p>
                    ) : (
                    <p className='mt-2 text text-muted-foreground'>
                        We&apos;ll send you an email when your order is confirmed.<br /> Your order is being processed. We&apos;ll send you an email with all of the details about your order. <br /> Please be patient!
                    </p>
                    )}

                    <div className='mt-16 text-sm font-medium'>
                        <div className='text-muted-foreground'>
                            Order No
                        </div>
                        <div className='mt-2 text-gray-900'>{order.id}</div>

                        <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                            {(order.products as Product[]).map((product) => {

                                const label = PROD_CATEGORIES.find((c)=> c.value === product.category)?.label

                                const downloadLink =  (product.product_files as ProductFile).url as string
                                
                                const {image} = product.images[0]
                                return (   
                                    <li key={product.id} className='flex space-x-6 py-6'>
                                        <div className='relative h-24 w-24'>
                                            {typeof image !== 'string' && image.url ? (
                                                <Image 
                                                fill
                                                alt={product.name}
                                                src={image.url}
                                                className='flex-none rounded-md bg-gray-100 object-cover object-center'
                                                />
                                            ): null}
                                        </div>
                                        <div className='flex-auto flex flex-col justify-between'>
                                                <div className='space-y-1 '>
                                                    <h3 className='text-gray-900 text2'>{product.name}</h3>
                                                    <p className='text-gray-500 my-1'>Category: {label}</p>
                                                </div>


                                        {order._isPaid ? (
                                            <a href={downloadLink} download={product.name} className='text-primary items-center hover:underline  underline-offset-2 flex flex-1 flex-row'>Download asset<ArrowDownCircle className='w-4 ml-2  h-4'/></a>
                                        ):null}
                                        </div>

                                        <p className='flex-none text-gray-900 font-medium'>
                                            {formatPrice(product.price)}
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground'>
                            <div className='flex justify-between'
                            >
                                <p className='text-gray-900'>Subtotal</p>
                                <p className='text-gray-500'>{formatPrice(subTotal)}</p>

                            </div>
                            <div className='flex justify-between'
                            >
                                <p className='text-gray-900'>Shipping</p>
                                <p className='text-gray-500'>{formatPrice(subTotal > 75 ? 0 : 10)}</p>

                            </div>

                            <div className='flex justify-between border-t border-gray-200 pt-6'
                            >
                                <p className='text-gray-900 font-bold'>Total</p>
                                <p className='text-gray-900 font-bold'>{formatPrice(subTotal + (subTotal > 75 ? 0 : 10))}</p>

                            </div>
                        </div>

                        <PaymentStatus orderEmail={(order.user as User).email} orderId={order.id} isPaid={order._isPaid} />



                        <div className='mt-16 border-t border-gray-200 py-6 text-right'>
                            <Link href={'/products'}>
                                <Button className='text-primary' variant={'ghost'}>Continue Shopping &rarr;</Button>
                            </Link>
                        </div>

                    </div>
                </div>
        </div>
    </main>
  )
}

export default Success