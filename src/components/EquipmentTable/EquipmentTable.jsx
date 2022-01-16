
import { useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useState } from 'react';

import '../App/App.css';

function EquipmentTable({equipment}) {

    const dispatch = useDispatch();

    const Alert = MuiAlert
    const [saveMode, setSaveMode] = useState(false);

    function handleCommit(event) {
        
        let equipment = event.row
        switch (event.field) {
            case 'name':
                equipment.name = event.value
                break;
            case 'location':
                equipment.location = event.value
                break;
            case 'area_served':
                equipment.area_served = event.value
                break;
            case 'condition':
                equipment.condition = event.value
                break;
            case 'manufacturer':
                equipment.manufacturer = event.value
                break;
            case 'model_number':
                equipment.model_number = event.value
                break;
            case 'sequence_of_operation':
                equipment.sequence_of_operation = event.value
                break;
            case 'description':
                equipment.description = event.value
                break;
            case 'comments':
                equipment.comments = event.value
                break;
            default:
        }
        dispatch({
            type: 'EDIT_EQUIPMENT',
            payload: equipment
        })
        setSaveMode(true)
    }


    function handleDeleteButton(event, equipment) {
        dispatch({
            type: 'DELETE_EQUIPMENT',
            payload: equipment
        })
        setSaveMode(true)
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 100,
            editable: true
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 150,
            editable: true
        },
        {
            field: 'area_served',
            headerName: 'Area Served',
            width: 150,
            editable: true
        },
        {
            field: 'condition',
            headerName: 'Condition',
            width: 100,
            editable: true
        },
        {
            field: 'manufacturer',
            headerName: 'Manufacturer',
            width: 120,
            editable: true
        },
        {
            field: 'model_number',
            headerName: 'Model',
            width: 100,
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
            width: 120,
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
                    rows={equipment}
                    columns={columns}
                    onCellEditCommit={handleCommit}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>

            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to equipment were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

export default EquipmentTable;