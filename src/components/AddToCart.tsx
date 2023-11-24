'use client'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { CheckCircleIcon, ShoppingBagIcon } from 'lucide-react'

const AddToCart = () => {

    const [added, setAdded] = useState<boolean>(false)

    useEffect(() => {
       const timeout = setTimeout(() => {
        setAdded(false)
       },5000) 

       return () => clearTimeout(timeout)

    },[added])





  return (
    <Button size={'lg'} className='w-full text2' onClick={() => {
        setAdded(true)

    }} >
        
        {added ? (
        <>
          Added
          <CheckCircleIcon className='w-5 h-5 ml-2' />
        </>
      ) : (
        <>
        Add to cart
        <ShoppingBagIcon className='w-5 h-5 ml-2' />
        </>
      )}
    </Button>
  )
}

export default AddToCart