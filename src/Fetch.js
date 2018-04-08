import React from 'react';

export default class Fetch extends React.Component {
  state = {
    data: null,
    dots: '',
  };

  componentDidMount = async () => {
    this.timerID = setInterval(() => this.tick(), 100);

    const response = await fetch('https://graphql.kiwi.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: this.props.query,
        variables: this.props.variables,
      }),
    });

    const responseJSON = await response.json();
    this.setState({
      data: responseJSON.data,
    });
  };

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  };

  tick = () => {
    this.setState(prevState => ({
      dots: prevState.dots.length === 3 ? '' : prevState.dots + '.',
    }));
  };

  render = () => {
    if (!this.state.data) {
      return <em>Loading{this.state.dots}</em>;
    }
    return this.props.children(this.state.data);
  };
}
