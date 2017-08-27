module.exports = {
  Query: {
    allProducts: async (root, data, context) => {
      return [
        {
          id: '1',
          name: 'hello'
        }
      ];
    },
    allCategories: async (_, data, { categoryStore }) => {
      return categoryStore.getAll();
    }
  },
  Category: {
    products: async (root, data, { productStore }) => {}
  }
};
