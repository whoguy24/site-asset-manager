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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

// Import App Components
import EquipmentECMTableRow from '../EquipmentECMTableRow/EquipmentECMTableRow';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// The purpose of this component is to render the energy conservation table in the equipment form view.
// This component will allow a user to add, edit and delete conservation measures. 

function EquipmentECMTable({equipment, ecms}) {

    // Define Library Variables
    const dispatch = useDispatch();
    const Alert =  MuiAlert;

    // Define Redux Stores
    const user = useSelector(store => store.user);

    // Define Local States
    const [ECMInput, setECMInput] = useState('');
    const [saveMode, setSaveMode] = useState(false);

    // Add ECM from Text Field
    function handleNewECM() {
        if (ECMInput) {  
            dispatch({
                type: 'ADD_ECM',
                payload: {
                    equipment_id: equipment.id,
                    ecm: ECMInput,
                    user_id: user.id
                }
            })
            setECMInput('')
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

            {/* Energy Conservation Measures Table */}
            <TableContainer component={Paper}>
                <Table id='equipment_sub_table' >
                    <TableHead>
                        <TableRow>
                            <TableCell>Conservation Measures</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell>Date Identified</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ecms.map((ecm) => (
                            <EquipmentECMTableRow key={ecm.id} ecm={ecm}/>
                        ))}
                        <TableRow>
                            <TableCell>
                                <FormControl fullWidth>
                                    <InputLabel>New ECM</InputLabel>
                                    <Select
                                        label='New ECM'
                                        value={ECMInput}
                                        onChange={(event)=>setECMInput(event.target.value)} 
                                        onBlur={handleNewECM}
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
export default EquipmentECMTable;