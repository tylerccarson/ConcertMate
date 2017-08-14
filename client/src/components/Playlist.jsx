import React from 'react';
import axios from 'axios';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: '',
			userId: 1211115253,
			playlistId: '2GKsWTId44AS4ZaeHKnowP',
			token: undefined
		}
	}

	componentWillMount() {
		if (window.location.hash) {
			let hash = window.location.hash;
			let token = hash.split('&')[0].split('=')[1];
			console.log('token: ', token);
			this.setState({
				token: token
			})
			axios.post('/spotify/login', {
					data: token
			})
			.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				})
		} else {
			axios.get('/spotify/login')
				.then((response) => {
					console.log(response.data);
					let loginUrl = response.data;
					window.location = loginUrl;
				})
				.catch((error) => {
					console.log(error);
				})
		}
	}

	handleArtistEntry(artistEntryEvent) {
		this.setState({
			artist: artistEntryEvent.target.value
		});
	}

	handleFormSubmit(formSubmitEvent) {
		formSubmitEvent.preventDefault();
		let data = {
			artist: this.state.artist,
			token: this.state.token
		};
		axios.post('/spotify/search', data)
			.then((res) => {
				console.log(res.data);

				this.setState({
					userId: res.data.userId,
					playlistId: res.data.playlistId
				});

			})
			.catch((err) => {
				console.log(err);
			});
			console.log(this.state);
	}

	render() {
	  return (
	  	<div>
	  		<div className="container">
			    <p>Log in with your Spotify account:</p>
			    <button className="btn btn-primary" id="btn-login">Login</button>
				</div>
		    <div>
		    	<form action='/' method='post' onSubmit={this.handleFormSubmit.bind(this)}>
		    		<label>
		    			Here for testing purposes:
		    			<input type="text" value={this.state.artist} onChange={this.handleArtistEntry.bind(this)}/>
		    		</label>
		    	</form>
		    </div>
		    <div>
		    	<iframe src={'https://open.spotify.com/embed?uri=spotify:user:' + this.state.userId + ':playlist:' + this.state.playlistId + '&theme=black'}
  					width="320" height="120"
  					frameBorder="0" allowTransparency="true"></iframe>
		    </div>
	    </div>
	  )		
	}
}

export default Playlist;