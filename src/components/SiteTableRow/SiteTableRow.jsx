import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState } from 'react';

import '../App/App.css';

function SiteTableCell({site, loadButtonFunction}) {

    const dispatch = useDispatch();

    const [siteNameInput, setSiteNameInput] = useState(site.name);

    function handleLoadButton() {
        loadButtonFunction(site)
    }

    function handleDeleteButton() {
        dispatch({
            type: 'DELETE_SITE',
            payload: site
        })
    }

    function handleCommit () {
        site.name = siteNameInput;
        dispatch({
            type: 'EDIT_SITE',
            payload: site
        })
    }

    return (
        <>
            <TableCell>
                <Button onClick={handleLoadButton} variant='contained'>Open</Button>
            </TableCell>

            <TableCell>
                <TextField value={siteNameInput} onChange={(event)=>setSiteNameInput(event.target.value)} onBlur={handleCommit} size='small' placeholder='Name'></TextField>
            </TableCell>

            <TableCell>
                <IconButton onClick={handleDeleteButton} color="primary">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </>
    );
}

export default SiteTableCell;