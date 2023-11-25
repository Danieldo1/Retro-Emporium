'use client'

import { trpc } from "@/trpc/client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface PaymentStatus {
    orderEmail:string
    orderId:string
    isPaid:boolean
}

const PaymentStatus = ({orderEmail,orderId,isPaid}: PaymentStatus) => {


const {data} = trpc.payment.finalOrderStatus.useQuery({orderId},{
    enabled: isPaid === false,
    refetchInterval: (data) => (data?.isPaid ? false : 1000),
})
const router = useRouter()
    useEffect(() => {
        if(data?.isPaid) router.refresh()
        
    },[data?.isPaid,router])

  return (
    <div className='mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600'>
        <div >
            <p className='font-bold text-gray-900'>Sending to</p>
            <p className='text-gray-500'>{orderEmail}</p>
        </div>

        <div>
            <p className="font-medium text-gray-900">Order Status</p>

          {isPaid ? <p className="text-green-500">Paid in full</p> : <p className="text-red-500">Unpaid waiting for payment'</p>}
        </div>
    </div>
  )
}

export default PaymentStatus