"use client";

import { User } from "@prisma/client";

interface AvatarProps {
    currentUser?: User | null;
}

const Avartar:React.FC<AvatarProps> = ({currentUser}) => {
     const imageUrl =
         currentUser && currentUser.image
             ? currentUser.image
             : "/images/avatar.png";
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            className="rounded-full h-10 w-10"
            alt="avatar"
            src={imageUrl}
        />
    );
};

export default Avartar;
