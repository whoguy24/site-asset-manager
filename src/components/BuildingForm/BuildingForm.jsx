import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import SystemTable from '../SystemTable/SystemTable';

import '../App/App.css';

function BuildingForm() {

    const Alert = MuiAlert
    const dispatch = useDispatch();

    const site = useSelector(store => store.siteReducer);
    const building = useSelector(store => store.buildingReducer);

    const [saveMode, setSaveMode] = useState(false);

    function refreshView () {
        dispatch({
            type: 'EDIT_BUILDING',
            payload: building
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: site
        })
        setSaveMode(true)
    }

    function onInputUpdate(field, event) {
        if (!event) { 
            event = undefined;
        }
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
            type: 'EDIT_BUILDING',
            payload: updatedBuilding
        })
    }

    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    return (
        <>
            <Grid container className={'app-form-body-container'} direction='row' spacing={2}>

                <Grid item xs={3}>
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

                <Grid item xs={9}>
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

                <Grid id='form-body-lower' item>
                    <SystemTable systems={building.systems}/>
                </Grid>

            </Grid>

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {building.name} were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

export default BuildingForm;