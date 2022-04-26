const request = require('request')
const chalk = require('chalk')
const forecast = (latitude,longitude,callback)=>
{ 
    const url = "http://api.weatherstack.com/current?access_key=b982307a4fb5a6724b9a5611bb4d2e77&query="+latitude+","+longitude;
    request({url,json:true},(error,{body})=> // {body} is a property of response object
    {
        if(error)
        {
            callback("Unable to connect weather service", undefined)
        }
        else if(body.error)
        {    
            callback("unable to find location")
            // console.log(body.error);
        }
        else
        {
            callback(undefined, "The city "+body.location.name+" has a temperature "+
            body.current.temperature+" degree celcius."
            )
        
            // name = body.location.name;
            // temperature = body.current.temperature;
            // console.log(name);
            //  console.log(body.location.country);
            //  console.log(chalk.green("The city "+name+" has a temperature "+temperature+" degree celcius"));
            //  console.log(chalk.cyan("Address: "+
            //  name +","+body.location.region+","+body.location.country));
        }
    })
}

module.exports = forecast;