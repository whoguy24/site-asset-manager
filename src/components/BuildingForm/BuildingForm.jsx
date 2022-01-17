///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

// Import Material-UI
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Import App Components
import SystemTable from '../SystemTable/SystemTable';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component will render the selected building's details.
// Users will be able to edit information about a building, and updated fields will automatically update the database.
// This view is also responsible for rendering a table of related systems.

function BuildingForm() {

    // Define Library Variables
    const Alert = MuiAlert
    const dispatch = useDispatch();

    // Define Redux Stores
    const building = useSelector(store => store.buildingReducer);

    // Define Local States
    const [addSystemInput, setAddSystemInput] = useState('');
    const [saveMode, setSaveMode] = useState(false);
    const [addSystemMode, setAddSystemMode] = useState(false);

    // Update Database with Changes
    function refreshView () {
        dispatch({
            type: 'EDIT_BUILDING',
            payload: building
        })
        setSaveMode(true)
    }

    // Update Redux Store with Updated Inputs
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

    // Add System Button
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

    // Handle Snackbar Logic
    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    // Render DOM
    return (
        <>

            {/* Form View */}
            <Grid container 
                className={'app-form-body-container'} 
                spacing={2} 
                alignItems='flex-end' 
                justifyContent='flex-start' 
                direction='column' 
            >

                {/* Upper Form View - Text Fields */}
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

                {/* Lower Form View */}
                <Grid item>
                    <Button size='small' variant='contained' onClick={()=>setAddSystemMode(true)}>New System</Button>
                </Grid>
                <Grid id='form-body-lower' item>
                    <SystemTable systems={building.systems}/>
                </Grid>

            </Grid>

            {/* Database Commit Snackbar */}
            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {building.name} were saved successfully.
                </Alert>
            </Snackbar>

            {/* Modal Add System Dialog */}
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

// Export Component Function
export default BuildingForm;