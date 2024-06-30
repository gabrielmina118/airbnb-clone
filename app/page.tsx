"use client";
export const dynamic = "force-dynamic";
import { Suspense, useEffect, useState } from "react";
import { Listing, User } from "@prisma/client";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import axios from "axios";

const Home = () => {
    const [user, setUser] = useState<any | undefined>();
    const [listing, setListing] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Buscando usuario e espaços no geral")
                const currentUser = await axios.get("/api/user");
                const listings = await axios.get("/api/listings");
                console.log("currentUser", currentUser);
                console.log("listings", listings);

                setListing(listings.data);
                setUser(currentUser.data);
            } catch (error) {}
        };
        fetchData();
    }, []);

    if (!listing) {
        return <EmptyState showReset />;
    }

    return (
        <Suspense>
            <Container>
                <div
                    className="
                    pt-24
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
                    {listing.map((listing: any) => {
                        return (
                            <ListingCard
                                currentUser={user}
                                key={listing.id}
                                data={listing}
                            />
                        );
                    })}
                </div>
            </Container>
        </Suspense>
    );
};

export default Home;
