import Heading from "../Heading";
import ImageUpload from "../inputs/ImageUpload";

interface ImageStepProps {
    imageSrc: any;
    setCustomValue: any;
}

const ImagesStep: React.FC<ImageStepProps> = ({ imageSrc, setCustomValue }) => {
    return (
        <div className="flex flex-col gap-8">
            <Heading
                title="Adicione uma foto do seu ambiente"
                subtitle="Mostre aos hóspedes como seu lugar se parece!"
            />
            <ImageUpload
                value={imageSrc}
                onChangeUpload={(value) => setCustomValue("imageSrc", value)}
            />
        </div>
    );
};

export default ImagesStep;
