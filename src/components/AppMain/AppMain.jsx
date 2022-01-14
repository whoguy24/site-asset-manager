import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { useDispatch } from 'react-redux';

import React, { useEffect } from 'react';

import AppHeader from '../AppHeader/AppHeader';
import AppNavigation from '../AppNavigation/AppNavigation';
import AppForm from '../AppForm/AppForm';

import '../App/App.css';

function AppMain() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'CLEAR_SITE' });
        dispatch({ type: 'CLEAR_BUILDING' });
        dispatch({ type: 'CLEAR_SYSTEM' });
        dispatch({ type: 'CLEAR_EQUIPMENT' });
        dispatch({ type: 'CLEAR_NAVIGATION' });
      }, []);

    return (
        <div>
            <AppHeader/>
            <Grid container direction='row'>
                <Grid item xs={3}>
                    <AppNavigation/>
                </Grid>
                <Grid item xs={9}>
                    <AppForm />
                </Grid>
            </Grid>
            <center>
                <footer id={'app-footer'}>&copy;2022 Warren O'Brien</footer>
            </center>
        </div>
    );
}

export default AppMain;