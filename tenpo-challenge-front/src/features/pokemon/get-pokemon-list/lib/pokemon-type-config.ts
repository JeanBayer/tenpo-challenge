import bugIcon from "@/assets/icons/pokemon-types/bug.svg";
import darkIcon from "@/assets/icons/pokemon-types/dark.svg";
import dragonIcon from "@/assets/icons/pokemon-types/dragon.svg";
import electricIcon from "@/assets/icons/pokemon-types/electric.svg";
import fairyIcon from "@/assets/icons/pokemon-types/fairy.svg";
import fightingIcon from "@/assets/icons/pokemon-types/fighting.svg";
import fireIcon from "@/assets/icons/pokemon-types/fire.svg";
import flyingIcon from "@/assets/icons/pokemon-types/flying.svg";
import ghostIcon from "@/assets/icons/pokemon-types/ghost.svg";
import grassIcon from "@/assets/icons/pokemon-types/grass.svg";
import groundIcon from "@/assets/icons/pokemon-types/ground.svg";
import iceIcon from "@/assets/icons/pokemon-types/ice.svg";
import normalIcon from "@/assets/icons/pokemon-types/normal.svg";
import poisonIcon from "@/assets/icons/pokemon-types/poison.svg";
import psychicIcon from "@/assets/icons/pokemon-types/psychic.svg";
import rockIcon from "@/assets/icons/pokemon-types/rock.svg";
import steelIcon from "@/assets/icons/pokemon-types/steel.svg";
import waterIcon from "@/assets/icons/pokemon-types/water.svg";

export const POKEMON_TYPE_CONFIG: Record<
  string,
  { color: string; icon: string }
> = {
  grass: {
    color: "#9bcc50",
    icon: grassIcon,
  },
  fire: {
    color: "#fd7d24",
    icon: fireIcon,
  },
  water: {
    color: "#4592c4",
    icon: waterIcon,
  },
  bug: {
    color: "#729f3f",
    icon: bugIcon,
  },
  normal: {
    color: "#a4acaf",
    icon: normalIcon,
  },
  poison: {
    color: "#b97fc9",
    icon: poisonIcon,
  },
  electric: {
    color: "#eed535",
    icon: electricIcon,
  },
  ground: {
    color: "#ab9842",
    icon: groundIcon,
  },
  fairy: {
    color: "#fdb9e9",
    icon: fairyIcon,
  },
  fighting: {
    color: "#d56723",
    icon: fightingIcon,
  },
  psychic: {
    color: "#f366b9",
    icon: psychicIcon,
  },
  rock: {
    color: "#a38c21",
    icon: rockIcon,
  },
  ghost: {
    color: "#7b62a3",
    icon: ghostIcon,
  },
  ice: {
    color: "#51c4e7",
    icon: iceIcon,
  },
  dragon: {
    color: "#f16e57",
    icon: dragonIcon,
  },
  dark: {
    color: "#707070",
    icon: darkIcon,
  },
  steel: {
    color: "#9eb7b8",
    icon: steelIcon,
  },
  flying: {
    color: "#3dc7ef",
    icon: flyingIcon,
  },
};

export const getTypeConfig = (type: string) => {
  return (
    POKEMON_TYPE_CONFIG[type.toLowerCase()] || {
      color: "#a4acaf",
      icon: normalIcon,
    }
  );
};
