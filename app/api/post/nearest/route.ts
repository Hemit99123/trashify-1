import { NextResponse, NextRequest } from "next/server"
import {prisma} from '@/utils/prisma'

// Using the python mircoservice through RPC, we can use AI within our app! (gRPC framework from Google.com!)

export const GET = async (req: NextRequest) => {    
    try {
        const data = await prisma.post.findMany()
        return NextResponse.json({success: true, data}, {status: 200})
    } catch(err) {
        return NextResponse.json({success: false, error: err }, {status: 500})
    }
}

