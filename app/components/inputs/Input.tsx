"use client";

import { SetStateAction, useCallback, useState } from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { LuEye, LuEyeOff } from "react-icons/lu";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    showPassword?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    erros: FieldErrors;
    togglePassword?: () => void;
    passwordField?: boolean;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    showPassword,
    togglePassword,
    passwordField,
    formatPrice,
    required,
    register,
    erros,
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="text-neutral-700 absolute top-5 left-2"
                />
            )}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={showPassword && type === "password" ? "password" : "text"}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice ? "pl-9" : "pl-4"}
                    ${erros[id] ? "border-rose-500" : "border-neutral-300"}
                    ${
                        erros[id]
                            ? "focus:border-rose-500"
                            : "focus:border-black"
                    }
                `}
            />
            <label
                className={`
                    absolute 
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    ${formatPrice ? "left-9" : "left-4"}
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${erros[id] ? "text-rose-500" : "text-zinc-400"}
                `}
            >
                {label}
            </label>
            {passwordField && (
                <div onClick={togglePassword} className="cursor-pointer">
                    {showPassword ? (
                        <LuEyeOff
                            size={24}
                            className="text-neutral-700 absolute top-5 right-2"
                        />
                    ) : (
                        <LuEye
                            size={24}
                            className="text-neutral-700 absolute top-5 right-2"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Input;
