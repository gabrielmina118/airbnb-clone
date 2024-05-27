import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListings from "../actions/getFavoritesListings";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
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

    return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default ListingPage;
