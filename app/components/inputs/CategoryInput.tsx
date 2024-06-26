"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
    onClick: (value: string) => void;
    selected?: boolean;
    label: string;
    icon: IconType;
}
const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    onClick,
    selected,
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
                rounded-xl 
                border-2
                p-4
                flex
                gap-3
                hover:border-black
                transition
                cursor-pointer
                ${selected ? "border-black" : "border-x-neutral-200"}
            `}
        >
            <Icon size={30} />
            <div className="font-semibold">{label}</div>
        </div>
    );
};

export default CategoryInput;
