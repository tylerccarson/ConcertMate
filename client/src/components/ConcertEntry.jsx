import React from 'react';

// const ConcertEntry = (props) => {
// 	return (
// 		<div>
//       <span onClick={}>{props.event.performance[0].displayName}</span>
//       <span> at {props.event.venue.displayName} on {props.event.start.date} {props.event.start.time}</span>
// 			<a href={props.event.uri}> Buy Tickets</a>
//     </div>
// 	)
// }

// export default ConcertEntry;


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
      <div>
        <span onClick={() => this.handleClick(this.props.event.performance[0].displayName)}>{this.props.event.performance[0].displayName}</span>
        <span> at {this.props.event.venue.displayName} on {this.props.event.start.date} {this.props.event.start.time}</span>
        <a href={this.props.event.uri}> Buy Tickets</a>
      </div>
    )

  }

};

export default ConcertEntry;