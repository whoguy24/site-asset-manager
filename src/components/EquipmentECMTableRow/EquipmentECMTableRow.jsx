///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// Import Material-UI
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component is responsible for rendering ecm table rows.

function EquipmentECMTableRow({ecm}) {

    // Define Library Variables
    const dispatch = useDispatch();
    const Alert = MuiAlert

    // Define Local States
    const [saveMode, setSaveMode] = useState(false);
    const [ECMInput, setECMInput] = useState(ecm.ecm || '');
    const [dateIdentifiedInput, setDateIdentifiedInput] = useState(ecm.date_identified || '');
    const [commentsInput, setCommentsInput] = useState(ecm.comments || '');
    const [statusInput, setStatusInput] = useState(ecm.status || '');

    // Update Database with Changes
    function handleCommit() {
        dispatch({
            type: 'EDIT_ECM',
            payload: {
                id: ecm.id,
                equipment_id: ecm.equipment_id,
                ecm: ECMInput,
                date_identified: dateIdentifiedInput,
                comments: commentsInput,
                status: statusInput,
            }
        })
        setSaveMode(true)
    }

    // Delete Button
    function handleDeleteButton() {
        dispatch({
            type: 'DELETE_ECM',
            payload: {
                equipment_id: ecm.equipment_id,
                id: ecm.id
            }
        })
        setSaveMode(true)
    }

    // Handle Snackbar Logic
    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    // Render DOM
    return (
        <>
            {/* Energy Conservation Measure Row */}
            <TableRow >
                <TableCell>
                    <FormControl fullWidth>
                        <Select
                            value={ECMInput}
                            onChange={(event)=>setECMInput(event.target.value)}
                            onBlur={handleCommit}
                        >
                            <MenuItem value={'Consolidate Heat Exchangers & Pumps'}>Consolidate Heat Exchangers & Pumps</MenuItem>
                            <MenuItem value={'Pressure Independent Flow-Control Valves'}>Pressure Independent Flow-Control Valves</MenuItem>
                            <MenuItem value={'Reduct Computer Room Air Distribution'}>Reduct Computer Room Air Distribution</MenuItem>
                            <MenuItem value={'Replace Multiple Direct Digital Control Systems'}>Replace Multiple Direct Digital Control Systems</MenuItem>
                            <MenuItem value={'Outdoor Air Source for MEP Room Ventilation'}>Outdoor Air Source for MEP Room Ventilation</MenuItem>
                            <MenuItem value={'Fume Hood Exhaust VAV Operation'}>Fume Hood Exhaust VAV Operation</MenuItem>
                            <MenuItem value={'Repair or Replace Steam Traps'}>Repair or Replace Steam Traps</MenuItem>
                            <MenuItem value={'Replace Inefficient, Large Capacity Condensing Units'}>Replace Inefficient, Large Capacity Condensing Units</MenuItem>
                            <MenuItem value={'Install Variable Speed Drive Control'}>Install Variable Speed Drive Control</MenuItem>
                            <MenuItem value={'Eliminate Unnecessary Building Exhaust Systems'}>Eliminate Unnecessary Building Exhaust Systems</MenuItem>
                            <MenuItem value={'Facility Operator Training'}>Facility Operator Training</MenuItem>
                            <MenuItem value={'Daylight-Harvesting Lighting Controls'}>Daylight-Harvesting Lighting Controls</MenuItem>
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell>
                    <TextField fullWidth value={commentsInput} onChange={(event)=>setCommentsInput(event.target.value)}onBlur={handleCommit}/>
                </TableCell>
                <TableCell>
                    <TextField fullWidth value={dateIdentifiedInput} onChange={(event)=>setDateIdentifiedInput(event.target.value)}onBlur={handleCommit}/>
                </TableCell>
                <TableCell>
                    <TextField fullWidth value={statusInput} onChange={(event)=>setStatusInput(event.target.value)}onBlur={handleCommit}/>
                </TableCell>
                <TableCell>
                    <IconButton color='error' onClick={handleDeleteButton}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            {/* Database Commit Snackbar */}
            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {ecm.ecm} were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

// Export Component Function
export default EquipmentECMTableRow;