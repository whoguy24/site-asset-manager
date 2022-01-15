import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import BuildingTable from '../BuildingTable/BuildingTable';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import '../App/App.css';

function SiteForm() {

    const Alert = MuiAlert
    const dispatch = useDispatch();

    const site = useSelector(store => store.siteReducer);

    const [addBuildingMode, setAddBuildingMode] = useState(false);
    const [saveMode, setSaveMode] = useState(false);

    const [addBuildingInput, setAddBuildingInput] = useState('');

    function refreshView () {
        dispatch({
            type: 'EDIT_SITE',
            payload: site
        })
        setSaveMode(true)
    }

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

    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

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

                <Grid item>
                    <Button size='small' variant='contained' onClick={()=>setAddBuildingMode(true)}>New Building</Button>
                </Grid>

                <Grid id='form-body-lower' item>
                    <BuildingTable buildings={site.buildings}/>
                </Grid>

            </Grid>

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {site.name} were saved successfully.
                </Alert>
            </Snackbar>

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

export default SiteForm;