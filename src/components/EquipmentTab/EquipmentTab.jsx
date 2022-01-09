import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import EquipmentPhotos from '../EquipmentPhotos/EquipmentPhotos';
import EquipmentActivities from '../EquipmentActivities/EquipmentActivities';
import EquipmentIssues from '../EquipmentIssues/EquipmentIssues';
import EquipmentEnergy from '../EquipmentEnergy/EquipmentEnergy';

import { useState } from 'react';

function EquipmentTab() {

    const [subNavigation, setSubNavigation] = useState(0);

    function handleTabClick (event, index) {
        setSubNavigation(index)
    }

    return (
        <>
            <Box width='100vw'>
                <Grid container className={'equipment_subHeader'} alignItems='center' direction='row' justifyContent='space-between'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs className = {'equipment_subNavigation'} value={subNavigation} onChange={handleTabClick} >
                        <Tab label='Photos' />
                        <Tab label='Activities' />
                        <Tab label='Issues' />
                        <Tab label='Energy' />
                    </Tabs >
                </Box>
                </Grid>
            </Box>

            {subNavigation === 0 && <EquipmentPhotos />}
            {subNavigation === 1 && <EquipmentActivities />}
            {subNavigation === 2 && <EquipmentIssues />}
            {subNavigation === 3 && <EquipmentEnergy />}
        </>
    );
}

export default EquipmentTab;