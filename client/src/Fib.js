import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
    error: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
    this.refreshInterval = setInterval(() => this.fetchValues(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/api/values', {
        index: this.state.index,
      });

      this.setState({ index: '', error: '' });
      await this.fetchIndexes();
      await this.fetchValues();
    } catch (err) {
      let error =
        err.response && err.response.data
          ? err.response.data
          : 'Unable to submit index';
      if (typeof error === 'string' && error.trim().startsWith('<')) {
        error = 'Unable to reach API server';
      }
      this.setState({ error });
    }
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
        {this.state.error && <div>{this.state.error}</div>}

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
