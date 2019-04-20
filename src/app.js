const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    about: "yoyoyo",
  });
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    about: "more dope stuff yo",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "the help page",
    about: "help me",
  })
})

app.get("/weather", (req, res) => {
  if(!req.query.search) {
    res.send({
      error: "you messed up the search"
    })
  } else {
    geocode(req.query.search, (error, data) => {
      if(error) {
        res.send({error})
      } else {

        forecast(data, (error, result) => {
          if(error) {
            res.send({error});
          } else {
            console.log(result);
            res.send({
              forecast: result.daily.summary,
              location: data.name,
              address: req.query.search,
            });
          }
        })
      }
    })
  }
})

app.get("/help/*", (req, res) => {
  res.send("404 but for the help pages");
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404"
  })
})

app.listen(port, () => {
  console.log("server running yo");
});
