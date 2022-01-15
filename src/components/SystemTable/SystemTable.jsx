import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import SystemTableRow from '../SystemTableRow/SystemTableRow';

import '../App/App.css';

function SystemTable({systems}) {

    const dispatch = useDispatch();

    const site = useSelector(store => store.siteReducer);

    const [newSystemInput, setNewSystemInput] = useState('');

    function handleAddSystem (event) {
        if (event) {
            dispatch({
                type: 'ADD_SYSTEM',
                payload: {
                    site_id: site.id,
                    name: event
                }
            })
            setNewSystemInput('')
        }
    }

    return (
        <>

            <TableContainer id='form-table' component={Paper}>

                <Table stickyHeader>

                    <TableHead >
                        <TableRow >
                            <TableCell style={{backgroundColor:'lightgrey'}}>Name</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}>Operating Hours</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}>Sequence of Operation</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}>Performance Metrics</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}>Recommended Set Points</TableCell>
                            {/* <TableCell style={{backgroundColor:'lightgrey'}}>Description</TableCell>
                            <TableCell style={{backgroundColor:'lightgrey'}}>Comments</TableCell> */}
                            <TableCell style={{backgroundColor:'lightgrey'}}></TableCell>
                        </TableRow>
                    </TableHead>
                        
                    <TableBody>
                        {systems.map((system) => (
                            <SystemTableRow key={system.id} site={site} system={system}/>
                        ))}
                        <TableRow >

                            <TableCell className='table-cell'>
                                <TextField placeholder='New System' size='small' fullWidth value={newSystemInput} onChange={(event)=>setNewSystemInput(event.target.value)} onBlur={(event)=>handleAddSystem(event.target.value)}></TextField>
                            </TableCell>

                        </TableRow>
                    </TableBody>

                </Table>

            </TableContainer>

        </>
    );
}

export default SystemTable;