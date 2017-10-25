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
import {PageHeader} from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      startDate: moment(),
      artist: '',
      hoveredEvent: '',
      artistId: undefined,
      token: undefined,
      mapCenter: {lat: 37.783607, lng:-122.408967},
      city: ''
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleArtistClick = this.handleArtistClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  //need to change name, figure out how to attach to submit in the filters component
  handleSubmit(loc) {
    geocodeByAddress(loc)
      .then(results => getLatLng(results[0]))
      .then(latLng => {

        let userLoc = {
          lat: latLng.lat,
          lng: latLng.lng
        };
        //set state of mapCenter prop
        this.setState({
          mapCenter: userLoc
        }, () => {
          //getSongkickEvents
          this.requestSongkickEvents();
        });

      })
      .catch(error => console.log('error', error))
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
    this.requestSongkickEvents(date);
  }

  handleArtistClick(clickedArtist) {
    this.setState({
      artist: clickedArtist
    }, () => {
      //console.log('new state: ', this.state.artist);
       this.requestArtistId();
    })
  }

  handleHover(hoveredEvent) {
    if (hoveredEvent) {
      this.setState({
        hoveredEvent: hoveredEvent
      });
    } else {
      this.setState({
        hoveredEvent: ''
      });
    }
  }

  requestArtistId() {
    if (this.state.artist) {
      let data = {
          artist: this.state.artist,
          token: this.state.token
        };
        //do this recursively, or a while loop, until NOT undefined to solve the case where first artist isn't on Spotify
        //issue I see with this though is asyncronousity
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


  requestSongkickEvents(date) {
    let formattedDate = this.state.startDate.format('YYYY-MM-DD');
    let latitude = this.state.mapCenter.lat;
    let longitude = this.state.mapCenter.lng;
    let city = this.state.city;

    if (date) {
      formattedDate = date.format('YYYY-MM-DD')
    }
    axios.post('/songkick/', {
      date: formattedDate,
      lat: latitude,
      lng: longitude,
      city: city
    })
      .then((data) => {
        //console.log('data received', data.data)
        this.setState({
          events: data.data,
          artist: data.data[0].headline
        });
        this.requestArtistId();
        //console.log('state:', this.state.events);
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

 render() {

    const scrollbar = {
      width: 555,
      height: 290,
    };

    const header = {
      fontFamily: 'futura',
      fontSize: 70,
      color: '#CD3F2A'
    };

    return (

      <Grid>
        <Row>
          <Col md={12}>
          <div>
            <PageHeader style={header}>ConcertMate <small>discover upcoming concerts around you</small></PageHeader>
          </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Filters handleDateChange={this.handleDateChange} startDate={this.state.startDate} handleSubmit={this.handleSubmit} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Map mapCenter={this.state.mapCenter} hovered={this.state.hoveredEvent} events={this.state.events}/>
          </Col>
          <Col md={6}>
            <Playlist artistId={this.state.artistId}/>
            <ReactScrollbar style={scrollbar}>
              <Concerts handleHover={this.handleHover} events={this.state.events} handleArtistClick={this.handleArtistClick}/>
            </ReactScrollbar>
          </Col>
        </Row>
      </Grid>

    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));

