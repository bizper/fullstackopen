import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY;

const Show = ({ result }) => {
  if (result.length === 1) {
    const item = result[0]
    return (
      <Country country={item}></Country>
    )
  } else {
    return (
      <div>
        {result.map((item, i) => <Line key={i} country={item}></Line>)}
      </div>
    )
  }

}

const Line = ({ country }) => {
  const [hide, setHide] = useState(true)

  const handleClick = () => {
    setHide(!hide)
  }

  if (hide) {
    return (
      <div>
        <span>{country.name.common}</span>
        <button onClick={handleClick}>show</button>
      </div>
    )
  } else {
    return (
      <div>
        <span>{country.name.common}</span>
        <button onClick={handleClick}>hide</button>
        <Country country={country}></Country>
      </div>
    )
  }

}

const WeatherShow = ({ country }) => {

  const latlng = country.capitalInfo.latlng

  const [weather, setWeather] = useState({})

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${API_KEY}&units=metric`)
      .then(resp => {
        setWeather(resp.data)
        setIsLoaded(true);
      })
  }, [latlng])

  if(isLoaded) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.main.temp}Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''></img>
        <p>wind {weather.wind.speed}m/s</p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>waiting for loading...</p>
      </div>
    )
  }
}

const Country = ({ country }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((i, index) => <li key={index}>{i}</li>)}
      </ul>
      <img src={country.flags.png} alt='flags'></img>
      <WeatherShow country={country}/>
    </div>
  )
}


const App = () => {

  const [countries, setCountries] = useState([])

  const [name, setName] = useState('')

  const [result, setResult] = useState([])

  const [tooManyResult, setTooNameResult] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/countries')
      .then(resp => {
        setCountries(resp.data)
      })
  }, [])

  const handleInput = (event) => {
    const search = event.target.value
    setName(search)
    if (search.length > 0) {
      const matchList = countries.filter(item => item.name.common.toLowerCase().includes(search.toLowerCase()))
      if (matchList.length > 10) {
        setTooNameResult(true)
      } else if (matchList.length >= 1) {
        setTooNameResult(false)
        setResult(matchList)
      }
    }
  }
  if (tooManyResult) {
    return (
      <div>
        find countries: <input value={name} onChange={handleInput}></input>
        <p>Too many countries, specify another filter</p>
      </div>
    )
  }
  return (
    <div>
      find countries: <input value={name} onChange={handleInput}></input>
      <Show result={result} />
    </div>
  );

}

export default App;
