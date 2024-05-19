"use client";

import useCountries from "@/app/hooks/useCountry";
import Selected from "react-select";

export type CountrySelectValue = {
    cod: string;
    ibgeCod: number;
    label: string;
};

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChangeCountry: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    onChangeCountry,
    value,
}) => {
    const { getAll, getByValue } = useCountries();
    return (
        <div>
            <Selected
                placeholder="escolha a cidade"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) =>
                    onChangeCountry(value as CountrySelectValue)
                }
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>
                            {option.label},
                            <span className="text-neutral-800 ml-1">
                                {option.cod}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg",
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#ffe4e6",
                    },
                })}
            />
        </div>
    );
};

export default CountrySelect;
