import Grid from '@mui/material/Grid';

import Navigation from '../Navigation/Navigation';
import DropdownSite from '../DropdownSite/DropdownSite';
import EquipmentHeader from '../EquipmentHeader/EquipmentHeader';
import EquipmentBody from '../EquipmentBody/EquipmentBody';

import './AppBody.css';

function AppBody() {
    return (

        <>

            <Grid container direction='row' >

                <Grid item id={'navigation_pane'} xs={3}>

                    <Grid container direction='column'>

                        <Grid item xs={1}>
                            <DropdownSite />
                        </Grid>

                        <Grid item xs={11}>
                            <Navigation />
                        </Grid>

                    </Grid>

                </Grid>

                <Grid item id={'form_pane'} xs={9}>
                    <EquipmentHeader />
                    <EquipmentBody />
                </Grid>

            </Grid>

        </>

    );
}

export default AppBody;