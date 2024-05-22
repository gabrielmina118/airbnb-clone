"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import Image from "next/image";
import { PiHandPeaceBold } from "react-icons/pi";

const EmptyReservation = () => {
    const router = useRouter();
    return (
        <div
            className="
                h-[60vh] 
                flex 
                flex-row
                md:flex-row 
                gap-2 
                w-4/5
                justify-center 
                items-center
                bg-white
                shadow-md
                rounded-lg
                mx-auto
            "
        >
            <div
                className="
                w-full 
                md:w-[60%] 
                flex 
                flex-col 
                justify-center 
                items-start 
                space-y-2 
                p-4
                rounded-lg 
                mb-4 
                md:mb-0
            "
            >
                <PiHandPeaceBold size={30} className="text-rose-500 mb-2" />
                <p className="text-gray-800">
                    Não há reservas programadas ainda
                </p>
                <p className="text-gray-600">
                    Hora de tirar o pó das malas e começar a planejar a próxima
                    aventura.
                </p>
                <Button
                    label="Começe a buscar"
                    onClick={() => router.push("/")}
                />
            </div>
            <div className="w-full md:w-[70%] h-64 md:h-full flex items-center justify-center md:block hidden">
                <div className="relative w-full h-full ">
                    <Image
                        src="/images/viagem.jpg"
                        alt="viagem"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg bg-blend-lighten border-[1px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default EmptyReservation;
