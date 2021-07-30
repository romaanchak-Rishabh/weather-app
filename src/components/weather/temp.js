import React, {useState, useEffect} from 'react';
import WeatherCard from './weatherCard';
import './style.css';

const Temp = () => {

    const [searchValue, getSearchValue] = useState("delhi");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async() => {
        try {
            let url =  `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e144ab1ecf4bef24906a0fefcb40c6fe`;

            const res = await fetch(url);
            const data = await res.json();
            
            const {temp, humidity, pressure} = data.main;
            const {main: weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            };

            setTempInfo(myNewWeatherInfo);

        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);

    return <>
        <div className='wrap'>
            <div className='search'>
                <input type='search' placeholder='search...' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e) => getSearchValue(e.target.value)} />
                <button className='searchButton' type='button' onClick={getWeatherInfo}>
                    Search
                </button>
            </div>
        </div>
        
        {/* out temp card */}
        <WeatherCard tempInfo = {tempInfo} />

        
    </>
}

export default Temp;
