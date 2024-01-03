import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Numbers = ({list}) =>{
  return (
    <div>
      {list.map(number => (
        <li key={number.name}>{number.name}   {number.number}</li>
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

  

  const [ personsShow, setPersonsShow ] = useState(persons)

  useEffect(() => {
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
          setPersonsShow(response.data)
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

  const newContact = (event) => {
    event.preventDefault()

    if(newName === "" || newPhone === ""){
      return alert("You cannot register an empty number")
    }

    const foundPerson = persons.find(person => person.name === newName);
    if(foundPerson){
      return alert(`${newName} is already added to phonebook`)
    }
    const foundPhone = persons.find(person => person.number === newPhone);
    if(foundPhone){
      return alert(`${newPhone} is already added to phonebook`)
    }
    const newContact = {
      name: newName,
      number: newPhone,
    }
    const NewDirectory = persons.concat(newContact);
    setPersons(NewDirectory)
    setNewName('')
    setNewPhone('')
    setFilter('')
    setPersonsShow(NewDirectory)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} functionFilter={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <FormAddNew valueName={newName} valuePhone={newPhone} functionName={handleNameChange} functionPhone={handlePhoneChange} functionAddContact={newContact}></FormAddNew>
      <h2>Numbers</h2>
      <Numbers list={personsShow}></Numbers>
    </div>
  )
}

export default App
