"use client";
import { categories } from "@/app/utils/categories";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";

interface CategoryStepProps {
    category: any;
    setCustomValue: any;
}

const CategoryStep: React.FC<CategoryStepProps> = ({
    category,
    setCustomValue,
}) => {
    return (
        <div className="flex flex-col gap-8">
            <Heading
                title="Qual das seguintes opções descreve melhor seu espaço?"
                subtitle="Escolha uma categoria"
            />
            <div
                className="
                    grid 
                    grid-cols-1 
                    md:grid-cols-2 
                    gap-2
                    max-h-[50vh]
                    overflow-y-auto
                    "
            >
                {categories.map((item) => {
                    return (
                        <div key={item.title} className="col-span-1">
                            <CategoryInput
                                onClick={(category) =>
                                    setCustomValue("category", category)
                                }
                                selected={category === item.title}
                                label={item.title}
                                icon={item.icon}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryStep;
