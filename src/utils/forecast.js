const request = require('request')
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
            // console.log(body.current);
            callback(undefined, "The city "+body.location.name+" has a temperature "+
            body.current.temperature+" degrees out, but it feels like "+ body.current.feelslike+" degrees out."+
            " The humidity is "+body.current.humidity+"%. Observation time is "+body.current.observation_time
            )
        }
    })
}

module.exports = forecast;