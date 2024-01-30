import type { StringValue, Empty } from "@bufbuild/protobuf";
import { HelloWorldClient } from "./gen/Protobuf/contract/hello_world_contract_aelf";
import AElf from "aelf-sdk";

const aelf = new AElf(
  new AElf.providers.HttpProvider("https://tdvw-test-node.aelf.io")
);

const wallet = AElf.wallet.createNewWallet();

class HelloWorldClientImpl extends HelloWorldClient {
  private contractInstance;

  constructor(contractAddress, wallet) {
    this.contractInstance = aelf.chain.contractAt(contractAddress, wallet);
  }

  async Update(request: StringValue): Promise<Empty> {
    return await this.contractInstance.Update(request.value);
  }
  async Read(request: Empty): Promise<StringValue> {
    return await this.contractInstance.Read.call();
  }
}

const client = new HelloWorldClientImpl(``, wallet);
