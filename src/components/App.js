import { faEdit, faEnvelope, faInfoCircle, faMapMarkerAlt, faPhone, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {React, useState, useEffect} from 'react'
import { addDocument, deleteDocument, editDocument, getCollection } from '../services/actions';
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
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState([])

  useEffect(() => {
    (async () => {
      const result = await getCollection('patients');
      if(result.statusResponse){
        setTimeout(() => {
          setPatients(result.data)
          setIsLoading(false)
        }, 1000);
      }else{
        alert("Ocurrio un error al consultar los pacientes 😒")
      }
    })()
  }, [])

  const addPatient = async () => {
    if(!validation()) return;

    const patient = {
      name,
      type,
      birthDate,
      breed, 
      ownerName, 
      tel, 
      address, 
      email
    }

    const result = await addDocument("patients", patient);
    if(result.statusResponse){
      patient.id = result.data.id
      setPatients([...patients, patient])
    }else{
      alert("Ocurrio un error al añadir el paciente 😒")
    }
    document.getElementById("modalClose").click()
  }

  const updatePatient = async (id) => {

    if(!validation()) return;
    
    const patient = {
      name,
      type,
      birthDate,
      breed, 
      ownerName, 
      tel, 
      address, 
      email
    }

    const result = await editDocument("patients", id, patient)

    if(result.statusResponse){
      patient.id = id;
      const newPatients = patients.map(p => p.id === id ? patient : p)
      setPatients(newPatients)
    }else {
      alert("Ocurrio un error al editar el paciente 😒")
    }
    document.getElementById("modalClose").click()
  }

  const deletePatient = async (id) => {
    const result = await deleteDocument("patients", id)
    if(result.statusResponse){
      const newPatients = patients.filter(p => p.id !== id)
      setPatients(newPatients)
    }else{
      alert("Ocurrio un error al eliminar el paciente 😒")
    }
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
    setErrors([])
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

  const validation = () => {
    let valErrors = []

    name === "" && valErrors.push("name")
    type === "" && valErrors.push("type")
    birthDate === "" && valErrors.push("birthDate")
    ownerName === "" && valErrors.push("ownerName")
    tel === "" && valErrors.push("tel")
    address === "" && valErrors.push("address")

    console.log(valErrors)
    
    setErrors(valErrors)
    return valErrors.length === 0
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
            isLoading ? 
            (<div className="text-center mt-2 ">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h4>Cargando</h4>
            </div>) : 
            (<div className="div">
                <h5 className=" text-center">No hay pacientes</h5>
                <center><img srcSet={"./empty.png"} width="40%" alt="emptyImage"/></center>
              </div>) 
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
              <form className="row g-3 needs-validation mt-2" noValidate onSubmit={validation}>

                <div className="col-lg-6 col-md-12 row mb-1">
                  <h5 className="text-success">Datos del paciente</h5>
                  <div className="col-12">
                    <label htmlFor="name" className="form-label">Nombre de la mascota:</label>
                    <input type="text" className={errors.includes("name") ? "form-control is-invalid" : "form-control"} id="name" required placeholder="Nombre de la mascota..." onChange={(text)=>setName(text.target.value)} value={name} ></input>
                    <div className="invalid-feedback">
                        El nombre de la mascota es obligatorio
                    </div>
                  </div>
                  <div className="col-6">
                    <label htmlFor="type" className="form-label">Tipo:</label>
                    <select id="type" 
                      className={errors.includes("type") ? "form-control is-invalid" : "form-control"}
                      onChange={(text)=>setType(text.target.value)} value={type} >
                      <option defaultValue value="" >Seleccione...</option>
                      <option value="Perro">Perro</option>
                      <option value="Gato">Gato</option>
                      <option value="Conejo">Conejo</option>
                      <option value="Ave">Ave</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <div className="invalid-feedback">
                        El tipo es obligatorio
                    </div>
                  </div>
                  <div className="col-6">
                    <label htmlFor="birthDate" className="form-label">Fecha de nacimiento:</label>
                    <input type="date" className={errors.includes("birthDate") ? "form-control is-invalid" : "form-control"} 
                      id="birthDate" onChange={(text)=>setBirthDate(text.target.value)} value={birthDate}></input>
                    <div className="invalid-feedback">
                        La fecha de nacimiento es obligatoria
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="breed" className="form-label">Raza:</label>
                    <input type="text" className="form-control" id="breed"  placeholder="Raza de la mascota..." onChange={(text)=>setBreed(text.target.value)} value={breed}></input>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 row mb-1">
                  <h5 className="text-success">Datos del propietario</h5>
                  <div className="col-12 mt-12">
                    <label htmlFor="ownerName" className="form-label">Nombres y apellidos:</label>
                    <input type="text" id="ownerName" placeholder="Nombre del propietario..." 
                    className={errors.includes("ownerName") ? "form-control is-invalid" : "form-control"}
                    onChange={(text)=>setOwnerName(text.target.value)} value={ownerName}></input>
                    <div className="invalid-feedback">
                        El nombre del propietario es obligatorio
                    </div>
                  </div>
                  <div className="col-12 mt-12">
                    <label htmlFor="tel" className="form-label">Teléfono:</label>
                    <input type="text" 
                      className={errors.includes("tel") ? "form-control is-invalid" : "form-control"}
                     id="tel" placeholder="Teléfono"  onChange={(text)=>setTel(text.target.value)} value={tel}></input>
                    <div className="invalid-feedback">
                        El teléfono es obligatorio
                    </div>
                  </div>
                  <div className="col-12 mt-12">
                    <label htmlFor="address" className="form-label">Dirección de residencia:</label>
                    <input type="address" className={errors.includes("address") ? "form-control is-invalid" : "form-control"}
                     id="address" placeholder="Dirección" onChange={(text)=>setAddress(text.target.value)} value={address}></input>
                    <div className="invalid-feedback">
                        La dirección es obligatoria
                    </div>
                  </div>
                  <div className="col-12 mt-12">
                    <label htmlFor="email" className="form-label">Correo:</label>
                    <input type="email" className="form-control" id="email" placeholder="Correo"
                     onChange={(text)=>setEmail(text.target.value)} value={email}></input>
                  </div>
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" id="modalClose" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <input type="submit" className="btn btn-success"  onClick={() => isEdit ? updatePatient(idSelected) :  addPatient()} value={isEdit ? 'Editar' : 'Registrar'}/>
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

      <div className="modal fade" id="confirmModal" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">Confirmar</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ¿Seguro que desea eliminar el paciente <span className="fw-bold">{name}</span>?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=> deletePatient(idSelected)}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
