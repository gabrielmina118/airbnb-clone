import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, authorId } = params;

        const query: any = {};

        // Reserva feita pela propriedade
        if (listingId) {
            query.listingId = listingId;
        }

        // Reserva quer o usuario tem
        if (userId) {
            query.userId = userId;
        }

        // Reserva feita pelo usuario na minha propriedade
        if (authorId) {
            query.listingId = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                Listing: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return reservations;
    } catch (error: any) {
        throw new Error(error);
    }
}
