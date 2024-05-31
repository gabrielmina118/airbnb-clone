import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListings from "../actions/getFavoritesListings";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";
import { Suspense } from "react";
const Favorites = async () => {
    const listings = await getFavoritesListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <EmptyState
                title="Nenhum airbnb encontrado"
                subtitle="Parece que você nao tem lista de favoritos"
            />
        );
    }

    return (
        <Suspense>
            <FavoritesClient listings={listings} currentUser={currentUser} />
        </Suspense>
    );
};

export default Favorites;
