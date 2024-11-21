import prisma from "@/lib/db";

 export default async function page(params:type) {
    const posts = await prisma.notice.findMany()
    return posts;
    
}