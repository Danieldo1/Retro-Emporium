'use client'

import { trpc } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

interface VerifyEmail {
    token: string
}

const VerifyEmailPage = ({token}:VerifyEmail) => {
    const {data, isLoading,isError} = trpc.auth.verifyEmail.useQuery({
        token
    })

    if(isError) {
        return (<div className="flex flex-col items-center gap-2">
            <XCircle  className="text-red-500 h-8 w-8"/>
            <h3 className="font-semibold text-xl text-center text2">Error !<br /> There was an error verifying your email</h3>
            <p className="text-muted-foreground text-sm text1">Please try again later</p>
        </div>)
    }
    
    if(data?.success) {
        return (
            <>
            <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div className="relative mb-4 ml-7 h-60 w-60 text-muted-foreground">
                    <Image 
                    src='/verify-email.png'
                    alt='verify-email'
                    fill
                    />
                </div>
                    <h3 className="text-2xl font-semibold text2">Email verified !</h3>
                    <p className="text-muted-foreground text-md text1">You can now login</p>
            </div>
                    <Link href={'/sign-in'}>
                        <Button className="mt-4 w-full text2 tracking-widest">Login</Button>
                        
                    </Link>
            </>
        )
    }


    if(isLoading) {
        return (
        <div className="flex flex-col items-center gap-2">
        <Loader2  className="animate-spin text-secondary h-8 w-8 "/>
        <h3 className="font-semibold text-xl text-center text2">Verifying your email</h3>
        <p className="text-muted-foreground text-sm text1">Please wait, we are verifying your email</p>
         </div>
    )
    }




}

export default VerifyEmailPage