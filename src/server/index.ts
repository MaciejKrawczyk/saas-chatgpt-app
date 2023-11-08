import {publicProcedure, router} from "@/server/trpc";
import {z} from 'zod'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {TRPCError} from "@trpc/server";


export const appRouter = router({
  
  authCallback: publicProcedure.query(() => {
    const {getUser} = getKindeServerSession()
    const user = getUser()
    
    if (!user.id || !user.email) throw new TRPCError(({code: 'UNAUTHORIZED'}))
    
    const dbUser = await db
    
    return { success: true }
  })
  
  
})


export type AppRouter = typeof appRouter