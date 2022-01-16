
import { useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EquipmentActivitiesTableRow from '../EquipmentActivitiesTableRow/EquipmentActivitiesTableRow';

import { useState } from 'react';

import '../App/App.css';

function EquipmentActivitiesTable({activities}) {

    const dispatch = useDispatch();

    return (
        <>
            <TableContainer component={Paper}>
                <Table id='equipment_sub_table' >
                    <TableHead>
                        <TableRow>
                        <TableCell></TableCell>
                            <TableCell>Activity</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Comments</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activities.map((activity) => (
                            <EquipmentActivitiesTableRow key={activity.id} activity={activity}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default EquipmentActivitiesTable;