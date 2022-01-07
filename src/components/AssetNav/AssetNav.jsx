import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

function AssetNav() {

    const equipment = useSelector(store => store.equipmentReducer);
    const systems = useSelector(store => store.systemReducer);
    const buildings = useSelector(store => store.buildingReducer);

    const [navigation, setNavigation] = useState([]);

    const dispatch = useDispatch();

    function buildNavigation() {
        let tree = []
        for (const building of buildings) {
            let buildingRoot = {
                id: building.id,
                name: building.name,
                systems: findSystems(building.id)
            }
            tree.push(buildingRoot)
        }
        setNavigation(tree);
    }

    function findSystems(building_id) {
        let systemRoot = [];
        for ( const system of systems ) {
            if (system.building_id === building_id) {
                systemRoot.push({
                    id: system.id,
                    name: system.name,
                    equipment: findEquipment(system.id)
                })
            }
        }
        return systemRoot
    }

    function findEquipment(system_id) {
        let equipmentRoot = [];
        for ( const unit of equipment ) {
            if (unit.system_id === system_id) {
                equipmentRoot.push({
                    id: unit.id,
                    name: unit.name
                })
            }
        }
        return equipmentRoot
    }

    function handleEquipmentClick(id) {
        console.log(id);
        dispatch({ type: 'FETCH_EQUIPMENT_DETAIL', payload: id });
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_BUILDING' });
        dispatch({ type: 'FETCH_SYSTEM' });
        dispatch({ type: 'FETCH_EQUIPMENT' });
        buildNavigation()
    }, [])

    return (
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
    );
}

export default AssetNav;