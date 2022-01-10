import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../App/App.css';

function AppLogin() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
  
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
        // TODO: history.push to desired page
      } else {
        dispatch({ type: 'LOGIN_INPUT_ERROR' });
        alert('There was an error logging in.')
      }
    };

    function handleRegisterButton (){
        history.push('/register');
    }



    return (
        <Grid container className={'app-background'} direction='row' justifyContent='center' alignItems='center'>
            <Grid item >
                <Paper id={'app-login-card'} elevation={24}>
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
                </Paper>
            </Grid>
        </Grid>
    );
}

export default AppLogin;