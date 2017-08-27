const initialData = [
  {
    id: 1,
    name: 'cat1',
    description: 'the first category',
    productIds: [1, 2, 3, 4]
  }
];

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
  }
}

module.exports = CategoryStore;
