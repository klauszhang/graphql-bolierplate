const dataStore = {
  products: [
    {
      id: 1,
      name: 'hello'
    }
  ]
};

module.exports = {
  Query: {
    allProducts: async (root, data, context) => {
      return dataStore.products;
    }
  },
  Mutation: {
    createProduct: async (_, data, context) => {
      const lastId = dataStore.products[dataStore.products.length - 1].id;
      const newProduct = { id: lastId + 1, name: data.input.name };
      dataStore.products.push(newProduct);
      console.log(data);
      return newProduct;
    }
  }
};
