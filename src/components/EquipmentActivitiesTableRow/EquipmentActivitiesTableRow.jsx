
import { useDispatch } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';

import TextField from '@mui/material/TextField';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useState } from 'react';

import '../App/App.css';

function EquipmentActivitiesTableRow({activity}) {

    const dispatch = useDispatch();
    const Alert = MuiAlert

    const [collapsed, setCollapsed] = useState(true);
    const [saveMode, setSaveMode] = useState(false);

    const [activityInput, setActivityInput] = useState(activity.activity || '');
    const [descriptionInput, setDescriptionInput] = useState(activity.description || '');
    const [dueDateInput, setDueDateInput] = useState(activity.due_date || '');
    const [statusInput, setStatusInput] = useState(activity.status || '');

    function handleCommit() {
        dispatch({
            type: 'EDIT_ACTIVITY',
            payload: {
                id: activity.id,
                equipment_id: activity.equipment_id,
                activity: activityInput,
                description: descriptionInput,
                due_date: dueDateInput,
                status: statusInput,
            }
        })
        setSaveMode(true)
    }

    function handleDeleteButton() {
        dispatch({
            type: 'DELETE_ACTIVITY',
            payload: {
                equipment_id: activity.equipment_id,
                id: activity.id
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
                    <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <TextField fullWidth value={activityInput} onChange={(event)=>setActivityInput(event.target.value)}onBlur={handleCommit}/>
                </TableCell>
                <TableCell>
                    <TextField fullWidth value={descriptionInput} onChange={(event)=>setDescriptionInput(event.target.value)}onBlur={handleCommit}/>
                </TableCell>
                <TableCell>
                    <TextField fullWidth value={dueDateInput} onChange={(event)=>setDueDateInput(event.target.value)}onBlur={handleCommit}/>
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

            {!collapsed && 

                <TableRow>
               
                    <TableCell colSpan={6}>

                        <Collapse in={!collapsed} unmountOnExit>

                                <Table size="small" id='table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Complete</TableCell>
                                            <TableCell>Step</TableCell>
                                            <TableCell>Comments</TableCell>
                                            <TableCell>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {activity.steps.map((step) => (
                                            <TableRow key={step.id}>
                                                <TableCell>
                                                    <Checkbox>
                                                    </Checkbox>
                                                </TableCell>
                                                <TableCell>{step.step}</TableCell>
                                                <TableCell>{step.comments}</TableCell>
                                                <TableCell>Delete</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>


                        </Collapse>

                    </TableCell>
                
                </TableRow>

            }

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {activity.activity} were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

export default EquipmentActivitiesTableRow;