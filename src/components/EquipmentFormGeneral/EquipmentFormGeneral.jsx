import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

function EquipmentFormGeneral() {

    return (
        <>
            <Grid container direction='row' spacing={2} padding={2}>
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
            </Grid>
        </>
    );
}

export default EquipmentFormGeneral;