import React, { useState, useEffect } from "react";
import "./search.css";

export default function SearchWeather() {
  // api = "68e0a0071ba49ef6926d167b29efa3bc";
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  const [search, setSearch] = useState("Accra");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=68e0a0071ba49ef6926d167b29efa3bc`
      );
      if (componentMounted) {
        setData(await response.json());
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);

  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main == "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main == "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main == "Rain") {
      emoji = "fa-cloud-showers-heavy";
    } else if (data.weather[0].main == "Snow") {
      emoji = "fa-snowflake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...Loading</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  // DATES SECTION
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  // TIME SECTION
  let time = d.toLocaleString([], { 
    hour: "2-digit", 
    minute: "2-digit" ,
    second: "2-digit"
  });

  //FORM HANDLER SECTION
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
    setInput("");
  }

  return (
    <div className="container text-center">
      <h1 className="text-center fs-1 m-2 ">
        Team <span className="text-success">Fix<span className="text-primary">B</span>ug</span>  Weather App
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div class="card-img-overlay">
            {/* ================= SEARCH FIELD ===================== */}

            <div className="content">
              <form className="input-group mb-3 mw-50" onSubmit={handleSubmit}>
                <input
                  class="form-control form-control-lg form-control-borderless mt-5 "
                  type="text"
                  placeholder="Search City..."
                  aria-label=".form-control-lg example"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="input-group-text bg-transparent border-0 left-5 mt-5"
                  id="basic-addon2"
                >
                  <i className="fas fa-search icon"></i>
                </button>
              </form>
            </div>

            {/* ================= SEARCH FIELD END ===================== */}

            <div className="bg-dark bg-opacity-25 py-3">
              <h1 class="card-title display-3 text-light fw-800">
                {data.name}
              </h1>
              <p className="fs-6">
                {/* <i class="fas fa-map-marker-alt text-muted"></i> */}
              </p>
              <p class="card-text lead text-light fw-600 fs-5">
                {day}, {month} {date}, {year}
                <br />
                <small className="text-success fs-5 fw-600">{time}</small>
              </p>
              {/* <hr /> */}
              <i className={`fas ${emoji} fa-4x text-light`}></i>
              <h1 className="fw-600 mb-5 text-light">{temp} &deg;C</h1>
              <h1 className="fw-600 mb-0 text-light">{data.weather[0].main}</h1>
              <h1 className="text-success m-3 fw-500 fs-4 ">
                {temp_min} &deg;C | {temp_max} &deg;C
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
