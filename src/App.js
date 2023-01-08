import "./App.css";
import moment from "moment/moment";
import React, { useState } from "react";

function App() {
  //Grab our url and key from the enviroment file (.env)
  const key = process.env.REACT_APP_API_KEY;
  const url = process.env.REACT_APP_API_URL;
  const url2 = process.env.REACT_APP_API_URL2;
  console.log(url2);

  //This will hold our Latitude and longitude coordinates
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
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
      fetch(`${url2}direct?q=${location}&limit=5&appid=${key}`)
        .then((res) => res.json())
        .then((result) => {
          setState(result);
          console.log(result)
        });
    }
  };

  //Convert the celsius temp into farenheit
  const tempConverter = (temp) => {
    let celsiusToFarenheit = Math.floor((temp * 9) / 5 + 32);
    return celsiusToFarenheit;
  };

  //Make everyother word have a capital first letter
  const capitalizeString = (str) => {
    //   //Access the first letter and make it capital
    const arr = str.split(" ");
    // split the two words when a space is found

    //loop over each index and capitalize the first letter
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
  };

  //Depending on the main weather will return the string that correlates with the css property to change the background
  const changeBackground = (str) => {
    if (typeof str === "string") {
      if (str === "Clear") {
        return "clear";
      } else if (str === "Clouds") {
        return "clouds";
      } else if (str === "Snow") {
        return "snow";
      } else if (str === "Rain") {
        return "rain";
      } else if (str === "Thunderstorm") {
        return "thunderstorms";
      } else {
        return "default";
      }
    }
  };

  return (
    //Depending on the current weather temperature the background will change

    <>
      {/**If we have not done a search location then it will return undefined with our default background */}
      <div
        className={
          typeof data.main != "undefined"
            ? changeBackground(data.weather[0].main)
            : "default"
        }
      >
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
                <div className="location">
                  {data.name}, {state[0].state}
                </div>
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
                    <p>Humidity</p>
                    <span>{data.main.humidity}%</span>
                  </div>
                </div>
                <div className="temperature">
                  {tempConverter(data.main.temp)}°F
                </div>
                <div className="description">
                  {capitalizeString(data.weather[0].description)}
                </div>
                <div className="weather-image">
                  <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="weather-icon"
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    </>
  );
}

export default App;
