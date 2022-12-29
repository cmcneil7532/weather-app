import "./App.css";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

function App() {
  //Grab our url and key from the enviroment file (.env)
  const key = process.env.REACT_APP_API_KEY;
  const url = process.env.REACT_APP_API_URL;

  //This will hold our Latitude and longitude coordinates
 const [location, setLocation]= useState('');
 const [data, setData]= useState({});


 const searchLocation = async (event) =>{
  //Once the user clicks the enter button the function should run and return our json.
  if(event.key ==="Enter"){
    let response = await fetch(`${url}weather?q=${location}&units=metric&appid=${key}`);
    let result = await response.json()
    setData(result);
    console.log(result)

  }
 }


  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            /* When user types in the searhbar it will be stored into the value */
            onChange={(e)=>setLocation(e.target.value)}
            value={location}
            onKeyDown={searchLocation}
            
          ></input>
        </div>
        <div className="location-box">
          <div className="location">{data.name}</div>
          <div className="date">{moment().format("dddd, MMMM Do YYYY")}</div>
        </div>
        <div className="weather-box">
          <div className="forecast">
            <div className="highlow">
              <p>
                High:<span>19°</span>
              </p>
              <p>
                Low:<span>9°</span>
              </p>
            </div>
            <div className="humidity">
              <p>Humidity:</p>
              <span>89%</span>
            </div>
          </div>
          <div className="temperature">17°F</div>
          <div className="description">Cloudy</div>
        </div>
      </main>
    </div>
  );
}

export default App;
