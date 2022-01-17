///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import Material-UI
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// The purpose of this component is to render the equipment table in the building form view.
// This component will allow a user to add, edit and delete equipment. 

function EquipmentTable({equipment}) {

    // Define Library Variables
    const dispatch = useDispatch();
    const Alert = MuiAlert

    // Define Redux Stores
    const user = useSelector(store => store.user);

    // Define Local States
    const [saveMode, setSaveMode] = useState(false);

    // Update Database with Changes
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

    // Delete Button
    function handleDeleteButton(event, equipment) {
        if (user.role === 'admin') {  
            dispatch({
                type: 'DELETE_EQUIPMENT',
                payload: equipment
            })
            setSaveMode(true)
        }
        else {
            alert('Only Administrators are allowed to delete this kind of record.')
        }
    }

    // Define DataGrid Columns
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

    // Handle Snackbar Logic
    function handleSnackbarCommit(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSaveMode(false)
    }

    // Render DOM
    return (
        <>

            {/* Equipment Table */}
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

            {/* Database Commit Snackbar */}
            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to equipment were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

// Export Component Function
export default EquipmentTable;