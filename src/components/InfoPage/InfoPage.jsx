import React from 'react';
import Navigation from '../Navigation/Navigation';
import EquipmentDetail from '../EquipmentDetail/EquipmentDetail';
import DropdownSite from '../DropdownSite/DropdownSite';

function InfoPage() {
  return (
    <div className="container">
      <DropdownSite/>
      <Navigation/>
      <EquipmentDetail/>
    </div>
  );
}

export default InfoPage;