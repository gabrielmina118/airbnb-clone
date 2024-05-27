"use client";

import { Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import getUserById from "../actions/getUserById";
import ListingHead from "../components/listings/ListingHead";
import ListingInfo from "../components/listings/ListingInfo";

interface TripsClientProps {
    reservations: Reservation[];
    currentUser?: User;
}
const ReservationsClient: React.FC<TripsClientProps> = ({
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
                .catch(() => {
                    toast.error("Algo deu errado");
                })
                .finally(() => {
                    setDeleteId("");
                });
        },
        [router]
    );

    console.log("reservations", reservations);

    return (
        <Container>
            <Heading
                title="Reservas"
                subtitle="Reservas em suas propriedades"
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
                        <>
                            <ListingCard
                                key={reservation.id}
                                data={reservation.Listing}
                                reservation={reservation}
                                actionId={reservation.id}
                                onAction={onCancel}
                                disabled={deleteId === reservation.id}
                                actionLabel="cancelar reserva do usuário"
                                currentUser={currentUser}
                            />
                        </>
                    );
                })}
            </div>
        </Container>
    );
};

export default ReservationsClient;
