'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ArrowUpFromDot } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { AuthValidator, TypeAuthValidator } from "@/lib/validators/accounts"
import { trpc } from "@/trpc/client"
import {toast} from 'sonner'
import { ZodError } from "zod"
import { useRouter, useSearchParams } from "next/navigation"



const Page = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const isSeller = searchParams.get('as') === 'seller'

    const origin = searchParams.get('origin') 


const {register, handleSubmit, formState: {errors}} = useForm<TypeAuthValidator>({
    resolver:  zodResolver(AuthValidator)
})

const {mutate,isLoading} = trpc.auth.signIn.useMutation({
    onError: (error) => {
        if(error.data?.code === "BAD_REQUEST") {
            toast.error('Email already exists. Please login')
            return
        }

        if(error instanceof ZodError) {
            toast.error(error.issues[0].message)
            return
        }

        toast.error('Something went wrong. Please try again later')
    },

    onSuccess: ({sentToEmail}) => {
        toast.success(`We have sent a verification link to ${sentToEmail}. Please check your email inbox.`)
        router.push('/verify-email?to=' + sentToEmail)
    }


})

const onSubmit = ({email, password}: TypeAuthValidator) => {
    // Send data to server
    mutate({email, password})
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
                    <h1 className="text-2xl font-semibold text2">Sign in to your account</h1>

                    
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

                            <Button>Sign in</Button>
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