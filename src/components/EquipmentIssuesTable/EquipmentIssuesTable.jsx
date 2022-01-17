///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import Material-UI
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

// Import App Components
import EquipmentIssuesTableRow from '../EquipmentIssuesTableRow/EquipmentIssuesTableRow';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// The purpose of this component is to render the issues table in the equipment form view.
// This component will allow a user to add, edit and delete issues. 

function EquipmentIssuesTable({equipment, issues}) {

    // Define Library Variables
    const dispatch = useDispatch();
    const Alert =  MuiAlert;

    // Define Redux Stores
    const user = useSelector(store => store.user);

    // Define Local States
    const [issueInput, setIssueInput] = useState('');
    const [saveMode, setSaveMode] = useState(false);

    // Add Issue from Text Field
    function handleNewIssue() {
        if (issueInput) {  
            dispatch({
                type: 'ADD_ISSUE',
                payload: {
                    equipment_id: equipment.id,
                    issue: issueInput,
                    user_id: user.id
                }
            })
            setIssueInput('')
            setSaveMode(true)
        }
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

            {/* Issues Table */}
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

            {/* Database Commit Snackbar */}
            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {equipment.name} were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

// Export Component Function
export default EquipmentIssuesTable;