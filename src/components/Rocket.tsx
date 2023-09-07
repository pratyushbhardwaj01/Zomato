interface RocketProps {
  image?: string;
  onClick: () => void;
  isSelected: boolean;
}
const Rocket: React.FC<RocketProps> = ({ image, onClick, isSelected }) => {
  return (
    <div
      className="w-full aspect-square p-4 rounded-lg bg-gray-500 flex  mx-auto justify-center items-center"
      onClick={onClick}
    >
      {isSelected ? (
        <img
          src={image}
          className="object-contain h-full animate-bounce duration-500 "
        />
      ) : (
        <p className="text-white lg:text-2xl text-center">Select Vehicle</p>
      )}
    </div>
  );
};

export default Rocket;
