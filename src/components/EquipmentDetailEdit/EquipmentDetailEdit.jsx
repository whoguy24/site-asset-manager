import { useDispatch, useSelector } from 'react-redux'

function EquipmentDetailEdit() {

    const dispatch = useDispatch();

    const equipment = useSelector(store => store.equipmentDetailReducer[0]);

    function handleDeleteClick(id) {
        dispatch({ type: 'DELETE_EQUIPMENT', payload: id });
    }

    return (
        <div>
    

        </div>
    );
}

export default EquipmentDetailEdit;