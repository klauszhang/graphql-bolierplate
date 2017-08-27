const HEADER_REGEX = /bearer token-(.*)\|(.*)$/;

async function authenticate({ headers: { authorization } }, Users) {
  const username = authorization && HEADER_REGEX.exec(authorization)[1];
  const password = authorization && HEADER_REGEX.exec(authorization)[2];
  return username && password && (await Users.findOne({ username, password }));
}
module.exports.authenticate = authenticate;
