import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';

function AppFormPlaceholder () {
    
    return (
        <>
            <Grid container id='app-placeholder' direction='column' alignItems='center' justifyContent='flex-start'>
                <Grid item>
                    <center>
                        <h3>Welcome to Site Asset Manager!</h3>
                        <p>Open a site on the left to continue.</p>
                        <ConstructionIcon color='disabled' sx={{ fontSize: 200 }}/>
                    </center>
                </Grid>
            </Grid>
        </>
    )
}

export default AppFormPlaceholder;