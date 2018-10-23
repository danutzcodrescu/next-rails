import { MetaModel } from "./Meta.model";

export class Car {

  
    
      private _id: string;
    
    
      @MetaModel.labelKey("model")
      private _model: string;
      
    
      @MetaModel.labelKey("mileage")
      private _mileage: string;
      

  [prop: string]: any;

constructor( id: string, model: string, mileage: string,) {
    
      this._id= id;
      
      this._model= model;
      
      this._mileage= mileage;
      
  }

  
    
      get id() {
        return this._id;
      }
    
    
      get model() {
        return this._model;
      }
      set model(model: string) {
        this._model= model;
      }
  
    
      get mileage() {
        return this._mileage;
      }
      set mileage(mileage: string) {
        this._mileage= mileage;
      }
  
}
