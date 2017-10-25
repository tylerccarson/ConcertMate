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
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(text) {
    this.setState({
      search: text.target.value
    });
  }

  render() {

    const datepicker =  {
      paddingTop: '3.5px'


    }

    return (
      <div>
        <Navbar bsStyle="info">
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Location..." onChange={this.handleSearch}/>
            </FormGroup>
            {' '}
            <Button type="submit" onClick={ () => {this.props.handleSubmit(this.state.search)}}>Submit</Button>
          </Navbar.Form>
          <Navbar.Form>
          <div style={datepicker}>
        <DatePicker
          dateFormat="MM/DD/YYYY"
          selected={this.props.startDate}
          onChange={this.props.handleDateChange}
        /> </div>
        </Navbar.Form>
        </Navbar>
      </div>
    )
  }
};

export default Favorites;

