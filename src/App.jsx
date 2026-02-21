import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/Navbar';
import HomePage from './pages/HomePage';
import JobDetailsPage from './pages/JobDetailsPage';
import PostJobPage from './pages/PostJobPage';
import EditJobPage from './pages/EditJobPage';  

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job/:id" element={<JobDetailsPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/edit-job/:id" element={<EditJobPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;