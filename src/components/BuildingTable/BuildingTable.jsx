import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import BuildingTableRow from '../BuildingTableRow/BuildingTableRow';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



import '../App/App.css';

function BuildingTable({buildings}) {

    const dispatch = useDispatch();

    const site = useSelector(store => store.siteReducer);

    const [newBuildingInput, setNewBuildingInput] = useState('');

    function handleAddBuilding (event) {
        if (event) {
            dispatch({
                type: 'ADD_BUILDING',
                payload: {
                    site_id: site.id,
                    name: event
                }
            })
            setNewBuildingInput('')
        }
    }


    return (
        <>

            <TableContainer id='form-table' component={Paper}>

                <Table stickyHeader>

                    <TableHead>
                        <TableRow>
                            <TableCell className='table-cell'>Name</TableCell>
                            <TableCell className='table-cell'>Type</TableCell>
                            <TableCell className='table-cell'>Operating Hours</TableCell>
                            <TableCell className='table-cell'>Year Built</TableCell>
                            <TableCell className='table-cell'>Floors</TableCell>
                            {/* <TableCell className='table-cell'>Description</TableCell>
                            <TableCell className='table-cell'>Comments</TableCell> */}
                            <TableCell className='table-cell'></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {buildings.map((building) => (
                            <BuildingTableRow key={building.id} site={site} building={building}/>
                        ))}
                        <TableRow>

                            <TableCell className='table-cell'>
                                <TextField placeholder='New Building' size='small' fullWidth value={newBuildingInput} onChange={(event)=>setNewBuildingInput(event.target.value)} onBlur={(event)=>handleAddBuilding(event.target.value)}></TextField>
                            </TableCell>

                        </TableRow>
                    </TableBody>

                </Table>

            </TableContainer>

        </>
    );
}

export default BuildingTable;