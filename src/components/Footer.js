import React from 'react'
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
      <div className="container-fluid fixed-bottom bg-success text-white p-2">
            <div className="h5 text-center">
                <FontAwesomeIcon icon={faCopyright}/>
                <span className="m-2">Esteban Gutierrez Rivera</span>
            </div>
      </div>
  );
}

export default Footer;
