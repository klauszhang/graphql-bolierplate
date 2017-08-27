module.exports = {
  Query: {
    allProducts: async (root, data, { user }) => {
      return [
        {
          id: '1',
          name: `hello ${user.username}`
        }
      ];
    }
  }
};
