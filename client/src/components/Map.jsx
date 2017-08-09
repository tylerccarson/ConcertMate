import React from 'react';
import {GoogleMap, GoogleMapMarkers} from 'google-map-react'; 

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 37.783607, lng:-122.408967},
      zoom: 8
    }
  }
  
  render() {
    return (
      <GoogleMap
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      />
      )
  }
}