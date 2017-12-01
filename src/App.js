import React, { Component } from 'react';
import { GameBoard } from './components/GameBoard';
import { loadSounds } from './services/SoundManager';
import './App.css';

class App extends Component {

  componentWillMount() {
    loadSounds();
  }

  render() {
    return (
      <div className="App">
        <GameBoard />
      </div>
    )
  }
};

export default App;
