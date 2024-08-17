import { NextResponse, NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"
import authenticate from '@/lib/auth'

const prisma = new PrismaClient;

export const GET = async (req: NextRequest) => {
    
    await authenticate();

    try {
        const data = await prisma.post.findMany()
        NextResponse.json({success: true, data}, {status: 200})
    } catch(err) {
        NextResponse.json({success: false, error: err }, {status: 500})
    }
}
