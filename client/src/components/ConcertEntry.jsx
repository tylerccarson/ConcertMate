import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

class ConcertEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //artist: ''
    }
  }

  handleClick(clickedArtist) {
    this.props.handleArtistClick(clickedArtist);
  }

  render() {

    return (
      <ListGroupItem
        header={this.props.event.performance[0].displayName} onClick={() => this.handleClick(this.props.event.performance[0].displayName)}>
        <span> {this.props.event.venue.displayName} on {this.props.event.start.date} {this.props.event.start.time}</span>
        <a href={this.props.event.uri}> Buy Tickets</a>
      </ListGroupItem>
    )
  }

};

export default ConcertEntry;

