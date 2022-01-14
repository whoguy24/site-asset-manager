import Grid from '@mui/material/Grid';

import { useEffect, useState } from 'react';
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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import FolderIcon from '@mui/icons-material/Folder';

import NavigationTree from '../NavigationTree/NavigationTree';
import SiteTableCell from '../SiteTableCell/SiteTableCell';

import '../App/App.css';

function AppNavigation() {

    const dispatch = useDispatch();
    const sites = useSelector(store => store.sitesReducer);
    const site = useSelector(store => store.siteReducer);

    const table = useSelector(store => store.tableReducer);

    const [loadSite, setLoadSite] = useState(false);

    const [addItem, setAddItem] = useState(false);
    const [addItemTitle, setAddItemTitle] = useState('Add Site');
    const [addItemName, setAddItemName] = useState('');

    const [selectedItem, setSelectedItem] = useState({});

    function handleLoadSiteButton() {
        dispatch({ type: 'FETCH_SITES' });
        setLoadSite(true);
        console.log(selectedItem);
    };

    function handleSiteCloseButton() {
        setLoadSite(false);
    };

    function handleAddSiteButton() {
        setLoadSite(false);
        setAddItem(true);
        setSelectedItem({})
        setAddItemTitle('Add Site')
    };

    function handleAddItemSubmitButton() {
        setAddItem(false);
        dispatch({
            type: 'ADD_SITE',
            payload: { name: addItemName  }
        })
        setLoadSite(true);

    };

    function handleAddItemCancelButton() {
        setAddItem(false);
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
                <DialogTitle>
                    <Grid container direction='row' justifyContent='space-between'>
                        <Grid item>
                            Load Site
                        </Grid>
                        <Grid item>
                            <Button onClick={handleAddSiteButton} variant='outlined'>New Site</Button>
                        </Grid>
                    </Grid>
                </DialogTitle>

                <DialogContent>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                        </TableHead>
                        <TableBody>
                            {sites.map((site) => (
                                <TableRow key={site.id}>
                                    <TableCell component="th" scope="row">
                                        <SiteTableCell site={site} loadButtonFunction={()=>handleLoadButton(site)}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSiteCloseButton}>Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={addItem} onClose={handleAddItemCancelButton}>
                <DialogTitle>
                    {addItemTitle}
                </DialogTitle>
                <DialogContent>
                    <TextField value={addItemName} onChange={(event) => setAddItemName(event.target.value)} label='Name' variant='standard' />
                </DialogContent>
                <DialogActions>
                    <Grid container direction='row' justifyContent='space-around'>
                        <Grid item>
                            <Button onClick={handleAddItemCancelButton}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={handleAddItemSubmitButton}>Submit</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default AppNavigation;