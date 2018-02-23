import React, { Component } from 'react';
import Control from 'react-leaflet-control';


const divStyle = {
  width: '250px',
  height: 'auto',
  backgroundColor: 'rgba(255,255,255, 0.7)',
  textAlign: 'center',
  borderRadius: '8px',
  border: '1px solid black'
}

const buttonStyle = {
  border: 'none',
  background: 'none',
  display: 'inline-block',
  cursor: 'pointer',
  margin: '5px',
  textColor: 'rgba(0,0,0, 1.0)'
}

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
    if(!this.state.layers){
      fetch('http://localhost:5000/map-datasets')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({layers: data});
        console.log(this.state);
      })
    }
  }

  clickHandler = (layerID) => {
    const layer = this.state.layers.filter(layer =>
      layer.name === layerID
    );
    console.log(layer[0].name);
    this.props.layerHandler(layer[0].name, layer[0].url);
  }



  render() {
    if (!this.state.layers) {
      console.log(this.state);
      return null;
    } else {
      const layers = this.state.layers.map((layer) =>
        <button onClick={() => this.clickHandler(layer.name)}
        style={buttonStyle} key={layer.name}>
          {layer.name}
        </button>
      );
      return (
        <Control position="topright">
          <div style={divStyle}>
            <h1>Layers</h1>
            {layers}
          </div>
        </Control>
      );
    }

  }
}
