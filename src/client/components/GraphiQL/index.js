/**
 * https://github.com/graphql/graphiql
 * this component is huge (4mb)! consider move it to a different app route when in production
 */

import React from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import 'graphiql/graphiql.css';
function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer token-hao|secret'
    },
    body: JSON.stringify(graphQLParams)
  }).then((response) => response.json());
}

export default class extends React.Component {
  displayName = 'GraphiQLContainer';
  render() {
    return (
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <style>
          {`
          /* what a hack....*/
         :root .graphiql-container {
            flex-grow: 1;
          }
          
`}
        </style>
        <GraphiQL fetcher={graphQLFetcher} />
      </div>
    );
  }
}
