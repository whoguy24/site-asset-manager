
import { useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import '../App/App.css';

function BuildingTable({buildings}) {

    const dispatch = useDispatch();

    function handleCommit(event) {
        if (!event.value) { event.value = undefined }
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
    }

    function handleDeleteButton(event, building) {
        dispatch({
            type: 'DELETE_BUILDING',
            payload: building
        })
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

    return (
        <>
            <div id='table-container'>
                <DataGrid
                    id='table-datagrid'
                    rows={buildings}
                    columns={columns}
                    onCellEditCommit={handleCommit}
                />
            </div>
        </>
    );
}

export default BuildingTable;