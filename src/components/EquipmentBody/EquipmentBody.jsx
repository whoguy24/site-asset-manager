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

    function handleInputChange(event) {
        equipment.name = event
        dispatch({ type: 'LOAD_EQUIPMENT', payload: equipment });
    }

    return (
        <>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <TextField value={ equipment.name || '' } onChange={(event)=>{handleInputChange( event.target.value)}} label='Name' variant='outlined' />
                </Grid>
            </Grid>
        </>
    );
}

export default EquipmentBody;