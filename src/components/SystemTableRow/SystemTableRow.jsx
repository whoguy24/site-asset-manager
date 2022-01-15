import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import React, { useState } from 'react';

import '../App/App.css';

function SystemTableRow({site, system}) {

    const dispatch = useDispatch();
    const Alert = MuiAlert

    const [deleteMode, setDeleteMode] = useState(false);
    const [saveMode, setSaveMode] = useState(false);

    const [systemNameInput, setSystemNameInput] = useState(system.name || undefined);
    const [systemOperatingHoursInput, setSystemOperatingHoursInput] = useState(system.operating_hours || undefined);
    const [systemSequenceOfOperationInput, setSystemSequenceOfOperationInput] = useState(system.sequence_of_operation || undefined);
    const [systemPerformanceMetricsInput, setSystemPerformanceMetricsInput] = useState(system.performance_metrics || undefined);
    const [systemRecommendedSetPointsInput, setSystemRecommendedSetPointsInput] = useState(system.recommended_set_points || undefined);

    function handleFieldExit() {
        dispatch({
            type: 'EDIT_SYSTEM',
            payload: {
                id: system.id,
                name: systemNameInput || undefined,
                operating_hours: systemOperatingHoursInput || undefined,
                sequence_of_operation: systemSequenceOfOperationInput || undefined,
                performance_metrics: systemPerformanceMetricsInput || undefined,
                recommended_set_points: systemRecommendedSetPointsInput || undefined,
                description: system.description || undefined,
                comments: system.comments || undefined
            }
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: site
        })
        setSaveMode(true)
    }

    function handleDeleteButton() {
        setDeleteMode(false)
        dispatch({
            type: 'DELETE_SYSTEM',
            payload: system
        })
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

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={systemNameInput} 
                        variant='outlined' 
                        onChange={(event)=>setSystemNameInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={systemOperatingHoursInput} 
                        variant='outlined' 
                        onChange={(event)=>setSystemOperatingHoursInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={systemSequenceOfOperationInput} 
                        variant='outlined' 
                        onChange={(event)=>setSystemSequenceOfOperationInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={systemPerformanceMetricsInput} 
                        variant='outlined'
                        onChange={(event)=>setSystemPerformanceMetricsInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={systemRecommendedSetPointsInput} 
                        variant='outlined' 
                        onChange={(event)=>setSystemRecommendedSetPointsInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                {/* <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingDescriptionInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingDescriptionInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingCommentsInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingCommentsInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell> */}

                <TableCell className='table-cell'>
                    <IconButton color='error' onClick={()=>setDeleteMode(true)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>

            </TableRow>

            <Dialog open={deleteMode} onClose={()=>setDeleteMode(false)}>
                <DialogTitle>'Delete System'</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this system?</p>
                </DialogContent> 
                <DialogActions>
                    <Grid container direction='row' justifyContent='space-around'>
                        <Grid item>
                            <Button type='submit' onClick={()=>setDeleteMode(false)} >Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' color='error' onClick={handleDeleteButton} >Delete</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to {systemNameInput} were saved successfully.
                </Alert>
            </Snackbar>


        </>
    );
}

export default SystemTableRow;