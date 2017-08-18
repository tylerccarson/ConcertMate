import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Filters from './components/Filters.jsx';
import Map from './components/Map.jsx';
import Playlist from './components/Playlist.jsx';
import Concerts from './components/Concerts.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      startDate: moment()
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    let formattedDate = this.state.startDate.format('YYYY-MM-DD');

    return (

      <Grid>
        <Row>
          <Col md={12}>
            <h1>ConcertMate</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Filters handleDateChange={this.handleDateChange} startDate={this.state.startDate}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Map />
          </Col>
          <Col md={6}>
            <Playlist />
            <Concerts date={formattedDate}/>
          </Col>
        </Row>
      </Grid>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

