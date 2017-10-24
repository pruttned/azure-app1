import React, { Component } from 'react';
import Note from './note';
import { Segment } from 'semantic-ui-react';

const NoteList = props => {
  const notes = props.notes;
  return (
    <Segment.Group>
      {notes.map(note => (
        <Segment key={note._id}>
          <Note message={note.message} />
        </Segment>
      ))}
    </Segment.Group>
  );
}


export default NoteList;