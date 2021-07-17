import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const GreenNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="greennotification">
      {message}
    </div>
  )
}

const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

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
          <li key={person.id}>{person.name} {person.number}
          <Button 
            handleClick={() => {
              const result = window.confirm("Delete " + person.name + "?")
              if (result) {
                personService
                .remove(person.id)
                .then(response => {
                  personService
                    .getAll()
                    .then(response=> {
                      props.setPersons(response.data)
                      const arr = response.data.filter(person => 
                        person.name.toLowerCase().includes(props.newFilter.toLowerCase())
                      )
                      props.setFiltered(arr)
                      props.setGreenMessage("Deleted " + person.name)
                      setTimeout(() => {
                        props.setGreenMessage(null)
                      }, 3000)
                    })
                    .catch(error => {
                      props.setErrorMessage(
                        `Person '${person.name}' was already removed from server`
                      )
                      setTimeout(() => {
                        props.setErrorMessage(null)
                      }, 3000)
                      props.setFiltered(person.filter(n => n.id !== person.id))
                    })  
                }) 
              }
            }}    
            text='delete'
          />
          </li>  
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

  const [greenMessage, setGreenMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response=> {
        setPersons(response.data)
        setFiltered(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if (nameList.includes(newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const thisperson = persons.find(({name}) => name === newName)
        const newNameObject = {
          name: newName,
          number: newNumber,
          id: thisperson.id
        }
        console.log(newNameObject)
        personService
          .update(thisperson.id, newNameObject)
            .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== thisperson.id ? person : returnedPerson.data))
            setFiltered(persons.map(person => person.id !== thisperson.id ? person : returnedPerson.data))
          })
        setGreenMessage("Changed the number for " + thisperson.name)  
        setTimeout(() => {
          setGreenMessage(null)
        }, 3000)  

      }
    } else {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          if (nameObject.name.toLowerCase().includes(newFilter.toLowerCase())) {
            setFiltered(filtered.concat(response.data))
          }
        })
      setGreenMessage("Added " + nameObject.name)  
      setTimeout(() => {
        setGreenMessage(null)
      }, 3000)
        
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
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
      setFiltered(arr)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} />
      <GreenNotification message={greenMessage} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h3>Add a new contact</h3>

      <NewContact 
        newName={newName} newNumber={newNumber} addPerson={addPerson} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} 
      />

      <h3>Numbers </h3>

      <Numbers 
        filtered={filtered}
        setPersons={setPersons}
        setFiltered={setFiltered}
        newFilter={newFilter}
        setErrorMessage={setErrorMessage}
        setGreenMessage={setGreenMessage}
      />

    </div>
  )

}

export default App