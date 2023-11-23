'use client'

import { ShoppingBagIcon } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { cn, formatPrice } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "./ui/button"


const Cart = () => {
    const itemCount = 0
    const fee = 1
  return (
    <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2">
            <ShoppingBagIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-primary group-hover:text-primary/75"/>
            <span className="ml-2 text-sm font-medium text-muted-foreground group-hover:text-primary">
                0
            </span>
        </SheetTrigger>
        <SheetContent className="w-full flex flex-col pr-0 sm:max-w-lg bg-white">
            <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle className="text-2xl text2">Cart(0)</SheetTitle>
            </SheetHeader>
            {itemCount >0 ? (
                <>
                <div className="flex w-full flex-col pr-6">
                    {/* cart logic */}
                    cart items
                </div>

                <div className="space-y-4 pr-6">
                    <Separator />
                    <div className="space-y-1.5 text-sm">
                        <div className="flex ">
                            <span className="flex-1 ">
                                Shipping
                            </span>
                            <span >{formatPrice(fee)}</span>
                        </div>
                        <div className="flex ">
                            <span className="flex-1 ">
                                Service Fee
                            </span>
                            <span >Free</span>
                        </div>

                        <div className="flex ">
                            <span className="flex-1 ">
                                Total
                            </span>
                            <span >Free</span>
                        </div>
                    </div>

                    <SheetFooter>
                        <SheetTrigger asChild>
                        <Link href='/cart' className={cn(buttonVariants(), 'w-full text-center ')}>
                            <p className="w-full font-semibold">Checkout</p>
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