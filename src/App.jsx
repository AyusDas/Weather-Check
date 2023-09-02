import './App.css'
import { useState } from 'react'
import { MdLocationOn, MdSunny, MdNightlight } from 'react-icons/md'
import { WiStrongWind, WiThermometerInternal, WiHorizon, WiHumidity, WiCelsius, WiCloud, WiHot } from "react-icons/wi"

function App() {
    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
    const apiKey = 'eb60cfb74f0742f4b13161737231904'
    
    const getWeather = async (city) => {
        console.log(city)
        let baseUrl = 'http://api.weatherapi.com/v1/current.json?key='+apiKey+'&q='+city
        const res = await fetch(baseUrl)
        const data = await res.json()
        console.log(data)
        setData(data) 
    }

    let getCity = () => {
        setShow(!show)
        const text = document.getElementById("locInput").value 
        console.log(text)
        let city = String(text)
        getWeather(city)
    }

    return (
        <div className="App">
            <div className="heading mySize">
                <div>Weather Now</div>
                <MdLocationOn onClick={()=>setShow(!show)}/>
            </div>
            <div className='myIn'>
                <input id="locInput" className={`myInput ${ show ? '' : 'hide' }`} type="text" placeholder='enter your city'/>
                <input type="submit" value="Go" className={`mybtn ${ show ? '' : 'hide' }`} onClick={()=>{getCity()}}/>
            </div>
            {
                data && 
                <div className={`container mySize ${ data.current.is_day === 1 ? 'dayTime' : 'nightTime' }`}>
                    <div className="header1">
                        <MdSunny className={`${ data.current.is_day === 1 ? '' : 'hide' }`}/>
                        <MdNightlight className={`${ data.current.is_day === 1 ? 'hide' : '' }`}/>
                        <div>{data.location.name}</div>
                    </div>
                    <div className='date-Time'>{JSON.stringify(data.location.localtime).slice(1,JSON.stringify(data.location.localtime).length - 1)}</div>
                    <div className='showMain'>
                        <div className="state">{JSON.stringify(data.current.condition.text).slice(1,JSON.stringify(data.current.condition.text).length-1)}</div>
                        <div>
                            {JSON.stringify(data.current.temp_c)}
                            <span><WiCelsius/></span>
                        </div>
                    </div>
                    <div className='detailsBox'>
                        <div>
                            <div className='divAlign'><span><WiCloud className='myIcons'/></span>Cloud {JSON.stringify(data.current.cloud)}%</div>
                            <div className='divAlign'><span><WiThermometerInternal className='myIcons'/></span>Feels {JSON.stringify(data.current.feelslike_c)}C</div>
                        </div>
                        <div className='extra'>
                            <div className='divAlign'><span><WiHot className='myIcons'/></span>UV-Index {JSON.stringify(data.current.uv)}</div>
                            <div className='divAlign'><span><WiHorizon className='myIcons'/></span>Visual {JSON.stringify(data.current.vis_km)}km</div>
                        </div>
                        <div>
                            <div className='divAlign'><span><WiStrongWind className='myIcons'/></span>Gust {JSON.stringify(data.current.gust_kph)}</div>
                            <div className='divAlign'><span><WiHumidity className='myIcons'/></span>Humidity {JSON.stringify(data.current.humidity)}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default App
