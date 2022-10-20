import React, {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import './weatherapp.css'
 function Weatherapp(){
   const [inputvalue, setInputvalue] = useState({})
    const [cityname, setCityname] = useState('pune');
    const [citynameFrombuttonClick, setCitynameFrombuttonClick] = useState('pune');

    const changerhandler = (e) =>{
      setCityname(e.target.value);
    }
    const handleClick= () =>{
        setCitynameFrombuttonClick(cityname)
    }
    useEffect(()=>{
        axios.get(`http://api.weatherstack.com/current?access_key=e03722ee389615860046d3962b62e140&query=${citynameFrombuttonClick}`)
            .then((resp) =>{
                setInputvalue(resp.data)
                console.log(resp.data)
            })
        .catch((error)=>{
            alert('something is missing while fetching the api data');
         })
    },[citynameFrombuttonClick])

        return(
        
        <>
<div className='container'>

<div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control"
            value={cityname}
            onChange={changerhandler} />
          <button className="btn btn-primary" type="button" onClick={handleClick} >Search</button>
        </div>
      </div>
        
    </div>
<h2> {inputvalue.location.name}, {inputvalue.location.region}</h2>
<div>
    <h6 className="weathorTemp">
                {inputvalue.location.localtime}
     </h6>
     <h5 className="weathorCity">
                 {inputvalue.current.observation_time}
    </h5>
    <img className="weathorIcon" src={inputvalue.current.weather_icons[0]} alt = 'img'/>
    <h2 className='temperature'>{inputvalue.current.temperature}{'\u00b0'}c</h2>
    <h3> cloudcover:- {inputvalue.current.cloudcover}%</h3>
   <h3> feelslike:- {inputvalue.current.feelslike}%</h3>
   <h3>Humidity:- {inputvalue.current.humidity}%</h3>
    <h3>wind_degree:{inputvalue.current.wind_degree}</h3>
    </div>

    </div>
 </>
   )
}
export default Weatherapp
