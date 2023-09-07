interface ShowRocketProps {
  image?: string;
  onClick: () => void;
  isSelected: boolean;
}
const ShowRocket: React.FC<ShowRocketProps> = ({
  image,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className="w-full h-[80px] md:h-52 p-2 md:p-4 rounded-lg bg-gray-500 flex  mx-auto justify-center items-center"
      onClick={onClick}
    >
      {isSelected ? (
        <img
          src={image}
          className="rotate-90 md:rotate-0 object-contain h-full"
        />
      ) : (
        <p className="text-white lg:text-2xl text-center">Select Vehicle</p>
      )}
    </div>
  );
};

export default ShowRocket;
