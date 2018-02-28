import React, { Component } from 'react';
import { Map,
   TileLayer,
   Marker,
   Popup,
   LayersControl
   } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './LeafletMap.css';
import GeoJson from './GeoJson';
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

const { Overlay } = LayersControl;

class LeafletMap extends Component {
  constructor(props){
    super(props);

    this.basePath = process.env.REACT_APP_API_SERVER_URL;

    this.state = {
      layerGroupIds: [],
      layerGroupsById: {}
    }

  }

  componentDidMount() {
    if(!this.state.layers){
      fetch('http://localhost:5000/map-datasets')
        .then((resp) => resp.json())
        .then((layerGroups) => {
          this.setState({
            layerGroupIds: layerGroups.map(grp => grp.name),
            layerGroupsById: layerGroups.reduce((result, grp) => {
              result[grp.name] = grp;
              return result;
            }, {})
          });

        // smaller datasets for use during development, will remove later
        // return layerGroups.filter(grp => grp.name === 'Open Space');
        // return layerGroups.filter(grp => grp.name === 'SF Neighborhoods');
        // return layerGroups.filter(grp => grp.name === 'Open Space' || grp.name === 'SF Neighborhoods');
        // return layerGroups.filter(grp => !grp.readOnly); // internal data only

        return layerGroups; //all data
      })
      .then(layerGroups => {
        layerGroups.forEach(layerGroup => {
          this.fetchGroupDataset(layerGroup.url)
            .then(dataset => {
              this.setState({
                ...this.state,
                layerGroupsById: {
                  ...this.state.layerGroupsById,
                  [layerGroup.name]: {
                    ...this.state.layerGroupsById[layerGroup.name],
                    dataset,
                  },
                },
              });
            });
        });
      })
      .catch(e => e);
    }
  }

fetchGroupDataset = (url) => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch(e => e);
}

  layerHandler = (name, url) => {
    if (!this.state[name]){
      fetch(url).then(resp => resp.json())
      .then(data => {
        delete data.crs;
        this.setState({[name]:data});
        console.log(data);

      })
    } else {

    }
  }

  render() {
    // console.log(this.state);

    const {layerGroupIds, layerGroupsById} = this.state;
    return (
      <Map className="map" center={mapCenter} zoom={zoomLevel}>
        <TileLayer attribution={attribution} url={osmTiles} />
        <Marker position={mapCenter}>
          <Popup>
            <span>Center of the Map</span>
          </Popup>
        </Marker>
        <LayersControl position="topright">
          {layerGroupIds.map((layerGroup) => {
            if (!layerGroupsById[layerGroup].dataset) return null;

            return (
              <Overlay
                key={layerGroup}
                name={layerGroup}
                checked={!layerGroupsById[layerGroup].readOnly}>
                <GeoJson layerGroup={layerGroup} data={layerGroupsById[layerGroup].dataset} />
              </Overlay>
            )
          })}
        </LayersControl>

      </Map>
    );
  }
}

export default LeafletMap;
