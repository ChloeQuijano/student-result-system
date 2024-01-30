import './Home.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';
import StudentPage from './StudentPage';
import CoursePage from './CoursePage';
import ResultsPage from './ResultsPage';

export default function Home() {
  return (
    <div>
        <Router>
            <div style={{ display: "flex" }}>
                <SideNavBar />
                <Routes>
                    <Route path="/students" element={<StudentPage />} />
                    <Route path="/courses" element={<CoursePage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/" element={
                      <div className="content" style={{ textAlign: "center" }}>
                        <h1>Welcome to the Home Page</h1>
                      </div>} 
                    />
                </Routes>
            </div>
        </Router>
    </div>
  );
}