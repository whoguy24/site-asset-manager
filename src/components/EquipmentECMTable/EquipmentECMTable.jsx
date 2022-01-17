
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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import EquipmentECMTableRow from '../EquipmentECMTableRow/EquipmentECMTableRow';

import { useState } from 'react';

import '../App/App.css';

function EquipmentECMTable({equipment, ecms}) {

    const [ECMInput, setECMInput] = useState('');
    const [saveMode, setSaveMode] = useState(false);

    const dispatch = useDispatch();
    const Alert =  MuiAlert;

    function handleNewECM() {
        if (ECMInput) {  
            dispatch({
                type: 'ADD_ECM',
                payload: {
                    equipment_id: equipment.id,
                    ecm: ECMInput
                }
            })
            setECMInput('')
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
                                    <MenuItem value={'Change the lightbulbs.'}>Change the lightbulbs.</MenuItem>
                                    </Select>
                                </FormControl>
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

export default EquipmentECMTable;