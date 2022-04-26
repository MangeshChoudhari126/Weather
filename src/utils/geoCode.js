const request = require('request')
const geoCode = (address,callback)=>
{
   const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?types=place&access_token=pk.eyJ1IjoibWFuZ2VzaGFqYWNrdXMiLCJhIjoiY2wyNDgwZmxtMXhpNDNjbzN2dDBodGlqaCJ9.b9bB-_QXR_nALYh_Vt-SRw&limit=1";
   request({url,json:true},(error,{body}={})=> // {body} is a property of response object
   {
       if(error)
       {
           callback("unable to connect to location service",)
       }else if(body.features.length === 0)
       {
           callback("unable to find location. Try another search",undefined)
       }
       else{    
           callback(undefined,{
            latitude  : body.features[0].center[1],
            longitude : body.features[0].center[0],
            location : body.features[0].place_name
           }) 
           
       }
   })
}
module.exports = geoCode;