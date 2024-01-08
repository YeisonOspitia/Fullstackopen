import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons.jsx'

const Numbers = ({list, functionDelete}) =>{
  return (
    <div>
      {list.map(number => (
        <li key={number.id}>{number.name}   {number.number} <button onClick={() => {functionDelete(number.id, number.name)}}>Delete</button></li>
      ))}
    </div>
  )
}

const Filter = ({value, functionFilter}) =>{
  return (
    <div>
      filter shown with <input type= "text" value={value} onChange={functionFilter} />
    </div>

  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className="notificacion error">
      {message}
    </div>
  )
}

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className="notificacion success">
      {message}
    </div>
  )
}

const FormAddNew = ({valueName, valuePhone, functionName, functionPhone, functionAddContact}) => {
  return (
    <form>
      <div>
        name: <input value={valueName} onChange={functionName} />
      </div>
      <div>
        phone: <input value={valuePhone} onChange={functionPhone} />
      </div>
      <div>
        <button type="submit" onClick={functionAddContact}>add</button>
      </div>
    </form>
  )
}

function App() {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  

  const [ personsShow, setPersonsShow ] = useState(persons)

  useEffect(() => {
    personsService
        .getAll()
        .then(initialPersons  => {
          setPersons(initialPersons)
          setPersonsShow(initialPersons)
        })
  }, [])


  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) =>{
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) =>{
    const newFilter = event.target.value
    setFilter(newFilter)
    const personsFilter = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    setPersonsShow(personsFilter)
  }

  const actualizarEstados = (param, message) => {
    setPersons(param)
    setPersonsShow(param)
    setNewName('')
    setNewPhone('')
    setFilter('')
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const functionDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personsService
          .eliminar(id)
          .then(returedList => {
            personsService.getAll()
            .then(initialPersons  => {
              setPersons(initialPersons)
              setPersonsShow(initialPersons)
              setSuccessMessage('The contact has been successfully deleted')
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            })
          })
          .catch(error => {
            setErrorMessage(
              `Note '${note.content}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    }
  }

  const newContact = (event) => {
    event.preventDefault()

    if(newName === "" || newPhone === ""){
      return alert("You cannot register an empty number")
    }
    const newContact = {
      name: newName,
      number: newPhone,
    }

    const foundPerson = persons.find(person => person.name === newName);
    if(foundPerson){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
            .update(foundPerson.id, newContact)
            .then(returedPerson => {
              const nuevaLista = persons.map( person => person.name !== newName ? person : returedPerson)
              actualizarEstados(nuevaLista, 'The contact has been successfully updated' )
            })
      }
      return false
    }
    const foundPhone = persons.find(person => person.number === newPhone);
    if(foundPhone){
      return alert(`${newPhone} is already added to phonebook`)
    }
    
    
    personsService
      .create(newContact)
      .then(returnedNote  => {
        actualizarEstados(persons.concat(returnedNote), 'The contact has been successfully created')
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} functionFilter={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <FormAddNew valueName={newName} valuePhone={newPhone} functionName={handleNameChange} functionPhone={handlePhoneChange} functionAddContact={newContact}></FormAddNew>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
      <h2>Numbers</h2>
      <Numbers functionDelete={functionDelete} list={personsShow}></Numbers>
    </div>
  )
}

export default App
