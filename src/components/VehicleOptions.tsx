import { AvailableVehicleInfoType } from "../routes/Home/types";

interface VehicleOptionsProps {
  options: AvailableVehicleInfoType[];
  onSelect: (value: AvailableVehicleInfoType) => void;
}

const VehicleOptions = ({ options, onSelect }: VehicleOptionsProps) => {
  return (
    <>
      {options?.map((vehicleInfo) => {
        return (
          <div
            key={vehicleInfo.name}
            className=" flex flex-col justify-around text-left p-[10px] min-w-[150px] cursor-pointer "
            onClick={() => onSelect(vehicleInfo)}
          >
            <p
              className={`text-xl font-semibold text-white ${
                vehicleInfo.available ? "" : "opacity-25"
              }`}
            >
              {vehicleInfo.name}
            </p>
            <img
              src={vehicleInfo.img}
              className={`w-[100px] h-[100px] ${
                vehicleInfo.available ? "" : "opacity-25"
              }`}
            />
          </div>
        );
      })}
    </>
  );
};

export default VehicleOptions;
