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
import MapIcon from '@mui/icons-material/Map';

import NavigationTree from '../NavigationTree/NavigationTree';
import SiteTableCell from '../SiteTableCell/SiteTableCell';

import '../App/App.css';

function AppNavigation() {

    const dispatch = useDispatch();
    const sites = useSelector(store => store.sitesReducer);
    const site = useSelector(store => store.siteReducer);

    useEffect(() => {
        dispatch({ type: 'FETCH_SITES'});
    }, [])

    const [ editMode, setEditMode] = useState(false);

    const [loadSite, setLoadSite] = useState(false);
    const [addSite, setAddSite] = useState(false);
    const [addSiteName, setAddSiteName] = useState('');

    function handleLoadSiteButton() {
        setLoadSite(true);
    };

    function handleSiteCloseButton() {
        setLoadSite(false);
    };

    function handleAddSiteButton() {
        setLoadSite(false);
        setAddSite(true);
    };

    function handleAddSiteSubmitButton() {
        setAddSite(false);
        dispatch({
            type: 'ADD_SITE',
            payload: { name: addSiteName  }
        })
        setLoadSite(true);
    };

    function handleAddSiteCancelButton() {
        setAddSite(false);
    };

    function handleLoadButton(site) {
        dispatch({
            type: 'LOAD_SITE',
            payload: site
        })
        console.log('In handleLoadButton', site);
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: site
        })
        setLoadSite(false);
    }

    return (
        <>

            <Grid container id={'app-navigation'} direction='column' >
                <Grid container id={'app-navigation-site-section'} alignItems='center' justifyContent="space-between">
                    {site.name?
                        <Button id={'app-navigation-site-button-loaded'} onClick={handleLoadSiteButton} startIcon={<MapIcon />} variant='contained'>{site.name}</Button>
                        :
                        <Button id={'app-navigation-site-button-empty'} onClick={handleLoadSiteButton} startIcon={<MapIcon />} variant='contained'>Load Site</Button>
                    }
                    {!editMode?
                        <Button id={'app-navigation-edit'} onClick={()=>setEditMode(!editMode)} variant='outlined'>Edit</Button>
                        :
                        <Button id={'app-navigation-edit'} onClick={()=>setEditMode(!editMode)} variant='contained'>Done</Button>
                    }
                </Grid>
                { site.id && <NavigationTree editMode={ editMode } /> }
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

            <Dialog open={addSite} onClose={handleAddSiteCancelButton}>
                <DialogTitle>
                    New Site
                </DialogTitle>
                <DialogContent>
                    <TextField value={addSiteName} onChange={(event) => setAddSiteName(event.target.value)} label='Name' variant='standard' />
                </DialogContent>
                <DialogActions>
                    <Grid container direction='row' justifyContent='space-around'>
                        <Grid item>
                            <Button onClick={handleAddSiteCancelButton}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={handleAddSiteSubmitButton}>Submit</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default AppNavigation;