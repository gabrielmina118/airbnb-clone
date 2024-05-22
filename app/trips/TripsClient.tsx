"use client";

import { useRouter } from "next/navigation";
import { Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import EmptyReservation from "../components/EmptyReservation";

interface TripsClientProps {
    reservations: Reservation[];
    currentUser?: User;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser,
}) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState("");

    const onCancel = useCallback(
        (id: string) => {
            setDeleteId(id);
            axios
                .delete(`/api/reservations/${id}`)
                .then(() => {
                    toast.success("Reserva cancelada");
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

    if (reservations.length === 0) {
        return <EmptyReservation />;
    }
    return (
        <Container>
            <Heading
                title="Viagens"
                subtitle="Onde você já esteve e onde você irá!"
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
                {reservations.map((reservation) => {
                    return (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.Listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deleteId === reservation.id}
                            actionLabel="cancelar reserva"
                            currentUser={currentUser}
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export default TripsClient;
