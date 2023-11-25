import React from 'react'
import Image from 'next/image'
import { Product } from '@/payload-types'
import { ImageIcon, XIcon } from 'lucide-react'
import { PROD_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/useCart'

const CartItem = ({product}:{product:Product}) => {
    const {image} = product.images[0] 
    const label = PROD_CATEGORIES.find(({value})=> value === product.category)?.label
    const {removeItem} = useCart()
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

                <div className='flex flex-col self-start'>
                    <span className='line-clamp-1 text-lg font-bold text1 mb-1'>{product.name}</span>
                    <span className='line-clamp-1 text-xs capitalize text-foreground font-medium mb-1'>{label}</span>

                    <div className='mt-4 text-xs text-foreground'>
                        <button onClick={() => removeItem(product.id)}
                        className='flex items-center gap-0.5 text-gray-400 hover:text-gray-800'
                        >
                            <XIcon aria-hidden="true" className='w-3 h-3 ' />
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default CartItem