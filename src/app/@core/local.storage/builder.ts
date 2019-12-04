/**
 * The Inteface for query Builder
 */
interface IBuilder {
  select(default_value: any): any;

  exists(scheme?: string): boolean;

  set(data: any): void;

  drop(scheme?: string): void;

  where(key: string, value: any, condition: string): Builder;

  unshift(data: any): void;

  clear(): void;

  whereIn(key: string, values: any[]): Builder;

  find(value: any, key: string): Builder;

  first(): any;

  limit(value: number): Builder;

  offset(value: number): Builder;

  update(values: [{ key: string, value: string }] | { key: string, value: string } | any): void;

  delete(): void;

  get(): any[];
}

/**
 * The Builder class, compose a query of predicates
 */
export class Builder implements IBuilder {
  private static _builder: Builder = null;
  static prefix = 'bienes_';
  private _wheres: { key?: string, value?: any, condition?: string }[] = [];
  private _scheme: string;
  private _items = [];

  /**
   * Query builder
   *
   * @param {string} scheme
   * @returns {Builder}
   */
  static query(scheme?: string): Builder {
    if (!this._builder)
      this._builder = new Builder;
    this.init(scheme);
    return this._builder;
  }

  /**
   * Initialize the shcem DB
   *
   * @param {string} scheme
   */
  static init(scheme: string) {
    this._builder._scheme = scheme;
    this._builder._wheres = [];
  }

  /**
   * Rather a raw scheme
   *
   * @param default_value
   * @returns {any}
   */
  select(default_value: any = []): any {
    if (this.exists())
      return JSON.parse(localStorage[_(this._scheme)]);
    return default_value;
  }

  /**
   * Check if the scheme exists
   *
   * @param {string} scheme
   * @returns {boolean}
   */
  exists(scheme?: string): boolean {
    return !!localStorage[_(scheme || this._scheme)];
  }

  /**
   * Set raw data scheme
   *
   * @param data
   */
  set(data: any): void {
    localStorage[_(this._scheme)] = JSON.stringify(data);
  }

  /**
   * Drop a scheme
   *
   * @param {string} scheme
   */
  drop(scheme?: string): void {
    localStorage.removeItem(_(scheme || this._scheme));
  }

  /**
   * Push wheres conditions to be resolve later
   *
   * @param {string} key
   * @param value
   * @param {string} condition
   * @returns {this}
   */
  where(key: string, value: any, condition: string = '='): Builder {
    this._wheres.push({key, value, condition});
    return this;
  }

  /**
   * Unshift the data in the scheme
   * @param data
   */
  unshift(data: any): void {
    if (!this.exists())
      this.set(data);
    else {
      const values = this.select();
      values.unshift(data);
      this.set(values);
    }
  }

  /**
   * Remove all DB local
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   *  Add whereIn codition like sql language
   *
   * @param {string} key
   * @param {any[]} values
   * @returns {this}
   */
  whereIn(key: string, values: any[]): Builder {
    this._wheres.push({key, value: values, condition: 'in'});
    return this;
  }

  /**
   * Find data according to given key
   *
   * @param value
   * @param {string} key
   * @returns {this}
   */
  find(value: any, key: string = 'id'): Builder {
    return this.where(key, value);
  }

  /**
   * Get the firts obect
   *
   * @returns {any}
   */
  first(): any {
    return (this.get() || [null])[0];
  }

  /**
   * Limits the array items
   *
   * @param {number} value
   * @returns {this}
   */
  limit(value: number): Builder {
    this._items.slice(0, value);
    return this;
  }

  /**
   * Offsets the array
   *
   * @param {number} value
   * @returns {this}
   */
  offset(value: number): Builder {
    this._items.slice(value);
    return this;
  }

  /**
   * Update a scheme
   *
   * @param values
   */
  update(values: [{ key: string, value: string }] | { key: string, value: string } | any): void {
    this._fillItems();
    const indexes = this._getIndexesWheres();

    if (Array.isArray(values))
      values = [values];
    this._items.forEach((item, index) => {
      if (indexes.indexOf(index) !== -1) {
        values.forEach(value => {
          item[value.key] = value.value;
        });
      }
    });

    this.set(this._items);
  }

  /**
   * Delete a record from a scheme
   */
  delete(): void {
    this._fillItems();
    this._applyInversedWheres();
    this.set(this._items);
  }

  /**
   * Build the query and gets the records
   *
   * @returns {any[]}
   */
  get(): any[] {
    this._fillItems();
    this._applyWheres();
    return this._items;
  }

  /**
   * Fills items
   *
   * @private
   */
  private _fillItems(): void {
    this._items = this.select();
  }

  /**
   * Apply wheres conditions
   *
   */
  private _applyWheres(): void {
    this._wheres.forEach(where => {
      switch (where.condition) {
        case '=':
          this._items = this._items.filter(item => item[where.key] == where.value);
          break;
        case '>':
          this._items = this._items.filter(item => item[where.key] > where.value);
          break;
        case '>=':
          this._items = this._items.filter(item => item[where.key] >= where.value);
          break;
        case '<':
          this._items = this._items.filter(item => item[where.key] < where.value);
          break;
        case '<=':
          this._items = this._items.filter(item => item[where.key] <= where.value);
          break;
        case 'in':
          this._items = this._items.filter(item => where.value.indexOf(item[where.key]) !== -1);
          break;
        case '!=':
        case '<>':
          this._items = this._items.filter(item => item[where.key] != where.value);
          break;
      }
    });
  }

  /**
   *
   * @returns {any[]}
   * @private
   */
  private _getIndexesWheres(): any[] {
    const indexes = [];
    this._wheres.forEach(where => {
      switch (where.condition) {
        case '=':
          indexes.push(this._items.findIndex(item => item[where.key] == where.value));
          break;
        case '>':
          indexes.push(this._items.findIndex(item => item[where.key] > where.value));
          break;
        case '>=':
          indexes.push(this._items.findIndex(item => item[where.key] >= where.value));
          break;
        case '<':
          indexes.push(this._items.findIndex(item => item[where.key] < where.value));
          break;
        case '<=':
          indexes.push(this._items.findIndex(item => item[where.key] <= where.value));
          break;
        case 'in':
          this._items = this._items.filter(item => where.value.indexOf(item[where.key]) !== -1);
          break;
        case '!=':
        case '<>':
          indexes.push(this._items.findIndex(item => item[where.key] != where.value));
          break;
      }
    });

    return indexes;
  }

  /**
   * Insert data into an scheme
   *
   * @param data
   */
  insert(data: any): void {
    if (!this.exists()) {
      if (!Array.isArray(data))
        data = [data];
      this.set(data);
    } else {
      const values = this.select();
      this.set(values.concat(data));
    }
  }

  /**
   * Apply inverse wheres
   *
   * @private
   */
  private _applyInversedWheres(): void {
    this._wheres.forEach(where => {
      switch (where.condition) {
        case '=':
          this._items = this._items.filter(item => item[where.key] != where.value);
          break;
        case '>':
          this._items = this._items.filter(item => item[where.key] < where.value);
          break;
        case '>=':
          this._items = this._items.filter(item => item[where.key] <= where.value);
          break;
        case '<':
          this._items = this._items.filter(item => item[where.key] > where.value);
          break;
        case '<=':
          this._items = this._items.filter(item => item[where.key] >= where.value);
          break;
        case 'in':
          this._items = this._items.filter(item => where.value.indexOf(item[where.key]) == -1);
          break;
        case '!=':
        case '<>':
          this._items = this._items.filter(item => item[where.key] == where.value);
          break;
      }
    });
  }
}

function _(key) {
  return `${Builder.prefix}${key}`;
}
