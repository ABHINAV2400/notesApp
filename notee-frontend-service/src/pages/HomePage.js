import React, { useState, useEffect } from 'react';
import AddNoteForm from '../components/AddNoteForm';
import NoteList from '../components/NoteList';
import noteService from '../services/note.service';

function HomePage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await noteService.getNotes();
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteAdded = () => {
    noteService.getNotes().then(response => {
      setNotes(response.data);
    });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <AddNoteForm onNoteAdded={handleNoteAdded} />
      <NoteList notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default HomePage;
