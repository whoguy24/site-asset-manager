import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import './EquipmentHeader.css';

function EquipmentHeader() {

    return (
        <Grid container className={'equipment_header'} alignItems='center' direction='row' justifyContent='space-between'>

                <Grid item xs={11}>
                    <h3>Equipment Name</h3>
                </Grid>

                <Grid item xs={1}>
                    <button className={'equipment_header_button'}>Delete</button>
                </Grid>

        </Grid>
    );
}

export default EquipmentHeader;