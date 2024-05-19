'use client'
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";

interface LocationStepProps {
    location: any;
    setCustomValue: any;
}

const LocationStep: React.FC<LocationStepProps> = ({
    location,
    setCustomValue,
}) => {
    return (
        <div className="flex flex-col gap-8">
            <Heading
                title="Onde fica a localização?"
                subtitle="Nos ajude a encontrar!"
            />
            <CountrySelect
                value={location}
                onChangeCountry={(value) => setCustomValue("location", value)}
            />
        </div>
    );
};

export default LocationStep;
