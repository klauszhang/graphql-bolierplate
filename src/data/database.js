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
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
  addProductId = (id) => {
    this.productIds = [
      ...new Set(this.productIds).add(id)
    ];
  };
  removeProductById = (id) => {
    const idx = this.productIds.findIndex(
      (item) => item === id
    );
    if (idx !== -1) {
      this.productIds.splice(idx, 1);
    }
    return id;
  };
  id = lastUserId;
  password = '';
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
  const theUser = users.find(
    (u) => u.id === parseInt(product.userId)
  );
  if (theUser) {
    theUser.addProductId(newProduct.id);
  }

  return newProduct;
}

function updateProduct(productId, updatedProduct) {
  const idx = products.findIndex(
    (p) => p.id === parseInt(productId)
  );
  if (idx !== -1) {
    const oldProduct = products[idx];
    const newProduct = new Product();
    newProduct.id = parseInt(productId);
    newProduct.name = updatedProduct.name
      ? updatedProduct.name
      : oldProduct.name;
    newProduct.isActive = updatedProduct.isActive
      ? updatedProduct.isActive
      : oldProduct.isActive;
    products[idx] = newProduct;
    return newProduct;
  }
}

function removeProductById(productId, userId) {
  const idx = products.findIndex(
    (p) => p.id === parseInt(productId)
  );
  if (idx !== -1) {
    // get user
    const user = getUserById(parseInt(userId));
    user.removeProductById(parseInt(productId));
    console.log(user);
    const removed = getProductById(productId);
    products.splice(idx, 1);
    return removed;
  }
}

function getUser({ name, password }) {
  return users.find((u) => {
    return u.name === name && u.password === password;
  });
}
function getUserById(id) {
  return users.find((u) => u.id === id);
}

function getUsers() {
  return users;
}

function addUser(user) {
  lastUserId++;
  const newUser = new User(user.name, user.password);
  users.push(newUser);
  return newUser;
}

const product = addProduct({ name: 'hello' });
const worldUser = addUser({
  name: 'hao',
  password: 'secret'
});
worldUser.addProductId(product.id);

export {
  Product,
  User,
  getProductById,
  getProducts,
  addProduct,
  removeProductById,
  updateProduct,
  getUser,
  getUsers,
  getUserById
};
