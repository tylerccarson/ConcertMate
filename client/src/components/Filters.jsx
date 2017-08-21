import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Favorites extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			startDate: moment(),
      radius: 5
		}
	}

	render() {
  	
    return (
    	<div>
	    	<div>
	    		Pick a day:
	    		<DatePicker
						dateFormat="MM/DD/YYYY"
						selected={this.props.startDate}
						onChange={this.props.handleDateChange}
					/>
				</div>
    	</div>
    )		
	}
};

export default Favorites;
