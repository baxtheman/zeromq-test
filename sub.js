var zmq = require('zeromq')
var subscriber = zmq.socket('sub')
var sock = zmq.socket("pull");

subscriber.on('message', function() {
  var msg = [];
    Array.prototype.slice.call(arguments).forEach(function(arg) {
        msg.push(arg.toString());
    });

    console.log(msg[0]);
    console.log(JSON.parse(msg[1]));
})

subscriber.connect('tcp://localhost:5563')
subscriber.subscribe('ORDERITEM')

  
sock.connect("tcp://127.0.0.1:5556");
console.log("Worker connected to port 5556");

sock.on("message", function(msg) {
  console.log("work: %s", msg.toString());
});