import React, { Component } from 'react';
import Note from './note.js';
import { Container } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        { message: 'note1' },
        { message: 'note2' }
      ]
    }
  }
  render() {

    return (
      <Container>
        <h1>notes :)</h1>
        <a href="https://github.com/pruttned/azure-app1">https://github.com/pruttned/azure-app1</a>
        <div className="notes">
          {this.state.notes.map(note => (
            <Note message={note.message} />
          ))}
        </div>
      </Container>
    );
  }
}

export default App;