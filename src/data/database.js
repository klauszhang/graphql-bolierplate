const products = [];
const users = [];
let lastProductId = 0;
let lastUserId = 0;

class Product {
  constructor(name) {
    this.name = name;
  }
  id = lastProductId;
  name;
  isActive = true;
}

class User {
  constructor(name) {
    this.name = name;
  }
  addProductId = (id) => {
    this.productIds = [
      ...new Set(this.productIds).add(id)
    ];
  };
  id = lastUserId;
  name;
  productIds = [];
}

function getProducts(isActive = true) {
  return products.filter((p) => p.isActive === isActive);
}

function getProductById(id) {
  return products.find((d) => d.id === parseInt(id));
}

function addProduct(product) {
  lastProductId++;
  const newProduct = new Product(product.name);
  products.push(newProduct);
  return newProduct;
}

function getUserById(id) {
  return users.find((u) => u.id === parseInt(id));
}

function getUsers() {
  return users;
}

function addUser(user) {
  lastUserId++;
  const newUser = new User(user.name);
  users.push(newUser);
  return newUser;
}

const product = addProduct({ name: 'hello' });
const worldUser = addUser({ name: 'world' });
worldUser.addProductId(product.id);

export {
  Product,
  User,
  getProductById,
  getProducts,
  addProduct,
  getUserById,
  getUsers
};
