const products = [
  { id: 1, name: 'hello!', isActive: true },
  { id: 2, name: 'hello222!', isActive: true },
  { id: 3, name: 'hello333!', isActive: true }
];
const users = [
  { id: 1, name: 'world', productIds: [1] }
];

exports.Product = class {
  id;
  name;
};

exports.User = class {
  id;
  name;
  productIds;
};

exports.getProducts = function(isActive = true) {
  return products.filter(
    (p) => p.isActive === isActive
  );
};

exports.getProductById = function(id) {
  return products.find((d) => d.id === id);
};

exports.getUserById = function(id) {
  return users.find((u) => u.id === id);
};

exports.getUsers = function() {
  return users;
};
