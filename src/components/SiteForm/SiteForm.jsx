///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import Material-UI
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Import App Components
import BuildingTable from '../BuildingTable/BuildingTable';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component will render the selected sites's details.
// Users will be able to edit information about a site, and updated fields will automatically update the database.
// This view is also responsible for rendering a table of related buildings.

function SiteForm() {

    // Define Libary Variables
    const Alert = MuiAlert
    const dispatch = useDispatch();

    // Define Redux Stores
    const site = useSelector(store => store.siteReducer);

    // Define Local States
    const [saveMode, setSaveMode] = useState(false);
    const [addBuildingMode, setAddBuildingMode] = useState(false);
    const [addBuildingInput, setAddBuildingInput] = useState('');

    // Update Database with Changes
    function refreshView () {
        dispatch({
            type: 'EDIT_SITE',
            payload: site
        })
        setSaveMode(true)
    }

    // Update Redux Store with Updated Inputs
    function onInputUpdate(field, event) {
        console.log(event);
        if (!event) { event = undefined }
        const updatedSite = {...site};
        switch (field) {
            case 'name': 
                updatedSite.name = event
                break
            case 'address': 
                updatedSite.address = event
                break
            case 'city': 
                updatedSite.city = event
                break
            case 'state': 
                updatedSite.state = event
                break
            case 'zip': 
                updatedSite.zip = event
                break
            case 'description': 
                updatedSite.description = event
                break
            case 'comments': 
                updatedSite.comments = event
                break
            default:
                return
        }
        dispatch({
            type: 'LOAD_SITE',
            payload: updatedSite
        })
    }

    // Handle Snackbar Logix
    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    // Add Building Button
    function handleAddBuildingButton() {
        setAddBuildingMode(false)
        dispatch({
            type: 'ADD_BUILDING',
            payload: {
                site_id: site.id,
                name: addBuildingInput
            }
        })
        setAddBuildingInput('')
        setSaveMode(true)
    }

    // Render DOM
    return (
        <>

            {/* Building Form */}
            <Grid container className={'app-form-body-container'} spacing={2} alignItems='flex-end' justifyContent='flex-start' direction='column' >

                {/* Upper Form - Text Fields */}
                <Grid item id='form-body-upper' >
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={4}>
                            <Grid container direction='column' spacing={2} >
                                <Grid item>
                                    <TextField 
                                        className='app-form-body-text-field' 
                                        value={site.name || ''} 
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
                                        value={site.address || ''} 
                                        onChange={(event)=>onInputUpdate('address', event.target.value)} 
                                        onBlur={refreshView} 
                                        fullWidth size='small' 
                                        label='Address' 
                                        variant='outlined' 
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField 
                                        className='app-form-body-text-field' 
                                        value={site.city || ''} 
                                        onChange={(event)=>onInputUpdate('city', event.target.value)} 
                                        onBlur={refreshView} 
                                        fullWidth 
                                        size='small' 
                                        label='City' 
                                        variant='outlined' 
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField 
                                        className='app-form-body-text-field' 
                                        value={site.state || ''} 
                                        onChange={(event)=>onInputUpdate('state', event.target.value)} 
                                        onBlur={refreshView} 
                                        fullWidth 
                                        size='small' 
                                        label='State' 
                                        variant='outlined' 
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField 
                                        className='app-form-body-text-field' 
                                        value={site.zip || ''} 
                                        onChange={(event)=>onInputUpdate('zip', event.target.value)} 
                                        onBlur={refreshView} 
                                        fullWidth size='small' 
                                        label='Zip' 
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
                                        value={site.description || ''} 
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
                                        value={site.comments || ''} 
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

                {/* Add Building Button */}
                <Grid item>
                    <Button size='small' variant='contained' onClick={()=>setAddBuildingMode(true)}>New Building</Button>
                </Grid>

                {/* Building Table */}
                <Grid id='form-body-lower' item>
                    <BuildingTable buildings={site.buildings}/>
                </Grid>

            </Grid>

            {/* Database Commit Snackbar */}
            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {site.name} were saved successfully.
                </Alert>
            </Snackbar>

            {/* Modal Add Building Dialog */}
            <Dialog open={addBuildingMode} onClose={()=>setAddBuildingMode(false)}>
                <DialogTitle>Add Building</DialogTitle>
                <DialogContent>
                    <TextField placeholder='Name' value={addBuildingInput} onChange={(event)=>setAddBuildingInput(event.target.value)}/>
                </DialogContent> 
                <DialogActions>
                    <Grid container direction='row' justifyContent='space-around'>
                        <Grid item>
                            <Button onClick={()=>setAddBuildingMode(false)} >Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={handleAddBuildingButton} >Create</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

        </>
    );
}

// Export Component Function
export default SiteForm;