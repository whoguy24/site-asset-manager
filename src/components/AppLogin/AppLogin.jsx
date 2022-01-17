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

// The function of this component is to allow users to sign into the app.
// This component also has a register button, which will redirect users to a registration page.

function AppLogin() {

    // Define Library Variables
    const dispatch = useDispatch();
    const history = useHistory();

    // Define Local States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    // Login Button Function
    function handleLoginButton(event) {
        event.preventDefault();
        if (username && password) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    username: username,
                    password: password,
                },
            });
            history.push('/main')
        } else {
            alert('Please populate all required fields.')
            dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
    };

    // Register Button Function
    function handleRegisterButton (){
        history.push('/register');
    }

    // Render DOM
    return (
        <>

            {/* Login Page */}
            <Grid container className={'app-background'} direction='row' justifyContent='center' alignItems='center'>
                <Grid item >
                    <Paper className={'app-admin-card'} elevation={24}>
                        <form onSubmit={handleLoginButton}>
                            <Grid container direction='column' justifyContent='center' alignItems='center' spacing={4}>
                                <Grid item>
                                    <h3>Welcome to Site Asset Manager!</h3>
                                    <center><h3>Log In:</h3></center>
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
                                            <Button variant="contained" onClick={handleRegisterButton}>Register</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" onClick={handleLoginButton}>Log In</Button>
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
export default AppLogin;