import 'reflect-metadata';

const labelKeyMetadataKey = Symbol('label-name');
const inputTypeMetadataKey = Symbol('inputData');

export interface InputData {
  type:
    | 'text'
    | 'number'
    | 'date'
    | 'password'
    | 'email'
    | 'textarea'
    | 'select'
    | 'radio';
  required?: boolean;
  pattern?: string | undefined;
  min?: number | string | undefined;
  max?: number | string | undefined;
  minLength?: number;
  maxLength?: number;
}

export abstract class MetaModel {
  static getProperties(target: any) {
    return Object.getOwnPropertyNames(target.prototype).filter(
      prop => prop !== 'constructor'
    );
  }

  static labelKey(value: string) {
    return Reflect.metadata(labelKeyMetadataKey, value);
  }

  static getLabelKey(prototype: any, propertyKey: string) {
    return Reflect.getMetadata(
      labelKeyMetadataKey,
      prototype,
      '_' + propertyKey
    );
  }

  static inputData(value: InputData) {
    return Reflect.metadata(inputTypeMetadataKey, value);
  }

  static getInputData(prototype: any, propertyKey: string) {
    return Reflect.getMetadata(
      inputTypeMetadataKey,
      prototype,
      '_' + propertyKey
    );
  }
}
