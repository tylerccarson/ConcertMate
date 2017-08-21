import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';

class Favorites extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			startDate: moment(),
      radius: 5,
      search: ''
		}
	}

  handleSearch(text) {
    console.log('text ', event.target.value);
    this.setState({
      search: event.target.value
    });
  }

  handleSubmit(event) {
    
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

          <Navbar>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Enter starting location" onChange={this.handleSearch}/>
              </FormGroup>
              {' '}
              <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
            </Navbar.Form>
          </Navbar>
        </div>
    )		
	}
};

export default Favorites;
