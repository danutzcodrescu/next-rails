import axios from "axios";
import { Car } from "models/Car.model";


export interface CarJSON {
  
    id: string;
  
    manufacture: string;
  
    mileage: string;
  
    brand: string;
  
  [key: string]: any;
}

export class CarsService {
  static url = "";

  static async getCars(ssr: boolean = false) {
    const resp = await axios.get(`${CarsService.url}`);
    if (ssr) {
      return resp.data;
    }
    return resp.data.map(CarsService.toCar);
  }

  static async getCar(id: string, ssr: boolean = false) {
    const resp = await axios.get(`${ CarsService.url}/${id}`);
    if (ssr) {
      return resp.data;
    }
    return CarsService.toCar(resp.data);
  }

  static async updateCar(car: Car) {
  const { data } = await axios.put<CarJSON>(
    `${CarsService.url}/${car.id}`,
      car.flatten()
  );
  return data;
}

  static async newCar(car: Car) {
  const { data } = await axios.post<CarJSON>(
    `${CarsService.url}`,
      car.flatten()
    );
    return data;
  }

    static toCar(car: CarJSON) {
    return new Car(
      
          
            car.id,
      
          
            car.manufacture,
      
          
            car.mileage,
      
          
            car.brand
          
    );
  }
}
