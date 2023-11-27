'use client'

import { useCart } from '@/hooks/useCart'
import { cn, formatPrice } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { PROD_CATEGORIES } from '@/config'
import { CheckIcon, ImageIcon, Loader2Icon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'

const Cart = () => {
    const {items,removeItem} =useCart()

    const router = useRouter()

    const {mutate:createSession, isLoading} = trpc.payment.createSession.useMutation({
        onSuccess: ({url}) => {
            if(url) {
                router.push(url)
            }
        }



    })

    const productId = items.map(({product}) => product.id)

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
       setIsMounted(true)
    },[])

    const fee = 2
    const subTotal = items.reduce((total, {product}) => total + product.price, 0)
  return (
    <div className="bg-background">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className='text-3xl text2 font-bold tracking-tight text-foreground sm:text-4xl'>Your Cart</h1>

            <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
                <div className={cn('lg:col-span-7', {
              'rounded-lg border-2 border-dashed border-zinc-200 p-12':
                isMounted && items.length === 0,
            })}>
                   
                   { isMounted && items.length === 0 ? (
                       <div className='flex h-full flex-col items-center justify-center space-y-1'>
                           <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
                               <Image 
                               src='/empty-cart.png'
                               alt='cart empty'
                               fill
                               loading='eager'
                               />
                           </div>

                           <h3 className='text-2xl text1 font-semibold'>Your cart is empty</h3>
                           <p className='text-muted-foreground text-center'>Start adding items</p>
                       </div>
                   ):null}

                    <ul className={cn({'divide-y divide-muted-foreground border-b border-t border-muted-foreground': isMounted && items.length > 0  })}>
                        {isMounted && items.map(({product}) =>{
                            const label = PROD_CATEGORIES.find((c)=> c.value === product.category)?.label
                            const {image} = product.images[0]
                     
                            return(
                                <li key={product.id} className='flex py-6 sm:py-10'>
                                    <div className='flex-shrink-0'>
                                        <div className='relative h-24 w-24'>
                                            {typeof image !== 'string' && image.url ? (
                                                <Image 
                                                src={image.url}
                                                fill
                                                alt={product.name}
                                                className='object-cover h-full w-full rounded-md object-center sm:h-48 sm:w-48'
                                                />
                                            ): (
                                                <div className='flex h-full items-center justify-center bg-muted-foreground'>
                                                    <ImageIcon aria-hidden="true" className='w-5 h-5 text-muted-foreground' />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className='text-lg font-medium text2'>
                                                            <Link href={`/product/${product.id}`}
                                                            className='font-bold text-foreground hover:text-gray-900'
                                                            >
                                                            {product.name}
                                                            </Link>
                                                        </h3>
                                                    </div>

                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-muted-foreground">Category: {label}</p>
                                                    </div>

                                                    <p className='mt-1 text-sm font-semibold text-foreground'>{formatPrice(product.price)}</p>
                                                </div>

                                                <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                                                    <div className='absolute right-0 top-0'>
                                                        <Button  onClick={() => removeItem(product.id)} variant={"ghost"}  >
                                                            <XIcon className='h-5 w-5 ' />
                                                        </Button>
                                                    </div>
                                                </div>
                                        </div>

                                        <p className="mt-4 flex space-x-2 text-sm text-muted-foreground">
                                            <CheckIcon className="h-5 w-5 mr-2 text-green-500" aria-hidden="true" />
                                            Product in stock
                                        </p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <section className='mt-16 rounded-lg bg-gray-100 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
                    <h2 className='text-lg font-bold text1 text-foreground'>Order summary</h2>


                    <div className='mt-6 space-y-4'>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Subtotal</p>
                            <p className="text-sm font-medium text-foreground">
                                {isMounted ? formatPrice(subTotal)  : <Loader2Icon className='w-5 h-5 animate-spin' />}
                            </p>
                        </div>
                    
                        <div className='flex items-center justify-between border-t border-muted-foreground pt-4'>
                            <div className='flex items-center text-sm text-muted-foreground'>
                                <span>Service Fee</span>
                            </div>
                            <div className='text-sm font-medium text-foreground'>
                            {isMounted ? formatPrice(fee) : <Loader2Icon className='w-5 h-5 animate-spin' />}
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-muted-foreground pt-4">
                            <p className="text-base text-foreground font-semibold">Order Total</p>
                            <p className="text-sm font-medium text-foreground">
                                {isMounted ? formatPrice(subTotal + (fee)) : <Loader2Icon className='w-5 h-5 animate-spin' />}
                            </p>
                        </div>
                    </div>


                    <div className="mt-6">
                        <Button
                        disabled={isLoading || items.length === 0}
                        className='w-full text2 '
                        size={'lg'}
                        onClick={() => createSession({productId})}
                        >
                            {isLoading ? <Loader2Icon className='w-4 h-4 animate-spin mr-1.5' /> : null}
                            Checkout
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Cart