var PROTO_PATH = "test.proto";
const SERVER_URI = "localhost:50051";

const _ = require("lodash");
var parseArgs = require("minimist");
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

function main() {
  var argv = parseArgs(process.argv.slice(2), {
    string: "target",
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = SERVER_URI;
  }
  var client = new hello_proto.Greeter(
    target,
    grpc.credentials.createInsecure()
  );
  var user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = "world";
  }
  // Unary
  client.sayHello({ name: user }, function (err, response) {
    console.log("Greeting from Unary gRpc:", response.message);
  });
  //Server streaming
  let serverCall = client.lotsReplies({ name: user });
  serverCall.on("data", function (response) {
    console.log(response.message);
  });

  serverCall.on("end", function () {
    console.log("All Messages received");
  });
  //Client streaming
  let clientCall = client.lotsGreetings(function (error, response) {
    console.log("Even names: ", response.evenGreetings);
    console.log("Odd names: ", response.oddGreetings);
  });

  let nameList = ["John", "Stuart", "Jacob"];
  _.each(nameList, function (name) {
    clientCall.write({ name: name });
  });

  clientCall.end();

  //Bidirectional streaming
  let bidiCall = client.bidiHello();

  bidiCall.on("data", function (response) {
    console.log(response.message);
  });
  bidiCall.on("error", function (error) {
    console.log(error.code, " -> ", error.details);
  });

  bidiCall.on("end", function () {
    console.log(`Closed`);
  });

  (async () => {
    const idxList = [1, 2, 3, 4, 5];
    for await (let i of idxList) {
      console.log(`Creating stream #${i}`);
      bidiCall.write({ name: i });
    }
    bidiCall.end();
  })();
}
main();
