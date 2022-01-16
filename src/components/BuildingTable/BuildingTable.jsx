
import { useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useState } from 'react';

import '../App/App.css';

function BuildingTable({buildings}) {

    const dispatch = useDispatch();

    const Alert = MuiAlert
    const [saveMode, setSaveMode] = useState(false);

    function handleCommit(event) {
        
        let building = event.row
        switch (event.field) {
            case 'name':
                building.name = event.value
                break;
            case 'type':
                building.type = event.value
                break;
            case 'operating_hours':
                 building.operating_hours = event.value
                break;
            case 'year_built':
                building.year_built = event.value
                break;
            case 'floors':
                building.floors = event.value
                break;
            case 'description':
                building.description = event.value
                break;
            case 'comments':
                building.comments = event.value
                break;
            default:
        }
        dispatch({
            type: 'EDIT_BUILDING',
            payload: building
        })
        setSaveMode(true)
    }

    function handleDeleteButton(event, building) {
        dispatch({
            type: 'DELETE_BUILDING',
            payload: building
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
            field: 'type',
            headerName: 'Type',
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
            field: 'year_built',
            headerName: 'Year Built',
            width: 120,
            editable: true
        },
        {
            field: 'floors',
            headerName: 'Floors',
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
                    rows={buildings}
                    columns={columns}
                    onCellEditCommit={handleCommit}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to buildings were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

export default BuildingTable;