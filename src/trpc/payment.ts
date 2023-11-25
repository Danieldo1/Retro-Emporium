import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../getPayload";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";

export const paymentRouter = router({
    createSession: privateProcedure.input(z.object({productId: z.array(z.string() )})).mutation(async({ctx,input})=> {
        const {user} = ctx
        let {productId} = input

        if(productId.length === 0){
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "No products selected"
            })
        }

        const payload = await getPayloadClient()
        const {docs: products} = await payload.find({
            collection: "products",
            where: {
                id: {
                    in: productId
                }
            },
        })

        const filterProducts = products.filter(product => Boolean(product.priceId))

        const order = await payload.create({
            collection: "orders",
            data: {
                _isPaid: false, 
                user: user.id,
                products: filterProducts,
            }
        })

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

        filterProducts.forEach(product => {
            line_items.push({
                price: product.priceId!,
                quantity: 1,
                adjustable_quantity: {
                    enabled:false,
                }
            })
        })


        line_items.push({
            price: "price_1OGHTAARbebDrvKAI3DeJ10H",
            quantity: 1,
            adjustable_quantity: {
                enabled:false,
            }
        })

        try {
            const stripeSession = await stripe.checkout.sessions.create({
                success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success?orderId=${order.id}`,
                cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, 
                payment_method_types: ['card','paypal'],
                mode: 'payment',
                metadata: {
                    userId: user.id,
                    orderId: order.id
                },
                line_items,
                

            })

            return {
                url: stripeSession.url
            }


        } catch (error) {
            console.log(error)

            return {
                url: null
            }
        }



    })
})