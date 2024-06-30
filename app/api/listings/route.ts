import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { PrismaClient } from "@prisma/client";

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
            locationValue: location.label,
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


export async function GET(request: Request) {
    console.log("Renderizando espaços")
    const listings = await prisma.listing.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    console.log("Renderizando espaços" , listings)

    return NextResponse.json(listings);
}