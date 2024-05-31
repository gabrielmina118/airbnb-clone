import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";
import { Suspense } from "react";
const Reservations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Esta página não esta autorizada"
                subtitle="Você nao esta logado!"
                showLogin
            />
        );
    }
    const reservations = await getReservations({
        authorId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="Não há reservas encontradas"
                subtitle="Parece que ninguem reservou seu airbnb"
            />
        );
    }

    return (
        <Suspense>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </Suspense>
    );
};

export default Reservations;
