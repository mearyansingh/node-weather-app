const axios = require("axios");

const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoiYXJ5YW4xOCIsImEiOiJjbGwzb2FrNjIwbW9rM2VvNW5hZm9oOGgxIn0.2rKa2qR8HkNfijcGowikzQ`;

  axios
    .get(geocodeURL)
    .then(function (response) {
      // handle success
      const { data } = response;
      callback({
        latitude: data.features[0]?.center[1],
        longitude: data.features[0]?.center[0],
        placeName: data.features[0]?.place_name,
      });
    })
    .catch(function (error) {
      // handle error
      // console.log(`${error.response.status}-${error.code}`);
      console.log(error, "error geocode");
    });
};

module.exports = geocode;
