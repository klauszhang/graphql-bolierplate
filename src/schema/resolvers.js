module.exports = {
  Query: {
    allProducts: async (root, { page }, { productStore }) => {
      const { first, after } = page;
      return productStore.findAll(first, after);
    },
    productById: async (_, { id }, { productStore }) => {
      return productStore.findById(id);
    },
    productBySku: async (_, { sku }, { productStore }) => {
      return productStore.findBySku(sku);
    },
    allCategories: async (_, data, { categoryStore }) => {
      return categoryStore.getAll();
    }
  },
  Mutation: {
    createProduct: async (root, { product }, { productStore }) => {
      return productStore.insert(product);
    }
  },
  Category: {
    products: async (root, data, { productStore }) => {
      const { productIds } = root;
      return productIds.map((id) => productStore.findById(id));
    }
  },
  Product: {
    categories: async (root, _, { categoryStore }) => {
      const { categoryIds } = root;
      return categoryIds.map((id) => categoryStore.findById(id));
    }
  }
};
