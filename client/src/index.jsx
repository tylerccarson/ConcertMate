import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: []
    };
  }
  
  render() {
    return (
      <div>Hey</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
