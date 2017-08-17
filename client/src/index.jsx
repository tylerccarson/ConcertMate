import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map.jsx';
import Filters from './components/Filters.jsx';
import Playlist from './components/Playlist.jsx';
import Concerts from './components/Concerts.jsx';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: []
    };
  }
  
  componentWillMount() {
    //axios.get('/songkick/');
  }
  
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col md={12}>
            <h1>ConcertMate</h1>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={12}>
            <Filters />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={6}>
            <Map />
          </Col>
          <Col md={6}>
            <Playlist />
            <Concerts />
          </Col>
        </Row>
      </Grid>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

