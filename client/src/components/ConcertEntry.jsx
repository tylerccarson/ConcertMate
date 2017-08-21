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

  mouseIn(venueName) {
    this.props.handleHover(venueName);
  }

  mouseOut() {
    this.props.handleHover();
  }

  render() {

    return (
      <ListGroupItem
        header={this.props.event.headline} 
        onClick={() => this.handleClick(this.props.event.headline)}
        onMouseEnter={() =>  this.mouseIn(this.props.event.venue)}
        onMouseLeave={() => this.mouseOut()}
        >
        <span> {this.props.event.venue} on {this.props.event.date.slice(0, 10)} {this.props.event.time}</span>
        <span>
            {this.props.event.headline}
        </span>
        <a href={this.props.event.uri}> Buy Tickets</a>
      </ListGroupItem>
    )
  }

};

export default ConcertEntry;

