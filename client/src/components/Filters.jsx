import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

//import 'react-datepicker/dist/react-datepicker.css';

//what does this component need? Needs to be a form that allows for search based on date, location?, event type, also possible by venue and artist, which require slightly different api paths
//bootstrap will allow for easier for handling than raw react

class Favorites extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			startDate: moment(),
			endDate: moment()
		}
		this.handleChangeStart = this.handleChangeStart.bind(this);
		this.handleChangeEnd = this.handleChangeEnd.bind(this);
	}

	handleChangeStart(date) {
		this.setState({
			startDate: date
		});
	}

	handleChangeEnd(date) {
		this.setState({
			endDate: date
		});
	}

	render() {
  	//all inside a form with a submit button to launch a new get request and change event state on the app. Do it just here for now?
  	//style float right: date picker
    return (
    	<div>
	      <div>FILTERS COMPONENT</div>
	    	<div>
	    		<DatePicker
				    selected={this.state.startDate}
				    selectsStart
				    startDate={this.state.startDate}
				    endDate={this.state.endDate}
				    onChange={this.handleChangeStart}
					/>
					<DatePicker
					    selected={this.state.endDate}
					    selectsEnd
					    startDate={this.state.startDate}
					    endDate={this.state.endDate}
					    onChange={this.handleChangeEnd}
					/>
	    	</div>
    	</div>
    )		
	}
};


export default Favorites;
