import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import DropdownSite from '../DropdownSite/DropdownSite';
import Navigation from '../Navigation/Navigation';

import '../App/App.css';

function AppNavigation() {

    return (
        <>
            <Grid container id={'app-navigation-container'} direction='column'>
                <Grid item id={'app-navigation-container-dropdown'} padding={1}>
                    <DropdownSite/>
                </Grid>
                <Grid item padding={1}>
                    <Navigation/>
                </Grid>
            </Grid>
        </>
    );
}

export default AppNavigation;