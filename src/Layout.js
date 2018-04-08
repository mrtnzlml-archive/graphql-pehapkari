import React from 'react';
import logo from './logo.svg';
import './Layout.css';

export default class Fetch extends React.Component {
  render = () => <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h1 className="App-title">Hi Péhápkaři! <span role="img" aria-label="Waving hand emoji">👋</span>
      </h1>
    </header>

    <p className="App-intro">
      Let's try GraphQL! Go to check <code>src/App.js</code> file.
    </p>

    <div className="App-children">
      {React.Children.only(this.props.children)}
    </div>

  </div>;
}
