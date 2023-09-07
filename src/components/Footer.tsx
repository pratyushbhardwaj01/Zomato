import { vehicleImages } from "../utils/apiUtils";

const Footer = () => {
  return (
    <div className="bg-slate-700 text-xl h-[70px] p-[10px] text-stone-50 items-center  text-center flex  gap-[10px] lg:text-4xl  justify-around">
      {vehicleImages.map((vehicle) => {
        return <img src={vehicle} className="h-[50px] w-[50px]" />;
      })}
    </div>
  );
};

export default Footer;
