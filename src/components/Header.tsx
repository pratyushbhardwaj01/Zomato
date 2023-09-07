import { planetImages } from "../utils/apiUtils";
const Header = () => {
  return (
    <div className="bg-slate-700 text-xl h-[70px] p-[10px] text-stone-50 items-center  text-center flex justify-between gap-[10px] lg:text-4xl">
      Finding Falcone!
      {planetImages.map((planet) => {
        return <img src={planet} className="w-[20px] h-[20px]" />;
      })}
    </div>
  );
};

export default Header;
