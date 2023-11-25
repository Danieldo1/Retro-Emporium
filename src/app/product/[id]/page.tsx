import AddToCart from '@/components/AddToCart'
import ImageSlider from '@/components/ImageSlider'
import ProductReel from '@/components/ProductReel'
import Wrapper from '@/components/Wrapper'
import { PROD_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/getPayload'
import { formatPrice } from '@/lib/utils'
import { CheckIcon, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'


interface PageProps {
    params: {
        id: string
    }
}

const BREADCRUMBS = [
  {id: 1, name: "Home", href: "/"},
  {id: 2, name: "Products", href: "/products"},
]

const Page = async ({params}:PageProps) => {

  const {id} = params

  const payload = await getPayloadClient()

  const {docs:products} = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: id,
      },
      approvedForSale: {
        equals: 'approved',
      }
    }
  })

  const [product] = products

  if(!product) {
    return notFound()
  }

  const label = PROD_CATEGORIES.find(({value})=> value === product.category)?.label
  const validURL = product.images.map(({image}) => (typeof image === 'string' ? image : image.url)).filter(Boolean) as string[]
  return (
    <>
   <div className='flex-1 py-1 bg-foreground  flex justify-center align-middle items-center z-10 relative '>
  <Truck  className='h-5 w-5 flex-shrink-0  text-background' />
  <p className='ml-2 text-lg text1 text-background font-bold tracking-wider '>Free shipping on orders over €75</p>
</div>
    <Wrapper className='bg-background relative -pt-10 '>
      <div className="bg-background ">
        <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-3 lg:px-3'>

          <div className='lg:max-w-lg lg:self-end '>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb,i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center '>
                    <Link
                      href={breadcrumb.href}
                      className='hover:text-secondary text-sm font-medium text-muted-foreground'
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                      className='ml-1 h-5 w-5 flex-shrink-0 text-primary'>
                      <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                  </svg>
                    ): null}
                  </div>
                </li>
              ))}
            </ol>


            <div className='mt-4'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground text2 sm:text-4xl'>{product.name}</h1>
            </div>

            <section className='mt-4'>
                  <div className='flex items-center'>
                      <p className='ont-bold tracking-tight text-foreground text2 '>{formatPrice(product.price)}</p>

                      <div className='ml-4 border-l border-primary text-secondary pl-4'>
                        {label}
                      </div>
                  </div>

                  <div className='mt-4 space-y-6'>
                      <p className='text-base text-muted-foreground'>{product.description}</p>
                  </div>

            </section>
          </div>


          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
                <div className='aspect-square rounded-lg'>
                      <ImageSlider urls={validURL} />
                </div>  
          </div>


          <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:self-start lg:max-w-lg'>
                <div>
                  <div className='mt-10'>
                    <AddToCart product={product} />    
                  </div>


                  <div className='mt-6 text-center'>
                      <div className='group inline-flex text-sm text-medium'>
                          <ShieldCheck  className='mr-2 h-5 w-5 flex-shrink-0 text-secondary'/>
                          <span className='text-foreground hover:text-secondary'>30 Days Returns Guarantee Policy</span>
                      </div>
                  </div>
                </div>
          </div>
        </div>
      </div>

      <ProductReel href='/products' query={{limit: 4, category: product.category}} title={`Similar ${label} Products`} subtitle={`Browse our collection of ${label} just like '${product.name}'`} />
    </Wrapper>
    </>
  )
}

export default Page