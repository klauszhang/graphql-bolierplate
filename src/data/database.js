const products = [
  { id: 1, name: 'hello!', isActive: true },
  { id: 2, name: 'hello222!', isActive: true },
  { id: 3, name: 'hello333!', isActive: true }
];
const users = [
  { id: 1, name: 'world', productIds: [1] }
];

class Product {
  id;
  name;
}

class User {
  id;
  name;
  productIds;
}

function getProducts(isActive = true) {
  return products.filter((p) => p.isActive === isActive);
}

function getProductById(id) {
  return products.find((d) => d.id === id);
}

function getUserById(id) {
  return users.find((u) => u.id === id);
}

function getUsers() {
  return users;
}

export {
  Product,
  User,
  getProductById,
  getProducts,
  getUserById,
  getUsers
};
