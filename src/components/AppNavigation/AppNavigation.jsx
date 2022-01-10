import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import '../App/App.css';

function AppNavigation() {

    // const navigation = useSelector(store => store.navigationReducer);
    // const dispatch = useDispatch();

    // function handleEquipmentClick(unit) {
    //     dispatch({ type: 'FETCH_EQUIPMENT', payload: unit });
    // }

    // useEffect(() => {
    //     dispatch({ type: 'FETCH_NAVIGATION', payload: 1 });
    // }, [])

    return (
        <>

            {/* <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                {navigation.map((building) => {
                    return <TreeItem key={building.id} nodeId={'building_'+building.id} label={building.name}>
                        {building.systems.map((system) => {
                            return <TreeItem key={system.id} nodeId={'system_'+system.id} label={system.name}>
                                {system.equipment.map((unit) => {
                                    return <TreeItem key={unit.id} nodeId={'equipment_'+unit.id} label={unit.name} onClick = {() => handleEquipmentClick(unit)}>
                                    </TreeItem>
                                })}
                            </TreeItem>
                        })}
                    </TreeItem>
                })}
            </TreeView> */}

            <Grid container id={'app-navigation'} direction='column'>
                <Grid item>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>


        </>
    );
}

export default AppNavigation;