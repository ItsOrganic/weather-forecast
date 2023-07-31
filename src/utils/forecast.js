const request = require('postman-request')
const chalk= require('chalk')
const dotenv = require('dotenv').config({path:__dirname})

const forecast = (lat,long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=f9c3e5db9456c1d29b5aa1668ec0a454&query=${lat},${long}`
    request({url:url, json:true},(error, {body}) => {
        if(error)
        callback('Unable to connect to the location service ',undefined)
        else if(body.error)
        callback('Unable to find the location',undefined)
        // const data = JSON.parse(response.body)
        else{
            console.log(body.current)
            callback(undefined,"The current temprature is " + body.current.temperature + " degrees and it feels like " + body.current.feelslike + " degrees")
        }
    });
}




module.exports = forecast