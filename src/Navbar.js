import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faPaw } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
      <div className="container-fluid bg-success text-white p-3">
          <div className="display-4 text-center"> <FontAwesomeIcon icon={faPaw} className="p-2"/>Veterinaria</div>
      </div>
  );
}

export default Navbar;
