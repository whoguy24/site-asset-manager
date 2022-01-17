///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Import Material-UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component is responsible for rendering site table rows.

function SiteTableRow({site, loadButtonFunction}) {

    // Define Library Variables
    const dispatch = useDispatch();

    // Define Local States
    const [siteNameInput, setSiteNameInput] = useState(site.name);

    // Open Site Button
    function handleLoadButton() {
        loadButtonFunction(site)
    }

    // Update Database with Changes
    function handleCommit () {
        site.name = siteNameInput;
        dispatch({
            type: 'EDIT_SITE',
            payload: site
        })
    }

    // Render DOM
    return (
        <>

            {/* Site Table Row */}
            <TableCell>
                <TextField fullWidth value={siteNameInput} onChange={(event)=>setSiteNameInput(event.target.value)} onBlur={handleCommit} size='small' placeholder='Name'></TextField>
            </TableCell>
            <TableCell>
                <Button onClick={handleLoadButton} variant='contained'>Open</Button>
            </TableCell>

        </>
    );
}

// Export Component Function
export default SiteTableRow;