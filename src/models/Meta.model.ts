import 'reflect-metadata';

const labelKeyMetadataKey = Symbol('label-name');

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
}
