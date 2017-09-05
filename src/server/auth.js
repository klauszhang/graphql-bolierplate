const HEADER_REGEX = /bearer token-(.*)\|(.*)$/;

async function authenticate(
  { headers: { authorization } },
  getUser
) {
  const username =
    authorization &&
    HEADER_REGEX.exec(authorization)[1];
  const password =
    authorization &&
    HEADER_REGEX.exec(authorization)[2];

  return (
    username &&
    password &&
    (await getUser({ name: username, password }))
  );
}
export { authenticate };
