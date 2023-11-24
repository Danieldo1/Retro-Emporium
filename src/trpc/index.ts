import { z } from "zod";
import { authRouter } from "./auth";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query";
import { getPayloadClient } from "../getPayload";



export const appRouter = router({
   auth: authRouter,

   getAllProducts: publicProcedure.input(z.object({
       limit: z.number().min(1).max(100),
       cursor: z.number().nullish(),
       query: QueryValidator
   })).query( async ({input}) => {
      const {query,cursor} = input
      const {sort,limit, ...queryOpts} = query

      const payload = await getPayloadClient()
      
      const parsedQuery: Record<string,{equals: string}> = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
         parsedQuery[key] = {
            equals: value
         }
      })
      const page = cursor || 1

      const {docs:products, hasNextPage, nextPage} = await payload.find({
         collection: "products",
         where: {
            approvedForSale: {
               equals: 'approved'
            },
            ...parsedQuery
         },
         sort,
         depth: 1,
         limit,
         page,
      })

      return {
         products,
         nextPage: hasNextPage ? nextPage : null,
         
      }
   })
})

export type AppRouter = typeof appRouter