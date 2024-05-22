"use client";

import useCountries from "@/app/hooks/useCountry";
import { User } from "@prisma/client";
import { IconType } from "react-icons";
import Avartar from "../Avatar";
import ListingCategory from "./ListingCategory";
import ListingServices from "./ListingServices";

interface ListingInfoProps {
    user: User | null;
    category:
        | {
              icon: IconType;
              label: string;
              title: string;
              description: string;
          }
        | undefined;
    description: string | undefined;
    roomCount: number | undefined;
    guestCoutn: number | undefined;
    bathroomCount: number | undefined;
    locationValue: string | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    roomCount,
    guestCoutn,
    bathroomCount,
    locationValue,
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue!);
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                    text-xl
                    font-semibold
                    flex
                    flex-row
                    items-center
                    gap-2
                "
                >
                    <Avartar currentUser={user} />
                    <div>Anfitriã(o): {user?.name}</div>
                </div>
                <div className="flex flex-row md:w-full lg:w-full items-center gap-4 font-light text-neutral-500">
                    <div className="border-r border-black ">
                        <p className="mr-2">
                            {guestCoutn +
                                `${guestCoutn! > 1 ? " Hóspedes" : " Hóspede"}`}
                        </p>
                    </div>
                    <div className="border-r border-black">
                        <p className="mr-2">
                            {roomCount +
                                `${roomCount! > 1 ? " Quartos" : " Quarto"}`}
                        </p>
                    </div>
                    <div>
                        <p className="mr-2">
                            {" "}
                            {bathroomCount +
                                `${
                                    bathroomCount! > 1
                                        ? " Banheiros"
                                        : " Banheiro"
                                }`}
                        </p>
                    </div>
                </div>
                <hr />
            </div>
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <ListingServices />
        </div>
    );
};

export default ListingInfo;
