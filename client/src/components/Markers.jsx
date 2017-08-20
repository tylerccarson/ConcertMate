import React from 'react';

import {markerStyle, markerStyleHover} from './MarkerStyles.js';

export default class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     lat: this.nextProps.lat,
  //     lng: this.nextProps.lng
  //   });
  // }

  handleHover(event) {

  }

  render() {
    let style = this.props.$hover ? markerStyleHover : markerStyle;
    return (
      <div style={style}></div>
    )
  }
}