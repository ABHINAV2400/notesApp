import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNoteForm from '../components/AddNoteForm';
import NoteList from '../components/NoteList';
import noteService from '../services/note.service';
import authService from '../services/auth.service';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

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

  
  const handleLogout = () => {
    authService.logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      <AddNoteForm onNoteAdded={handleNoteAdded} />
      <NoteList notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default HomePage;
