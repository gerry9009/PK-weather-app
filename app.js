const KEY = "6a70e60eb18c4ec5ab2135858230903";

const current = "current.json";
const forecast = "forecast.json";

fetch(
  "https://api.weatherapi.com/v1/forecast.json?key=6a70e60eb18c4ec5ab2135858230903&q=Budapest&aqi=no&days=3&lang=hu"
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
