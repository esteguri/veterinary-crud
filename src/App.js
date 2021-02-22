import { faEdit, faInfoCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Footer from './Footer';
import Navbar from './Navbar';


function App() {
  return (
    <div className="pb-5">
      <Navbar/>
      <div className="container pb-5">
        <div className="row mt-2">
          <div className="col-10">
            <h4>Registro de pacientes</h4>
          </div>
          <div className="col-2">
            <button className="btn btn-success float-end"><FontAwesomeIcon icon={faPlus} /><span className="p-2">Registrar</span></button>
          </div>
        </div>
        <table class="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Raza</th>
              <th scope="col">Fecha de Nacimiento</th>
              <th scope="col">Propietario</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Yensi</th>
              <td>Perro</td>
              <td>Criollo</td>
              <td>22/01/2010</td>
              <td>Esteban Gutierrez</td>
              <td>
                <button className="btn btn-outline-dark m-1" data-bs-toggle="modal" data-bs-target="#registerModal"><FontAwesomeIcon icon={faEdit}/></button>
                <button className="btn btn-outline-danger m-1" ><FontAwesomeIcon icon={faTrash}/></button>
                <button className="btn btn-secondary m-1" data-bs-toggle="modal" data-bs-target="#registerModal"><FontAwesomeIcon icon={faInfoCircle}/> Detalles</button>
              </td>
            </tr>
            <tr>
              <th scope="row">Yensi</th>
              <td>Perro</td>
              <td>Criollo</td>
              <td>22/01/2010</td>
              <td>Esteban Gutierrez</td>
              <td>
                <button className="btn btn-outline-dark m-1"><FontAwesomeIcon icon={faEdit}/></button>
                <button className="btn btn-outline-danger m-1"><FontAwesomeIcon icon={faTrash}/></button>
                <button className="btn btn-secondary m-1"><FontAwesomeIcon icon={faInfoCircle}/> Detalles</button>
              </td>
            </tr>
            <tr>
              <th scope="row">Yensi</th>
              <td>Perro</td>
              <td>Criollo</td>
              <td>22/01/2010</td>
              <td>Esteban Gutierrez</td>
              <td>
                <button className="btn btn-outline-dark m-1"><FontAwesomeIcon icon={faEdit}/></button>
                <button className="btn btn-outline-danger m-1"><FontAwesomeIcon icon={faTrash}/></button>
                <button className="btn btn-secondary m-1"><FontAwesomeIcon icon={faInfoCircle}/> Detalles</button>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <Footer/>
      

      <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="registerModalLabel">Registrar paciente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="row g-3 needs-validation" novalidate>
                <div>
                  <label for="name" class="form-label">Nombre:</label>
                  <input type="text" class="form-control" id="name" placeholder="Nombre de la mascota..." required></input>
                </div>
                <div>
                  <label for="type" class="form-label">Tipo:</label>
                  <select class="form-select" id="type">
                    <option selected >Seleccione un valor...</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="conejo">Conejo</option>
                    <option value="ave">Ave</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label for="breed" class="form-label">Raza:</label>
                  <input type="text" class="form-control" id="breed" placeholder="Raza de la mascota..." required></input>
                </div>
                <div>
                  <label for="date" class="form-label">Fecha de nacimiento:</label>
                  <input type="date" class="form-control" id="date" required></input>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
