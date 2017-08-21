import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';

// ignore the fact that this is called Favorites but the file is called Filters
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
    this.setState({
      search: text.target.value
    });
  }

  // beginning of search functionality. we wanted to implement google search to be able to
  // autocomplete addresses but hey that's your job now
  handleSubmit() {
    let context = this;
    axios.post('/google/search', {
        loc: this.state.search
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        context.setState({
          search: ''
        });
      })
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
                <FormControl type="text" placeholder="Location..." onChange={this.handleSearch.bind(this)}/>
              </FormGroup>
              {' '}
              <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </Navbar.Form>
          </Navbar>
        </div>
    )		
	}
};

export default Favorites;

