import { MetaModel } from "./Meta.model";

export class Car {

  
    
      private _id: string;
    
    
      @MetaModel.labelKey("manufacture")
      private _manufacture: string;
      
    
      @MetaModel.labelKey("mileage")
      private _mileage: string;
      
    
      @MetaModel.labelKey("brand")
      private _brand: string;
      

  [prop: string]: any;

constructor(  id: string,   manufacture: string,   mileage: string,   brand: string ) {
    
      this._id= id;
      
      this._manufacture= manufacture;
      
      this._mileage= mileage;
      
      this._brand= brand;
      
  }

  
    
      get id() {
        return this._id;
      }
    
    
      get manufacture() {
        return this._manufacture;
      }
      set manufacture(manufacture: string) {
        this._manufacture= manufacture;
      }
  
    
      get mileage() {
        return this._mileage;
      }
      set mileage(mileage: string) {
        this._mileage= mileage;
      }
  
    
      get brand() {
        return this._brand;
      }
      set brand(brand: string) {
        this._brand= brand;
      }
  
}
