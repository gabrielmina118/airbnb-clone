import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const user = await prisma.user.findFirst({
        where: {
            id: currentUser.id,
        },
    });

    return NextResponse.json(user);
}
