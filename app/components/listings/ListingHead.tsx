"use client";

import useCountries from "@/app/hooks/useCountry";
import { User } from "@prisma/client";
import Heading from "../Heading";
import { useMemo } from "react";
import { allFlags } from "@/app/utils/allflags";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    id: string | undefined;
    title: string | undefined;
    imageSrc: string | undefined;
    locationValue: string | undefined;
    currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    id,
    title,
    imageSrc,
    locationValue,
    currentUser,
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue!);

    const flag = useMemo(() => {
        return allFlags.find(
            (item) => item.label.toLowerCase() === location?.label.toLowerCase()
        );
    }, [location?.label]);

    return (
        <>
            <div className="flex flex-row items-center">
                <Heading
                    title={title!}
                    subtitle={`${
                        location?.label
                    } , ${location?.cod.toUpperCase()}`}
                />
                <div className="size-10 ml-10">{flag?.imageFlag}</div>
            </div>
            <div
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                    "
            >
                <Image
                    alt="image"
                    src={imageSrc!}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id!} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
};

export default ListingHead;
