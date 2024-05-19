"use client";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";

import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";

import { categories } from "@/app/utils/categories";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";

import { FaBath } from "react-icons/fa";
import { MdOutlineFamilyRestroom, MdBedroomParent } from "react-icons/md";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModal();
    const router = useRouter();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCoutn: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: "",
        },
    });

    const category = watch("category");
    const location = watch("location");
    const guestCoutn = watch("guestCoutn");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onForward = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step != STEPS.PRICE) {
            return onForward();
        }

        setIsLoading(true);
        axios
            .post("/api/listings", data)
            .then(() => {
                toast.success("Espaço criado com sucesso!");
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch(() => {
                toast.error("Algo deu errado");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Cadastrar";
        }
        return "Proximo";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Voltar";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Qual das seguintes opções descreve melhor seu espaço?"
                subtitle="Escolha uma categoria"
            />
            <div
                className="
                    grid 
                    grid-cols-1 
                    md:grid-cols-2 
                    gap-2
                    max-h-[50vh]
                    overflow-y-auto
                    "
            >
                {categories.map((item) => {
                    return (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={(category) =>
                                    setCustomValue("category", category)
                                }
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Onde fica a localização?"
                    subtitle="Nos ajude a encontrar!"
                />
                <CountrySelect
                    value={location}
                    onChangeCountry={(value) =>
                        setCustomValue("location", value)
                    }
                />
            </div>
        );
    }

    if (step == STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Vamos começar pelo básico."
                    subtitle="Compartilhe algumas informações sobre a casa?"
                />
                <Counter
                    title="Hóspedes"
                    subititle="Quantos hóspedes você pode receber confortavelmente na sua acomodação?"
                    value={guestCoutn}
                    onChangeCounter={(value) =>
                        setCustomValue("guestCoutn", value)
                    }
                    icon={MdOutlineFamilyRestroom}
                />
                <hr />
                <Counter
                    title="Quartos"
                    subititle="Quantos quartos possue sua acomodação?"
                    value={roomCount}
                    onChangeCounter={(value) =>
                        setCustomValue("roomCount", value)
                    }
                    icon={MdBedroomParent}
                />
                <hr />
                <Counter
                    title="Banheiros"
                    subititle="Quantos banheiros possue sua acomodação?"
                    value={bathroomCount}
                    onChangeCounter={(value) =>
                        setCustomValue("bathroomCount", value)
                    }
                    icon={FaBath}
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Adicione uma foto do seu ambiente"
                    subtitle="Mostre aos hóspedes como seu lugar se parece!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChangeUpload={(value) =>
                        setCustomValue("imageSrc", value)
                    }
                />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Descreva o seu ambiente"
                    subtitle="descrições curtas e diretas funcionam melhor!"
                />
                <Input
                    id="title"
                    label="titulo"
                    disabled={isLoading}
                    register={register}
                    erros={errors}
                    required
                />
                <hr />
                <Input
                    id="descricao"
                    label="Descrição"
                    disabled={isLoading}
                    register={register}
                    erros={errors}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Insira o valor"
                    subtitle="Quanto você cobra por noite?"
                />
                <Input
                    id="price"
                    label="Preço"
                    formatPrice={true}
                    type="number"
                    disabled={isLoading}
                    register={register}
                    erros={errors}
                    required
                />
                <hr />
            </div>
        );
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="É muito fácil anunciar no Airbnb"
            body={bodyContent}
        />
    );
};

export default RentModal;
