import Grid from '@mui/material/Grid';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import '../App/App.css';

function BuildingTable(buildings) {
    function test() {
        console.log(buildings);
    }
    return (
        <>

            <button onClick={test}>Try Me</button>

            {/* {buildings.map((building) => (
                <p>{building.name}</p>
            ))} */}

            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        {site.buildings.map((building) => (
                            <TableRow key={building.id}>
                                <TableCell component="th" scope="row">
                                    <p>{building.name}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}

        </>
    );
}

export default BuildingTable;