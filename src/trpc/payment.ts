import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../getPayload";

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

        



    })
})