///////////////////////////////////////////////////////
///// IMPORT LIBRARIES ////////////////////////////////
///////////////////////////////////////////////////////

// Import React, Redux, etc.
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import Material-UI
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

// Import App Components
import SiteForm from '../SiteForm/SiteForm';
import BuildingForm from '../BuildingForm/BuildingForm';
import SystemForm from '../SystemForm/SystemForm';
import EquipmentForm from '../EquipmentForm/EquipmentForm';

// Import Stylesheets
import '../App/App.css';

///////////////////////////////////////////////////////
///// COMPONENT FUNCTION //////////////////////////////
///////////////////////////////////////////////////////

// This component is responsible for rendering the form view of a selected navigation item (site, building, system or equipment.)
// This component also handles deletion of the active item associated with the selected view.

function AppForm() {

    // Define Library Variables
    const dispatch = useDispatch();

    // Define Reducers
    const site = useSelector(store => store.siteReducer);
    const building = useSelector(store => store.buildingReducer);
    const system = useSelector(store => store.systemReducer);
    const equipment = useSelector(store => store.equipmentReducer);
    const table = useSelector(store => store.tableReducer);
    const user = useSelector(store => store.user);

    // Define Local States
    const [deleteMode, setDeleteMode] = useState(false);

    // Modal Popup Delete Button
    // Dispatch delete request, depending on the active form view
    function handleDeleteButton() {
        setDeleteMode(false)
        switch (table) {
            case 'site': 
                dispatch({ type: 'DELETE_SITE', payload: site })
                dispatch({ type: 'CLEAR_NAVIGATION' })
                break;
            case 'building': 
                dispatch({ type: 'DELETE_BUILDING', payload: building })
                break;
            case 'system': 
                dispatch({ type: 'DELETE_SYSTEM', payload: system })
                break;
            case 'equipment': 
                dispatch({ type: 'DELETE_EQUIPMENT', payload: equipment })
                break;
            default:
        }
    }

    // Form View Header Delete Button
    // Opens modal deletion popup
    function openDeletePopup () {
        if (user.role === 'admin') {  
            setDeleteMode(true)
        }
        else {
            alert('Only Administrators are allowed to delete this kind of record.')
        }
    }

    // Render DOM
    return (
        <>

            {/* Form View Based on Navigation Item Selected */}
            { ( table == 'site' && site.id || table == 'building' && building.id || table == 'system' && system.id || table == 'equipment' && equipment.id) &&
                <Paper id={'app-form-body'}>
                    <AppBar id={'app-form-header'} position='static'>
                        <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                            <Grid item >
                                { table === 'site' &&
                                    <h2 className={'app-form-header-label'} >{site.name}</h2>
                                }
                                { table === 'building' &&
                                    <h2 className={'app-form-header-label'} >{building.name}</h2>
                                }
                                { table === 'system' &&
                                    <h2 className={'app-form-header-label'} >{system.name}</h2>
                                }
                                { table === 'equipment' &&
                                    <h2 className={'app-form-header-label'} >{equipment.name}</h2>
                                }
                            </Grid>
                            <Grid item >
                                <Button id={'app-form-header-delete-button'} onClick={openDeletePopup} color='error' startIcon={<DeleteIcon />} size='small' variant='outlined'>Delete</Button>
                            </Grid>
                        </Grid>
                    </AppBar>
                    { table ==='site' && <SiteForm/>}
                    { table ==='building' && <BuildingForm/>}
                    { table ==='system' && <SystemForm/>}
                    { table ==='equipment' && <EquipmentForm/>}
                </Paper>
            }

            {/* Modal Deletion Dialog */}
            <Dialog open={deleteMode} onClose={()=>setDeleteMode(false)}>
                <DialogTitle>
                    { table === 'site' && 'Delete Site' }
                    { table === 'building' && 'Delete Building' }
                    { table === 'system' && 'Delete System' }
                    { table === 'equipment' && 'Delete Equipment' }
                </DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this {table}?</p>
                </DialogContent> 
                <DialogActions>
                    <Grid container direction='row' justifyContent='space-around'>
                        <Grid item>
                            <Button onClick={()=>setDeleteMode(false)} >Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' color='error' onClick={handleDeleteButton} >Delete</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

        </>
    );
}

// Export Component Function
export default AppForm;