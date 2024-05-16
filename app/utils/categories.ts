import { IconType } from "react-icons";
import { GiWindmill, GiLighthouse, GiGooeyEyedSun, GiIsland, GiBoatFishing } from "react-icons/gi";
import { MdOutlineVilla, MdOutlinePool } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { FaFire, FaSkiing, FaTree } from "react-icons/fa";
import { BiSolidCastle } from "react-icons/bi";
import { LuGrape } from "react-icons/lu";
import { IoDiamond } from "react-icons/io5";

interface ICategories {
    label: string;
    title:string;
    icon: IconType;
    description: string;
}

export const categories: ICategories[] = [
    {
        label: "Praia",
        title: "praia",
        icon: TbBeach,
        description: "Essa propriedade é perto da praia",
    },
    {
        label: "Campos",
        title: "campos",
        icon: GiWindmill,
        description: "Essa propriedade é no interior",
    },
    {
        label: "Em alta",
        title: "alta",
        icon: FaFire,
        description: "Propriedades em alta",
    },
    {
        label: "Moderno",
        title: "moderno",
        icon: MdOutlineVilla,
        description: "Essa propriedade é moderna",
    },

    {
        label: "Piscinas incriveis",
        title: "piscina",
        icon: MdOutlinePool,
        description: "Essa propriedade é uma piscina",
    },

    {
        label: "Pesca",
        title: "pesca",
        icon: GiBoatFishing,
        description: "Propriedades para pesca",
    },
    {
        label: "Tropical",
        title: "tropical",
        icon: FaTree,
        description: "Propriedades tropicais",
    },
    {
        label: "Castelo",
        title: "castelo",
        icon: BiSolidCastle,
        description: "Propriedades medievais",
    },
    {
        label: "Esporte radicais",
        title: "esportes",
        icon: FaSkiing,
        description: "Essa propriedade para esportes",
    },
    {
        label: "Vinhedos",
        title: "vinhedos",
        icon: LuGrape,
        description: "Propriedades perto de vinícolas",
    },
    {
        label: "Inusitadas",
        title: "inusitadas",
        icon: GiLighthouse,
        description: "Propriedades um tanto quanto diferentes",
    },
    {
        label: "Luxo",
        title: "luxo",
        icon: IoDiamond,
        description: "Propriedades um tanto quanto caras",
    },
    {
        label: "Reconecte com a natureza",
        title: "natureza",
        icon: GiGooeyEyedSun,
        description: "Propriedades para alinharem seu chakra",
    },
    {
        label: "Ilha deserta",
        title: "ilha",
        icon: GiIsland,
        description: "Propriedades se isolar",
    },
];
