
const request = require('request')

const key = require('./old_key.json').key
const url = 'https://fcm.googleapis.com/fcm/send'

request({
  method: 'GET',
  uri: url,
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key='+key
  }
}, (error, response, body) => {
  if(error) {
    console.log('[ERROR]: ', body)
  }
  console.log('[STATUS CODE]: ', response.statusCode)
  console.log('[BODY]: ', body)
})