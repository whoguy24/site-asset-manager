import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import BuildingTableRow from '../BuildingTableRow/BuildingTableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DataGrid } from '@mui/x-data-grid';

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

    function handleCommit(event) {
        let building = event.row
        switch (event.field) {
            case 'name':
                building.name = event.value
                break;
            default:
        }
        console.log(building);
        dispatch({
            type: 'EDIT_BUILDING',
            payload: building
        })
    }

    const columns = [
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          editable: true
        }
      ];


    return (
        <>

            {/* <TableContainer id='form-table' component={Paper}>

                <Table stickyHeader>

                    <TableHead >
                        <TableRow >
                            <TableCell style={{backgroundColor:'lightgrey'}}>Name</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}>Type</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}>Operating Hours</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}>Year Built</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}>Floors</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}></TableCell>
                        </TableRow>
                    </TableHead>
                        
                    <TableBody>
                        {buildings.map((building) => (
                            <BuildingTableRow key={building.id} site={site} building={building}/>
                        ))}
                        <TableRow >

                            <TableCell className='table-cell'>
                                <TextField placeholder='New Building' size='small' fullWidth value={newBuildingInput} onChange={(event)=>setNewBuildingInput(event.target.value)} onBlur={(event)=>handleAddBuilding(event.target.value)}></TextField>
                            </TableCell>

                        </TableRow>
                    </TableBody>

                </Table>

            </TableContainer> */}

            <div style={{ height: '50vh', width: '100%' }}>
                <DataGrid
                    rows={buildings}
                    columns={columns}
                    onCellEditCommit={handleCommit}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>

        </>
    );
}

export default BuildingTable;