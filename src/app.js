const { request, response } = require('express');
const path = require('path')
const express = require('express')
const app = express();
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000 ;


// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 

// Setup handlebars engine & views location
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup to static directory to serve public/index.html  //not used for templates/index.hbs file
app.use(express.static(publicDirectoryPath))

app.get('',(request,response)=>
{
    response.render('index',{
        title:"WeatherApp",
        name:"Mangesh Choudhari"
    })
})

app.get('/about',(request,response)=>
{
    response.render('about',{
        title:"About me",
        name:"Mangesh Choudhari"
    })
})

app.get('/help',(request,response)=>
{
    response.render('help',{
        title:"HELP...",
        msg:"This is a helpful text",
        name:"Mangesh Choudhari"
    })
})
app.get('/weather',(request,response)=>{
    const countryName = request.query.address;
    // countryName is state
    if(!countryName)
    {
        return response.send(
            {
                error : "Please enter city name or Try for different city."
            })
    }

geoCode(countryName,(error,{latitude,longitude,location}={})=>
{
    if(error)
    {
        return response.send({error:error})
    }

    forecast(latitude,longitude,(error,forecastData)=>
    {
        if (error)
        {
            return response.send({error:error})
        }
        response.send(
            {
                place :location,
                state : countryName,
                forecast: forecastData
            }
        )
    })
})
  
})

app.get('/products',(request,response)=>
{
    if(!request.query.search)
    {
        
        response.send
        ({
            error:"You must provide a search term"
        })
    }
    else
    {
        console.log(request.query.search);
        response.send
            ({
                products : []
            })
    }   
})
app.get('/help/*',(request,response)=>
{
    response.render('404',
    {
        title :"404",
        name:"Mangesh",
        ErrorMsg : "Help article not found !"
    })
})

app.get('*',(request,response)=>
{
    response.render('404',
    {
        title :"404",
        name:"Mangesh",
        ErrorMsg : "Page not found"
    })
})

app.listen(port,()=>
{
    console.log("server listening to port", port);
})