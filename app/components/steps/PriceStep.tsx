import Heading from "../Heading";
import Input from "../inputs/Input";

interface PriceStepProps {
    isLoading: any;
    register: any;
    errors: any;
}

const PriceStep: React.FC<PriceStepProps> = ({
    isLoading,
    register,
    errors,
}) => {
    return (
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
};

export default PriceStep;
