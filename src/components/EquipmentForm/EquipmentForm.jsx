import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import './EquipmentForm.css';

function EquipmentForm() {

    return (
        <>
            <Grid container alignItems='center' direction='row' spacing={2} >

                <Grid item xs={3}>
                    <Box className ={'equipment_form_header'}>
                        <p className={'equipment_form_header_label'}>Featured Image</p>
                    </Box>
                    <Box className={'form_box'}>
                    </Box>
                </Grid>

                <Grid item xs={3}>
                    <Box className ={'equipment_form_header'}>
                        <p className={'equipment_form_header_label'}>General Information</p>
                    </Box>
                    <Box className={'form_box'}>
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Box className ={'equipment_form_header'}>
                        <p className={'equipment_form_header_label'}>Properties</p>
                    </Box>
                    <Box className={'form_box'}>
                    </Box>
                </Grid>

            </Grid >
        </>
    );
}

export default EquipmentForm;