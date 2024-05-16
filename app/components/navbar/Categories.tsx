import { categories } from "@/app/utils/categories";
import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div
                className="
                pt-2 
                flex 
                flex-row 
                items-center 
                justify-between 
                overflow-x-auto
            "
            >
                {categories.map((item) => {
                    return (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            selected={category === item.title}
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export default Categories;
