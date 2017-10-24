import React, { Component } from 'react';
import NoteList from './note-list.js';
import { Container, Input, Header, Icon, Segment } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      notes: []
    }
    this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
    this.onMsgInputChange = this.onMsgInputChange.bind(this);

    this.fetchPosts();
  }

  fetchPosts() {
    fetch('/posts').then(resp => {
      resp.json().then(data => {
        this.setState({ notes: data.notes });
      });
    });
  }

  onAddFormSubmit(evt) {
    evt.preventDefault();
    if (this.state.message) {
      fetch('/posts', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          message: this.state.message
        })
      })
        .then(resp => {
          resp.json().then(data => {
            this.setState({ notes: data.notes });
          });
        });

      this.setState({ message: '' });
    }
  }

  onMsgInputChange(evt) {
    this.setState({ message: evt.target.value });
  }

  render() {

    return (
      <Container>
        <Header as='h1'>
          <Icon name='sticky note outline' />
          <Header.Content>
            notes :)
             <Header.Subheader>
              <a href="https://github.com/pruttned/azure-app1">https://github.com/pruttned/azure-app1</a>
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment>
          <div>
            <form onSubmit={this.onAddFormSubmit}>
              <Input
                fluid
                value={this.state.message}
                size="large"
                action={{ color: 'teal', icon: 'plus' }}
                onChange={this.onMsgInputChange}
                placeholder="Message..." />
            </form>
          </div>
          <NoteList notes={this.state.notes} />
        </Segment>
      </Container>
    );
  }
}

export default App;