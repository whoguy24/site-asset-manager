
import { useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useState } from 'react';

import '../App/App.css';

function EquipmentActivitiesTableRow({activity}) {

    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            <TableRow >
                <TableCell>
                    <IconButton size="small" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <p>{activity.activity}</p>
                </TableCell>
                <TableCell>
                    <p>{activity.description}</p>
                </TableCell>
                <TableCell>
                    <p>{activity.comments}</p>
                </TableCell>
                <TableCell>
                    <p>{activity.date_due}</p>
                </TableCell>
                <TableCell>
                    <p>{activity.status}</p>
                </TableCell>

            </TableRow>

            {!collapsed && 

                <TableRow>

                    

                    <TableCell colSpan={6}>

                        <Collapse in={!collapsed} unmountOnExit>


                                <Table size="small" id='table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Complete</TableCell>
                                            <TableCell>Step</TableCell>
                                            <TableCell>Comments</TableCell>
                                            <TableCell>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {activity.steps.map((step) => (
                                            <TableRow key={step.id}>
                                                <TableCell>
                                                    <Checkbox>
                                                    </Checkbox>
                                                </TableCell>
                                                <TableCell>{step.step}</TableCell>
                                                <TableCell>{step.comments}</TableCell>
                                                <TableCell>Delete</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>


                        </Collapse>

                    </TableCell>
                

                </TableRow>

            }





                        {/* {activity.steps.map((step) => (

                            <TableRow>
                                <TableCell>
                                    <Checkbox/>
                                </TableCell>
                                <TableCell>{step.step}</TableCell>
                                <TableCell>{step.comments}</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>

                        ))} */}




        </>
    );
}

export default EquipmentActivitiesTableRow;