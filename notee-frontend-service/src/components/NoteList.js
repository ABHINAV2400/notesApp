import React from 'react';
import noteService from '../services/note.service';

function NoteList({ notes, setNotes }) {
  const handleDelete = async (noteId) => {
    try {
      await noteService.deleteNote(noteId);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="notes-list">
      {notes.map(note => (
        <div key={note._id} className="note-item">
          <span>{note.content}</span>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
