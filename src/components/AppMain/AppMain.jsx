///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

// Import Material-UI
import Grid from '@mui/material/Grid';

// Import App Components
import AppHeader from '../AppHeader/AppHeader';
import AppNavigation from '../AppNavigation/AppNavigation';
import AppForm from '../AppForm/AppForm';
import AppFormPlaceholder from '../AppFormPlaceholder/AppFormPlaceholder';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component is responsible for rendering the main app header, left-side asset navigation, form views and the footer.

function AppMain() {

    // Define Library Variables
    const dispatch = useDispatch();

    // Define Redux Stores
    const site = useSelector(store => store.siteReducer);

    // Run on Component Load
    useEffect(() => {
        dispatch({ type: 'CLEAR_SITE' });
        dispatch({ type: 'CLEAR_BUILDING' });
        dispatch({ type: 'CLEAR_SYSTEM' });
        dispatch({ type: 'CLEAR_EQUIPMENT' });
        dispatch({ type: 'CLEAR_NAVIGATION' });
      }, []);

    // Render DOM
    return (
        <>

            {/* Main Page - Header, Asset Navigation and Main Form View */}
            <div >
                <AppHeader/>
                <Grid container direction='row'>
                    <Grid item xs={3}>
                        <AppNavigation/>
                    </Grid>
                    <Grid item xs={9}>
                        {site.id? <AppForm /> : <AppFormPlaceholder/> }
                    </Grid>
                </Grid>
                <center>
                    <footer id={'app-footer'}>&copy;2022 Warren O'Brien</footer>
                </center>
            </div>

        </>
    );
}

// Export Component Function
export default AppMain;