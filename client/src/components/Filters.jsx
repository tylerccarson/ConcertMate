import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Favorites extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			startDate: moment()
		}
	}

	

	render() {
  	//all inside a form with a submit button to launch a new get request and change event state on the app. Do it just here for now?
  	//style float right: date picker
  	//use this formatting for songkick API call
  	
    return (
    	<div>
	    	<div>
	    		Pick a day:
	    		<DatePicker
						dateFormat="YYYY/MM/DD"
						selected={this.state.startDate}
						onChange={this.props.handleDateChange} 
					/>
				</div>
    	</div>
    )		
	}
};


export default Favorites;
