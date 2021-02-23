import { faEdit, faEnvelope, faInfoCircle, faMapMarkerAlt, faPhone, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {React, useState} from 'react'
import Footer from './Footer';
import Navbar from './Navbar';


function App() {

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [breed, setBreed] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [tel, setTel] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [patients, setPatients] = useState([])
  const [idSelected, setIdSelected] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const addPatient = () => {
    const patient = {
      id: Date.now().toString(),
      name,
      type,
      birthDate,
      breed, 
      ownerName, 
      tel, 
      address, 
      email
    }
    setPatients([...patients, patient])
    clearFields()
  }

  const updatePatient = (id) => {
    const patient = {
      id,
      name,
      type,
      birthDate,
      breed, 
      ownerName, 
      tel, 
      address, 
      email
    }
    const newPatients = patients.map(p => p.id == id ? patient : p)
    setPatients(newPatients)
    clearFields()
  }

  const deletePatient = (id) => {
    const newPatients = patients.filter(p => p.id != id)
    setPatients(newPatients)
  }

  const clearFields = () => {
    setName('')
    setType('')
    setBirthDate('')
    setBreed('')
    setOwnerName('')
    setTel('')
    setAddress('')
    setEmail('')
    setIsEdit(false)
  }

  const setInfoPatient = (patient, isEdit = false) => {
    setIdSelected(patient.id)
    setName(patient.name)
    setType(patient.type)
    setBirthDate(patient.birthDate)
    setBreed(patient.breed)
    setOwnerName(patient.ownerName)
    setTel(patient.tel)
    setAddress(patient.address)
    setEmail(patient.email)
    setIsEdit(isEdit)
  }

  return (
    <div className="pb-5">
      <Navbar/>
      <div className="container pb-5">
        <div className="row mt-2">
          <div className="col-10">
            <h4>Registro de pacientes</h4>
          </div>
          <div className="col-2">
            <button className="btn btn-outline-success float-end" data-bs-toggle="modal" data-bs-target="#registerModal" onClick={clearFields}>
              <FontAwesomeIcon icon={faPlus} /><span className="p-2">Registrar</span>
            </button>
          </div>
        </div>
        
        {
          patients.length > 0 ? (
            <table className="table table-striped mt-4">
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
                {
                  patients.map(p => (
                    <tr key={p.id}>
                      <th scope="row">{p.name}</th>
                      <td>{p.type}</td>
                      <td>{p.breed}</td>
                      <td>{p.birthDate}</td>
                      <td>{p.ownerName}</td>
                      <td>
                        <button className="btn btn-outline-dark m-1" data-bs-toggle="modal" data-bs-target="#registerModal" onClick={()=> setInfoPatient(p, true)}><FontAwesomeIcon icon={faEdit}/></button>
                        <button className="btn btn-outline-danger m-1" data-bs-toggle="modal" data-bs-target="#confirmModal" onClick={()=> setInfoPatient(p)}><FontAwesomeIcon icon={faTrash}/></button>
                        <button className="btn btn-secondary m-1" data-bs-toggle="modal" data-bs-target="#detailsModal" onClick={()=> setInfoPatient(p)}><FontAwesomeIcon icon={faInfoCircle}/> Detalles</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : 
          (
            <div className="div">
              <h5 className=" text-center">No hay pacientes</h5>
              <center><img srcSet={"./empty.png"} width="40%" /></center>
            </div>
          )
        }
      </div>
      <Footer/>
      
      <div className="modal fade " id="registerModal" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">{isEdit ? 'Editar' : 'Registrar'} paciente</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="row g-3 needs-validation mt-2" noValidate>

                <div className="col-lg-6 col-md-12 row mb-1">
                  <h5 className="text-success">Datos del paciente</h5>
                  <div className="col-12">
                    <label htmlFor="name" className="form-label">Nombre de la mascota:</label>
                    <input type="text" className="form-control" id="name" placeholder="Nombre de la mascota..." onChange={(text)=>setName(text.target.value)} value={name} ></input>
                  </div>
                  <div className="col-6">
                    <label htmlFor="type" className="form-label">Tipo:</label>
                    <select className="form-select" id="type" onChange={(text)=>setType(text.target.value)} value={type} >
                      <option defaultValue >Seleccione...</option>
                      <option value="Perro">Perro</option>
                      <option value="Gato">Gato</option>
                      <option value="Conejo">Conejo</option>
                      <option value="Ave">Ave</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label htmlFor="birthDate" className="form-label">Fecha de nacimiento:</label>
                    <input type="date" className="form-control" id="birthDate" onChange={(text)=>setBirthDate(text.target.value)} value={birthDate}></input>
                  </div>
                  <div className="col-12">
                    <label htmlFor="breed" className="form-label">Raza:</label>
                    <input type="text" className="form-control" id="breed"  placeholder="Raza de la mascota..." onChange={(text)=>setBreed(text.target.value)} value={breed}></input>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 row mb-1">
                  <h5 className="text-success">Datos del propietario</h5>
                  <div className="col-12 mt-2">
                    <label htmlFor="ownerName" className="form-label">Nombres y apellidos:</label>
                    <input type="text" className="form-control" id="ownerName" placeholder="Nombre del propietario..." onChange={(text)=>setOwnerName(text.target.value)} value={ownerName}></input>
                  </div>
                  <div className="col-12 mt-2">
                    <label htmlFor="tel" className="form-label">Telefono:</label>
                    <input type="text" className="form-control" id="tel" placeholder="Telefono"  onChange={(text)=>setTel(text.target.value)} value={tel}></input>
                  </div>
                  <div className="col-12 mt-2">
                    <label htmlFor="address" className="form-label">Dirección de residencia:</label>
                    <input type="address" className="form-control" id="address" placeholder="Dirección" onChange={(text)=>setAddress(text.target.value)} value={address}></input>
                  </div>
                  <div className="col-12 mt-2">
                    <label htmlFor="email" className="form-label">Correo:</label>
                    <input type="email" className="form-control" id="email" placeholder="Correo" onChange={(text)=>setEmail(text.target.value)} value={email}></input>
                  </div>
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => isEdit ? updatePatient(idSelected) :  addPatient()}>{isEdit ? 'Editar' : 'Registrar'}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade " id="detailsModal" aria-labelledby="detailsModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-success" id="detailsModalLabel"><FontAwesomeIcon icon={faInfoCircle}/> Detalles <span className="fw-bold">{name}</span></h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row mt-2">
                <div className="col-4"><p className="fw-bold"><FontAwesomeIcon icon={faUser} /> Propietario:</p></div>
                <div className="col-8"><p>{ownerName}</p></div>
              </div>
              <div className="row mt-2">
                <div className="col-4"><p className="fw-bold"><FontAwesomeIcon icon={faPhone} /> Teléfono:</p></div>
                <div className="col-8"><p>{tel}</p></div>
              </div>
              <div className="row mt-2">
                <div className="col-4"><p className="fw-bold"><FontAwesomeIcon icon={faMapMarkerAlt} /> Dirección:</p></div>
                <div className="col-8"><p>{address}</p></div>
              </div>
              <div className="row mt-2 p-1">
                <div className="col-4"><p className="fw-bold"><FontAwesomeIcon icon={faEnvelope} /> Dirección:</p></div>
                <div className="col-8"><p>{email}</p></div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmModalLabel">Confirmar</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ¿Seguro que desea eliminar el paciente <span className="fw-bold">{name}</span>?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={()=> deletePatient(idSelected)}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
