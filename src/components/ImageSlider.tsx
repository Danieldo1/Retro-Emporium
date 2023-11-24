import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

interface ImageSlider {
    urls:string[]
}


const ImageSlider = ({urls}:ImageSlider) => {


    const activeStyles = 'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-muted -translate-y-1/2'
    const inactiveStyles = 'hidden text-muted'
  return (
    <div className='group relative bg-muted-foreground aspect-square overflow-hidden rounded-xl'>
        <div className='absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition'>
            <button></button>
            <button></button>
        </div>
        <Swiper 
        className='h-full w-full'
        
        >{urls.map((url,i) => 
        <SwiperSlide key={i} className='-z-10 relative h-full w-full'>
            <Image 
            fill
            loading='eager'
            className='-z-10 h-full w-full object-cover object-center'
            src={url}
            alt='product image'
            />
            </SwiperSlide>
        )}
        </Swiper>
    </div>
  )
}

export default ImageSlider