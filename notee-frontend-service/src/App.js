import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<RegisterForm/>} />
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
