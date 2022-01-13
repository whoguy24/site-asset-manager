import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import '../App/App.css';

function SiteForm() {

    const dispatch = useDispatch();

    const site = useSelector(store => store.siteReducer);

    function refreshView () {
        dispatch({
            type: 'EDIT_SITE',
            payload: site
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: site
        })
    }

    function onInputUpdate(field, event) {
        const updatedSite = {...site};
        switch (field) {
            case 'name': 
                updatedSite.name = event
                break
            case 'address': 
                updatedSite.address = event
                break
            case 'city': 
                updatedSite.city = event
                break
            case 'state': 
                updatedSite.state = event
                break
            case 'zip': 
                updatedSite.zip = event
                break
            case 'description': 
                updatedSite.description = event
                break
            case 'comments': 
                updatedSite.comments = event
                break
            default:
        }
        dispatch({
            type: 'LOAD_SITE',
            payload: updatedSite
        })
    }

    return (
        <>
            <Grid container className={'app-form-body-container'} direction='row' spacing={2}>

                <Grid item xs={4}>
                    <Grid container direction='column' spacing={2} >
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={site.name || ''} 
                                onChange={(event)=>onInputUpdate('name', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='Name' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={site.address || ''} 
                                onChange={(event)=>onInputUpdate('address', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth size='small' 
                                label='Address' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={site.city || ''} 
                                onChange={(event)=>onInputUpdate('city', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='City' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={site.state || ''} 
                                onChange={(event)=>onInputUpdate('state', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth 
                                size='small' 
                                label='State' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={site.zip || ''} 
                                onChange={(event)=>onInputUpdate('zip', event.target.value)} 
                                onBlur={refreshView} 
                                fullWidth size='small' 
                                label='Zip' 
                                variant='outlined' 
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={site.description || ''} 
                                onChange={(event)=>onInputUpdate('description', event.target.value)} 
                                onBlur={refreshView} 
                                rows={4} 
                                multiline 
                                fullWidth 
                                size='small' 
                                label='Description' 
                                variant='outlined' 
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                className='app-form-body-text-field' 
                                value={site.comments || ''} 
                                onChange={(event)=>onInputUpdate('comments', event.target.value)}  
                                onBlur={refreshView} 
                                rows={5} 
                                multiline 
                                fullWidth 
                                size='small' 
                                label='Comments' 
                                variant='outlined' 
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>



            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        {site.buildings.map((building) => (
                            <TableRow key={building.id}>
                                <TableCell component="th" scope="row">
                                    <p>{building.name}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}

        </>
    );
}

export default SiteForm;