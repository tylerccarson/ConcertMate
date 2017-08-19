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
      artist: 'hi'
    }
  }

  handleClick() {
    this.setState({
      artist: this.props.event.performance[0].displayName
    });

    console.log("artist was clicked and here is the state: ", this.state.artist)
    this.props.handleArtistClick(this.state.artist);
  }

  render() {

    return (
      <div>
        <span onClick={() => this.handleClick()}>{this.props.event.performance[0].displayName}</span>
        <span> at {this.props.event.venue.displayName} on {this.props.event.start.date} {this.props.event.start.time}</span>
        <a href={this.props.event.uri}> Buy Tickets</a>
      </div>
    )

  }

};

export default ConcertEntry;