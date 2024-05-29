import { FaBath } from "react-icons/fa";
import { MdOutlineFamilyRestroom, MdBedroomParent } from "react-icons/md";
import Heading from "../Heading";
import Counter from "../inputs/Counter";

interface InfoStepProps {
    guestCoutn: any;
    roomCount: any;
    bathroomCount: any;
    setCustomValue: any;
}

const InfoStep: React.FC<InfoStepProps> = ({
    guestCoutn,
    roomCount,
    bathroomCount,
    setCustomValue,
}) => {
    return (
        <div className="flex flex-col gap-8">
            <Heading
                title="Vamos começar pelo básico."
                subtitle="Compartilhe algumas informações sobre o espaço?"
            />
            <Counter
                title="Hóspedes"
                subititle="Quantos hóspedes você pode receber confortavelmente na sua acomodação?"
                value={guestCoutn}
                onChangeCounter={(value) => setCustomValue("guestCoutn", value)}
                icon={MdOutlineFamilyRestroom}
            />
            <hr />
            <Counter
                title="Quartos"
                subititle="Quantos quartos possue sua acomodação?"
                value={roomCount}
                onChangeCounter={(value) => setCustomValue("roomCount", value)}
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
};

export default InfoStep;
