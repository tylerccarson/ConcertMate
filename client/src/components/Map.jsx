import React from 'react';

import GoogleMapReact from 'google-map-react';
import GoogleMapMarkers from 'google-map-react';
import Markers from './Markers.jsx';

let googleAPIKEY;

if (process.env.NODE_ENV === 'production') {
  googleAPIkey = process.env.GOOGLE_API_KEY;
} else {
  import google from '../database/config.js';
  googleAPIkey = google.key;
}

const style = {
  position: 'fixed',
  overflow: 'visible',
  top: 190,
  left: 65,
  width: '45%',
  height: '70%',
  margin: 0,
  padding: 0
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // we hard-coded this map center but ideally you'll be able to set location based on google search
      center: this.props.mapCenter,
      zoom: 13,
      markerLocs: []
    }
  }

  componentWillReceiveProps(nextProps) {
    let events = nextProps.events;
    let venues = events.map((event) => {
      return {
        lat: event.latitude,
        lng: event.longitude,
        name: event.venue
      }
    });
    this.setState({
      markerLocs: venues
    });
  }

  render() {
    let context = this;
    let markers = this.state.markerLocs.map((loc) => {
      return <Markers hovered={this.props.hovered} name={loc.name} lat={loc.lat} lng={loc.lng} />
    });

    // only show map if authenticated
    if (window.location.hash) {
      return (
        <div style={style}>
          <GoogleMapReact
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            //tyler's API key
            bootstrapURLKeys={{ key: googleAPIkey }}
          >
            {markers}
          </GoogleMapReact>
        </div>
      )
    } else {
      return (
        <div>Loading map...</div>
      )
    }

  }
}

export default Map;