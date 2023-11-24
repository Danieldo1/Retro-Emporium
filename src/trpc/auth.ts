import { AuthValidator } from "../lib/validators/accounts";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../getPayload";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
    createUser: publicProcedure.input(AuthValidator).mutation( async ({ input }) => {
        const { email, password } = input;  
        const payload = await getPayloadClient()

        const {docs: users} = await payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email
                }
            }
        })

        if(users.length !== 0) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "User already exists"
            })
        }

        await payload.create({
            collection: "users",
            data: {
               email,
               password,
               role: "user",
            }
        })


        return {success: true,sentToEmail: email}


    })
})