import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextField from '@mui/material/TextField';

import EditIcon from '@mui/icons-material/Edit';

import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState } from 'react';

import '../App/App.css';

function SiteTableCell({site, loadButtonFunction}) {

    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);

    const [siteNameInput, setSiteNameInput] = useState(site.name);

    function handleLoadButton() {
        loadButtonFunction(site)
    }

    function handleDeleteButton() {
        dispatch({
            type: 'DELETE_SITE',
            payload: site.id
        })
    }

    function handleSaveButton() {
        if (siteNameInput != site.name) {
            dispatch({
                type: 'EDIT_SITE',
                payload: {
                    id: site.id,
                    name: siteNameInput
                }
            })
        }
        setEditMode(!editMode)
    }

    return (
        <>
            <Grid container direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
                { editMode?
                    <>
                        <Grid item xs={1}>
                            <IconButton onClick={handleSaveButton} color="primary">
                                <DoneIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField value = {siteNameInput} onChange={(event) => setSiteNameInput(event.target.value)} label='Name' variant='standard' />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={handleDeleteButton} color="primary">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </>
                :
                    <>
                        <Grid item xs={1}>
                            <IconButton onClick={()=>{setEditMode(!editMode)}} color='primary'>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs ={7}>
                            <p>{site.name}</p>
                        </Grid>
                        <Grid item xs={3}>
                            <Button className={'site-table-cell-load-button'} onClick={handleLoadButton} variant='contained'>Load</Button>
                        </Grid>
                    </>
                }
            </Grid>
        </>
    );
}

export default SiteTableCell;