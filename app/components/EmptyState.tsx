"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import useLoginModal from "../hooks/useLoginModal";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    showLogin?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "Não há nenhuma acomodação cadastrada para essa categoria",
    subtitle = "Altere ou remova seu filtro",
    showReset,
    showLogin,
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    return (
        <div
            className="
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
        "
        >
            <Heading center title={title} subtitle={subtitle} />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Remova todos os filtros"
                        onClick={() => router.push("/")}
                    />
                )}
            </div>
            <div className="w-48 mt-4">
                {showLogin && (
                    <Button
                        outline
                        label="Realize o login"
                        onClick={() => loginModal.onOpen()}
                    />
                )}
            </div>
        </div>
    );
};

export default EmptyState;
