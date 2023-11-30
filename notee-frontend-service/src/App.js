import React from 'react';
import { BrowserRouter as Router,Switch, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import HomePage from './pages/HomePage';
import Index from './components/Index';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/" element={<Index/>} />
      </Routes>
    </Router>
  );
}

export default App;
