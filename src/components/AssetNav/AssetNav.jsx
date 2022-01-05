import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

function AssetNav() {

    const assetTree = useSelector(store => store.assetTree);

    const dispatch = useDispatch();

    function test() {
        console.log(assetTree);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_ASSETS' })
    }, [])

    return (
        <div>
            <p>Info Page Yo</p>
            <button onClick={test}>CLICK</button>


            {/* <ul>
                {assetTree.map((asset) => {
                    return <li>Hi</li>
                })}
            </ul> */}



        {/* <TreeView
            aria-label="Site Asset Navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >

        {
            assetTree.map((treeItem) => {
                return <TreeItem nodeId="1" label="Directory A"></TreeItem>
            })
        }




        <TreeItem nodeId="1" label="Directory A">
        </TreeItem>
        
      </TreeView> */}



        </div>
    );
}

export default AssetNav;