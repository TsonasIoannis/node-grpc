# node-grpc
A basic gRPC example using NodeJS

## Prerequisites

- [Download](https://github.com/protocolbuffers/protobuf/releases) Protocol Buffer and add it to Path.
  - (Optional) [Download](https://github.com/grpc/grpc-web/releases) Protocol Buffer for the Web addon and add it to Path.
- Clone this repository
  
  ```
  git clone https://github.com/TsonasIoannis/node-grpc
  ```
- Install packages
  
  ```
  npm install
  ```
- Generate Typescript files
  
  ```
  protoc -I=. test.proto --js_out=import_style=commonjs,binary:./protoc --grpc-web_out=import_style=typescript,mode=grpcwebtext:./protoc
  ```
  
## Run the example
  
1. Start the server
 
   ```
   node server.js
   ```
2. Start the client in a separate terminal
 
   ```
   node client.js
   ```
   - (Optional) Provide custom string as argument
      
      ```
      node client.js John
      ```

## Notes

To use a standard javascript framework (e.g. React) the web-grpc requires a proxy (e.g.Envoy) and importing the generated files to the project.
