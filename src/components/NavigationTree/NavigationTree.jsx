import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import '../App/App.css';

function NavigationTree({setSelectedItem}) {

    const dispatch = useDispatch();
    
    const navigation = useSelector(store => store.navigationReducer);
    const currentSite = useSelector(store => store.siteReducer);

    const [addBuilding, setAddBuilding] = useState(false);
    const [addSystem, setAddSystem] = useState(false);
    const [addEquipment, setAddEquipment] = useState(false);

    const [table, setTable] = useState('');
    const [parentID, setParentID] = useState(0);

    const [buildingNameInput, setBuildingNameInput] = useState('');
    const [systemNameInput, setSystemNameInput] = useState('');
    const [equipmentNameInput, setEquipmentNameInput] = useState('');

    function handleAddSubmitButton() {
        if (table === 'building') {
            dispatch({
                type: 'ADD_BUILDING',
                payload: { 
                    site_id: parentID,
                    name: buildingNameInput  
                }
            })
            handleAddCancelButton()
        }
    }

    function handleAddCancelButton() {
        setAddBuilding(false)
        setAddSystem(false)
        setAddEquipment(false)
    }

    function handleNavigationClick(table, object) {
        setSelectedItem( {table: table, object: object} )
        dispatch({
            type: 'SET_TABLE',
            payload: table
        }) 
        if (table === 'site') { 
            dispatch({
                type: 'FETCH_SITE',
                payload: object
            })
        }
        else if (table === 'building') {
            dispatch({
                type: 'FETCH_BUILDING',
                payload: object
            })
        }
        else if (table === 'system') {
            dispatch({
                type: 'FETCH_SYSTEM',
                payload: object
            })
        }
        else if (table === 'equipment') {
            dispatch({
                type: 'FETCH_EQUIPMENT',
                payload: object
            })
        }
    }

    function renderTree() {
        return (
            <>
                { navigation.map((site)=> {
                    return(
                        <TreeItem key={site.id} nodeId={'site_'+site.id} label={site.name} onClick = {() => handleNavigationClick('site', site)}>
                            { site.buildings.map((building) => {
                                return (
                                    <TreeItem key={building.id} nodeId={'building_'+building.id} label={building.name} onClick = {() => handleNavigationClick('building', building)}>
                                        {building.systems.map((system) => {
                                            return ( 
                                                <TreeItem key={system.id} nodeId={'system_'+system.id} label={system.name} onClick = {() => handleNavigationClick('system', system)}>
                                                    {system.equipment.map((unit) => {
                                                        return (
                                                            <TreeItem key={unit.id} nodeId={'equipment_'+unit.id} label={unit.name} onClick = {() => handleNavigationClick('equipment', unit)}>
                                                            </TreeItem>
                                                        )
                                                    })}
                                                </TreeItem>
                                            )
                                        })}
                                    </TreeItem>
                                )
                            })}
                        </TreeItem>
                    )
                })}
            </>
        )
    };

    useEffect(() => {
    }, [])

    return (
        <>
            { navigation &&
                <TreeView id={'app-navigation-tree'} sx={{ flexGrow: 1, overflowY: 'auto' }} defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                    {renderTree(navigation)}
                </TreeView>
            }

            <Dialog open={addBuilding} onClose={handleAddCancelButton}>
                <DialogTitle>
                    New Building
                </DialogTitle>
                <DialogContent>
                    <TextField value={buildingNameInput} onChange={(event) => setBuildingNameInput(event.target.value)} label='Name' variant='standard' />
                </DialogContent>
                <DialogActions>
                    <Grid container direction='row' justifyContent='space-around'>
                        <Grid item>
                            <Button onClick={handleAddCancelButton} >Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' onClick={handleAddSubmitButton} >Submit</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default NavigationTree;