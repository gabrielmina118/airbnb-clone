"use client";

import { Listing, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
    listings: Listing[] | null;
    currentUser?: User | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser,
}) => {
    return (
        <Container>
            <Heading
                title="favorites"
                subtitle="Lista de lugares do seus favoritos"
            />
            <div
                className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            "
            >
                {listings?.map((list) => {
                    return (
                        <ListingCard
                            key={list.id}
                            data={list}
                            currentUser={currentUser}
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export default FavoritesClient;
