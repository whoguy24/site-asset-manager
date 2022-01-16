import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import SystemTable from '../SystemTable/SystemTable';

import '../App/App.css';

function BuildingForm() {

    const Alert = MuiAlert
    const dispatch = useDispatch();

    const building = useSelector(store => store.buildingReducer);

    const [addSystemInput, setAddSystemInput] = useState('');
    const [saveMode, setSaveMode] = useState(false);
    const [addSystemMode, setAddSystemMode] = useState(false);

    function refreshView () {
        dispatch({
            type: 'EDIT_BUILDING',
            payload: building
        })
        setSaveMode(true)
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

    function handleAddSystemButton() {
        setAddSystemMode(false)
        dispatch({
            type: 'ADD_SYSTEM',
            payload: {
                building_id: building.id,
                name: addSystemInput
            }
        })
        setAddSystemInput('')
        setSaveMode(true)
    }

    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    return (
        <>
            <Grid container className={'app-form-body-container'} spacing={2} alignItems='flex-end' justifyContent='flex-start' direction='column' >

                <Grid item id='form-body-upper' >

                    <Grid container direction='row' spacing={2}>

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

                </Grid>

                <Grid item>
                    <Button size='small' variant='contained' onClick={()=>setAddSystemMode(true)}>New System</Button>
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

            <Dialog open={addSystemMode} onClose={()=>setAddSystemMode(false)}>
                <DialogTitle>Add System</DialogTitle>
                <DialogContent>
                    <TextField placeholder='Name' value={addSystemInput} onChange={(event)=>setAddSystemInput(event.target.value)}/>
                </DialogContent> 
                <DialogActions>
                    <Grid container direction='row' justifyContent='space-around'>
                        <Grid item>
                            <Button onClick={()=>setAddSystemMode(false)} >Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={handleAddSystemButton} >Create</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default BuildingForm;