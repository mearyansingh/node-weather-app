const axios = require("axios");

const forcast = (lat, lan, callback) => {
  const forcastURL = `http://api.weatherstack.com/current?access_key=b6b9fe3ea101658a07b29ab669d93e8c&query=${lat},${lan}&units=m`;

  axios
    .get(forcastURL)
    .then((response) => {
      // handle success
      const { weather_descriptions, temperature, feelslike, weather_icons ,humidity } =
        response?.data?.current;
      callback({
        weatherIcon: weather_icons,
        weatherReport: `${weather_descriptions[0]}. It is currently ${temperature} degree out. It feels like ${feelslike} degree out. The humidity is ${humidity}%.`,
      });
    })
    .catch(function (error) {
      // handle error
      // console.log(`${error.code}-${error.info}`);
      console.log(error, "error...");
    });
};

module.exports = forcast;
