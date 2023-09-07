import Planet from "../../src/assets/planet.svg";
import Planet1 from "../../src/assets/mars.png";
import Planet2 from "../../src/assets/jupiter.png";
import Planet3 from "../../src/assets/mercury.png";
import Planet4 from "../../src/assets/uranus.png";
import Planet5 from "../../src/assets/venus.png";
import Rocket1 from ".././assets/rocket.png";
import Rocket2 from ".././assets/ship.png";
import Rocket3 from ".././assets/shuttle.png";
import Rocket4 from ".././assets/pod.png";

const planetImages = [Planet, Planet1, Planet2, Planet3, Planet4, Planet5];
const vehicleImages = [Rocket1, Rocket2, Rocket3, Rocket4];

async function fetchPlanets() {
  try {
    const response = await fetch("https://findfalcone.geektrust.com/planets");
    const data = await response.json();
    return data.map((info, ind) => {
      return {
        ...info,
        img: planetImages[ind],
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function fetchVehicles() {
  try {
    const response = await fetch("https://findfalcone.geektrust.com/vehicles");
    const data = await response.json();
    return data.map((info, ind) => {
      return {
        name: info.name,
        totalNo: info.total_no,
        maxDistance: info.max_distance,
        speed: info.speed,
        img: vehicleImages[ind],
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function fetchToken() {
  try {
    const response = await fetch("https://findfalcone.geektrust.com/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });
    const { token } = await response.json();
    return token;
  } catch (err) {
    console.error("err", err);
    return null;
  }
}

async function findFalcone(
  planetsNames: (string | undefined)[],
  vehicleNames: (string | undefined)[]
): Promise<{
  planetName?: string;
  status: "success" | "false" | "failure";
}> {
  const token = await fetchToken();
  const response = await fetch("https://findfalcone.geektrust.com/find", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      token,
      planet_names: planetsNames,
      vehicle_names: vehicleNames,
    }),
  });
  const data = await response.json();
  return {
    planetName: data?.planet_name,
    status: data?.status,
  };
}

export {
  fetchPlanets,
  fetchVehicles,
  findFalcone,
  planetImages,
  vehicleImages,
};
