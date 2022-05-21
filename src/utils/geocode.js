const request = require('request')


const getgeocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGVuaXJ1YmhhbiIsImEiOiJja2ttaGludW4xdHd2MnBvZHduMHIydzNpIn0.lF4dyyYgW7NDXNAmUOnPfw&limit=1'

    request({url , json: true}, (error, { body }) => {
        if(error){
            callback('There is a problem in the connection' , undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find the location. Try another search' , undefined)
        } else {
            callback(undefined , {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })

        }
    })
}

module.exports = getgeocode