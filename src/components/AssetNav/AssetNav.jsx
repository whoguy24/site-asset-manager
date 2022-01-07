import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

function AssetNav() {

    const navigation = useSelector(store => store.navigationReducer);
    const dispatch = useDispatch();

    function handleEquipmentClick(id) {
        console.log(id);
        dispatch({ type: 'FETCH_EQUIPMENT', payload: id });
    }

    function debugTree() {
        console.log(navigation);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_NAVIGATION', payload: 1 });
    }, [])

    return (
        <>
            <button onClick={debugTree}>Debug Tree</button>
            <TreeView 
                aria-label="Site Asset Navigator" 
                defaultCollapseIcon={<ExpandMoreIcon />} 
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{ height: 400, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
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
        </>
    );
}

export default AssetNav;