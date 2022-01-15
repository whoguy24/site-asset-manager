import Grid from '@mui/material/Grid';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

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
import NavigationTree from '../NavigationTree/NavigationTree';
import SiteTableCell from '../SiteTableRow/SiteTableRow';

import '../App/App.css';

function AppNavigation() {

    const dispatch = useDispatch();
    const sites = useSelector(store => store.sitesReducer);
    const site = useSelector(store => store.siteReducer);

    const [loadSite, setLoadSite] = useState(false);

    const [addSiteName, setAddSiteName] = useState('');

    const [selectedItem, setSelectedItem] = useState({});

    function handleLoadSiteButton() {
        dispatch({ type: 'FETCH_SITES' });
        setLoadSite(true);
        console.log(selectedItem);
    };

    function handleSiteCloseButton() {
        setLoadSite(false);
    };

    function handleAddSite() {
        if (addSiteName) {
            dispatch({
                type: 'ADD_SITE',
                payload: { name: addSiteName  }
            })
            setAddSiteName('')
        }   
    };

    function handleLoadButton(site) {
        dispatch({
            type: 'SET_TABLE',
            payload: 'site'
        }) 
        dispatch({
            type: 'FETCH_SITE',
            payload: site
        })
        console.log('In handleLoadButton', site);
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: site
        })
        setLoadSite(false);
    };

    return (
        <>

            <Grid container id={'app-navigation'} direction='column' >
                <Grid container id={'app-navigation-site-section'} alignItems='center' justifyContent="space-between">
                    <Button id={'app-navigation-site-button'} onClick={handleLoadSiteButton} startIcon={<FolderIcon />} variant='contained'>Open Site</Button>
                </Grid>
                { site.id && <NavigationTree setSelectedItem={setSelectedItem} /> }
            </Grid>

            <Dialog open={loadSite} onClose={handleSiteCloseButton}>
                <DialogTitle>Open Site</DialogTitle>

                <DialogContent>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {sites.map((site) => (
                                    <TableRow key={site.id}>
                                        <SiteTableCell site={site} loadButtonFunction={()=>handleLoadButton(site)}/>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell></TableCell>
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

export default AppNavigation;