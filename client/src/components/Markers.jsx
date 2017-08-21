import React from 'react';

import {markerStyle, markerStyleHover} from './MarkerStyles.js';

export default class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      name: this.props.name
    }
  }

  render() {
    // if the marker itself is being hovered or if the name of the venue corresponding to the
    // marker is the same as the name passed from the concert component, change the style accordingly
    // also, it's literally just a css circle. you could probably add an image or something 
    let style = this.props.$hover || this.state.name === this.props.hovered ? markerStyleHover : markerStyle;
    return (
      <div style={style}></div>
    )
  }
}