import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SiteForm from '../SiteForm/SiteForm';
import BuildingForm from '../BuildingForm/BuildingForm';
import SystemForm from '../SystemForm/SystemForm';
import EquipmentForm from '../EquipmentForm/EquipmentForm';

import '../App/App.css';

function AppForm() {

    const site = useSelector(store => store.siteReducer);
    const building = useSelector(store => store.buildingReducer);
    const system = useSelector(store => store.systemReducer);
    const equipment = useSelector(store => store.equipmentReducer);
    const table = useSelector(store => store.tableReducer);

    function handleDeleteButton() {
        switch (table) {
            case 'site': dispatch({ type: 'DELETE_SITE', payload: site.id })
                break;
            case 'building': dispatch({ type: 'DELETE_BUILDING', payload: building.id })
                break;
            case 'system': dispatch({ type: 'DELETE_SYSTEM', payload: system.id })
                break;
            case 'equipment': dispatch({ type: 'DELETE_EQUIPMENT', payload: equipment.id })
                break;
            default:
        }
        dispatch({ type: 'LOAD_SITE', payload: {} })
        dispatch({ type: 'LOAD_BUILDING', payload: {} })
        dispatch({ type: 'LOAD_SYSTEM', payload: {} })
        dispatch({ type: 'LOAD_EQUIPMENT', payload: {} })
    }

    return (
        <>
            { (site.id || building.id || system.id || equipment.id) &&
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
                                <Button id={'app-form-header-delete-button'} onClick={handleDeleteButton} color='error' startIcon={<DeleteIcon />} size='small' variant='outlined'>Delete</Button>
                            </Grid>
                        </Grid>
                    </AppBar>
                    { table ==='site' && <SiteForm/>}
                    { table ==='building' && <BuildingForm/>}
                    { table ==='system' && <SystemForm/>}
                    { table ==='equipment' && <EquipmentForm/>}
                </Paper>
            }
        </>
    );
}

export default AppForm;