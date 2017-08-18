import React from 'react';
import axios from 'axios';
import ConcertEntry from './ConcertEntry.jsx';

class Concerts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}

	componentWillMount() {
		let date = this.props.date;
    axios.post('/songkick/', {
  		date: date
    })
    	.then((data) => {
    		this.setState({
    			events: data.data.event
    		});
    	})
    	.catch((err) => {
    		console.log('Error: ', err);
    	});
  }

  componentWillReceiveProps() {
		let date = this.props.date;
    axios.post('/songkick/', {
  		date: date
    })
    	.then((data) => {
    		this.setState({
    			events: data.data.event
    		});
    	})
    	.catch((err) => {
    		console.log('Error: ', err);
    	});
  }

  render() {
  	console.log(this.state.events);
  	if (this.state.events) {
		  return (
		    <div>CONCERTS COMPONENT
		    	{this.state.events.map((event, i) => {
		    		return <ConcertEntry event={event} key={i} />
		    	})}
		    </div>
		  )
  	}
  }

}

export default Concerts;