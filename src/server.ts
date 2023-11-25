import express from 'express'
import { getPayloadClient } from './getPayload'
import { nextApp, nextHandler } from './next-utils'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'
import { inferAsyncReturnType } from '@trpc/server'
import bodyParser from 'body-parser'
import { IncomingMessage } from 'http'
import { stripeWebhookHandler } from './webhooks'

const app = express()

const PORT = Number(process.env.PORT) || 3000

const createContext = ({req, res}:trpcExpress.CreateExpressContextOptions) => ({
    req,
    res,
})
export type ExpressContext = inferAsyncReturnType<typeof createContext>
export type WebhookRequest = IncomingMessage & {
    rawBody: Buffer
}
const start = async () => {


    const webhookMiddleware = bodyParser.json({
        verify: (req:WebhookRequest,_,buf) => {
           req.rawBody = buf
        },
    })

    app.post('/api/webhooks/stripe', webhookMiddleware, stripeWebhookHandler)
    
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
            },
        },
    })


    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,

    }))

    app.use((req, res) => nextHandler(req, res))

    nextApp.prepare().then(() => {
        payload.logger.info(`Next.js started on port ${PORT}`)
        app.listen(PORT, async () => {
            payload.logger.info(`Admin URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
        })
    })
}

start()
