import React from 'react';

import GoogleMapReact from 'google-map-react';
import GoogleMapMarkers from 'google-map-react';
import Markers from './Markers.jsx';

const style = {
  position: 'absolute',
  overflow: 'visible',
  top: 160,
  width: '80%',
  height: '80%',
  left: 160,
  margin: 0,
  padding: 0
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 37.783607, lng:-122.408967},
      zoom: 16,
      markerLocs: []
    }
  }
  
  handleClick(event) {
    // should there even be a handleClick for the map itself? 
    // or should there just be a hover event for markers?
    // or should clicking on the marker highlight all concerts at that venue?
  }

  componentWillReceiveProps(nextProps) {
    let events = nextProps.events;
    let venues = events.map((event) => {
      return {
        lat: event.venue.lat,
        lng: event.venue.lng
      }
    });
    this.setState({
      markerLocs: venues
    });
  }
  
  render() {
    let context = this;
    let markers = this.state.markerLocs.map((loc) => {
      return <Markers map={context} lat={loc.lat} lng={loc.lng} />
    })
    return (
      <div style={style}>
        <GoogleMapReact
          resetBoundsOnResize
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          onClick={this.handleClick.bind(this)}
        />
        {markers}
      </div>
    )
  }
}

export default Map;