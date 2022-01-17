///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Import Material-UI
import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component will render the blue app bar across the top, global to all main app components.
// It displays the app name, the currently logged in user as well as a button to log out of the application.

function AppHeader() {

    // Define Library Variables
    const dispatch = useDispatch();
    const history = useHistory();

    // Define Reducers
    const user = useSelector(store => store.user);

    // Log Out Button
    // Will log out the user, and return to the sign-in page
    function handleLogOutButton() {
        dispatch({ type: 'LOGOUT' })
        history.push('/login')
    }

    // Render DOM
    return (
        <>

            {/* Global App Bar */}
            <AppBar id={'app-header'} position='static' >
                <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                    <Grid item>
                        <Grid container direction='row' alignItems='center' spacing={1}>
                            <Grid item >
                                <ConstructionIcon />
                            </Grid>
                            <Grid item >
                                <h3>Site Asset Manager</h3>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={2} direction='row' alignItems='center'>
                            <Grid item>
                                <p>{user.username}</p>
                            </Grid>
                            <Grid item>
                                <Button id={'app-header-logout-button'} onClick={handleLogOutButton} size='small' variant='contained'>Log Out</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AppBar>
            
        </>
    );
}

// Export Component Function
export default AppHeader;