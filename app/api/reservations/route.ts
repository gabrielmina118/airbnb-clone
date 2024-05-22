import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { totalPrice, startDate, endDate, listingId } = body;

    if (!totalPrice || !startDate || !endDate || !listingId) {
        return NextResponse.error();
    }

    // Atraves do Id da lista , realizo a reserva
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}
