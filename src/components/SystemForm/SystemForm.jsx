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

import EquipmentTable from '../EquipmentTable/EquipmentTable';

import '../App/App.css';

function SystemForm() {

    const dispatch = useDispatch();
    const Alert = MuiAlert

    const system = useSelector(store => store.systemReducer);

    const [saveMode, setSaveMode] = useState(false);

    const [addEquipmentInput, setAddEquipmentInput] = useState('');
    const [addEquipmentMode, setAddEquipmentMode] = useState(false);

    function refreshView () {
        dispatch({
            type: 'EDIT_SYSTEM',
            payload: system
        })
        setSaveMode(true)
    }

    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    function handleAddEquipmentButton() {
        setAddEquipmentMode(false)
        dispatch({
            type: 'ADD_EQUIPMENT',
            payload: {
                system_id: system.id,
                name: addEquipmentInput
            }
        })
        setAddEquipmentInput('')
        setSaveMode(true)
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
            <Grid container className={'app-form-body-container'} spacing={2} alignItems='flex-end' justifyContent='flex-start' direction='column' >

                <Grid item id='form-body-upper' >

                    <Grid container direction='row' spacing={2}>

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

                    </Grid>


                <Grid item>
                    <Button size='small' variant='contained' onClick={()=>setAddEquipmentMode(true)}>New Equipment</Button>
                </Grid>

                <Grid id='form-body-lower' item>
                    <EquipmentTable equipment={system.equipment}/>
                </Grid>

            </Grid>

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {system.name} were saved successfully.
                </Alert>
            </Snackbar>

            <Dialog open={addEquipmentMode} onClose={()=>setAddEquipmentMode(false)}>
                <DialogTitle>Add Equipment</DialogTitle>
                <DialogContent>
                    <TextField placeholder='Name' value={addEquipmentInput} onChange={(event)=>setAddEquipmentInput(event.target.value)}/>
                </DialogContent> 
                <DialogActions>
                    <Grid container direction='row' justifyContent='space-around'>
                        <Grid item>
                            <Button onClick={()=>setAddEquipmentMode(false)} >Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={handleAddEquipmentButton} >Create</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default SystemForm;