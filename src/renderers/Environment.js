import {
  Environment,
  Network,
  RecordSource,
  Store
} from 'relay-runtime';
const store = new Store(new RecordSource());

const network = Network.create(
  (operation, variables) => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'bearer token-hao|secret'
      },
      body: JSON.stringify({
        query: operation.text,
        variables
      })
    }).then((response) => {
      return response.json();
    });
  }
);

const environment = new Environment({
  network,
  store
});

export default environment;
