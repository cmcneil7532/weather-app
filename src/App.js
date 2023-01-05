import "./App.css";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

function App() {
  //Grab our url and key from the enviroment file (.env)
  const key = process.env.REACT_APP_API_KEY;
  const url = process.env.REACT_APP_API_URL;

  //This will hold our Latitude and longitude coordinates
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const searchLocation = async (event) => {
    //Once the user clicks the enter button the function should run and return our json.
    if (event.key === "Enter") {
      fetch(`${url}weather?q=${location}&units=metric&appid=${key}`)
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          setLocation("");
          console.log(result);
        });
    }
  };

  const tempConverter = (temp) =>{
    let celsiusToFarenheit = Math.floor((temp * 9/5) + 32);
    return celsiusToFarenheit;
  }

  const capitalizeString = (str) =>{
    let str
  }
  capitalizeString();
  
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            /* When user types in the searhbar it will be stored into the value */
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            onKeyDown={searchLocation}
          ></input>
        </div>
        {/** I need to make a check when to make whether or not the object is undefined or not */}
        {typeof data.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{data.name}, {data.sys.country}</div>
              <div className="date">
                {moment().format("dddd, MMMM Do YYYY")}
              </div>
            </div>
            <div className="weather-box">
              <div className="forecast">
                <div className="highlow">
                  <p>
                    High:<span>{tempConverter(data.main.temp_max)}°</span>
                  </p>
                  <p>
                    Low:<span>{tempConverter(data.main.temp_min)}°</span>
                  </p>
                </div>
                <div className="humidity">
                  <p>Humidity:</p>
                  <span>{data.main.humidity}%</span>
                </div>
              </div>
              <div className="temperature">{tempConverter(data.main.temp)}°F</div>
              <div className="description">{data.weather[0].description}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
