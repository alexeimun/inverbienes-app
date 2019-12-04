import { Builder } from './builder';

export class Storage extends Builder {

  static get(scheme: string, default_value: any = null) {
    return this.query(scheme).select(default_value);
  }

  static exists(scheme: string) {
    return this.query(scheme).exists();
  }

  static set(scheme: string, data: any) {
    this.query(scheme).set(data);
  }

  static remove(scheme: string) {
    this.query(scheme).drop();
  }

  /**
   *  Simple rotation with max 5 elements queue by deafault
   *
   * @param {string} key
   * @param item
   * @param {number} queue
   */
  static rotate(key: string, item: any, queue: number = 5) {
    const items: any[] = this.get(key, []);
    items.unshift(item);
    this.set(key, items.slice(0, queue));
  }

  /**
   * Rotate a item depending on if field value doesnt exist
   *
   * @param {string} key
   * @param item
   * @param {string} field
   * @param {number} queue
   */
  static smartRotate(key: string, item: any, field: string = 'id', queue: number = 5) {
    const items: any[] = this.get(key, []);
    const exists = items.some(value => value[field] === item[field]);
    if (!exists) {
      items.unshift(item);
      this.set(key, items.slice(0, queue));
    }
  }

  /**
   * Find a item inside of an array, based on field, value condition
   *
   * @param {string} key
   * @param {string} field
   * @param value
   * @returns {}
   */
  static findByValue(key: string, field: string, value: any) {
    const items: any[] = this.get(key, []);
    return items.find(i => i[field] == value);
  }

  static clear() {
    return this.query().clear();
  }

  static push(scheme: string, data: any) {
    return this.query(scheme).insert(data);
  }

  static splice(scheme: string, index: number) {
    const values = this.get(scheme, []);
    values.splice(index, 1);
    this.set(scheme, values);
  }

  static unshift(scheme: string, data: any) {
    return this.query(scheme).unshift(data);
  }

}

