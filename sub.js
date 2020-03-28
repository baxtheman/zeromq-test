var zmq = require('zeromq')
var subscriber = zmq.socket('sub')
var sock = zmq.socket("pull");

subscriber.on('message', function() {
  var msg = [];
    Array.prototype.slice.call(arguments).forEach(function(arg) {
        msg.push(arg.toString());
    });

    console.log(msg);
})

subscriber.connect('tcp://localhost:5563')
subscriber.subscribe('B')

  
sock.connect("tcp://127.0.0.1:3000");
console.log("Worker connected to port 3000");

sock.on("message", function(msg) {
  console.log("work: %s", msg.toString());
});