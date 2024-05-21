'use client'
import { useMemo } from "react";
import { categories } from "@/app/utils/categories";
import { Listing, Reservation, User } from "@prisma/client";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";

interface ListingClientProps {
    reservations?: Reservation;
    listing?: Listing & { user: User };
    currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    currentUser,
    listing,
    reservations,
}) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing?.category);
    }, [listing?.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        id={listing?.id}
                        title={listing?.title}
                        imageSrc={listing?.imageSrc}
                        locationValue={listing?.locationValue}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;
