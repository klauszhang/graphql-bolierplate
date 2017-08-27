const { categories: initialData } = require('./mock');

class CategoryStore {
  constructor() {
    this._data = initialData;
    this.getAll = ({ first, after } = { first: 10, after: 1 }) => {
      // get index of after
      const afterIndex = this._data.findIndex((d) => d.id === after);
      if (afterIndex !== -1) {
        return this._data.slice(afterIndex, afterIndex + first);
      }
    };
    this.findById = (id) => {
      return this._data.find((entry) => entry.id === id);
    };
  }
}

module.exports = CategoryStore;
