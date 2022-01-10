import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import ConstructionIcon from '@mui/icons-material/Construction';
import Typography from '@mui/material/Typography';

import EquipmentHeader from '../EquipmentHeader/EquipmentHeader';
import EquipmentBody from '../EquipmentBody/EquipmentBody';

import { useSelector } from 'react-redux'

import '../App/App.css';

function AppForm() {

    const equipment = useSelector(store => store.equipmentReducer);

    return (
        <>

            { equipment.id && 

                <>
                    <EquipmentHeader/>

                    <Grid container id={'form_equipment_body_container'} direction='column' >
                        <Grid item>
                            <EquipmentBody />
                        </Grid>
                    </Grid>
                </>

            }
        </>
    );
}

export default AppForm;