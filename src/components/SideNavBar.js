import React from 'react';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import { Link } from 'react-router-dom';

const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit color from parent (usually black)
};

const SideNavBar = () => {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            
            <Sidebar className="app">
                <Menu>
                    <MenuItem icon={<GridViewRoundedIcon />}>
                        <Link to="/" style={linkStyle}>Home</Link>
                    </MenuItem>
                    <MenuItem icon={<PeopleAltIcon />}>
                        <Link to="/students" style={linkStyle}>Students</Link>
                    </MenuItem>
                    <MenuItem icon={<SchoolIcon />}>
                        <Link to="/courses" style={linkStyle}>Courses</Link>
                    </MenuItem>
                    <MenuItem icon={<GradeIcon />}>
                        <Link to="/results" style={linkStyle}>Results</Link>
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
};

export default SideNavBar;