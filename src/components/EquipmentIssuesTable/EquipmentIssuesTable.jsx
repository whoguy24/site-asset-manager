
import { useDispatch } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';

import EquipmentIssuesTableRow from '../EquipmentIssuesTableRow/EquipmentIssuesTableRow';

import { useState } from 'react';

import '../App/App.css';

function EquipmentIssuesTable({equipment, issues}) {

    const [issueInput, setIssueInput] = useState('');
    const [saveMode, setSaveMode] = useState(false);

    const dispatch = useDispatch();
    const Alert =  MuiAlert;

    function handleNewIssue() {
        if (issueInput) {  
            dispatch({
                type: 'ADD_ISSUE',
                payload: {
                    equipment_id: equipment.id,
                    issue: issueInput
                }
            })
            setIssueInput('')
            setSaveMode(true)
        }
    }

    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table id='equipment_sub_table' >
                    <TableHead>
                        <TableRow>
                            <TableCell>Issue</TableCell>
                            <TableCell>Resolution</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell>Date Identified</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {issues.map((issue) => (
                            <EquipmentIssuesTableRow key={issue.id} issue={issue}/>
                        ))}
                        <TableRow>
                            <TableCell>
                                <TextField placeholder='New Issue' value={issueInput} onChange={(event)=>setIssueInput(event.target.value)} onBlur={handleNewIssue}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {equipment.name} were saved successfully.
                </Alert>
            </Snackbar>
        </>
    );
}

export default EquipmentIssuesTable;