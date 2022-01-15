import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextField from '@mui/material/TextField';

import EditIcon from '@mui/icons-material/Edit';

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

function BuildingTableRow({site, building}) {

    const dispatch = useDispatch();
    const Alert = MuiAlert

    const [deleteMode, setDeleteMode] = useState(false);
    const [saveMode, setSaveMode] = useState(false);

    const [buildingNameInput, setBuildingNameInput] = useState(building.name || undefined);
    const [buildingTypeInput, setBuildingTypeInput] = useState(building.type || undefined);
    const [buildingOperatingHoursInput, setBuildingOperatingHoursInput] = useState(building.operating_hours || undefined);
    const [buildingYearBuiltInput, setBuildingYearBuiltInput] = useState(building.year_built || undefined);
    const [buildingFloorsInput, setBuildingFloorsInput] = useState(building.floors || undefined);
    // const [buildingDescriptionInput, setBuildingDescriptionInput] = useState(building.description || undefined);
    // const [buildingCommentsInput, setBuildingCommentsInput] = useState(building.comments || undefined);

    function handleFieldExit() {
        dispatch({
            type: 'EDIT_BUILDING',
            payload: {
                id: building.id,
                name: buildingNameInput || undefined,
                type: buildingTypeInput || undefined,
                operating_hours: buildingOperatingHoursInput || undefined,
                year_built: buildingYearBuiltInput || undefined,
                floors: buildingFloorsInput || undefined,
                description: building.description || undefined,
                comments: building.comments || undefined
            }
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: { id: building.site_id, }
        })
        setSaveMode(true)
    }

    function handleDeleteButton() {
        setDeleteMode(false)
        dispatch({
            type: 'DELETE_BUILDING',
            payload: building
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
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingNameInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingNameInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingTypeInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingTypeInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingOperatingHoursInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingOperatingHoursInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingYearBuiltInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingYearBuiltInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell className='table-cell' align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingFloorsInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingFloorsInput(event.target.value)} 
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
                <DialogTitle>'Delete Building'</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this building?</p>
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
                    Changes made to {buildingNameInput} were saved successfully.
                </Alert>
            </Snackbar>


        </>
    );
}

export default BuildingTableRow;