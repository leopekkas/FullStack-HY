import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountries = (props) => {
  return (
    <div>
      <form>
        <div>
          Find countries: <input
            value={props.newFilter}
            onChange={props.handleFilterChange}
          />
        </div>
      </form>
    </div>
  )
}

const Countries = (props) => {
  if (props.filtered.length > 10) {
    return (
    <div>
      <p>
        Too many matches, specify another filter
      </p>
    </div>
    )
  } else if (props.filtered.length === 1) {
    return (
      <div>
        <h2>{props.filtered[0].name}</h2>

        <p>capital {props.filtered[0].capital}</p>
        <p>population {props.filtered[0].population}</p>

        <h3>Languages</h3>
        <ul>
          {props.filtered[0].languages.map(language => 
            <li key={language.name}>{language.name} </li>
          )}
        </ul>
        <img src={props.filtered[0].flag} width="120" height="120" className="App-logo" alt="logo" />
      </div>
    )
  } else {  
    return (
      <div>
        <ul>
          {props.filtered.map(country => 
            <li key={country.name}>{country.name}</li>
          )}
        </ul>
      </div>
    )
  }
}

const App = () => {

  const [ countries, setCountries] = useState([]) 

  const [ newFilter, setNewFilter ] = useState('')
  const [ filtered, setFiltered ] = useState(countries)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response=> {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const arr = countries.filter(country => 
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFiltered(arr)
  }


  return (
    <div>
      <FindCountries 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange}
      />

      <Countries filtered={filtered}/>

    </div>
  )

}

export default App