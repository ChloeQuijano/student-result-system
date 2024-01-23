import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SchoolIcon from '@mui/icons-material/School';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CourseGrid from '../components/CourseGrid';

export default function CoursePage() {
    const [courseName, setCourseName] = React.useState('');
    const [successMessageOpen, setSuccessMessageOpen] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
    const [error, setError] = React.useState('');
    const [triggerFetch, setTriggerFetch] = React.useState(false);

    const validateCourseName = (coursename) => {
        const regex = /^[a-zA-Z\s]+$/; // Allow letters and spaces
        return regex.test(coursename);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        // Retrieve specific form field values using the get method
        const courseName = data.get('courseName');
        
        if (!validateCourseName(courseName)) {
          setError('Invalid first name. Please use letters only.')
        } else {
          console.log({
            courseName
          });

          const formData = {
            courseName: courseName,
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
              setCourseName('')

              // Show success message
              setSuccessMessage('Form submitted successfully');
              setSuccessMessageOpen(true);

              // Set the trigger to re-fetch data
              setTriggerFetch(!triggerFetch);
            } else {
              console.error('Failed to create course:', response.statusText);
            }
          }).catch((error) => {
            console.error('Error creating course:', error);
          });
        }
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
              <SchoolIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Course Submission
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                  autoComplete="course-name"
                  name="courseName"
                  required
                  fullWidth
                  id="courseName"
                  label="Course Name"
                  autoFocus
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
                </Grid>
              </Grid>
              {error && (
                <Box mt={2} color="error.main">
                  {error}
                </Box>
              )}
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
            <h1>Courses</h1>
            <CourseGrid triggerFetch={triggerFetch} />
          </Box>
        </Container>
    );
}