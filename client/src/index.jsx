import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: []
    };
  }
  
  render() {
    return (
      <Map />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

