
import { useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useState } from 'react';

import '../App/App.css';

function SystemTable({systems}) {

    const dispatch = useDispatch();

    const Alert = MuiAlert
    const [saveMode, setSaveMode] = useState(false);

    function handleCommit(event) {
        
        let system = event.row
        switch (event.field) {
            case 'name':
                system.name = event.value
                break;
            case 'operating_hours':
                system.operating_hours = event.value
                break;
            case 'sequence_of_operation':
                system.sequence_of_operation = event.value
                break;
            case 'performance_metrics':
                system.performance_metrics = event.value
                break;
            case 'recommended_set_points':
                system.recommended_set_points = event.value
                break;
            case 'description':
                system.description = event.value
                break;
            case 'comments':
                system.comments = event.value
                break;
            default:
        }
        dispatch({
            type: 'EDIT_SYSTEM',
            payload: system
        })
        setSaveMode(true)
    }

    function handleDeleteButton(event, system) {
        dispatch({
            type: 'DELETE_SYSTEM',
            payload: system
        })
        setSaveMode(true)
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true
        },
        {
            field: 'operating_hours',
            headerName: 'Operating Hours',
            width: 150,
            editable: true
        },
        {
            field: 'sequence_of_operation',
            headerName: 'Sequence of Operation',
            width: 150,
            editable: true
        },
        {
            field: 'performance_metrics',
            headerName: 'Metrics',
            width: 120,
            editable: true
        },
        {
            field: 'recommended_set_points',
            headerName: 'Set Points',
            width: 80,
            editable: true
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: true
        },
        {
            field: 'comments',
            headerName: 'Comments',
            width: 200,
            editable: true
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 80,
            align: 'center',
            renderCell: (cellValues) => {
                return (
                    <IconButton color='error' onClick={(event) => { handleDeleteButton(event, cellValues.row);}}>
                        <DeleteIcon />
                    </IconButton>
                );
            }
        }
    ];

    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    return (
        <>
            <div id='table-container'>
                <DataGrid
                    id='table-datagrid'
                    rows={systems}
                    columns={columns}
                    onCellEditCommit={handleCommit}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to systems were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

export default SystemTable;