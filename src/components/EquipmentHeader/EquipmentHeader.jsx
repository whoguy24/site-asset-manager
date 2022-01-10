import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';

import { useSelector } from 'react-redux'

import '../App/App.css';

function EquipmentHeader() {

    const equipment = useSelector(store => store.equipmentReducer);

    return (
        <AppBar id={'form_equipment_header'} position='static'>

            <Grid container direction='row' alignItems='center' justifyContent='space-between' >

                    <Grid item xs={11}>
                        <h3>{equipment.name}</h3>
                    </Grid>

                    {/* <Grid item xs={1}>
                        <button className={'equipment_header_button'}>Delete</button>
                    </Grid> */}

            </Grid>
            
        </AppBar>
    );
}

export default EquipmentHeader;