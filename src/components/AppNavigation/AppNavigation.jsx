///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// Import Material-UI
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FolderIcon from '@mui/icons-material/Folder';
import Grid from '@mui/material/Grid';

// Import App Components
import NavigationTree from '../NavigationTree/NavigationTree';
import SiteTableRow from '../SiteTableRow/SiteTableRow';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component is responsible for rendering the asset navigation menu on the left.
// This includes the open site button, as well as the asset navigation tree.

function AppNavigation() {

    // Define Library Variables
    const dispatch = useDispatch();

    // Define Redux Stores
    const sites = useSelector(store => store.sitesReducer);
    const site = useSelector(store => store.siteReducer);

    // Define Local States
    const [loadSite, setLoadSite] = useState(false);
    const [addSiteName, setAddSiteName] = useState('');
    const [selectedItem, setSelectedItem] = useState({});

    // Open Site Button
    function handleLoadSiteButton() {
        dispatch({ type: 'FETCH_SITES' });
        setLoadSite(true);
        console.log(selectedItem);
    };

    // Close Modal Sites Dialog
    function handleSiteCloseButton() {
        setLoadSite(false);
    };

    // Add Site from Text Field in Modal Sites Dialog
    function handleAddSite() {
        if (addSiteName) {
            dispatch({
                type: 'ADD_SITE',
                payload: { name: addSiteName  }
            })
            setAddSiteName('')
        }   
    };

    // Open Site in Modal Sites Dialog
    function handleLoadButton(site) {
        dispatch({
            type: 'SET_TABLE',
            payload: 'site'
        }) 
        dispatch({
            type: 'FETCH_SITE',
            payload: site
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: {table: 'site', id: site.id}
        })
        setLoadSite(false);
    };

    // Render DOM
    return (
        <>

            {/* Main Asset Navigation */}
            <Grid container id={'app-navigation'} direction='column' >
                <Grid container id={'app-navigation-site-section'} alignItems='center' justifyContent="space-between">
                    <Button id={'app-navigation-site-button'} onClick={handleLoadSiteButton} startIcon={<FolderIcon />} variant='contained'>Open Site</Button>
                </Grid>
                { site.id && <NavigationTree setSelectedItem={setSelectedItem} /> }
            </Grid>

            {/* Modal Sites Dialog */}
            <Dialog open={loadSite} onClose={handleSiteCloseButton}>
                <DialogTitle>Open Site</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {sites.map((site) => (
                                    <TableRow key={site.id}>
                                        <SiteTableRow site={site} loadButtonFunction={()=>handleLoadButton(site)}/>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>
                                        <TextField size='small' value={addSiteName} placeholder='New Site' fullWidth onChange={()=>setAddSiteName(event.target.value)} onBlur={handleAddSite}></TextField>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSiteCloseButton}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

// Export Component Function
export default AppNavigation;