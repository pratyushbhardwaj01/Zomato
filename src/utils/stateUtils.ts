import {
  SelectedDataType,
  PlanetInfoType,
  VehiclesInfoType,
} from "../routes/Home/types";

function updateState(
  state: SelectedDataType[],
  index: number,
  value: {
    planet?: PlanetInfoType;
    vehicle?: VehiclesInfoType;
  }
) {
  const copy = [...state];
  copy[index] = value;
  return copy;
}

function updateStatePlanet(
  state: SelectedDataType[],
  index: number,
  planet: PlanetInfoType
) {
  return updateState(state, index, { ...state[index], planet });
}

function updateStateVehicle(
  state: SelectedDataType[],
  index: number,
  vehicle: VehiclesInfoType
) {
  return updateState(state, index, { ...state[index], vehicle });
}

export { updateStatePlanet, updateStateVehicle };
