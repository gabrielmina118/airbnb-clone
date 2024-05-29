import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IListingParams {
    userId?: string;
    guestCoutn?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    category?: string;
    locationValue?: string;
}

export default async function getListings(params: IListingParams) {
    try {
        const {
            userId,
            bathroomCount,
            guestCoutn,
            roomCount,
            category,
            endDate,
            startDate,
            locationValue,
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category.toLowerCase();
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount,
            };
        }
        if (guestCoutn) {
            query.guestCoutn = {
                gte: +guestCoutn,
            };
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount,
            };
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                endDate: { gte: endDate },
                                startDate: { lte: endDate },
                            },
                        ],
                    },
                },
            };
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc",
            },
        });
        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}
