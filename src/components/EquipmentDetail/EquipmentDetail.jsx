import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

function EquipmentDetail() {

    const equipment = useSelector(store => store.equipmentDetailReducer);

    // useEffect(() => {
    // }, [])

    return (
        <div>
            <p>{equipment.name}</p>
        </div>
    );
}

export default EquipmentDetail;