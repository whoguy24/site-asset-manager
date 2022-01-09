import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';

import './Equipment.css';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import EquipmentForm from '../EquipmentForm/EquipmentForm';
import EquipmentPhotos from '../EquipmentPhotos/EquipmentPhotos';
import EquipmentActivities from '../EquipmentActivities/EquipmentActivities';
import EquipmentIssues from '../EquipmentIssues/EquipmentIssues';
import EquipmentEnergy from '../EquipmentEnergy/EquipmentEnergy';


function Equipment() {

    const dispatch = useDispatch();

    const equipment = useSelector(store => store.equipmentReducer[0]);

    const [subNavigation, setSubNavigation] = useState(0);

    function handleDeleteClick(id) {
        dispatch({ type: 'DELETE_EQUIPMENT', payload: id });
    }

    function test (event, index) {
        setSubNavigation(index)
    }

    return (

        <>

        <Box width="100vw">

            <Grid container className = {'equipment_header'} alignItems='center' direction='row' justifyContent='space-between'>

                <Grid item xs={11}>
                    <h3 className={'equipment_header_text'}>Equipment Name</h3>
                </Grid>

                <Grid item xs={1}>
                    <button >Edit</button>
                    <button className={'equipment_header_button'}>Delete</button>
                </Grid>

            </Grid>

        </Box>

        <Box width='100vw'>
            <Grid container className={'equipment_subHeader'} alignItems='center' direction='row' justifyContent='space-between'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs className = {'equipment_subNavigation'} value={subNavigation} onChange={test} >
                    <Tab label='General' />
                    <Tab label='Photos' />
                    <Tab label='Activities' />
                    <Tab label='Issues' />
                    <Tab label='Energy' />
                </Tabs >
            </Box>
            </Grid>
        </Box>

        {subNavigation === 0 && <EquipmentForm />}
        {subNavigation === 1 && <EquipmentPhotos />}
        {subNavigation === 2 && <EquipmentActivities />}
        {subNavigation === 3 && <EquipmentIssues />}
        {subNavigation === 4 && <EquipmentEnergy />}

        </>








    );
}

export default Equipment;