const api = {
    key: "baedc2f2f31b7b3303e5d42d88d283c3",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  
  const searchbox = document.querySelector(".search-box");
  searchbox.addEventListener("keypress", function (evt) {
    if (evt.key === "Enter") {
      const query = searchbox.value.trim();
      if (query !== "") {
        getResults(query);
      } else {
        alert("Please enter a valid location.");
      }
    }
  });
  
  function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResults)
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again.");
      });
  }
  
  function displayResults(weather) {
    if (weather.cod === "404") {
      alert("Location not found. Please enter a valid location.");
      return;
    }
  
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector(".location .date");
    let time = document.querySelector(".location .time");
    date.innerText = dateBuilder(now);
    time.innerText = timeBuilder(now);
  
    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  
    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
      weather.main.temp_max
    )}°C`;
  }
  
  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  
  function timeBuilder(d) {
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
  
    // Add leading zero to single digit minutes
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${minutes} ${ampm}`;
  }
  