import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

function AssetNav() {

    const assets = useSelector(store => store.asset)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_ASSETS' })
    }, [])

    function test() {
        console.log('Yay');
        console.log(assets);
    }

    return (
        <div>
            <p>Info Page Yo</p>
            <button onClick={test}>CLICK</button>
        </div>
    );
}

export default AssetNav;
