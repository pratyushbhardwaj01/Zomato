import { AvailablePlanetInfoType } from "../routes/Home/types";

interface PlanetOptionsType {
  options: AvailablePlanetInfoType[];
  onSelect: (value: AvailablePlanetInfoType) => void;
}

const PlanetOptions: React.FC<PlanetOptionsType> = ({ options, onSelect }) => {
  return (
    <>
      {options.map((option) => {
        return (
          <div
            key={option.name}
            className=" flex flex-col justify-around text-center p-4 w-[120px] cursor-pointer "
            onClick={() => onSelect(option)}
          >
            <p
              className={`text-xl font-semibold text-white ${
                option.selected ? "opacity-25" : ""
              }`}
            >
              {option.name}
            </p>
            <img
              src={option.img}
              className={`object-contain ${
                option.selected ? "opacity-25" : ""
              }`}
            />
          </div>
        );
      })}
    </>
  );
};

export default PlanetOptions;
