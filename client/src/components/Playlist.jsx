import React from 'react';
import axios from 'axios';
import {Panel} from 'react-bootstrap'

const Playlist = (props) => {
	let iframeBaseURL = 'https://open.spotify.com/embed?uri=spotify:';
	let iframeQuery = props.artistId ? 'artist:' + props.artistId + '&theme=black' : 'user:1211115253:playlist:6r1hzKf8a0KYkbt44we1Cl';
	let iframeSRC = iframeBaseURL + iframeQuery;

  return (
  	<div>
	    <Panel collapsible defaultExpanded header="Preview Artist" bsStyle="success">
	    	<iframe src={iframeSRC}
					width="520" height="95"
					frameBorder="0" allowTransparency="true"></iframe>

	    </Panel>
    </div>
  )
};


export default Playlist;
