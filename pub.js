var zmq = require('zeromq')
var publisher = zmq.socket('pub')
var sock = zmq.socket("push");
var i = 0, j=0;

publisher.bind('tcp://*:5563', function(err) {
  if(err)
    console.log(err)
  else
    console.log('Listening on 5563…')
})

setInterval(function() {
  //if you pass an array, send() uses SENDMORE flag automatically
  publisher.send(["A", "We do not want to see this"]);
  //if you want, you can set it explicitly
  publisher.send("B", zmq.ZMQ_SNDMORE);
  publisher.send("We would like to see this " + i++);
} , 500);

sock.bindSync("tcp://127.0.0.1:3000");

setInterval(function() {
  sock.send("some work " + j++);
}, 500);