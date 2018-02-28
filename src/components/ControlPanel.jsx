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
    console.log(this.props);
    this.state = {

    }
  }



  clickHandler = (layerID) => {
    console.log(layerID);
  }



  render() {
      return (
        <Control position="topright">
          <div style={divStyle}>
            <h1>Layers</h1>
            {!this.props.dataset ? (
              <h1>spinner</h1>
            ) : (
              this.props.dataset.map((set) =>
              <button onClick={() => this.clickHandler(set.name)}
              style={buttonStyle} key={set.name}>
                {set.name}
              </button>
              )
            )}
          </div>
        </Control>
      );


  }
}
