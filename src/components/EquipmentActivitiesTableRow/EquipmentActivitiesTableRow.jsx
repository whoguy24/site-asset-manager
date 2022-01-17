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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component is responsible for rendering activity table rows.

function EquipmentActivitiesTableRow({activity}) {

    // Render Library Variables
    const dispatch = useDispatch();
    const Alert = MuiAlert

    // Define Redux Stores
    const user = useSelector(store => store.user);

    // Define Local States
    const [collapsed, setCollapsed] = useState(true);
    const [saveMode, setSaveMode] = useState(false);
    const [newStepInput, setNewStepInput] = useState('');
    const [activityInput, setActivityInput] = useState(activity.activity || '');
    const [descriptionInput, setDescriptionInput] = useState(activity.description || '');
    const [dueDateInput, setDueDateInput] = useState(activity.due_date || '');
    const [statusInput, setStatusInput] = useState(activity.status || '');

    // Update Database with Changes 
    function handleCommit() {
        dispatch({
            type: 'EDIT_ACTIVITY',
            payload: {
                id: activity.id,
                equipment_id: activity.equipment_id,
                activity: activityInput,
                description: descriptionInput,
                due_date: dueDateInput,
                status: statusInput
            }
        })
        setSaveMode(true)
    }

    // Delete Button
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

    // Handle Snackbar Logic
    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    // Add New Step from Text Field
    function handleNewStep() {
        if (newStepInput) {              
            dispatch({
                type: 'ADD_STEP',
                payload: {
                    equipment_id: activity.equipment_id,
                    activity_id: activity.id,
                    step: newStepInput,
                    user_id: user.id
                }
            })
            setSaveMode(true)
            setNewStepInput('')
        }
    }

    // Render Activity Step
    // TODO: Place into dedicated component
    function ActivityStepRow ({activity, step}) {

        // Define Local States
        const [completeInput, setCompleteInput] = useState( step.complete || false );
        const [stepInput, setStepInput] = useState( step.step || '' );
        const [commentsInput, setCommentsInput] = useState( step.comments || '' );

        // Update Database with Changes 
        function handleStepCommit() {
            dispatch({
                type: 'EDIT_STEP',
                payload: {
                    id: step.id,
                    equipment_id: activity.equipment_id,
                    complete: completeInput,
                    step: stepInput,
                    comments: commentsInput
                }
            })
            setSaveMode(true)
        }

        // Handle Checkbox
        function handleCheckboxClick (event) {
            setCompleteInput(event.target.checked);
        }

        // Step Delete Button
        function handleDeleteStepButton() {
            dispatch({
                type: 'DELETE_STEP',
                payload: {
                    equipment_id: activity.equipment_id,
                    id: step.id
                }
            })
            setSaveMode(true)
        }

        // Render DOM
        return (
            <>

                {/* Activity Step Row */}
                <TableCell>
                    <Checkbox checked={completeInput} onChange={handleCheckboxClick} />
                </TableCell>
                <TableCell>
                    <TextField fullWidth value={stepInput} onChange={(event)=>setStepInput(event.target.value)} onBlur={handleStepCommit}/>
                </TableCell>
                <TableCell>
                    <TextField fullWidth value={commentsInput} onChange={(event)=>setCommentsInput(event.target.value)} onBlur={handleStepCommit}/>
                </TableCell>
                <TableCell>
                    <IconButton color='error' onClick={handleDeleteStepButton}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>

            </>
        )
    }

    // Render DOM
    return (
        <>

            {/* Activity Table Row */}
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

            {/* Collapsable Activity Step Table */}
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
                                                <ActivityStepRow activity={activity} step={step}/>
                                            </TableRow>  
                                        ))}
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>
                                                <TextField placeholder='New Step' value={newStepInput} onChange={(event)=>setNewStepInput(event.target.value)} onBlur={handleNewStep}/>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                        </Collapse>
                    </TableCell>          
                </TableRow>
            }

            {/* Database Commit Snackbar */}
            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {activity.activity} were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

// Export Component Function
export default EquipmentActivitiesTableRow;