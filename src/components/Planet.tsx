interface PlanetProps {
  image?: string;
  onClick: () => void;
  name: string;
}
const Planet: React.FC<PlanetProps> = ({ image, name, onClick }) => {
  return (
    <div className="">
      <div
        className="aspect-square w-full rounded-[50%] bg-gray-500 mx-auto flex items-center justify-center"
        onClick={onClick}
      >
        {image ? (
          <img className="object-cover animate-spin-slow" src={image} />
        ) : (
          <p className="text-white text-sm lg:text-2xl ">Select Planet</p>
        )}
      </div>
      {image && (
        <p className="text-center text-white text-sm lg:text-2xl">{name}</p>
      )}
    </div>
  );
};

export default Planet;
