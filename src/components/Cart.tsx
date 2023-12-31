'use client'

import { ShoppingBagIcon } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { cn, formatPrice } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "./ui/button"
import { useCart } from "@/hooks/useCart"
import CartItem from "./CartItem"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useEffect, useState } from "react"


const Cart = () => {
    const {items} =useCart()
    const itemCount = items.length
    const fee = 2
    const subTotal = items.reduce((total, {product}) => total + product.price, 0)

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
       setIsMounted(true) 
    },[])


  return (
    <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2">
            <ShoppingBagIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-primary group-hover:text-primary/75"/>
            <span className="ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary">
                {isMounted ? itemCount : 0}
            </span>
        </SheetTrigger>
        <SheetContent className="w-full flex flex-col pr-0 sm:max-w-lg bg-white">
            <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle className="text-2xl text2">Cart({itemCount})</SheetTitle>
            </SheetHeader>
            {itemCount >0 ? (
                <>
                <div className="flex w-full flex-col pr-6">
                    <ScrollArea>
                    {items.map(({product}) => (
                        <CartItem product={product} key={product.id}  />
                    ))}
                    </ScrollArea>
                </div>

                <div className="space-y-4 pr-6">
                    <Separator />
                    <div className="space-y-2 text-sm">
                        <div className="flex ">
                            <span className="flex-1 ">
                                Service Fee
                            </span>
                            <span >{formatPrice(fee)}</span>
                        </div>
                        
                        <Separator className="" />
                        <div className="flex my-4 ">
                            <span className="flex-1 font-bold ">
                                Total
                            </span>
                            <span >{formatPrice(subTotal + fee)}</span>
                        </div>
                    </div>

                    <SheetFooter>
                        <SheetTrigger asChild>
                        <Link href='/cart' className={cn(buttonVariants(), 'w-full text-center ')}>
                            <p className="w-full text2 font-semibold">Checkout</p>
                        </Link>
                        </SheetTrigger>
                    </SheetFooter>
                </div>
                </>
            ): (
            <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div arria-hidden="true" className="relative mb-4 h-60 w-60 text-muted-foreground">
                    <Image 
                    src='/empty-cart.png'
                    fill
                    alt='empty cart'
                    />
                </div>
                <div className="text-center text1 text-xl font-semibold">
                    Your cart is empty
                </div>
                <SheetTrigger asChild>
                    <Link href='/products' className={cn(buttonVariants({ variant: 'link',size: 'sm' }), 'text-sm text-muted-foreground')}>
                        Continue Shopping &rarr;
                    </Link>
                </SheetTrigger>
            </div>)}
        </SheetContent>
    </Sheet>
  )
}

export default Cart