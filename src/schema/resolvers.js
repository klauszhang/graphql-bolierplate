module.exports = {
  Query: {
    allProducts: async (root, data, { productStore }) => {
      const { first, after } = data.page;
      return productStore.findAll(first, after);
    },
    ProductById: async (_, { id }, { productStore }) => {
      return productStore.findById(id);
    },
    ProductBySku: async (_, { sku }, { productStore }) => {
      return productStore.findBySku(sku);
    }
  }
};
