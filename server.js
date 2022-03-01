const PROTO_PATH = "test.proto";
const SERVER_URI = "localhost:50051";

const uuid = require("uuid");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello uanry RPC method.
 */
function sayHello(call, callback) {
  callback(null, { message: "Hello " + call.request.name });
}
/**
 * Implements the LotsReplies server streaming RPC method.
 */
function lotsReplies(call) {
  const name = call.request.name;
  for (let i = 0; i < 5; i++) {
    call.write({ message: "Hello " + name + " " + i });
  }
  call.end();
}
/**
 * Implements the LotsGreetings client streaming RPC method.
 */
function lotsGreetings(call, callback) {
  let oddGreetings = [];
  let evenGreetings = [];
  call.on("data", function (greetingStream) {
    let name = greetingStream.name;
    if (name.length % 2 === 0) {
      evenGreetings.push(name);
    } else {
      oddGreetings.push(name);
    }
  });
  call.on("end", function () {
    callback(null, {
      evenGreetings: evenGreetings.join(),
      oddGreetings: oddGreetings.join(),
    });
  });
}

/**
 * Implements the BidiHello bidirectional streaming RPC method.
 */
function bidiHello(call) {
  call.on("data", async (payload) => {
    console.log(payload);
    payload.id = uuid.v4();
    payload.created_on = new Date().getTime().toString();
    call.write({ message: payload.id });
    call.write({ message: payload.created_on });
  });
  // if server encouters event request to end the stream
  call.on("end", async (payload) => {
    call.end();
  });
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {
    sayHello: sayHello,
    lotsReplies: lotsReplies,
    lotsGreetings: lotsGreetings,
    bidiHello: bidiHello,
  });
  server.bindAsync(SERVER_URI, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("Server is running at:" + SERVER_URI);
  });
}

main();
