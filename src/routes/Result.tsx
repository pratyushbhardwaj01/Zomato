import { useLocation, useNavigate } from "react-router-dom";

const ResponseText = {
  success: "success",
  failure: "false",
};

const Texts = {
  successMsg: "Mission Successfull",
  failureMsg: "Mission Failed",
};

export const Result = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planetName = queryParams.get("planetName");
  const timeTaken = queryParams.get("timeTaken");
  const statusText = queryParams.get("statusText");
  const isSuccess = statusText === ResponseText.success;
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-240px)] flex flex-col items-center justify-center gap-[30px]">
      {isSuccess ? (
        <div className="flex flex-col gap-[30px]">
          <div className="text-white text-5xl text-center">
            {Texts.successMsg}
          </div>
          <div className="text-white text-5xl text-center">
            PlanetName: {planetName}
          </div>
        </div>
      ) : (
        <div>
          <div className="text-white text-5xl text-center">
            {Texts.failureMsg}!
          </div>
        </div>
      )}
      <div className="text-white text-5xl text-center">
        TimeTaken:{timeTaken}
      </div>{" "}
      <button
        onClick={() => navigate("/")}
        className="flex justify-center  bg-transparent hover:bg-blue-500  font-semibold text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Try Again
      </button>
    </div>
  );
};
