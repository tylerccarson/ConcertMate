import React from 'react';

const ConcertEntry = (props) => {
	return (
		<div>
			<a href={props.event.uri}>{props.event.displayName}</a>
			<span onClick=''>Headliner:{props.event.performance[0].displayName}</span>
			<span>{props.event.venue.displayName}</span>
			<span>{props.event.start.date}</span>
			<span>{props.event.start.time}</span>
		</div>
	)
}

export default ConcertEntry;