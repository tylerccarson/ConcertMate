import React from 'react';
import axios from 'axios';

const Playlist = (props) => {
	let iframeBaseURL = 'https://open.spotify.com/embed?uri=spotify:';
	let iframeQuery = props.artistId ? 'artist:' + props.artistId + '&theme=black' : 'user:1211115253:playlist:6r1hzKf8a0KYkbt44we1Cl';
	let iframeSRC = iframeBaseURL + iframeQuery;

  return (
  	<div>
	    <div>
	    	<iframe src={iframeSRC}
					width="320" height="120"
					frameBorder="0" allowTransparency="true"></iframe>
	    </div>
    </div>
  )
};


export default Playlist;