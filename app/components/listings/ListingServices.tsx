import { servicesAirbnb } from "@/app/utils/services";

const ListingServices = () => {
    return (
        <div>
            <p className="text-lg font-semibold">Oque o lugar oferece</p>
            <div
                className=" 
                    grid    
                    grid-cols-2                   
                    gap-8
                    "
            >
                {servicesAirbnb.map((service) => {
                    const Icon = service.icon;
                    return (
                        <div
                            key={service.label}
                            className="flex items-center"
                        >
                            <Icon size={40} className="mr-2" />
                            <p>{service.label}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListingServices;
