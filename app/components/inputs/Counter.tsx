"use client";

import { useCallback } from "react";
import { IconType } from "react-icons";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string;
    subititle: string;
    value: number;
    icon: IconType;
    onChangeCounter: (value: number) => void;
}
const Counter: React.FC<CounterProps> = ({
    title,
    subititle,
    value,
    onChangeCounter,
    icon: Icon,
}) => {
    const onAdd = useCallback(() => {
        onChangeCounter(value + 1);
    }, [onChangeCounter, value]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }

        onChangeCounter(value - 1);
    }, [onChangeCounter, value]);

    return (
        <div
            className="
    flex
    flex-row
    items-center
    justify-between
    "
        >
            <div className="flex flex-col">
                <div className="font-medium flex items-center">
                    {title} <Icon className="ml-3" size={20} />
                </div>
                <div className="font-light text-gray-600">{subititle}</div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div
                    onClick={onReduce}
                    className="
                        w-10 
                        h-10 
                        rounded-full 
                        border-[1px]
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity-80
                        transition
                        "
                >
                    <AiOutlineMinus className="text-black" size={20} />
                </div>
                <div className="font-light text-xl text-neutral-600">
                    {value}
                </div>
                <div
                    onClick={onAdd}
                    className="
                        w-10 
                        h-10 
                        rounded-full 
                        border-[1px]
                        border-neutral-400
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity-80
                        transition
                        "
                >
                    <AiOutlinePlus className="text-black" size={20} />
                </div>
            </div>
        </div>
    );
};

export default Counter;
