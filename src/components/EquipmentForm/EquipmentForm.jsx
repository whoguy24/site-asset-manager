import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import '../App/App.css';

function EquipmentForm() {

    const dispatch = useDispatch();
    const Alert = MuiAlert

    const site = useSelector(store => store.siteReducer);
    const equipment = useSelector(store => store.equipmentReducer);

    const [saveMode, setSaveMode] = useState(false);

    function refreshView () {
        dispatch({
            type: 'EDIT_EQUIPMENT',
            payload: equipment
        })
        setSaveMode(true)
    }

    function onInputUpdate(field, event) {
        const updatedEquipment = {...equipment};
        switch (field) {
            case 'name': 
                updatedEquipment.name = event
                break
            case 'location': 
                updatedEquipment.location = event
                break
            case 'area_served': 
                updatedEquipment.area_served = event
                break
            case 'condition': 
                updatedEquipment.condition = event
                break
            case 'manufacturer': 
                updatedEquipment.manufacturer = event
                break
            case 'model_number': 
                updatedEquipment.model_number = event
                break
            case 'sequence_of_operation': 
                updatedEquipment.sequence_of_operation = event
                break
            case 'amperage': 
                updatedEquipment.amperage = event
                break
            case 'voltage': 
                updatedEquipment.voltage = event
                break
            case 'BHP': 
                updatedEquipment.BHP = event
                break
            case 'BTU': 
                updatedEquipment.BTU = event
                break
            case 'CFM': 
                updatedEquipment.CFM = event
                break
            case 'MPH': 
                updatedEquipment.MPH = event
                break
            case 'VFD': 
                updatedEquipment.VFD = event
                break
            case 'efficiency': 
                updatedEquipment.efficiency = event
                break
            case 'horsepower': 
                updatedEquipment.horsepower = event
                break
            case 'capacity': 
                updatedEquipment.capacity = event
                break
            case 'description': 
                updatedEquipment.description = event
                break
            case 'comments': 
                updatedEquipment.comments = event
                break
            default:
        }
        dispatch({
            type: 'LOAD_EQUIPMENT',
            payload: updatedEquipment
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

                <Grid item xs={2}>
                    <Grid container direction='column' spacing={2} >
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={equipment.name || ''} 
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
                                value={equipment.location || ''} 
                                onChange={(event)=>onInputUpdate('location', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='Location' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={equipment.area_served || ''} 
                                onChange={(event)=>onInputUpdate('area_served', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='Area Served' 
                                variant='outlined' 
                            />
                        </Grid>

                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={equipment.manufacturer || ''} 
                                onChange={(event)=>onInputUpdate('manufacturer', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='Manufacturer' 
                                variant='outlined' 
                            />
                        </Grid>

                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={equipment.model_number || ''} 
                                onChange={(event)=>onInputUpdate('model_number', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='Model Number' 
                                variant='outlined' 
                            />
                        </Grid>



                    </Grid>
                </Grid>

                <Grid item xs={2}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.condition || ''} 
                                    onChange={(event)=>onInputUpdate('condition', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='Condition' 
                                    variant='outlined' 
                                />
                        </Grid>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.horsepower || ''} 
                                    onChange={(event)=>onInputUpdate('horsepower', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='Horsepower' 
                                    variant='outlined' 
                                />
                        </Grid>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.amperage || ''} 
                                    onChange={(event)=>onInputUpdate('amperage', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='Amperage' 
                                    variant='outlined' 
                                />
                        </Grid>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.voltage || ''} 
                                    onChange={(event)=>onInputUpdate('voltage', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='Voltage' 
                                    variant='outlined' 
                                />
                        </Grid>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.capacity || ''} 
                                    onChange={(event)=>onInputUpdate('capacity', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='Capacity' 
                                    variant='outlined' 
                                />
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs={1}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.BHP || ''} 
                                    onChange={(event)=>onInputUpdate('BHP', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='BHP' 
                                    variant='outlined' 
                                />
                        </Grid>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.BTU || ''} 
                                    onChange={(event)=>onInputUpdate('BTU', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='BTU' 
                                    variant='outlined' 
                                />
                        </Grid>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.CFM || ''} 
                                    onChange={(event)=>onInputUpdate('CFM', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='CFM' 
                                    variant='outlined' 
                                />
                        </Grid>
                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.MPH || ''} 
                                    onChange={(event)=>onInputUpdate('MPH', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='MPH' 
                                    variant='outlined' 
                                />
                        </Grid>

                        <Grid item>
                                <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.VFD || ''} 
                                    onChange={(event)=>onInputUpdate('VFD', event.target.value)} 
                                    onBlur={refreshView} 
                                    fullWidth 
                                    size='small' 
                                    label='VFD' 
                                    variant='outlined' 
                                />
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={7}>

                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={5}>
                            <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.description || ''} 
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
                        <Grid item xs={7}>
                            <TextField 
                                    className='app-form-body-text-field' 
                                    value={equipment.sequence_of_operation || ''} 
                                    onChange={(event)=>onInputUpdate('sequence_of_operation', event.target.value)} 
                                    onBlur={refreshView} 
                                    rows={5} 
                                    multiline 
                                    fullWidth 
                                    size='small' 
                                    label='Sequence of Operation' 
                                    variant='outlined' 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={equipment.comments || ''} 
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

                        {/* <Grid item xs={5}>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={equipment.comments || ''} 
                                onChange={(event)=>onInputUpdate('comments', event.target.value)} 
                                onBlur={refreshView} 
                                rows={5} 
                                multiline 
                                fullWidth 
                                size='small' 
                                label='Comments' 
                                variant='outlined' 
                            />
                        </Grid> */}   


                    


                {/* <Grid item xs={4}>
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
                </Grid> */}

            </Grid>



            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        {site.buildings.map((building) => (
                            <TableRow key={building.id}>
                                <TableCell component="th" scope="row">
                                    <p>{building.name}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {equipment.name} were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

export default EquipmentForm;