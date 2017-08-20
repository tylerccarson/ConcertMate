import React from 'react';
import axios from 'axios';
import ConcertEntry from './ConcertEntry.jsx';

const Concerts = (props) => {
	return (
    <div>
    	{props.events.map((event, i) => {
    		return <ConcertEntry event={event} key={i} handleArtistClick={props.handleArtistClick}/>
    	})}
    </div>
  )
}

export default Concerts;