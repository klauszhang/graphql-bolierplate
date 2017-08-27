const MIN_PRODUCT_PER_CATEGORY = 1;
const MAX_PRODUCT_PER_CATEGORY = 20;
const MIN_CATEGORY_PER_PRODUCT = 1;
const MAX_CATEGORY_PER_PRODUCT = 5;

const category = require('./category.json').slice(0, 5);
const product = require('./products.json').slice(0, 20);

const catLen = category.length;
const prodLen = product.length;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.categories = category.map((cat) => {
  const count = getRandomInt(
    MIN_PRODUCT_PER_CATEGORY,
    MAX_PRODUCT_PER_CATEGORY
  );

  cat.productIds = Array(count).fill().map(() => {
    return getRandomInt(1, prodLen);
  });
  return cat;
});

module.exports.products = product.map((prod) => {
  const count = getRandomInt(
    MIN_CATEGORY_PER_PRODUCT,
    MAX_CATEGORY_PER_PRODUCT
  );

  prod.categoryIds = Array(count).fill().map(() => {
    return getRandomInt(1, catLen);
  });
  return prod;
});
