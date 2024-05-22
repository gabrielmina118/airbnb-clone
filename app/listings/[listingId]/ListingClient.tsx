"use client";
import axios from "axios";
import { Range } from "react-date-range";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Listing, Reservation, User } from "@prisma/client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

import { categories } from "@/app/utils/categories";
import useLoginModal from "@/app/hooks/useLoginModal";

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import toast from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";

interface ListingClientProps {
    reservations?: Reservation[];
    listing?: Listing & { user: User };
    currentUser?: User | null;
}

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

const ListingClient: React.FC<ListingClientProps> = ({
    currentUser,
    reservations = [],
    listing,
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disableDate = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });
            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing?.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [countDays, setCountDays] = useState(0);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios
            .post("/api/reservations", {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id,
            })
            .then(() => {
                toast.success("Reservado com sucesso");
                setDateRange(initialDateRange);
                // redirect to trips
                router.push('/trips');
            })
            .catch(() => {
                toast.error("Algo deu errado");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [
        currentUser,
        dateRange.endDate,
        dateRange.startDate,
        listing?.id,
        loginModal,
        router,
        totalPrice,
    ]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            setCountDays(
                differenceInCalendarDays(dateRange.endDate, dateRange.startDate)
            );

            console.log("countDays", countDays);

            if (countDays && listing?.price) {
                setTotalPrice(countDays * listing?.price);
            } else {
                setTotalPrice(listing?.price);
            }
        }
    }, [countDays, dateRange, listing?.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing?.category);
    }, [listing?.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        id={listing?.id}
                        title={listing?.title}
                        imageSrc={listing?.imageSrc}
                        locationValue={listing?.locationValue}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing?.user}
                            category={category}
                            description={listing?.description}
                            roomCount={listing?.roomCount}
                            guestCoutn={listing?.guestCoutn}
                            bathroomCount={listing?.bathroomCount}
                            locationValue={listing?.locationValue}
                        />
                        <div
                            className="
                            order-first
                            mb-10
                            md:order-last
                            md:col-span-3
                        "
                        >
                            <ListingReservation
                                price={listing?.price!}
                                totalPrice={totalPrice!}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disable={isLoading}
                                disableDates={disableDate}
                                countDays={countDays}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;
