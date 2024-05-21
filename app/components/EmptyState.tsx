"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";
import { TbError404 } from "react-icons/tb";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "Não há nenhuma acomodação cadastrada para essa categoria",
    subtitle = "Altere ou remova seu filtro",
    showReset,
}) => {
    const router = useRouter();
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
            <TbError404 size={60} className="text-rose-600"/>
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
        </div>
    );
};

export default EmptyState;
