///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import { useState } from 'react';
import { useDispatch } from 'react-redux';

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
import EquipmentActivitiesTableRow from '../EquipmentActivitiesTableRow/EquipmentActivitiesTableRow';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// The purpose of this component is to render the activities table in the equipment form view.
// This component will allow a user to add, edit and delete activities. 

function EquipmentActivitiesTable({equipment, activities}) {

    // Define Library Variables
    const dispatch = useDispatch();
    const Alert =  MuiAlert;

    // Define Local States
    const [activityInput, setActivityInput] = useState('');
    const [saveMode, setSaveMode] = useState(false);

    // Add Activity from Text Field
    function handleNewActivity() {
        if (activityInput) {  
            dispatch({
                type: 'ADD_ACTIVITY',
                payload: {
                    equipment_id: equipment.id,
                    activity: activityInput
                }
            })
            setActivityInput('')
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

            {/* Activities Table */}
            <TableContainer component={Paper}>
                <Table id='equipment_sub_table' >
                    <TableHead>
                        <TableRow>
                        <TableCell></TableCell>
                            <TableCell>Activity</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activities.map((activity) => (
                            <EquipmentActivitiesTableRow key={activity.id} activity={activity}/>
                        ))}
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <TextField placeholder='New Activity' value={activityInput} onChange={(event)=>setActivityInput(event.target.value)} onBlur={handleNewActivity}/>
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
export default EquipmentActivitiesTable;