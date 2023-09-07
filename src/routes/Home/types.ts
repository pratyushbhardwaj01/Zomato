export interface SelectedDataType {
  planet?: PlanetInfoType;
  vehicle?: VehiclesInfoType;
}

export interface PlanetInfoType {
  name: string;
  distance: number;
  img: string;
}

export interface VehiclesInfoType {
  name: string;
  totalNo: number;
  maxDistance: number;
  speed: number;
  img: string;
}

export interface AvailablePlanetInfoType extends PlanetInfoType {
  selected: boolean;
}

export interface AvailableVehicleInfoType extends VehiclesInfoType {
  available: boolean;
}
