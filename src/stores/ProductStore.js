/**
 * dummy store for demo purpose
 */
const { products: initialData } = require('./mock');

class ProductStore {
  constructor() {
    this._data = initialData;

    this._lastId = this._data.sort((prev, next) => prev.id - next.id)[
      this._data.length - 1
    ].id;

    this.findById = (id) => {
      const result = this._data.find((entry) => entry.id === id);
      return result;
    };

    this.findAll = (first = 10, after = 1) => {
      // get index of after
      const afterIndex = this._data.findIndex((d) => d.id === after);
      if (afterIndex !== -1) {
        return this._data.slice(afterIndex, afterIndex + first);
      }
    };
    this.findBySku = (sku) => {
      return this._data.find((entry) => entry.sku === sku);
    };

    this.insert = (product) => {
      this._lastId++;
      product.id = this._lastId;
      this._data.push(product);
      return product;
    };
  }
}

module.exports = ProductStore;
