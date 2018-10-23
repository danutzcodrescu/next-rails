import axios from "axios";
import { Car } from "models/Car.model";


export interface CarJSONUpdate {
  
    id: string;
  
    model: string;
  
    mileage: string;
  
  [key: string]: any;
}

export class CarsService {
  static url = "";

  static async getCars(ssr: boolean = false) {
    const resp = await axios.get(`${CarService.url}`);
    if (ssr) {
      return resp.data;
    }
    return resp.data.map(CarService.toCar);
  }

  static async getCar(id: string, ssr: boolean = false) {
    const resp = await axios.get(`${ CarService.url}/${id}`);
    if (ssr) {
      return resp.data;
    }
    return CarService.to Car(resp.data);
  }

  static async updateCar(car: Car) {
  const { data } = await axios.put<CarJSONUpdate>(
    `${CarsService.url}/${car.id}`,
      car.flatten()
  );
  return data;
}

  static async newCar(car: Car) {
  const { data } = await axios.post<CarJSONUpdate>(
    `${CarsService.url}`,
      car.flatten()
    );
    return data;
  }

    static toCar(car: CarJSON) {
    return new Car(
      
        car.id,
      
        car.model,
      
        car.mileage,
      
    );
  }
}
