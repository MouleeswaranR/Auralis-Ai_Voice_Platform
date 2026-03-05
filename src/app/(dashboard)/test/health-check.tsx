"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";


export function HealthCheck(){
    const trpc=useTRPC();
    const {data}=useSuspenseQuery(trpc.health.queryOptions())
    return(
        <p>{data.status}</p>
    )
}
