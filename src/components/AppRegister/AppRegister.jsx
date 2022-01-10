import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../App/App.css';

function AppRegister() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
  
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

    function handleCancelButton() {
        history.push('/login');
    }

    return (
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
    );
}

export default AppRegister;