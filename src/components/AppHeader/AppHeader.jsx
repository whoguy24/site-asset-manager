import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import ConstructionIcon from '@mui/icons-material/Construction';
import Typography from '@mui/material/Typography';

import '../App/App.css';

function AppHeader() {

    return (
        <AppBar id={'app-header'} position='static'>
            <Grid container id={'app-header-container'} direction='row' alignItems='center'>
              <Grid item>
                <ConstructionIcon/>
              </Grid>
              <Grid item>
              <Typography variant='h6' padding={1} >Site Asset Manager</Typography>
              </Grid>
            </Grid>
        </AppBar>
    );
}

export default AppHeader;