import {clerkMiddleware,createRouteMatcher} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute=createRouteMatcher(["/sign-in(.*)","/sign-up(.*)"]);

const isOrgSelctionRoute=createRouteMatcher(["/org-selection(.*)"]);

export default clerkMiddleware(async(auth,req)=>{
    const {userId,orgId}=await auth();

    //public routes sign in and signup alllowed for all users
    if(isPublicRoute(req)){
        return NextResponse.next();
    }

    //protecting non-public routes
    if(!userId){
        await auth.protect();
    }

    //allow org selection route
    if(isOrgSelctionRoute(req)){
        return NextResponse.next();
    }
    //for all protected routes, ensure org is selected
    if(userId && !orgId){
        const orgSelection=new URL("/org-selection",req.url);
        return NextResponse.redirect(orgSelection);
    }

    return NextResponse.next();
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};