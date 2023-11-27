'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowUpFromDot, InfoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { AuthValidator, TypeAuthValidator } from "@/lib/validators/accounts"
import { trpc } from "@/trpc/client"
import {toast} from 'sonner'
import { ZodError } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"



const Page = () => {
    const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
    const router = useRouter()
    const searchParams = useSearchParams()

    const isSeller = searchParams.get('as') === 'seller'

    const origin = searchParams.get('origin') 

    const continueAsSeller = () => {
        router.push('?as=seller')
    }

    const continueAsBuyer = () => {
        router.replace('/sign-in', undefined)
    }


const {register, handleSubmit, formState: {errors}} = useForm<TypeAuthValidator>({
    resolver:  zodResolver(AuthValidator)
})

const {mutate:signIn,isLoading} = trpc.auth.signIn.useMutation({
onSuccess: () => {
toast.success('Sign in was a success')
router.refresh()  

if(origin) {
    router.push(`/${origin}`)
    return 
} 

if(isSeller){
    router.push('/sell')
    return 
}

router.push('/')
router.refresh()
},

onError: (error) => {
    if(error.data?.code === "BAD_REQUEST" || error.data?.code === "UNAUTHORIZED") {
        toast.error('Something is wrong :( Please try again later')
        
    }
},





})



const onSubmit = ({email, password}: TypeAuthValidator) => {
    // Send data to server
    signIn({email, password})
}






    return (
        <>
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Image 
                    src={"/logo.png"}
                    alt="logo"
                    height={200}
                    width={200}
                    
                    />
                    <h1 className="text-2xl font-semibold text2 flex-row flex">
                    
                    Sign in to your {isSeller ? 'seller' : ''}{' '} account 
                    </h1>
                    <div className="group relative">
                    <InfoIcon
                        className={cn('w-6 h-6 animate-ping transition-all text-primary cursor-pointer', {
                        'text-secondary': isClicked,
                        })}
                       onClick={handleClick}
                    />
                    {isClicked && (
                        <div className="absolute top-0 left-0 mt-8 p-2 justify-start bg-white border items-start border-gray-300 rounded-lg shadow-lg ">
                        <p className="text-sm text-gray-800 whitespace-nowrap font-bold line-clamp-1">Email: <span className="text-muted">test@retro-email.com</span></p>
                        <p className="text-sm text-gray-800 whitespace-nowrap font-bold line-clamp-1">Password: <span className="text-muted">QWERTY1234</span> </p>
                        </div>
                    )}
                    </div>

                    
                </div>

                <div className="grid gap-6 ">
                    <form 
                    onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="your@example.com" type="email" className={cn({"focus-visible:ring-primary": errors.email})}
                                {...register("email")}
                                />
                                {errors?.email && (
                                    <p className="px-1 pt-2 text-xs text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="grid gap-1 py-2">
                                <Label htmlFor="password">Password</Label>
                                <Input  placeholder="Password"
                                type="password"
                                className={cn({"focus-visible:ring-primary": errors.password})}
                                {...register("password")}
                                />
                                {errors?.password && (
                                    <p className="text-xs text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            <Button className="text2">Sign in</Button>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue to</span>
                        </div>            
                    </div>
                    {isSeller ? (
                        <Button onClick={continueAsBuyer} variant={"secondary"} disabled={isLoading} className="text-white text2" >Sign in as a buyer</Button>
                    ): (
                        <Button onClick={continueAsSeller} variant={"secondary"} disabled={isLoading} className="text-white text2">Sign in as a seller</Button>
                    )}
                </div>
                    <Link href='/sign-up' className={buttonVariants({ variant: "link" })}>
                        <p className="text-sm text-secondary">Not a member? <span >Sign up here </span></p>
                        
                    </Link>

            </div>
        </div>
        </>
    )    
}

export default Page