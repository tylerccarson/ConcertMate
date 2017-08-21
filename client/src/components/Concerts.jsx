import React from 'react';
import axios from 'axios';
import ConcertEntry from './ConcertEntry.jsx';
import {ListGroup} from 'react-bootstrap';

const Concerts = (props) => {
	return (
    <ListGroup>
    	{props.events.map((event, i) => {
    		return <ConcertEntry handleHover={props.handleHover} event={event} key={i} handleArtistClick={props.handleArtistClick}/>
    	})}
    </ListGroup>
  )
}

export default Concerts;