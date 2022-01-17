///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Import Material-UI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component will allow a user to register credentials for the application.
// This component will also redirect a user to the login page when the cancel button is pressed.

function AppRegister() {

    // Define Library Variables
    const dispatch = useDispatch();
    const history = useHistory();
  
    // Define Local States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Register Button
    function handleRegisterButton() {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
        },
      });
      alert('Registration Successful!')
      history.push('/login');
    };

    // Register Cancel
    function handleCancelButton() {
        history.push('/login');
    }

    // Render DOM
    return (
        <>

            {/* Registration Page */}
            <Grid container className={'app-background'} direction='row' justifyContent='center' alignItems='center'>
                <Grid item >
                    <Paper className={'app-admin-card'} elevation={24}>
                        <form onSubmit={handleRegisterButton}>
                            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={4}>
                                <Grid item>
                                    <h3>Welcome to Site Asset Manager!</h3>
                                    <center><h3>Register:</h3></center>
                                </Grid>
                                <Grid item>
                                    <TextField label='User Name' required value={username} onChange={(event) => setUsername(event.target.value)} variant='outlined' />
                                </Grid>
                                <Grid item>
                                    <TextField type='password' required value={password} onChange={(event) => setPassword(event.target.value)} label='Password' variant='outlined' />
                                </Grid>
                                <Grid item>
                                    <Grid container direction='row' spacing={2} justifyContent='center' alignItems='center'>
                                        <Grid item>
                                            <Button variant="outlined" onClick={handleCancelButton}>Cancel</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" onClick={handleRegisterButton}>Register</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <input type="submit" hidden />
                        </form>
                    </Paper>
                </Grid>
            </Grid>

        </>
    );
}

// Export Component Function
export default AppRegister;