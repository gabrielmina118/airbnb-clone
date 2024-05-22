import { IconType } from "react-icons";
import { FaKitchenSet, FaKey } from "react-icons/fa6";
import { FaCar, FaCity, FaWifi } from "react-icons/fa";
import { MdOutlinePets ,MdLocalLaundryService} from "react-icons/md";
import { GiFlowerPot } from "react-icons/gi";
import { PiTelevisionSimpleFill } from "react-icons/pi";

export interface IServices {
    label: string;
    icon: IconType;
}

export const servicesAirbnb: IServices[] = [
    { label: "Cozinha", icon: FaKitchenSet },
    { label: "Estacionamento incluso", icon: FaCar },
    { label: "Permitido Animais", icon: MdOutlinePets },
    { label: "Vista para cidade", icon: FaCity },
    { label: "Lavanderia", icon: MdLocalLaundryService },
    { label: "Vista para o pátio", icon: GiFlowerPot },
    { label: "Wifi", icon: FaWifi },
    { label: "Televisão", icon: PiTelevisionSimpleFill },
    { label: "Plantas no local", icon: GiFlowerPot },
    { label: "Self CheckIn", icon: FaKey },
];
