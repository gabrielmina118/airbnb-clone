import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { User } from "@prisma/client";

interface IUserFavorite {
    listingId: string;
    currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser?.favoriteIds, listingId]);

    const toggleFavorite = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
            // Se você tem um evento de clique em um elemento filho e não quer que o elemento pai também trate esse clique, usa e.stopPropagation().
            e.stopPropagation();

            if (!currentUser) {
                return loginModal.onOpen();
            }
            try {
                let request;
                if (hasFavorite) {
                    request = () => axios.delete(`/api/favorites/${listingId}`);
                } else {
                    request = () => axios.post(`/api/favorites/${listingId}`);
                }

                await request();
                router.refresh();
                toast.success("Sucesso!");
            } catch (error) {
                toast.error("Algo deu errado!");
            }
        },
        [currentUser, hasFavorite, listingId, loginModal, router]
    );

    return {
        hasFavorite,
        toggleFavorite,
    };
};

export default useFavorite;
