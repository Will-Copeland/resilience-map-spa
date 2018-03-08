import { MapControl } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import './SearchBar.css';

export default class SearchBox extends MapControl {
  componentWillMount() {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider
    });
    this.leafletElement = searchControl;
  }
}
