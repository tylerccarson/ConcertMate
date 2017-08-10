import React from 'react';
import axios from 'axios';

let accessToken = 'BQCMwC19LrnRoyhPTiUbi5gFdrFM584B5xcLvVgZrcrlf3cFYEIyxVsVYvpmeK2qCscz9iiBtk_qjm8aKh6a-Q3qyg63LUU0sABKLXswc68Lu9AimAkvu58EEdm53eQrjrvzPI3a0Nxgviuam89CajzKU5Z7emO2NiRI1WH_XG0MIIaT72JUci7mdU6BPsggJ5SbpWwkmgCVbbvtcyR4yIK2gBDH1oZAdYrWPMXaf6QoN_O_V4MhA79thd1Ye1633YvspMzJ7iW6wm5AHj8';

let spotifyHeaders = {
	'Authorization': 'Bearer ' + accessToken
};	

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: '',
			userId: null,
			playlistId: null
		}
	}

	componentWillMount() {
		//get userID
		axios({
			url: 'https://api.spotify.com/v1/me',
			method: 'get',
			headers: spotifyHeaders
		})
		//create playlist
		.then((userId) => {

			this.setState({
				userId: userId
			});

			return axios({
				url: `https://api.spotify.com/v1/users/${userId}/playlists`,
				method: 'post',
				headers: spotifyHeaders,
				data: {
					name: 'ConcertMate'
				}
			})
		.then((playlist) => {
			//setstate
			this.setState({
				playlistId: playlist.id
			})

			console.log('Playlist created', playlist);
		})
		});
	}

	handleArtistEntry(artistEntryEvent) {
		this.setState({
			artist: artistEntryEvent.target.value
		});
	}

	handleFormSubmit(formSubmitEvent) {
		formSubmitEvent.preventDefault();
		let data = {
			artist: this.state.artist
		};
		axios.post('/spotify', data)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
	  return (
	  	<div>
		    <div>
		    	<form action='/' method='post' onSubmit={this.handleFormSubmit.bind(this)}>
		    		<label>
		    			Here for testing purposes:
		    			<input type="text" value={this.state.artist} onChange={this.handleArtistEntry.bind(this)}/>
		    		</label>
		    	</form>
		    </div>
		    <div>
		    	<iframe src='https://open.spotify.com/embed?uri=spotify:user:1211115253:playlist:2GKsWTId44AS4ZaeHKnowP&theme=black'
  					width="300" height="120"
  					frameBorder="0" allowTransparency="true"></iframe>
		    </div>
	    </div>
	  )		
	}
}

export default Playlist;