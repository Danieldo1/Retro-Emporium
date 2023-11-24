import { NextRequest } from "next/server"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { User } from "../payload-types"

export const getServerSideUser = async (cookies: NextRequest['cookies'] | ReadonlyRequestCookies) => {
    const token = cookies.get('payload-token')?.value

    const userRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
        headers: {
            Authorization: `JWT ${token}`,

        },
    })


    const {user} = (await userRes.json()) as {user: User | null}
    return {user}
}