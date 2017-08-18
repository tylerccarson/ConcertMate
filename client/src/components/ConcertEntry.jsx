import React from 'react';

const ConcertEntry = (props) => {
	return (
		<div>
      <span>{props.event.performance[0].displayName}</span>
      <span> Venue: {props.event.venue.displayName} {props.event.start.date} {props.event.start.time}</span>
			<a href={props.event.uri}> Buy Tickets</a>
    </div>
	)
}

export default ConcertEntry;