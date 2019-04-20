const request = require("request");

const geocode = (search = {}, callback) => {
  request({url: "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(search)+".json?access_token=pk.eyJ1Ijoibm9haGZpbmVyIiwiYSI6ImNqdWQ3czJ6eDA0ajk0M210MTl0bmFyZnEifQ.R0rQ0Jejg8W_MA7gB9k0Zg", json: true}, (error, response) => {
    if(error) {
      callback("something bad happened", undefined);
    } else {
      if(response.body.features.length === 0) {
        callback("no response", undefined);
      } else {
        callback(undefined, {
          longitude: response.body.features[0].center[0],
          latitude: response.body.features[0].center[1],
          name: response.body.features[0].place_name
        });
      }
    }
  });
}

module.exports = geocode;
