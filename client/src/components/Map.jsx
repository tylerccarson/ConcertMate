import React from 'react';

import GoogleMapReact from 'google-map-react';

const style = {
  width: '100%',
  height: '100%',
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
      zoom: 8
    }
  }

  render() {
    return (
      <div style={style}>
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      />
      </div>
      )
  }
}

export default Map;