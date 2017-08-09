import React from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 37.783607, lng:-122.408967},
      zoom: 8
    }
  }

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      />
      )
  }
}

export default Map;