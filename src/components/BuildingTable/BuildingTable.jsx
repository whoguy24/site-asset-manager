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


    return (
        <>

            <TableContainer id='form-table' component={Paper}>

                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {buildings.map((building) => (
                                <TableRow key={building.id}>
                                <TableCell component="th" scope="row">
                                    {building.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

            </TableContainer>

        </>
    );
}

export default BuildingTable;