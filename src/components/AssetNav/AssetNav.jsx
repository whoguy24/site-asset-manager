import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

function AssetNav() {

    const assets = useSelector(store => store.asset);

    let buildings = [
        {
            name: 'Building A',
            systems: [
                {
                    name:'Air Handling System',
                    assets: [
                        {name:'AHU-1'},
                        {name:'AHU-2'},
                        {name:'AHU-3'},
                        {name:'AHU-4'},
                        {name:'AHU-5'},
                        {name:'AHU-6'}
                    ]
                },
                {
                    name:'Chilled Water System',
                    assets: [
                        {name:'CWP-1'},
                        {name:'CWP-2'},
                        {name:'CWP-3'},
                    ]
                },
                {
                    name:'Heating Hot Water System',
                    assets: [
                        {name:'HWP-1'},
                        {name:'HWP-2'},
                        {name:'HWP-3'},
                    ]
                }
            ]
        }
    ]

  // let uniqueBuildings = [... new Set(assets.map((asset) => asset.building))];






    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_ASSETS' })
    }, [])

    function buildBuildings() {

        // 1. 

    }

    function buildSystems() {
    }

    function buildAssets() {
    }

    return (
        <div>
            <p>Info Page Yo</p>
            <button onClick={buildBuildings}>CLICK</button>


            <ul>
                {assets.map((asset) => {
                    return <li key={asset.id}>{asset.name}</li>
                })}
            </ul>



        </div>
    );
}

export default AssetNav;