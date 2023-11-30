import React, { useState } from 'react';
import noteService from '../services/note.service';

function AddNoteForm({ onNoteAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await noteService.createNote(content);
      setContent('');
      if (onNoteAdded) {
        onNoteAdded();
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add Note</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddNoteForm;
