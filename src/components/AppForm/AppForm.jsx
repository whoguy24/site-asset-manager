import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import ConstructionIcon from '@mui/icons-material/Construction';
import Typography from '@mui/material/Typography';

import EquipmentHeader from '../EquipmentHeader/EquipmentHeader';
import EquipmentBody from '../EquipmentBody/EquipmentBody';

import TextField from '@mui/material/TextField';

import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react';

import '../App/App.css';

function AppForm() {

    const dispatch = useDispatch();

    const equipment = useSelector(store => store.equipmentReducer);

    let [editMode, setEditMode] = useState(false);

    let [nameInput, setNameInput] = useState('');
    let [locationInput, setLocationInput] = useState('');
    let [areaServedInput, setAreaServedInput] = useState('');


    function toggleEditMode() {
        setNameInput(equipment.name)
        setLocationInput(equipment.location)
        setAreaServedInput(equipment.area_served)
        setEditMode(true)
    }

    function saveChanges() {
        equipment.name = nameInput
        equipment.location = locationInput
        equipment.area_served = areaServedInput
        dispatch({ type: 'UPDATE_EQUIPMENT', payload: equipment });
        setEditMode(false)
    }

    function handleDelete() {
        dispatch({ type: 'DELETE_EQUIPMENT', payload: equipment });
        dispatch({ type: 'LOAD_EQUIPMENT', payload: {} });
    }

    return (
        <>

            { equipment.id && 

                <>

                    <AppBar id={'form_equipment_header'} position='static'>
                        <Grid container direction='row' alignItems='center' justifyContent='space-between' >
                            <Grid item xs={8}>
                                <h3>{equipment.name}</h3>
                            </Grid>
                                { !editMode?
                                    <button onClick={toggleEditMode}>Edit</button>
                                    :
                                    <button onClick={saveChanges}>Save</button>
                                }
                        </Grid>
                    </AppBar>

                    <Grid container id={'form_equipment_body_container'} direction='column' >

                    { !editMode?

                        
                            <Grid item>

                                <Grid container direction='column' spacing={2}>
                                    <Grid item>
                                        <p>Name: {equipment.name}</p>
                                        <p>Location: {equipment.location}</p>
                                        <p>Area Served: {equipment.area_served}</p>
                                    </Grid>
                                </Grid>

                                <button onClick={handleDelete}>Delete</button>

                            </Grid>

                            
                        

                        :
                        <>
                            <Grid container spacing={2} direction={'column'}>

                            <Grid item>
                                <TextField value={ nameInput } onChange={(event)=>{setNameInput(event.target.value)}} label='Name' variant='outlined' />
                            </Grid>
                            <Grid item>
                                <TextField value={ locationInput } label='Location' variant='outlined' />
                            </Grid>
                            <Grid item>
                                <TextField value={ areaServedInput } label='Area Served' variant='outlined' />
                            </Grid>

                            </Grid>
                        </>
                        }
                        </Grid>
                    
                </>

            }
        </>
    );
}

export default AppForm;