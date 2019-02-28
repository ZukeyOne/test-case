const request = require('request')

const key = require('./old_key.json').key  //"AIzaSyAUxLbb1S5fy9PuH8lkG6gx8D315VWmmkw" 示例，非实际使用
const url1 = 'https://fcm.googleapis.com/fcm/send'       //新接口
const url2 = 'https://android.googleapis.com/gcm/send'   //使用的旧接口
const url3 = 'https://gcm-http.googleapis.com/gcm/send'  //文档的旧接口

var to = 'eQ0gqZz_yLY:APA91bEP41xfpwMuxAA4UQePm60u0skUaL24AW6wa6KbnYVHAsVLxFnP327dEgLouXkeKaf_Oh-d4WbagJYD_603gpHJ6AHWjCK9NA6mW_zbuGRJl2xUd4wmhH0-HEU0SN9jpqC6n7s0'

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
