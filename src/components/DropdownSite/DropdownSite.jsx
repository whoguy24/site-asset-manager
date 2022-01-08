import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

function DropdownSite() {

    const dispatch = useDispatch();

    const sites = useSelector(store => store.siteReducer);

    let [site, setSite] = useState(0);

    useEffect(() => {
        dispatch({ type: 'FETCH_SITE'});
        setSite(sites[0]);
    }, [])

    function handleSiteDropdown(site_id) {
        setSite(site_id)
        dispatch({ type: 'FETCH_NAVIGATION', payload:site_id});
    }

  return (
    <div>
        <select value={site} onChange={(event) => handleSiteDropdown(event.target.value)}>
        {sites.map((site) => {
            return (
                <option key={site.id} value={site.id}>
                    {site.name}
                </option>
            );
        })}
        </select>
    </div>
  )
}

export default DropdownSite;