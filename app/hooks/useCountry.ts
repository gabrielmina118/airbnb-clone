// import countries from "world-countries";
import { allStates } from "brazilian-cities";

const fomattedCountries = allStates().map((country: any) => ({
    cod: country.cod,
    ibgeCod: country.ibgeCod,
    label: country.label,
}));

const useCountries = () => {
    const getAll = () => fomattedCountries;
    const getByValue = (value: string) => {
        return fomattedCountries.find((item) => item.label === value);
    };

    return {
        getAll,
        getByValue,
    };
};

export default useCountries;
