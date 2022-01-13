import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextField from '@mui/material/TextField';

import EditIcon from '@mui/icons-material/Edit';

import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


import React, { useState } from 'react';

import '../App/App.css';

function BuildingTableCell({building}) {

    const dispatch = useDispatch();

    const [buildingNameInput, setBuildingNameInput] = useState(building.name || '');
    const [buildingTypeInput, setBuildingTypeInput] = useState(building.type || '');
    const [buildingOperatingHoursInput, setBuildingOperatingHoursInput] = useState(building.operating_hours || '');
    const [buildingYearBuiltInput, setBuildingYearBuiltInput] = useState(building.year_built || '');
    const [buildingFloorsInput, setBuildingFloorsInput] = useState(building.floors || '');

    function handleFieldExit() {
        dispatch({
            type: 'EDIT_BUILDING',
            payload: {
                id: building.id,
                name: buildingNameInput,
                type: buildingTypeInput,
                operating_hours: buildingOperatingHoursInput,
                year_built: buildingYearBuiltInput,
                floors: buildingFloorsInput,
                description: building.description,
                comments: building.comments
            }
        })
        dispatch({
            type: 'FETCH_NAVIGATION',
            payload: { id: building.site_id, }
        })
    }

    return (
        <>
            <TableRow >

                <TableCell align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingNameInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingNameInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingTypeInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingTypeInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingOperatingHoursInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingOperatingHoursInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingYearBuiltInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingYearBuiltInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

                <TableCell align='left'>
                    <TextField className={'table-text-field'} fullWidth size='small' value={buildingFloorsInput} 
                        variant='outlined' 
                        onChange={(event)=>setBuildingFloorsInput(event.target.value)} 
                        onBlur = {handleFieldExit}
                    />
                </TableCell>

            </TableRow>
        </>
    );
}

export default BuildingTableCell;