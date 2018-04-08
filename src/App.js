import React, { Component } from 'react';

import Fetch from './Fetch';
import Layout from './Layout';

class FetchLocations extends Component {
  state = {
    lastCursor: null,
    loadMore: false,
  };

  render = () => <div>
    <Fetch
      query={`
        query AllLocationsQuery($first: Int!, $lastCursor: String) {
          allLocations(
            first: $first
            after: $lastCursor
            options: { locationType: airport }
          ) {
            edges {
              cursor
              node {
                locationId
                name
                city {
                  name
                }
              }
            }
          }
        }
      `}
      variables={{
        first: 10,
        lastCursor: this.props.lastCursor || null,
      }}
    >
      {data => (
        <React.Fragment>
          {data.allLocations.edges.map(({ cursor, node: { name, locationId, city } }) => {
            this.lastCursor = cursor;
            return <div key={cursor}>{name} ({city.name})</div>;
          })}

          {this.state.loadMore ? (
            <FetchLocations lastCursor={this.state.lastCursor}/>
          ) : (
            <button onClick={() => {
              this.setState({
                lastCursor: this.lastCursor,
                loadMore: true,
              });
            }}>Load more!</button>
          )}
        </React.Fragment>
      )}
    </Fetch>
  </div>;
}

export default class App extends Component {
  render = () => (
    <Layout>
      <FetchLocations/>
    </Layout>
  );
}
