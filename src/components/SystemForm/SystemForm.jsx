import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import '../App/App.css';

function SystemForm() {

    const dispatch = useDispatch();

    const site = useSelector(store => store.siteReducer);
    const system = useSelector(store => store.systemReducer);

    function refreshView () {
        dispatch({
            type: 'EDIT_SYSTEM',
            payload: system
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: site
        })
    }

    function onInputUpdate(field, event) {
        const updatedSystem = {...system};
        switch (field) {
            case 'name': 
                updatedSystem.name = event
                break
            case 'operating_hours': 
                updatedSystem.operating_hours = event
                break
            case 'sequence_of_operation': 
                updatedSystem.sequence_of_operation = event
                break
            case 'performance_metrics': 
                updatedSystem.performance_metrics = event
                break
            case 'recommended_set_points': 
                updatedSystem.recommended_set_points = event
                break
            case 'description': 
                updatedSystem.description = event
                break
            case 'comments': 
                updatedSystem.comments = event
                break
            default:
        }
        dispatch({
            type: 'LOAD_SYSTEM',
            payload: updatedSystem
        })
    }

    return (
        <>
            <Grid container className={'app-form-body-container'} direction='row' spacing={2}>

                <Grid item xs={4}>
                    <Grid container direction='column' spacing={2} >
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={system.name || ''} 
                                onChange={(event)=>onInputUpdate('name', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='Name' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={system.operating_hours || ''} 
                                onChange={(event)=>onInputUpdate('operating_hours', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='Operating Hours' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={system.sequence_of_operation || ''} 
                                onChange={(event)=>onInputUpdate('sequence_of_operation', event.target.value)} 
                                onBlur={refreshView} 
                                rows={6} 
                                multiline 
                                fullWidth 
                                size='small' 
                                label='Sequence of Operation' 
                                variant='outlined' 
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container direction='column' spacing={2}>

                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={system.description || ''} 
                                onChange={(event)=>onInputUpdate('description', event.target.value)} 
                                onBlur={refreshView} 
                                rows={5} 
                                multiline 
                                fullWidth 
                                size='small' 
                                label='Description' 
                                variant='outlined' 
                            />
                        </Grid>

                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={system.comments || ''} 
                                    onChange={(event)=>onInputUpdate('comments', event.target.value)} 
                                    onBlur={refreshView} 
                                    rows={4} 
                                    multiline 
                                    fullWidth 
                                    size='small' 
                                    label='Comments' 
                                    variant='outlined' 
                                />
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid container  direction='column' spacing={2}>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={system.performance_metrics || ''} 
                                    onChange={(event)=>onInputUpdate('performance_metrics', event.target.value)} 
                                    onBlur={refreshView} 
                                    rows={5} 
                                    multiline 
                                    fullWidth 
                                    size='small' 
                                    label='Performance Metrics' 
                                    variant='outlined' 
                                />
                            </Grid>

                            <Grid item>
                                    <TextField 
                                        className='app-form-body-text-field' 
                                        value={system.recommended_set_points || ''} 
                                        onChange={(event)=>onInputUpdate('recommended_set_points', event.target.value)} 
                                        onBlur={refreshView} 
                                        rows={4} 
                                        multiline 
                                        fullWidth 
                                        size='small' 
                                        label='Recommended Set Points' 
                                        variant='outlined' 
                                    />
                            </Grid>
                    </Grid>
                </Grid>

            </Grid>

        </>
    );
}

export default SystemForm;