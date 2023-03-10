const KEY = "6a70e60eb18c4ec5ab2135858230903";

// get location
const getLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const q = latitude + "," + longitude;

    fetchData(q);
  });
};

const fetchData = (location) => {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=6a70e60eb18c4ec5ab2135858230903&q=${location}&aqi=no&days=2&lang=hu`
  )
    .then((response) => response.json())
    .then((data) => getData(data))
    .catch((err) => console.error(err));
};

const getData = (data) => {
  // local data
  const { name, localtime } = data.location;

  let { sunrise, sunset } = data.forecast.forecastday[0].astro;

  sunrise = sunrise.slice(0, -2).trim();
  sunsetCoverHour = Number(sunset.slice(0, 2)) + 12;
  sunset = sunsetCoverHour + sunset.slice(2, 5);

  // current
  const currentObj = data.current;

  // next
  let time = Number(localtime.slice(-5).slice(0, 2));
  const today = data.forecast.forecastday[0].hour;
  const nextDay = data.forecast.forecastday[1].hour;

  let current = time + 2 > 23 ? time + 2 - 24 : time + 2;
  let currentData = time + 2 > 23 ? nextDay : today;
  //renderNextWeather(timeObj)
  for (let i = 0; i < 8; i++) {
    const timeObj = currentData[current];
    renderNextWeather(timeObj);
    if (current + 2 > 23) {
      currentData = nextDay;
    }
    current = current + 2 > 23 ? current + 2 - 24 : current + 2;
  }

  // render data
  renderLocalData(name, localtime, sunrise, sunset);
  renderCurrentWeather(currentObj);

  console.log(data);
};

const renderLocalData = (name, localtime, sunrise, sunset) => {
  const heading = document.querySelector("h1");
  const today = document.querySelector(".today");

  heading.innerHTML = `${name} időjárás`;
  today.innerHTML = `
    <h2>${localtime}, ${name}</h2>
    <div>
        <i class="bi bi-sunrise"></i>
            <p>${sunrise}</p>
        <i class="bi bi-sunset"></i>
            <p>${sunset}</p>
    </div>
  `;
};

const renderCurrentWeather = (currentObj) => {
  const current = document.querySelector(".current");
  current.innerHTML = `
    <div>
        <img
            src="https:${currentObj.condition.icon}"
            alt="${currentObj.condition.text}"
        />
        <h3>${currentObj.condition.text}</h3>
    </div>
    <ul>
       <li>
            <i class="bi bi-thermometer-high"></i>
            <p>${currentObj.temp_c}°C</p>
        </li>
        <li>
        <i class="bi bi-umbrella"></i>
            <p>${currentObj.precip_mm} mm</p>
        </li>
        <li>
            <i class="bi bi-wind"></i>
            <p>${currentObj.wind_mph} mph</p>
        </li>   
        <li>
            <i class="bi bi-droplet"></i>
            <p>${currentObj.humidity} %</p>
        </li> 
    </ul>
    `;
};

const renderNextWeather = (timeObj) => {
  const forecast = document.querySelector(".forecast");

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img
      src="https:${timeObj.condition.icon}"
      alt="${timeObj.condition.text}"
    />
    <h4>${timeObj.condition.text}</h4>
    <h5>${timeObj.time.slice(-5)}</h5>
    <ul>
      <li>
        <i class="bi bi-umbrella"></i>
        <p>${timeObj.precip_mm} mm</p>
      </li>
      <li>
        <i class="bi bi-thermometer-high"></i>
        <p>${timeObj.temp_c}°C</p>
      </li>
      <li>
        <i class="bi bi-wind"></i>
        <p>${timeObj.wind_mph}mph</p>
      </li>
      <li>
        <i class="bi bi-droplet"></i>
        <p>${timeObj.humidity}%</p>
      </li>
    </ul>  
    `;

  forecast.appendChild(card);
};

getLocation();
