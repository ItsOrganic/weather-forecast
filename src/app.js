const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shivam'
    })
})

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: 'Shivam'
//     })
// })

// app.get('/help', (req, res) => {
//     res.render('help', {
//         helpText: 'This is some helpful text.',
//         title: 'Help',
//         name: 'Shivam'
//     })
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Enter a address to find the location'
        });  
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){

            return res.send({
                error: error
            })
        }
        forecast(longitude,latitude,(error, forecastData )=> {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast:forecastData,
                location: location,
                address:req.query.address

            })

        })
    })
   

    })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})


app.get('/product', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'Enter a correct search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})