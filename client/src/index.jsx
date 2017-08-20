import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Filters from './components/Filters.jsx';
import Map from './components/Map.jsx';
import Playlist from './components/Playlist.jsx';
import Concerts from './components/Concerts.jsx';
import ReactScrollbar from 'react-scrollbar-js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      startDate: moment(),
      artist: '',
      artistId: undefined,
      token: undefined
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleArtistClick = this.handleArtistClick.bind(this);
  }

  componentWillMount() {
    this.authenticateSpotify();
    this.requestSongkickEvents();
  }

  authenticateSpotify() {
    if (window.location.hash) {
      let hash = window.location.hash;
      let token = hash.split('&')[0].split('=')[1];
      this.setState({
        token: token
      });
      axios.post('/spotify/login', {
          data: token
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      axios.get('/spotify/login')
        .then((response) => {
          let loginUrl = response.data;
          window.location = loginUrl;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
    let formattedDate = this.state.startDate.format('YYYY-MM-DD');
    axios.post('/songkick/', {
      date: formattedDate
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

  handleArtistClick(clickedArtist) {
    this.setState({
      artist: clickedArtist
    }, () => {
      console.log('new state: ', this.state.artist);
       this.requestArtistId();
    })
  }

  requestArtistId() {
    if (this.state.artist) {
      let data = {
          artist: this.state.artist,
          token: this.state.token
        };
        axios.post('/spotify/search', data)
          .then((res) => {
            this.setState({
              artistId: res.data.artistId,
            });
          })
          .catch((err) => {
            console.log(err);
          });
    } else {
      this.setState({
        artist: ''
      })
    }
  }


  requestSongkickEvents() {
    let formattedDate = this.state.startDate.format('YYYY-MM-DD');
    axios.post('/songkick/', {
      date: formattedDate
    })
      .then((data) => {
        console.log('data received', data.data.event)
        this.setState({
          events: data.data.event
        });
        console.log('state:', this.state.events);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });

  }

  // componentDidUpdate() {
  // }

 render() {

    const scrollbar = {
      width: 600,
      height: 400,
    };

    const scrollbar = {
      width: 600,
      height: 400,
    };

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
            <Map events={this.state.events}/>
          </Col>
          <Col md={6}>
            <Playlist artistId={this.state.artistId}/>
            <ReactScrollbar style={scrollbar}>
              <Concerts events={this.state.events} handleArtistClick={this.handleArtistClick}/>
            </ReactScrollbar>
          </Col>
        </Row>
      </Grid>

    )
  }


}


ReactDOM.render(<App />, document.getElementById('app'));

