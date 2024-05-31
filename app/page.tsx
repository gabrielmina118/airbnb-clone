'use client'
import { Suspense, useEffect, useState } from "react";
import { Listing } from "@prisma/client";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
interface HomeProps {
    searchParams: IListingParams;
}

const Home = ({ searchParams }: HomeProps) => {
    let [listings, setListings] = useState<Listing[]>([]);
    let [currentUser, setCurrentUser]= useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listingsData = await getListings(searchParams);
                const currentUserData = await getCurrentUser();
                setListings(listingsData as any);
                setCurrentUser(currentUserData as any);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [searchParams]);

    if (listings?.length === 0) {
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
                    {listings.map((listing: any) => {
                        return (
                            <ListingCard
                                key={listing.id}
                                currentUser={currentUser}
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
