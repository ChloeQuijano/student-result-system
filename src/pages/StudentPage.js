import * as React from 'react';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import StudentGrid from '../components/StudentGrid';
import './StudentPage.css';

export default function StudentPage() {
      const [dateOfBirth, setdateOfBirth] = React.useState(dayjs());
      const [firstName, setFirstName] = React.useState('');
      const [lastName, setLastName] = React.useState('');
      const [error, setError] = React.useState('');
      const [successMessageOpen, setSuccessMessageOpen] = React.useState(false);
      const [successMessage, setSuccessMessage] = React.useState('');
      const [triggerFetch, setTriggerFetch] = React.useState(false);

      const validateName = (name) => {
        const regex = /^[a-zA-Z\s]+$/; // Allow letters and spaces
        return regex.test(name);
      };

      const validateAge = (date) => {
        const today = dayjs();
        const birthdate = dayjs(date);
        console.log(birthdate)
    
        const years = today.diff(birthdate, 'year');
        console.log(years)
    
        if (years < 10) {
          return false; // Age is less than 10, validation fails
        } else {
          return true
        }
      };

      const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        // Retrieve specific form field values using the get method
        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        
        if (!validateName(firstName)) {
          setError('Invalid first name. Please use letters only.')
        } else if (!validateName(lastName)) {
          setError('Invalid last name. Please use letters only.')
        } else if (!validateAge(dateOfBirth)) {
          setError('Invalid date of birth')
        } else {
          console.log({
            firstName,
            lastName,
            dateOfBirth,
          });

          const formData = {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
          };

          fetch('/api/students', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }).then((response) => {
            if (response.ok) {
              // Clear form fields
              setFirstName('');
              setLastName('');
              setdateOfBirth(dayjs('')); // Reset dateOfBirth to an empty Day.js object
              setError('');

              // Show success message
              setSuccessMessage('Form submitted successfully');
              setSuccessMessageOpen(true);

              // Set the trigger to re-fetch data
              setTriggerFetch(!triggerFetch);
            } else {
              console.error('Failed to create student:', response.statusText);
            }
          }).catch((error) => {
            console.error('Error creating student:', error);
          });
        }
      };
    
      const handleSuccessMessageClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        setSuccessMessageOpen(false);
      };

      const handleChange = (value) => {
        setdateOfBirth(value);
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
                <PeopleAltIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Student Submission
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstName} // Set the value to the state variable
                    onChange={(e) => setFirstName(e.target.value)} // Update the state variable on change
                  />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName} // Set the value to the state variable
                    onChange={(e) => setLastName(e.target.value)} // Update the state variable on change
                  />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        required
                        fullWidth
                        label="Date of Birth"
                        id="dateOfBirth"
                        inputFormat="MM/DD/YYYY"
                        value={dateOfBirth}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
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
              <h1>Students</h1>
              <StudentGrid triggerFetch={triggerFetch} />
            </Box>
          </Container>
      );
}