import React, { Component } from 'react';
import MapHeader from './components/MapHeader';
import LeafletMap from './components/LeafletMap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <MapHeader />
        <LeafletMap />
      </div>
    );
  }
}

if (module.hot) {
  module.hot.accept();
}

export default App;
