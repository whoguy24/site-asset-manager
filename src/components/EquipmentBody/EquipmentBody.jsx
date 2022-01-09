import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';

import EquipmentTab from '../EquipmentTab/EquipmentTab';
import EquipmentFormGeneral from '../EquipmentFormGeneral/EquipmentFormGeneral';

import './EquipmentBody.css';

function EquipmentBody() {

    return (
        <>
            <Grid container direction='row' spacing={2}>
                <Grid item xs={4}>
                    <EquipmentFormGeneral />     
                </Grid>
            </Grid>
            <EquipmentTab />
        </>
    );
}

export default EquipmentBody;