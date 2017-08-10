import React from 'react';
import axios from 'axios';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: ''
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
  					frameborder="0" allowtransparency="true"></iframe>
		    </div>
	    </div>
	  )		
	}
}

export default Playlist;