import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/';

const getNotes = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const createNote = (content) => {
  return axios.post(API_URL, { content }, { headers: authHeader() });
};

const updateNote = (noteId, content) => {
  return axios.put(API_URL + noteId, { content }, { headers: authHeader() });
};

const deleteNote = (noteId) => {
  return axios.delete(API_URL + noteId, { headers: authHeader() });
};

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
};

const noteService = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
  }

export default noteService;
