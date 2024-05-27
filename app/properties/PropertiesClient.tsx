"use client";

import { useRouter } from "next/navigation";
import { Listing, Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import EmptyReservation from "../components/EmptyReservation";

interface PropertiesClientProps {
    listings: Listing[];
    currentUser?: User;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser,
}) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState("");

    

    const onCancel = useCallback(
        (id: string) => {
            setDeleteId(id);
            axios
                .delete(`/api/listings/${id}`)
                .then(() => {
                    toast.success("propriedade deletada");
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.error);
                })
                .finally(() => {
                    setDeleteId("");
                });
        },
        [router]
    );

    if (listings.length === 0) {
        return <EmptyReservation />;
    }
    return (
        <Container>
            <Heading
                title="Propriedades"
                subtitle="Todas as suas propriedades"
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
                {listings.map((list) => {
                    return (
                        <ListingCard
                            key={list.id}
                            data={list}
                            actionId={list.id}
                            onAction={onCancel}
                            disabled={deleteId === list.id}
                            actionLabel="deletar propriedade"
                            currentUser={currentUser}
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export default PropertiesClient;
