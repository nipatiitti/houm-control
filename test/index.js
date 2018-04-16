var io = require('socket.io-client')

var key = 'glistening-mucho-fuel'

var socket = io('https://houmi.herokuapp.com')

socket.on("connect", function() {
  socket.emit('clientReady', { siteKey: key })
  socket.emit('apply/light', {_id: "", on: true, bri: 255 })
})