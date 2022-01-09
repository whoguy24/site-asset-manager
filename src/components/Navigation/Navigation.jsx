import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Navigation() {

    const navigation = useSelector(store => store.navigationReducer);
    const dispatch = useDispatch();

    function handleEquipmentClick(id) {
        console.log(id);
        dispatch({ type: 'FETCH_EQUIPMENT', payload: id });
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_NAVIGATION', payload: 1 });
    }, [])

    return (
        <>
            <Grid container justifyContent='flex-start' alignItems='stretch'>
                <Grid item xs={12}>
                    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                        {navigation.map((building) => {
                            return <TreeItem key={building.id} nodeId={'building_'+building.id} label={building.name}>
                                {building.systems.map((system) => {
                                    return <TreeItem key={system.id} nodeId={'system_'+system.id} label={system.name}>
                                        {system.equipment.map((unit) => {
                                            return <TreeItem 
                                                key={unit.id} 
                                                nodeId={'equipment_'+unit.id} 
                                                label={unit.name}
                                                onClick = {() => handleEquipmentClick(unit.id)}
                                                >
                                            </TreeItem>
                                        })}
                                    </TreeItem>
                                })}
                            </TreeItem>
                        })}
                    </TreeView>
                </Grid>
            </Grid>
        </>
    );
}

export default Navigation;