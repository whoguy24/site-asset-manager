import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import TextField from '@mui/material/TextField';

import EquipmentPhotos from '../EquipmentPhotos/EquipmentPhotos';
import EquipmentActivities from '../EquipmentActivities/EquipmentActivities';
import EquipmentIssues from '../EquipmentIssues/EquipmentIssues';
import EquipmentEnergy from '../EquipmentEnergy/EquipmentEnergy';

import './EquipmentForm.css';

function EquipmentForm() {

    const [subNavigation, setSubNavigation] = useState(0);

    function test (event, index) {
        setSubNavigation(index)
    }

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


                        <Grid container direction='row' spacing={2} alignItems='stretch'>

                            <Grid item >
                                <TextField label="Name" variant="outlined" />
                            </Grid>

                            <Grid item >
                                <TextField label="Location" variant="outlined" />
                            </Grid>

                            <Grid item >
                                <TextField label="Area Served" variant="outlined" />
                            </Grid>

                            <Grid item >
                                <TextField label="Condition" variant="outlined" />
                            </Grid>

                            <Grid item >
                                <TextField label="Manufacturer" variant="outlined" />
                            </Grid>

                            <Grid item >
                                <TextField label="Model Number" variant="outlined" />
                            </Grid>

                            <Grid item >
                                <TextField label="Sequence of Operation" variant="outlined" />
                            </Grid>

                        </Grid >


                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <Box className ={'equipment_form_header'}>
                        <p className={'equipment_form_header_label'}>Properties</p>
                    </Box>
                    <Box className={'form_box'}>
                    <Grid container direction='row' spacing={2} alignItems='stretch'>

                        <Grid item >
                            <TextField label="Horsepower" variant="outlined" />
                        </Grid>

                        <Grid item >
                            <TextField label="Amperage" variant="outlined" />
                        </Grid>

                        <Grid item >
                            <TextField label="Voltage" variant="outlined" />
                        </Grid>

                        <Grid item >
                            <TextField label="BHP" variant="outlined" />
                        </Grid>

                        <Grid item >
                            <TextField label="BTU" variant="outlined" />
                        </Grid>

                        <Grid item >
                            <TextField label="MBH" variant="outlined" />
                        </Grid>

                        <Grid item >
                            <TextField label="VFD" variant="outlined" />
                        </Grid>

                        <Grid item >
                            <TextField label="GPM" variant="outlined" />
                        </Grid>

                        <Grid item >
                            <TextField label="Capacity" variant="outlined" />
                        </Grid>

                        <Grid item >
                            <TextField label="Efficiency" variant="outlined" />
                        </Grid>

                        



                        </Grid >
                    </Box>
                </Grid>

            </Grid >


            <Box width='100vw'>
            <Grid container className={'equipment_subHeader'} alignItems='center' direction='row' justifyContent='space-between'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs className = {'equipment_subNavigation'} value={subNavigation} onChange={test} >
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

export default EquipmentForm;