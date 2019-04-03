import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { message: {} };
  }

  componentWillMount() {
    fetch('/api')
      .then(response => response.json())
      .then(data => this.setState({ message: data.message }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.message.length > 0 &&
            <pre><code>{this.state.message}</code></pre>
          }
        </header>
      </div>
    );
  }
}

export default App;
