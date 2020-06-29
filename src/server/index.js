let projectDetails={};
//to enable fetch rewuests
const fetch = require('node-fetch');
//urls and keys for apis
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = 'rohanagarwal11';
const weatherbitforecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherbithistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat=';
const weatherbitkey="61cee5476c5348c19b73a6210e1db3d1";
const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayAPI = '17245279-ce4bcf4444413a5a8c0010d76';
var path = require('path');
//adding express cors and body-parser
const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('dist'))
//setting the path
app.get('/', function (req, res) {
    res.status(200).send('dist/index.html');
})
//listening to port 8081
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
//adding a route
app.post('/testing', (req,res)=>{
  try {
      //calling function to get latitude and longitude
    latandlong(req.body.toEntry)
        .then((resp) => {
            let latitude = resp.geonames[0].lat;
            const longitude = resp.geonames[0].lng;
            //calling function getWeatherData to get weather details
            return getWeatherData(latitude, longitude, req.body.dateEntry);
        })
        .then((respo) => {
            //storing weather details
            projectDetails['temp'] = respo['data'][0]['temp'];
            projectDetails['weather'] = respo['data']['0']['weather']['description'];
            //calling function to get image url
            return image(req.body.toEntry);
        })
        .then((respon) => {
            //storing data
            projectDetails['image'] = respon['hits'][0]['webformatURL'];
            projectDetails['from']=req.body.fromEntry;
            projectDetails['to']=req.body.toEntry;
            projectDetails['date']=req.body.dateEntry;
            projectDetails['todo_list']=req.body.todoEntry;
            //sending the information collected
            res.status(201).send(projectDetails);
        })
} 
catch (e) {
    console.log('error', e);
}
  })
//function to get latitude and longitude
  async function latandlong(to) {
    const response = await fetch(geoNamesURL + to + '&username=' + username);
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}
//function to get weather data based on time
async function getWeatherData(lat, long, date) {
    const timestamp_trip_date = Math.floor(new Date(date).getTime() / 1000);
    const todayDate = new Date();
    const timestamp_today = Math.floor(new Date(todayDate.getFullYear() + '-' + todayDate.getMonth() + '-' + todayDate.getDate()).getTime() / 1000);
let response;
    if (timestamp_trip_date < timestamp_today) {
        let next_date = new Date(date);
        next_date.setDate(next_date.getDate() + 1);
        response = await fetch(weatherbithistoryURL + lat + '&lon=' + long + '&start_date=' + date + '&end_date=' + next_date + '&key=' + weatherbitkey)
    } else {
        response = await fetch(weatherbitforecastURL + lat + '&lon=' + long + '&key=' + weatherbitkey);
    }

    try {
        return await response.json();
    } catch (e) {
        console.log('error', e)
    }
}
//function to get the image of the destination
async function image(dest) {
    const response = await fetch(pixabayURL + pixabayAPI + '&q=' + dest + ' city&image_type=photo');
    try {
        return await response.json();
    } catch (e) {
        console.log('error', e);
    }
}
module.exports = app;