import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
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

    const listings = await getListings({ userId: currentUser.id });

    if (!listings) {
        <EmptyState
            title="Nenhuma propriedade encontrada"
            subtitle="Você não tem nenhuma propriedade"
        />;
    }

    return <PropertiesClient listings={listings} currentUser={currentUser} />;
};
export default PropertiesPage;
