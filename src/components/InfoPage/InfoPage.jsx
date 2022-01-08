import React from 'react';
import Navigation from '../Navigation/Navigation';
import Equipment from '../Equipment/Equipment';
import DropdownSite from '../DropdownSite/DropdownSite';

function InfoPage() {
  return (
    <div className="container">
      <DropdownSite/>
      <Navigation/>
      <Equipment/>
    </div>
  );
}

export default InfoPage;