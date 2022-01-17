
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

// The purpose of this component is to render the buildings table in the site form view.
// This component will allow a user to add, edit and delete buildings. 

function BuildingTable({buildings}) {

    // Define Library Variables
    const dispatch = useDispatch();
    const Alert = MuiAlert

    // Define Redux Stores
    const user = useSelector(store => store.user);

    // Define Local States
    const [saveMode, setSaveMode] = useState(false);

    // Update Database with Changes
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

    // Delete Button
    function handleDeleteButton(event, building) {
        if (user.role === 'admin') {  
            dispatch({
                type: 'DELETE_BUILDING',
                payload: building
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

            {/* Buildings Table */}
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

            {/* Database Commit Snackbar */}
            <Snackbar open={saveMode} autoHideDuration={3000} onClose={handleSnackbarCommit}>
                <Alert onClose={handleSnackbarCommit} severity="success" sx={{ width: '100%' }}>
                    Changes made to buildings were saved successfully.
                </Alert>
            </Snackbar>

        </>
    );
}

// Export Component Function
export default BuildingTable;