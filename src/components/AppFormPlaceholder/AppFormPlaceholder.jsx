///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import Material-UI
import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This view will become visible when no site is selected, so the user can understand how to proceed.

function AppFormPlaceholder () {
    
    // Render DOM
    return (
        <>

            {/* Placeholder Page */}
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

// Export Component Function
export default AppFormPlaceholder;