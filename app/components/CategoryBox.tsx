"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    title: string;
    description: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    description,
    icon: Icon,
    label,
    title,
    selected,
}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updateQuery: any = {
            ...currentQuery,
            category: title,
        };

        // Realizar o toggle , caso o usuário ja tenha clicado na categoria
        if (params?.get("category") === title) {
            delete updateQuery.category;
        }

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updateQuery,
            },
            { skipNull: true }
        );

        router.push(url);
    }, [title, params, router]);

    return (
        <div
            onClick={handleClick}
            className={`
            flex 
            flex-col 
            items-center 
            justify-center
            gap-3
            p-2
            mx-7
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? "border-b-neutral-800" : "border-transparent"}
            ${selected ? "text-neutral-800" : "text-neutral-500"}
            `}
        >
            <Icon size={30} />
            <div className="font-medium text-sm text-center">{label}</div>
        </div>
    );
};

export default CategoryBox;
