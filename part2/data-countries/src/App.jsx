import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
const InfoCountries = ({countries, showCountry}) => {
  if(countries.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }else if(countries.length !== 1){
    return (
      countries.map((country) => {
        return (
            <p key={country.name.common}>{country.name.common}<button onClick={()=> showCountry(country.name.common)} >show</button></p>
        )
      })
    )
  }else{
    const country = countries[0]
    return (
     <InfoCountry country={country}></InfoCountry> 
    )
  }
}

const InfoCountry = ({country}) =>{
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>populaton {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.keys(country.languages).map(language => (
            <li key={language}>
              {country.languages[language]}
            </li>
          )
        )}
      </ul>
      <img src={country.flags.png ?? country.flags.png ?? ""} alt={country.flags.alt} />
      <InfoClimaCountry nameCountry={country.name.common}></InfoClimaCountry>
    </div>
  )
  
}

const InfoClimaCountry = ({ nameCountry }) => {
const api_key = import.meta.env.VITE_APP_API_KEY

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${nameCountry}`)
      .then(response => {
        const data = response.data.current;
        setWeatherData(data);
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
      });
  }, [nameCountry]);

  if (!weatherData) {
    return null; 
  }

  return (
    <div>
      <h2>Weather in {nameCountry}</h2>
      <p><strong>temperature {weatherData.temperature} celcius</strong></p>
      <img src={weatherData.weather_icons[0]} alt={weatherData.weather_descriptions} />
      <p><strong>wind: {weatherData.wind_speed} mph direction {weatherData.wind_dir}</strong></p>
    </div>
  );
};

function App() {

  const [ search, setSearch ] = useState('')
  const [ ListCountries, SetListCountries ] = useState([])
  const [ ListCountriesShow, SetListCountriesShow ] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        SetListCountries(response.data)
        SetListCountriesShow(response.data)
      })
  }, [])

  const showCountry = (country) => {
    const countriesFilter = ListCountries.filter(countri => countri.name.common.toLowerCase().includes(country.toLowerCase()))
    SetListCountriesShow(countriesFilter)
  }
  const handleSearchOnchange = (event) => {
    setSearch(event.target.value)
    const newSearch = event.target.value

    const countriesFilter = ListCountries.filter(countri => countri.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    SetListCountriesShow(countriesFilter)
  }
 
  return (
    <div>
      find countries <input value={search} onChange={handleSearchOnchange} type="text" />
      <InfoCountries showCountry={showCountry} countries={ListCountriesShow}></InfoCountries>
    </div>
  )
}

export default App
