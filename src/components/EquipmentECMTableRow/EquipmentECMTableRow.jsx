
import { useDispatch } from 'react-redux';

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

import { useState } from 'react';

import '../App/App.css';

function EquipmentECMTableRow({ecm}) {

    const dispatch = useDispatch();
    const Alert = MuiAlert

    const [saveMode, setSaveMode] = useState(false);

    const [ECMInput, setECMInput] = useState(ecm.ecm || '');
    const [dateIdentifiedInput, setDateIdentifiedInput] = useState(ecm.date_identified || '');
    const [commentsInput, setCommentsInput] = useState(ecm.comments || '');
    const [statusInput, setStatusInput] = useState(ecm.status || '');

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

    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    return (
        <>
            <TableRow >
                <TableCell>
                    <FormControl fullWidth>
                        <Select
                            value={ECMInput}
                            onChange={(event)=>setECMInput(event.target.value)}
                            onBlur={handleCommit}
                        >
                        <MenuItem value={'Change the lightbulbs.'}>Change the lightbulbs.</MenuItem>
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

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {ecm.ecm} were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

export default EquipmentECMTableRow;