/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import ShowRocket from "../../components/ShowRocket";
import Vehicle from "../../components/Planet";
import {
  fetchPlanets,
  findFalcone as findFalconeAPI,
  fetchVehicles,
} from "../../utils/apiUtils";
import {
  AvailablePlanetInfoType,
  AvailableVehicleInfoType,
  PlanetInfoType,
  SelectedDataType,
  VehiclesInfoType,
} from "./types";
import { updateStatePlanet, updateStateVehicle } from "../../utils/stateUtils";
import VehicleOptions from "../../components/VehicleOptions";

const Home = () => {
  const [planets, setPlanets] = useState<PlanetInfoType[]>([]);
  const [vehicles, setVehicles] = useState<VehiclesInfoType[]>([]);
  const [modal, setModal] = useState<"planet" | "vehicle" | null>(null);
  const [state, setState] = useState<SelectedDataType[]>(() =>
    Array(4).fill({})
  );
  const currentSelectedBox = useRef<null | number>(null);
  const navigate = useNavigate();

  const timeTaken = useMemo(() => {
    let time = 0;
    state.forEach(({ planet, vehicle }) => {
      if (planet && vehicle) {
        time += Math.floor(planet.distance / vehicle.speed);
      }
    });
    return time;
  }, [state]);

  useEffect(() => {
    fetchPlanets().then((planetsData) => setPlanets(planetsData));
    fetchVehicles().then((vehiclesData) => setVehicles(vehiclesData));
  }, []);

  const availablePlanets: AvailablePlanetInfoType[] = useMemo(() => {
    return planets.map((planet) => {
      const used = state.some((v) => v.planet?.name === planet.name);
      return {
        ...planet,
        selected: used,
      };
    });
  }, [planets, state]);

  const availableVchiles: AvailableVehicleInfoType[] | undefined =
    useMemo(() => {
      const index = currentSelectedBox.current;
      if (index === null) {
        return [];
      }
      console.log(index, "index");
      return vehicles.map((vehicle) => {
        let cnt = 0;
        state.forEach((s) => {
          if (vehicle.name === s.vehicle?.name) {
            cnt++;
          }
        });

        let isRechable = false;

        const distance = state[index].planet?.distance;

        if (state[index].planet && distance) {
          isRechable = !!(vehicle.maxDistance >= distance);
        }

        const isAvailable = cnt < vehicle.totalNo && isRechable;
        return {
          ...vehicle,
          available: isAvailable,
        };
      });
    }, [vehicles, state]);

  const getAvailablePlanets = availablePlanets.map((planetInfo) => {
    return (
      <div
        key={planetInfo.name}
        className=" flex flex-col justify-around text-center p-4 w-[120px] cursor-pointer "
        onClick={() => updatePlanet(planetInfo)}
      >
        <p
          className={`text-xl font-semibold text-white ${
            planetInfo.selected ? "opacity-25" : ""
          }`}
        >
          {planetInfo.name}
        </p>
        <img
          src={planetInfo.img}
          className={`object-contain ${
            planetInfo.selected ? "opacity-25" : ""
          }`}
        />
      </div>
    );
  });

  const openModal = (modal: "planet" | "vehicle", idx: number) => () => {
    setModal(modal);
    currentSelectedBox.current = idx;
  };

  function updatePlanet(currentPlanetInfo: AvailablePlanetInfoType) {
    const boxNo = currentSelectedBox.current;
    if (boxNo === null) {
      return;
    }
    setState(updateStatePlanet(state, boxNo, currentPlanetInfo));
    setModal(null);
  }

  function updateVehicle(vehicleInfo: AvailableVehicleInfoType) {
    const boxNo = currentSelectedBox.current;
    if (boxNo === null) {
      return;
    }

    setState(updateStateVehicle(state, boxNo, vehicleInfo));
    setModal(null);
  }

  async function findFalcone() {
    const planetsNames = state.map((info) => info.planet?.name);
    const vehicleNames = state.map((info) => info.vehicle?.name);

    const result = await findFalconeAPI(planetsNames, vehicleNames);
    navigate(
      `/result?planetName=${result.planetName}&statusText=${result.status}&timeTaken=${timeTaken}`
    );
  }

  const showBtn = state.every((item) => {
    return item.planet && item.vehicle;
  });

  return (
    <div className="   flex flex-col items-center h-[calc(100vh-240px)] justify-center gap-[40px] ">
      <p className="text-white text-lg lg:text-2xl text-center">
        Time Taken: {timeTaken}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8   overflow-scroll p-2">
        {state.map(({ planet, vehicle }, index) => {
          return (
            <div key={index} className="">
              <div className="bg-gray-600 p-3 md:p-10 flex flex-col gap-2 md:gap-10 rounded-lg ">
                <Vehicle
                  onClick={openModal("planet", index)}
                  image={planet?.img}
                />
                {planet && (
                  <ShowRocket
                    onClick={openModal("vehicle", index)}
                    image={vehicle?.img}
                    isSelected={!!vehicle}
                  />
                )}
              </div>
              <p className="lg:text-2xl text-center mt-2 bg-gray-200 rounded-sm text-black">
                Option {index + 1}
              </p>
            </div>
          );
        })}
      </div>

      {modal !== null && (
        <Modal onClose={() => setModal(null)}>
          {modal === "planet" ? (
            getAvailablePlanets
          ) : (
            <VehicleOptions
              options={availableVchiles}
              onSelect={updateVehicle}
            />
          )}
        </Modal>
      )}

      {showBtn && (
        <div className="w-full flex justify-center">
          <button
            onClick={findFalcone}
            className="flex justify-center w-[250px]  bg-transparent hover:bg-blue-500  font-semibold text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Find Falcone
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
