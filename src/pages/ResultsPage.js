import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GradeIcon from '@mui/icons-material/Grade';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

const score_options = ["A", "B", "C", "D", "E", "F"];

export default function ResultsPage() {
    const [courseName, setCourseName] = React.useState('');
    const [studentName, setStudentName] = React.useState('');
    const [score, setScore] = React.useState(score_options[0]);
    const [courseData, setCourseData] = React.useState([]);
    const [studentData, setStudentData] = React.useState([]);
    const [successMessageOpen, setSuccessMessageOpen] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
    const [triggerFetch, setTriggerFetch] = React.useState(false);

    const fetchCourseData = () => {
        fetch('/api/courses')
          .then((response) => response.json())
          .then((data) => {
            const formattedData = data.map((course) => ({
                value: course.courseName,
                label: course.courseName,
            }));

            console.log(formattedData);
            setCourseData(formattedData);
            setCourseName(formattedData[0].value);
          })
          .catch((error) => {
            console.error('Error fetching course data:', error);
          });
    };

    const fetchStudentData = () => {
        fetch('/api/students')
          .then((response) => response.json())
          .then((data) => {
            const formattedData = data.map((student) => ({
                value: `${student.firstName} ${student.lastName}`,
                label: `${student.firstName} ${student.lastName}`,
            }));
            
            console.log(formattedData);
            setStudentData(formattedData);
            setStudentName(formattedData[0].value);
          })
          .catch((error) => {
            console.error('Error fetching student data:', error);
          });
    };

    React.useEffect(() => {
        fetchCourseData();
        fetchStudentData();

    }, [triggerFetch]);

    const handleStudentChange = (event) => {
        setStudentName(event.target.value);
    };

    const handleCourseChange = (event) => {
        setCourseName(event.target.value);
    };

    const handleScoreChange = (event) => {
        setScore(event.target.value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        //const data = new FormData(event.currentTarget);

        const formData = {
            studentName: studentName,
            courseName: courseName,
            score: score,
        };

        fetch('/api/courses', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response) => {
            if (response.ok) {
            // Clear form fields
            setCourseName('');
            setStudentName('');
            setScore(score_options[0]);

            // Show success message
            setSuccessMessage('Form submitted successfully');
            setSuccessMessageOpen(true);

            // Set the trigger to re-fetch data
            setTriggerFetch(!triggerFetch);
            } else {
            console.error('Failed to create result:', response.statusText);
            }
        }).catch((error) => {
            console.error('Error creating result:', error);
        });
    };

    const handleSuccessMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setSuccessMessageOpen(false);
      };

    return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <GradeIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Results Submission
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, justifyContent: 'center', alignItems: 'center' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <InputLabel id="student-name">Student Name</InputLabel>
                    <Select
                        required
                        labelId="student-name"
                        id="student-name"
                        value={studentName}
                        label="Student Name"
                        onChange={handleStudentChange}
                        sx={{ width: '300px' }}
                    >
                        {studentData.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Select
                        required
                        labelId="course-name"
                        id="course-name"
                        value={courseName}
                        label="Course Name"
                        onChange={handleCourseChange}
                        sx={{ width: '300px' }}
                    >
                        {courseData.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Select
                        required
                        labelId="score"
                        id="score"
                        value={score}
                        label="Score"
                        onChange={handleScoreChange}
                    >
                        {score_options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
              </Grid>
              {/* {error && (
                <Box mt={2} color="error.main">
                  {error}
                </Box>
              )} */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
            <Snackbar
              open={successMessageOpen}
              autoHideDuration={6000}
              onClose={handleSuccessMessageClose}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                severity="success"
                onClose={handleSuccessMessageClose}
              >
                {successMessage}
              </MuiAlert>
            </Snackbar>
          </Box>
          <Box>
            <h1>Results</h1>
          </Box>
        </Container>
    );
}