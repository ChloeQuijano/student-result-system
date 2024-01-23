import './Home.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';
import StudentPage from './StudentPage';
import CoursePage from './CoursePage';

export default function Home() {
  return (
    <div>
        <Router>
            <div style={{ display: "flex" }}>
                <SideNavBar />
                <Routes>
                    <Route path="/students" element={<StudentPage />} />
                    <Route path="/courses" element={<CoursePage />} />
                    <Route path="/" element={<div className="content"><h1>Welcome to the Home Page</h1></div>} />
                </Routes>
            </div>
        </Router>
    </div>
  );
}