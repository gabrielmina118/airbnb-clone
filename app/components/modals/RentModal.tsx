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
import CategoryStep from "../steps/CategoryStep";
import LocationStep from "../steps/LocationStep";
import InfoStep from "../steps/InfoStep";
import ImagesStep from "../steps/ImagesStep";
import DescriptionStep from "../steps/DescriptionStep";
import PriceStep from "../steps/PriceStep";

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
        console.log(data)
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

    const onChangeSteps = () =>{
        let bodyContent;

        switch (step) {
            case STEPS.LOCATION:
                bodyContent = (
                    <LocationStep
                        location={location}
                        setCustomValue={setCustomValue}
                    />
                );
                break;
            case STEPS.INFO:
                bodyContent = (
                    <InfoStep
                        bathroomCount={bathroomCount}
                        guestCoutn={guestCoutn} 
                        roomCount={roomCount}
                        setCustomValue={setCustomValue}
                    />
                );
                break;
            case STEPS.IMAGES:
                bodyContent = (
                    <ImagesStep
                        imageSrc={imageSrc}
                        setCustomValue={setCustomValue}
                    />
                );
                break;
            case STEPS.DESCRIPTION:
                bodyContent = (
                    <DescriptionStep
                        isLoading={isLoading}
                        register={register}
                        errors={errors}
                    />
                );
                break;
            case STEPS.PRICE:
                bodyContent = (
                    <PriceStep
                        isLoading={isLoading}
                        register={register}
                        errors={errors}
                    />
                );
                break;
            default:
                bodyContent = (
                    <CategoryStep
                        category={category}
                        setCustomValue={setCustomValue}
                    />
                );
                break;
        }

        return bodyContent;
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
            body={onChangeSteps()}
        />
    );
};

export default RentModal;
