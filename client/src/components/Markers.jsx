import React from 'react';

let imgUrl = 'https://thumb9.shutterstock.com/display_pic_with_logo/3589658/566276632/stock-vector-music-note-icon-black-icon-on-transparent-background-566276632.jpg';
const style = {
  allowTransparency: true,
  height: 5,
  width: 5
};

export default class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      hover: false,
      map: this.props.map
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      lat: this.nextProps.lat,
      lng: this.nextProps.lng
    });
  }

  handleHover(event) {

  }

  render() {
    return (
      <div style={style}><img className="marker" src={imgUrl} alt="" /> </div>
    )
  }
}