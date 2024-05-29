"use client";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { Range } from "react-date-range";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Calendar";
import Counter from "../inputs/Counter";
import { MdBedroomParent, MdOutlineFamilyRestroom } from "react-icons/md";
import { FaBath } from "react-icons/fa";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCoutn, setGuestCoutn] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step != STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.label,
            guestCoutn,
            roomCount,
            bathroomCount,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.startDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl(
            { url: "/", query: updatedQuery },
            { skipNull: true }
        );

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [
        bathroomCount,
        dateRange.endDate,
        dateRange.startDate,
        guestCoutn,
        location?.label,
        onNext,
        params,
        roomCount,
        router,
        searchModal,
        step,
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "search";
        }
        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;
        }
        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Onde fica a localização?"
                subtitle="Nos ajude a encontrar!"
            />
            <CountrySelect
                value={location}
                onChangeCountry={(value) => setLocation(value)}
            />
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Quando você deseja ir?"
                    subtitle="Tenha certeza que o lugar esteja vago!"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Mais informações"
                    subtitle="Encontre o lugar perfeito?"
                />
                <Counter
                    title="Hóspedes"
                    subititle="Quantos hóspedes você pode receber confortavelmente na sua acomodação?"
                    value={guestCoutn}
                    onChangeCounter={(value) => setGuestCoutn(value)}
                    icon={MdOutlineFamilyRestroom}
                />
                <hr />
                <Counter
                    title="Quartos"
                    subititle="Quantos quartos possue sua acomodação?"
                    value={roomCount}
                    onChangeCounter={(value) => setRoomCount(value)}
                    icon={MdBedroomParent}
                />
                <hr />
                <Counter
                    title="Banheiros"
                    subititle="Quantos banheiros possue sua acomodação?"
                    value={bathroomCount}
                    onChangeCounter={(value) => setBathroomCount(value)}
                    icon={FaBath}
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filtros"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
};

export default SearchModal;
