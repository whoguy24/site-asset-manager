import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';

import React, { useState } from 'react';

import '../App/App.css';

function SiteTableCell({site, loadButtonFunction}) {

    const dispatch = useDispatch();

    const [siteNameInput, setSiteNameInput] = useState(site.name);

    function handleLoadButton() {
        loadButtonFunction(site)
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
                <TextField value={siteNameInput} onChange={(event)=>setSiteNameInput(event.target.value)} onBlur={handleCommit} size='small' placeholder='Name'></TextField>
            </TableCell>

            <TableCell>
                <Button onClick={handleLoadButton} variant='contained'>Open</Button>
            </TableCell>
        </>
    );
}

export default SiteTableCell;