import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
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

    const reservations = await getReservations({ userId: currentUser.id });

    if (!reservations) {
        <EmptyState
            title="Nenhuma reserva encontrada"
            subtitle="Você não realizou nenhuma reserva"
        />;
    }

    return (
        <TripsClient reservations={reservations} currentUser={currentUser} />
    );
};
export default TripsPage;
