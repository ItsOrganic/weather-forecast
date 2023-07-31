const request = require('postman-request')
const chalk = require('chalk')
const key = require('dotenv')


const geocode = (address,callback) => {

    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+ ".json?access_token=pk.eyJ1IjoiaXRzb3JnYW5pYyIsImEiOiJjbGs5eHR1dTcwMWo5M2VwdXN4dTBkYmIzIn0.5mTWs7Zm-s7s6lxTOdH4qw&limit=1"
    request({url: geocodeURL,json:true}, (error, {body})=>{
        if(error)
        {
            callback('Unable to connect to location service ', undefined)
            // console.log(chalk.red.inverse(' !! Unable to connect to the services !! '))
        }
        else if(body.features.length==0){
            callback('Unable to find the location, Try another location', undefined)
            // console.log(chalk.red.inverse('Unable to find the location'))
        }
        else{
            callback(undefined, {
                
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
            // console.log(longitude,latitude)
        }
    })
}

module.exports = geocode