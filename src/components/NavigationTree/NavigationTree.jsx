import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import '../App/App.css';

function NavigationTree({setSelectedItem}) {

    const dispatch = useDispatch();
    
    const navigation = useSelector(store => store.navigationReducer);

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
        </>
    );
}

export default NavigationTree;