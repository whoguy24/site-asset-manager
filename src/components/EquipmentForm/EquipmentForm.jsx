///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import Material-UI
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Import App Components
import EquipmentActivitiesTable from '../EquipmentActivitiesTable/EquipmentActivitiesTable';
import EquipmentIssuesTable from '../EquipmentIssuesTable/EquipmentIssuesTable';
import EquipmentECMTable from '../EquipmentECMTable/EquipmentECMTable';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component will render the selected equipment's details.
// Users will be able to edit information about a piece of equipment, and updated fields will automatically update the database.
// This view is also responsible for rendering a table of related activities, issues and energy conservation measures.

function EquipmentForm() {

    // Define Library Variables
    const dispatch = useDispatch();
    const Alert = MuiAlert

    // Define Redux Stores
    const equipment = useSelector(store => store.equipmentReducer);

    // Define Local States
    const [saveMode, setSaveMode] = useState(false);
    const [tab, setTab] = useState(0);

    // Update Database with Changes
    function refreshView () {
        dispatch({
            type: 'EDIT_EQUIPMENT',
            payload: equipment
        })
        setSaveMode(true)
    }

    // Update Redux Store with Updated Inputs
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

    // Handle Snackbar Logic
    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    // Handle Tab Click
    function handleTabClick (event, index) {
        setTab(index)
    }

    // Render DOM
    return (
        <>

            {/* Form View */}
            <Grid container className={'app-form-body-container'} spacing={2} alignItems='flex-end' justifyContent='flex-start' direction='column' >
                
                {/* Upper Form View - Text Fields */}
                <Grid item id='form-body-upper' >
                    <Grid container direction='row' spacing={2}>
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
                    </Grid>
                 </Grid>

                {/* Lower Form View - Activities, Issues and ECM Tables */}
                 <Grid item id='form-body-lower'> 
                    <Tabs value={tab} onChange={handleTabClick}>
                        <Tab label='Activities'/>
                        <Tab label='Issues'/>
                        <Tab label='Energy Conservation'/>
                    </Tabs>
                    {tab === 0 && <EquipmentActivitiesTable equipment={equipment} activities={equipment.activities} />}
                    {tab === 1 && <EquipmentIssuesTable equipment={equipment} issues={equipment.issues} />}
                    {tab === 2 && <EquipmentECMTable equipment={equipment} ecms={equipment.ecms} />}
                 </Grid>

            </Grid>

            {/* Database Commit Snackbar */}
            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {equipment.name} were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

// Export Component Function
export default EquipmentForm;