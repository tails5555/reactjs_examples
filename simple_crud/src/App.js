import React, { Component } from 'react';

import { Header1 } from './components/header';
import MusicList from './components/MusicList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <Header1 context="음악 목록" />
          <MusicList />
        </div>
      </div>
    );
  }
}

export default App;
