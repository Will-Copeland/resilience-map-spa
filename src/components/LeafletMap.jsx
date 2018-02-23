import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './LeafletMap.css';
import ControlPanel from './ControlPanel';
// import Control from 'react-leaflet-control';

// workaround for webpack(?) issue
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
const osmTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
const mapCenter = [37.80, -122.42];
const zoomLevel = 14;

class LeafletMap extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  layerHandler = (name, url) => {
    if (!this.state[name]){
      fetch(url).then(resp => resp.json())
      .then(data =>{
        this.setState({[name]:data})
        console.log(Object.keys(this.state))}
      )
    }
  }

  render() {
    return (
      <Map className="map" center={mapCenter} zoom={zoomLevel}>
        <TileLayer attribution={attribution} url={osmTiles} />
        <Marker position={mapCenter}>
          <Popup>
            <span>Center of the Map</span>
          </Popup>
        </Marker>
        <ControlPanel layerHandler={this.layerHandler}/>
      </Map>
    );
  }
}

export default LeafletMap;
