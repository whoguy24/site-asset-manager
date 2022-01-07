import { useDispatch, useSelector } from 'react-redux'

function EquipmentDetail() {

    const dispatch = useDispatch();

    const equipment = useSelector(store => store.equipmentDetailReducer[0]);

    function handleDeleteClick(id) {
        dispatch({ type: 'DELETE_EQUIPMENT', payload: id });
    }

    return (
        <div>

            {equipment
            ?
            <>
            <button onClick={()=>handleDeleteClick(equipment.id)}>Delete</button>

            <ul>
                <li>{equipment.name}</li>
                <li>{equipment.location}</li>
                <li>{equipment.area_served}</li>
                <li>{equipment.condition}</li>
                <li>{equipment.manufacturer}</li>
                <li>{equipment.model_number}</li>
                <li>{equipment.sequence_of_operation}</li>
                <li>{equipment.comments}</li>
            </ul>
            </>
            :<p>Select a piece of equipment.</p>

            }
    

        </div>
    );
}

export default EquipmentDetail;