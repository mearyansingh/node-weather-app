const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const app = express();
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    name: "Aryan Singh",
    title: "Weather",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Aryan Singh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is help page",
    name: "Aryan Singh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  // geocoding;
  geocode(req.query.address, (data) => {
    //forcast
    const { latitude, longitude, placeName } = data;
    forcast(latitude, longitude, (forcastData) => {
      // console.log(forcastData, "forcastData");
      res.send({
        forecast: forcastData.weatherReport,
        weatherIcon: forcastData.weatherIcon,
        location: placeName,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  // console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aryan Singh",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aryan Singh",
    errorMessage: "Page note found.",
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});