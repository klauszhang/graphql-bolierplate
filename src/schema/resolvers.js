module.exports = {
  Query: {
    allProducts: async (root, data, context) => {
      return [
        {
          id: '1',
          name: 'hello'
        }
      ];
    }
  }
};
