import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

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

const DisplaySingleCountry = ({filtered, weather, setWeather}) => {
  const api_key = process.env.REACT_APP_API_KEY

  {useEffect(() => {
    const full_url = 'http://api.weatherstack.com/current?access_key=' 
    + api_key + '&query=' + filtered[0].capital
    axios
      .get(full_url)
      .then(response=> {
        setWeather(response.data.current)
      })
  }, [])}

  return (
    <div>
        <h2>{filtered[0].name}</h2>

        <p>capital {filtered[0].capital}</p>
        <p>population {filtered[0].population}</p>

        <h3>Languages</h3>
        <ul>
          {filtered[0].languages.map(language => 
            <li key={language.name}>{language.name} </li>
          )}
        </ul>
        <img src={filtered[0].flag} width="120" height="80" className="App-logo" alt="logo" />
        
        <h2>Weather in {filtered[0].capital}</h2>
        <p> Temperature: {weather.temperature} </p>
        <img src={weather.weather_icons} width="60" />
        <p> Wind: {weather.wind_speed} mph direction {weather.wind_dir} </p>
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
      <DisplaySingleCountry 
        filtered={props.filtered}
        weather={props.weather}
        setWeather={props.setWeather} 
      />
    )
  } else {  
    return (
      <div>
        <ul>
          {props.filtered.map(country => 
            <li key={country.name}>{country.name}
            <Button 
              handleClick={() => props.setFiltered([country])} 
              text='show'
            />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ weather, setWeather ] = useState([])

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

      <Countries 
        filtered={filtered} 
        setFiltered={setFiltered} 
        setNewFilter={setNewFilter} 
        weather={weather} 
        setWeather={setWeather}
      />

    </div>
  )

}

export default App