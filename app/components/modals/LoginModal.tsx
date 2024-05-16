"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { sign } from "crypto";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    const togglePassword = useCallback(() => {
        setShowPassword((current) => !current);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: { email: "", password: "" },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("Login realizado com sucesso");
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Bem vindo ao Airbnb"
                subtitle="Realize o login com a sua conta!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                erros={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                erros={errors}
                passwordField={true}
                showPassword={showPassword}
                togglePassword={togglePassword}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Google Login"
                icon={FcGoogle}
                onClick={() =>
                    signIn("google")
                }
            />
            <Button
                outline
                label="Github Login"
                icon={AiFillGithub}
                onClick={() =>
                    signIn("github")
                }
            />
            {/* <Button
                outline
                label="Facebook Login"
                icon={FaFacebook}
                onClick={() =>
                    signIn("facebook")
                }
            /> */}
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>Já tem uma conta?</div>
                    <div
                        onClick={loginModal.onClose}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Login"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
