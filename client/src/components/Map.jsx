import React from 'react';

import GoogleMapReact from 'google-map-react';
import GoogleMapMarkers from 'google-map-react';

const style = {
  width: '80%',
  height: '80%',
  left: 160,
  top: 160,
  margin: 0,
  position: 'absolute',
  overflow: 'visible',
  padding: 0
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 37.783607, lng:-122.408967},
      zoom: 16,
      markers: []
    }
  }
  
  handleClick(event) {
    this.setState((prevState) => {
      return {markers: prevState.markers.concat([[event.lat, event.lng]])};
    })
  }
  
  render() {
    console.log(this.state.markers);
    return (
      <div style={style}>
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        onClick={this.handleClick.bind(this)}
      />
      </div>
      )
  }
}

export default Map;