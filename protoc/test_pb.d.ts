import * as jspb from 'google-protobuf'



export class HelloRequest extends jspb.Message {
  getName(): string;
  setName(value: string): HelloRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HelloRequest): HelloRequest.AsObject;
  static serializeBinaryToWriter(message: HelloRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloRequest;
  static deserializeBinaryFromReader(message: HelloRequest, reader: jspb.BinaryReader): HelloRequest;
}

export namespace HelloRequest {
  export type AsObject = {
    name: string,
  }
}

export class HelloReply extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): HelloReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloReply.AsObject;
  static toObject(includeInstance: boolean, msg: HelloReply): HelloReply.AsObject;
  static serializeBinaryToWriter(message: HelloReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloReply;
  static deserializeBinaryFromReader(message: HelloReply, reader: jspb.BinaryReader): HelloReply;
}

export namespace HelloReply {
  export type AsObject = {
    message: string,
  }
}

export class LotsGreetingsResponse extends jspb.Message {
  getEvengreetings(): string;
  setEvengreetings(value: string): LotsGreetingsResponse;

  getOddgreetings(): string;
  setOddgreetings(value: string): LotsGreetingsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LotsGreetingsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LotsGreetingsResponse): LotsGreetingsResponse.AsObject;
  static serializeBinaryToWriter(message: LotsGreetingsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LotsGreetingsResponse;
  static deserializeBinaryFromReader(message: LotsGreetingsResponse, reader: jspb.BinaryReader): LotsGreetingsResponse;
}

export namespace LotsGreetingsResponse {
  export type AsObject = {
    evengreetings: string,
    oddgreetings: string,
  }
}

