// @generated by protoc-gen-aelf-es v1.0.0 with parameter "target=ts"
// @generated from file Protobuf/contract/hello_world_contract.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Empty, StringValue } from "@bufbuild/protobuf";

/**
 * @generated from service HelloWorld
 */
export abstract class HelloWorldClient {


    /**
     * Actions (methods that modify contract state)
     * Stores the value in contract state
     *
     * @generated from rpc HelloWorld.Update
     */
    abstract async Update(request: StringValue): Promise<Empty> {
    // this is a send method
    }

    /**
     * Views (methods that don't modify contract state)
     * Get the value stored from contract state
     *
     * @generated from rpc HelloWorld.Read
     */
    abstract async Read(request: Empty): Promise<StringValue> {
    // this is a view method
    }
}