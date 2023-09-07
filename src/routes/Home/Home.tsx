/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
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
import Planet from "../../components/Planet";
import Rocket from "../../components/Rocket";
import PlanetOptions from "../../components/PlanetOptions";

const stateDefaultValue = Array(4).fill({});

const Home = () => {
  const [planets, setPlanets] = useState<PlanetInfoType[]>([]);
  const [vehicles, setVehicles] = useState<VehiclesInfoType[]>([]);
  const [modal, setModal] = useState<"planet" | "vehicle" | null>(null);
  const [state, setState] = useState<SelectedDataType[]>(
    () => stateDefaultValue
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

  const openModal = (modal: "planet" | "vehicle", idx: number) => () => {
    setModal(modal);
    currentSelectedBox.current = idx;
  };

  function updatePlanet(currentPlanetInfo: AvailablePlanetInfoType) {
    const boxNo = currentSelectedBox.current;
    if (boxNo === null || currentPlanetInfo.selected) {
      return;
    }
    setState(updateStatePlanet(state, boxNo, currentPlanetInfo));
    setModal(null);
  }

  function updateVehicle(vehicleInfo: AvailableVehicleInfoType) {
    const boxNo = currentSelectedBox.current;
    if (boxNo === null || !vehicleInfo.available) {
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

  function handleReset() {
    setModal(null);
    setState(stateDefaultValue);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[40px] w-full">
      <p className="text-white text-lg lg:text-2xl text-center">
        Time Taken: {timeTaken}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-2 w-full max-w-7xl">
        {state.map(({ planet, vehicle }, index) => {
          return (
            <div key={index} className="">
              <div className="bg-gray-600 p-4 md:p-6 flex flex-col gap-4 md:gap-10 rounded-lg">
                <Planet
                  onClick={openModal("planet", index)}
                  image={planet?.img}
                  name={planet?.name || ""}
                />
                {planet && (
                  <Rocket
                    onClick={openModal("vehicle", index)}
                    image={vehicle?.img}
                    isSelected={!!vehicle}
                  />
                )}
              </div>
              <div className="flex justify-center">
                <p className="lg:text-xl text-center mt-2 bg-gray-200 rounded-sm text-black w-fit px-2 text-sm">
                  Option {index + 1}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {modal !== null && (
        <Modal onClose={() => setModal(null)}>
          {modal === "planet" ? (
            <PlanetOptions options={availablePlanets} onSelect={updatePlanet} />
          ) : (
            <VehicleOptions
              options={availableVchiles}
              onSelect={updateVehicle}
            />
          )}
        </Modal>
      )}
      <div className="flex items-center gap-4 md:min-w-[400px]">
        <button
          onClick={handleReset}
          className="flex justify-center flex-1 bg-transparent hover:bg-blue-500  font-semibold text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Reset
        </button>

        {showBtn && (
          <button
            onClick={findFalcone}
            className="flex justify-center flex-1 whitespace-nowrap bg-transparent hover:bg-blue-500  font-semibold text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Find Falcone
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
