import React, { useState, useEffect } from 'react'
import axios from 'axios'

const NewContact = (props) => {
  return (
    <div>
      <h2>Add a new contact</h2>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input 
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      <form>
        <div>
          filter shown with: <input
            value={props.newFilter}
            onChange={props.handleFilterChange}
          />
        </div>
      </form>
    </div>
  )
}

const Numbers = (props) => {
  return (
    <div>
      <ul>
        {props.filtered.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

const App = () => {

  const [ persons, setPersons] = useState([]) 

  const nameList = persons.map(person => person.name)

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ filtered, setFiltered ] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response=> {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if (nameList.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      if (nameObject.name.toLowerCase().includes(newFilter.toLowerCase())) {
        setFiltered(filtered.concat(nameObject))
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    if (event.target.value === '') {
      setNewFilter(event.target.value)
      setFiltered(persons)
    } else {
      setNewFilter(event.target.value)
      const arr = persons.filter(person => 
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
      setFiltered(arr)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h3>Add a new contact</h3>

      <NewContact 
        newName={newName} newNumber={newNumber} addPerson={addPerson} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers </h3>

      <Numbers filtered={filtered}/>

    </div>
  )

}

export default App