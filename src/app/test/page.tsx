import {prisma} from "@/lib/db"

export default async function TestPage() {
    const voices=await prisma.voice.findMany();

    return (
        <div className="p-8">
            {
                voices.length
            }
        </div>
    )
}