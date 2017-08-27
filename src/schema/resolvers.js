module.exports = {
  Query: {
<<<<<<< HEAD
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
=======
    allProducts: async (root, data, { productStore }) => {
      const { first, after } = data.page;
      return productStore.findAll(first, after);
    },
    ProductById: async (_, { id }, { productStore }) => {
      return productStore.findById(id);
    },
    ProductBySku: async (_, { sku }, { productStore }) => {
      return productStore.findBySku(sku);
>>>>>>> 3.with-input
    }
  },
  Category: {
    products: async (root, data, { productStore }) => {}
  }
};
