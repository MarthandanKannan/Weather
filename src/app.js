const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { response } = require('express')
const app = express()
const getgeocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const forecastFull = require('./utils/forcastFull')

const port = process.env.PORT || 3000

//defind paths
const publicDirPath = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars
app.set('view engine' , 'hbs')
app.set('views' , viewDir)
hbs.registerPartials(partialPath)
//SetUp static dir
app.use(express.static(publicDirPath))

app.get('',(req, res)=>{
    res.render('index', {
        name:'Deni',
        title:'Weather App'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About Me',
        name:'Deni'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'This page is a query center!!!',
        title:'Help',
        name:'Deni'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Need to provide the address'
        })
    }

    getgeocode(req.query.address , (error , {latitude , longitude, location} = {}) =>{
        if(error){
            return res.send({
                error:error
            })
        } 
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            
            res.send({
                address:req.query.address,
                location:location,
                forecastData:forecastData
            })
            //app.put('/weatherFull',location)
          })
    })
})

app.get('/weatherFull' ,(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'Need to provide the address'
        })
    }

    getgeocode(req.query.address , (error , {latitude , longitude, location} = {}) =>{
        if(error){
            return res.send({
                error:error
            })
        } 
        
        forecastFull(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                address:req.query.address,
                location:location,
                forecastData:forecastData
            })
          })
    })
})

app.get('/page',(req,res) => {
    console.log(req.query)
    res.send({
        product:''
    })
}) 

app.get('/help/*' , (req, res)=>{
    res.render('404',{
        title:'404',
        name:'Deni',
        errorMessage:'Help article not found'
    })
})

app.get('*' , (req,res) =>{
    res.render('404',{
        title:'404',
        name:'Deni',
        errorMessage:'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up and running on port '+port)
})