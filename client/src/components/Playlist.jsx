import React from 'react';
import axios from 'axios';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: '',
			artistId: undefined,
			token: undefined
		}
	}

	componentWillMount() {
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

	handleArtistEntry(artistEntryEvent) {
		this.setState({
			artist: artistEntryEvent.target.value
		});
	}

	handleFormSubmit(formSubmitEvent) {
		formSubmitEvent.preventDefault();
		if (this.props.artist) {
			let data = {
				artist: this.props.artist,
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
			});
		}
	}

	render() {
		let iframeBaseURL = 'https://open.spotify.com/embed?uri=spotify:';
		let iframeQuery = this.state.artistId ? 'artist:' + this.state.artistId + '&theme=black' : 'user:1211115253:playlist:6r1hzKf8a0KYkbt44we1Cl';
		let iframeSRC = iframeBaseURL + iframeQuery;

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
		    	<iframe src={iframeSRC}
  					width="320" height="120"
  					frameBorder="0" allowTransparency="true"></iframe>
		    </div>
	    </div>
	  )
	}
}


export default Playlist;