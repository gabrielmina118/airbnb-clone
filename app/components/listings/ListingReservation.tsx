"use client";
import { Range } from "react-date-range";
import Calendar from "../Calendar";
import Button from "../Button";
interface listingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disable?: boolean;
    disableDates: Date[];
    countDays: number;
}

const ListingReservation: React.FC<listingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disable,
    disableDates,
    countDays,
}) => {
    const rateClean = 120;
    const rateAibn = 200;
    return (
        <div
            className="
          bg-white
            rounded-xl
            border-[1px]
          border-neutral-200
            overflow-hidden
    "
        >
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    {price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </div>
                <div className="font-light text-neutral-600">Noite</div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disableDates={disableDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button
                    label="Reservar"
                    onClick={onSubmit}
                    disabled={disable}
                />
            </div>
            <div
                className="
            p-4
            flex 
            flex-row
            items-center
            justify-between
            text-lg
            "
            >
                <p className="hover:underline cursor-pointer">
                    {price.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                    x {countDays} noites
                </p>
                <p>
                    {totalPrice.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            </div>
            <div
                className="
            p-4
            flex 
            flex-row
            items-center
            justify-between
            text-lg
            "
            >
                <p className="hover:underline cursor-pointer">
                    Taxa de limpeza
                </p>
                <p>
                    {rateClean.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            </div>
            <div
                className="
            p-4
            flex 
            flex-row
            items-center
            justify-between
            text-lg
            "
            >
                <p className="hover:underline cursor-pointer">
                    Taxa de serviço do airbnb
                </p>
                <p>
                    {rateAibn.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </p>
            </div>
            <hr />
            <div
                className="
            p-4
            flex 
            flex-row
            items-center
            justify-between
            font-bold
            text-lg
            "
            >
                <div>Total</div>
                <div>
                    {(totalPrice + 120 + 200).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </div>
            </div>
        </div>
    );
};

export default ListingReservation;
