
import { useDispatch } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState } from 'react';

import '../App/App.css';

function EquipmentIssuesTableRow({issue}) {

    const dispatch = useDispatch();
    const Alert = MuiAlert

    const [saveMode, setSaveMode] = useState(false);

    const [issueInput, setIssueInput] = useState(issue.issue || '');
    const [resolutionInput, setResolutionInput] = useState(issue.resolution || '');
    const [dateIdentifiedInput, setDateIdentifiedInput] = useState(issue.date_identified || '');
    const [commentsInput, setCommentsInput] = useState(issue.comments || '');
    const [statusInput, setStatusInput] = useState(issue.status || '');

    function handleCommit() {
        dispatch({
            type: 'EDIT_ISSUE',
            payload: {
                id: issue.id,
                equipment_id: issue.equipment_id,
                issue: issueInput,
                resolution: resolutionInput,
                date_identified: dateIdentifiedInput,
                comments: commentsInput,
                status: statusInput,
            }
        })
        setSaveMode(true)
    }

    function handleDeleteButton() {
        dispatch({
            type: 'DELETE_ISSUE',
            payload: {
                equipment_id: issue.equipment_id,
                id: issue.id
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
                    <TextField fullWidth value={issueInput} onChange={(event)=>setIssueInput(event.target.value)}onBlur={handleCommit}/>
                </TableCell>
                <TableCell>
                    <TextField fullWidth value={resolutionInput} onChange={(event)=>setResolutionInput(event.target.value)}onBlur={handleCommit}/>
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
                    Changes made to {issue.issue} were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

export default EquipmentIssuesTableRow;