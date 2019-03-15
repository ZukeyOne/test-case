const request = require('request')

const key = require('./old_config.json').key
const to  = require('./old_config.json').to
const url1 = 'https://fcm.googleapis.com/fcm/send'       //新接口
const url2 = 'https://android.googleapis.com/gcm/send'   //使用的旧接口
const url3 = 'https://gcm-http.googleapis.com/gcm/send'  //文档的旧接口

old_push(url1, key, to)

// internal function
function old_push(server_url, server_key, to) {
  request({
    method: 'POST',
    uri: server_url,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key='+server_key
    },
    body: JSON.stringify(
      {
      "notification" :{
        "body" : "test",
        "title" : "this is web test"
      },
      "to": to
    })
  }, (error, response, body) => {
    if(error)
      console.log('[ERROR]: ', body)
    if(response)
      console.log('[STATUS CODE]: ', response.statusCode)
    console.log('[BODY]: ', body)
  })
}
