"use client";

import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId: string;
    currentUser?: any | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser,
}) => {
    const hasFavorite = false;

    const toggleFavorite = () => {};

    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                className="fill-white absolute -top-[2px] -right-[2px]"
                size={28}
            />
            <AiFillHeart
                size={24}
                className={`${
                    hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"
                }`}
            />
        </div>
    );
};

export default HeartButton;
