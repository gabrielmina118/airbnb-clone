import React from "react";
import Heading from "../Heading";
import Input from "../inputs/Input";

interface DescriptionStepProps {
    isLoading: any;
    register: any;
    errors: any;
}
const DescriptionStep: React.FC<DescriptionStepProps> = ({
    isLoading,
    register,
    errors,
}) => {
    return (
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
};

export default DescriptionStep;
