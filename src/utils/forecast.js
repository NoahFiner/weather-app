const request = require("request");

const forecast = (data, callback) => {
  request({url: "https://api.darksky.net/forecast/95e17b6d64e8b1389322aa122f3a03d8/"+data.latitude+","+data.longitude+"",
          json: true}, (error, response) => {
    if(error) {
      callback("it broke", undefined);
    } else {
      if(response.body.error) {
        callback(response.body.error, undefined)
      } else {
        callback(undefined, response.body);
      }
    }
  });
}

module.exports = forecast;
