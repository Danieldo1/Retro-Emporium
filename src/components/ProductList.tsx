'use client'

import { Product } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PROD_CATEGORIES } from '@/config'
import ImageSlider from './ImageSlider'

interface ProductListProps {
    product: Product | null
    index: number
}

const ProductList = ({product,index}:ProductListProps) => {
    const [shown, setShown] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShown(true)
        },index * 100)
        return () => clearTimeout(timer)
    },[index])
    if(!product || !shown) return <ProductSkeleton />
  
    const label = PROD_CATEGORIES.find(({value}) => value === product.category)?.label

    const validURL = product.images.map(({image}) => (typeof image === 'string' ? image : image.url)).filter(Boolean) as string[]

    if(shown && product) {
        return (
            <Link href={`/product/${product.id}`} className={cn('invisible h-full w-full cursor-pointer group/main',{
                'visible animate-in fade-in-5' :shown
            })}>
                <div className='flex flex-col w-full'>
                    <ImageSlider urls={validURL} />
                    <h3 className='mt-4 font-medium text2 text-lg uppercase text-muted-foreground '>
                        {product.name}
                    </h3>
                    <p className='mt-1 text-sm text1 text-secondary'>
                        {label}
                    </p>
                    <p className='mt-1 font-bold text2 text-sm text-black'>{formatPrice(product.price)}</p>
                </div>
            </Link>
        )
    }
}


const ProductSkeleton = () => {
    return (
        <div className='flex flex-col w-full'>
            <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl '>
                <Skeleton className='w-full h-full' />
            </div>
            <Skeleton className=' h-4 w-2/3 rounded-lg mt-4 ' />
            <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-12 h-4 rounded-lg' />           
        </div>
    )
}


export default ProductList