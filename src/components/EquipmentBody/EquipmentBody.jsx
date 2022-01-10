import Grid from '@mui/material/Grid';


import React, { useState, useEffect } from 'react';


import { useSelector, useDispatch } from 'react-redux'

import TextField from '@mui/material/TextField';

import EquipmentTab from '../EquipmentTab/EquipmentTab';
import EquipmentFormGeneral from '../EquipmentFormGeneral/EquipmentFormGeneral';

import './EquipmentBody.css';

function EquipmentBody() {

    const dispatch = useDispatch();

    const equipment = useSelector(store => store.equipmentReducer);

    let [editMode, setEditMode] = useState(false);

    // function handleInputChange(event) {
    //     equipment.name = event
    //     dispatch({ type: 'LOAD_EQUIPMENT', payload: equipment });
    // }

    // <TextField defaultValue={ equipment.name || '' } onChange={(event)=>{handleInputChange( event.target.value)}} label='Name' variant='outlined' />

    return (
        <>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <p>Name: {equipment.name}</p>
                    <p>Location: {equipment.location}</p>
                    <p>Area Served: {equipment.area_served}</p>
                </Grid>
            </Grid>
        </>
    );
}

export default EquipmentBody;