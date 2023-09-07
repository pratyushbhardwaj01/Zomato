interface VehicleProps {
  image?: string;
  onClick: () => void;
}
const Vehicle: React.FC<VehicleProps> = ({ image, onClick }) => {
  return (
    <div
      className="w-[120px] h-[120px] md:h-52 md:w-52 rounded-[50%] bg-gray-500 flex justify-center items-center mx-auto"
      onClick={onClick}
    >
      {image ? (
        <img className="object-cover" src={image} />
      ) : (
        <p className="text-white text-sm lg:text-2xl ">Select Planet</p>
      )}
    </div>
  );
};

export default Vehicle;
