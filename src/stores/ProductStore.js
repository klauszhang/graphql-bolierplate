/**
 * dummy store for demo purpose
 */
const data = require('./mock/products.json');

class ProductStore {
  constructor() {
    this._data = data;
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
  }
}

module.exports = ProductStore;
