import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';

function AppHeader() {

    return (
        <AppBar position="static">
            <Grid container alignItems='center'>
            <Grid item xs={11}>
                <h1>Site Asset Manager</h1>
            </Grid>
            <Grid item xs={1}>
                <button>Log in</button>
            </Grid>
            </Grid>
        </AppBar>
    );
}

export default AppHeader;