import { publicProcedure, router } from "./trpc";



export const appRouter = router({
    anyApiRoute: publicProcedure.query(() => {
        return "anyApiRoute"
    })
})

export type AppRouter = typeof appRouter