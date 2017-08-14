import React from 'react';
import axios from 'axios';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: '',
			artistId: '776Uo845nYHJpNaStv1Ds4',
			token: undefined
		}
	}

	componentWillMount() {
		if (window.location.hash) {
			let hash = window.location.hash;
			let token = hash.split('&')[0].split('=')[1];
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
					artistId: res.data.artistId,
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
		    <div>
		    	<form action='/' method='post' onSubmit={this.handleFormSubmit.bind(this)}>
		    		<label>
		    			Here for testing purposes:
		    			<input type="text" value={this.state.artist} onChange={this.handleArtistEntry.bind(this)}/>
		    		</label>
		    	</form>
		    </div>
		    <div>
		    	<iframe src={'https://open.spotify.com/embed?uri=spotify:artist:' + this.state.artistId + '&theme=black'}
  					width="320" height="120"
  					frameBorder="0" allowTransparency="true"></iframe>
		    </div>
	    </div>
	  )		
	}
}


export default Playlist;