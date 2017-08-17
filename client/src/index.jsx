import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map.jsx';
import Filters from './components/Filters.jsx';
import Playlist from './components/Playlist.jsx';
import Concerts from './components/Concerts.jsx';
import axios from 'axios';
//import { Grid, Row, Col } from 'react-bootstrap';

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
      <div>
        <h1>ConcertMate</h1>
        <Filters />
        <Map />
        <Playlist />
        <Concerts />
      </div>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

