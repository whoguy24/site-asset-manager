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

function BuildingForm() {

    const dispatch = useDispatch();

    const site = useSelector(store => store.siteReducer);
    const building = useSelector(store => store.buildingReducer);

    function refreshView () {
        dispatch({
            type: 'EDIT_BUILDING',
            payload: building
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: site
        })
    }

    function onInputUpdate(field, event) {
        const updatedBuilding = {...building};
        switch (field) {
            case 'name': 
                updatedBuilding.name = event
                break
            case 'type': 
                updatedBuilding.type = event
                break
            case 'operating_hours': 
                updatedBuilding.operating_hours = event
                break
            case 'year_built': 
                updatedBuilding.year_built = event
                break
            case 'floors': 
                updatedBuilding.floors = event
                break
            case 'description': 
                updatedBuilding.description = event
                break
            case 'comments': 
                updatedBuilding.comments = event
                break
            default:
        }
        dispatch({
            type: 'LOAD_BUILDING',
            payload: updatedBuilding
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
                                value={building.name || ''} 
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
                                value={building.type || ''} 
                                onChange={(event)=>onInputUpdate('type', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth size='small' 
                                label='Type' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={building.operating_hours || ''} 
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
                                value={building.year_built || ''} 
                                onChange={(event)=>onInputUpdate('year_built', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='Year Built' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={building.floors || ''} 
                                onChange={(event)=>onInputUpdate('floors', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth size='small' 
                                label='Floors' 
                                variant='outlined' 
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={building.description || ''} 
                                onChange={(event)=>onInputUpdate('description', event.target.value)} 
                                onBlur={refreshView} 
                                rows={4} 
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
                                value={building.comments || ''} 
                                onChange={(event)=>onInputUpdate('comments', event.target.value)}  
                                onBlur={refreshView} 
                                rows={5} 
                                multiline 
                                fullWidth 
                                size='small' 
                                label='Comments' 
                                variant='outlined' 
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

        </>
    );
}

export default BuildingForm;