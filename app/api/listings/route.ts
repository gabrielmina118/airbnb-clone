import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const {
        category,
        location,
        guestCoutn,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description,
    } = body;

    const listing = await prisma.listing.create({
        data: {
            category,
            locationValue:"",
            guestCoutn,
            roomCount,
            bathroomCount,
            imageSrc,
            price: parseInt(price, 10),
            title,
            userId: currentUser.id,
            description,
        },
    });

    return NextResponse.json(listing);
}
