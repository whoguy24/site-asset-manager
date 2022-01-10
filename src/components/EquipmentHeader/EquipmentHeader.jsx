import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';

import '../App/App.css';

function EquipmentHeader() {

    return (
        <AppBar id={'equipment_header'} position='static'>
            <Grid container alignItems='center' direction='row' justifyContent='space-between'>

                    <Grid item xs={11}>
                        <h3>Equipment Name</h3>
                    </Grid>

                    <Grid item xs={1}>
                        <button className={'equipment_header_button'}>Delete</button>
                    </Grid>

            </Grid>
        </AppBar>
    );
}

export default EquipmentHeader;