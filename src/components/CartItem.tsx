import React from 'react'
import Image from 'next/image'
import { Product } from '@/payload-types'
import { ImageIcon } from 'lucide-react'

const CartItem = ({product}:{product:Product}) => {
    const {image} = product.images[0] 

  return (
    <div className='space-y-3 py-2'>
        <div className='flex items-start justify-between gap-4'>
            <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 min-w-fit overflow-hidden rounded aspect-square">
                   {typeof image !== 'string' && image.url ? (
                     <Image 
                     src={image.url}
                     fill
                     alt={product.name}
                     className='absolute object-cover'
                     />
                   ): (
                    <div className='flex h-full items-center justify-center bg-primary'>
                        <ImageIcon aria-hidden="true" className='w-5 h-5 text-muted-foreground' />
                    </div>
                   )}
                </div>
            </div>
        </div>    
    </div>
  )
}

export default CartItem