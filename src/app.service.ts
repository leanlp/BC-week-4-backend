import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from "./assets/MyToken.json";



const ERC20VOTES = "0x3A4a8459f38e131fa5071a3E0444E64313F7343E"

const MINT_VALUE = ethers.utils.parseEther("10");


@Injectable()
export class AppService {
  
provider: ethers.providers.BaseProvider;
erc20Contract: ethers.Contract;
signer: ethers.Wallet;
account: string | undefined;
erc20ContractFactory: ethers.Contract;




constructor() {
  const provider = new ethers.providers.InfuraProvider("goerli", { infura: 'INFURA_API_KEY' })
   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '');
  this.signer = wallet.connect(provider)
  const erc20ContractFactory = new ethers.ContractFactory(
    tokenJson.abi,
    tokenJson.bytecode,
    this.signer
    );
  this.erc20Contract = erc20ContractFactory.attach(ERC20VOTES)
  
 
 
}

getTokenAddress() {
 return ERC20VOTES;
}


async requestTokens(body: any) {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '');
  const signer = wallet.connect(this.provider);
  const erc20Contract = this.erc20Contract.attach(ERC20VOTES).connect(this.signer);
  console.log(signer);
  console.log(this.erc20Contract);
  // mint tokens here
  const mintTokens = await erc20Contract.mint(body.address, MINT_VALUE);
  console.log(`Minting complete! Tx hash: ${mintTokens.hash}`)
  console.log(`Tokens minted successfully to ${body.address}, the transaction can be found at ${mintTokens.hash}`);
  const delegateTx = await erc20Contract.delegate(body.address);
  await delegateTx.wait()
  console.log(`Delegation  Tx hash: ${delegateTx.hash}`)
  
  return mintTokens.wait();
  
  
}

 
}
