import { Request, Response } from 'express'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import SpaceDicks from '../contracts/SpaceDicks.json'
import { RPC_URL } from '../config'

// Instantiate the web3
const web3Provider = new Web3.providers.HttpProvider(RPC_URL)
const web3 = new Web3(web3Provider)

export async function getSupply(req: Request, res: Response) {
  try {
    // Instantiate the contract
    const networkId = await web3.eth.net.getId();
    const networkData = (SpaceDicks.networks as Record<string, { address: string }>)[networkId];
    const contract = new web3.eth.Contract(
      SpaceDicks.abi as AbiItem | AbiItem[],
      networkData.address
    )

    const currentSupply = await contract.methods.currentSupply().call()
    return res.json(Number(currentSupply))
  } catch (error) {
    console.log(error);
    return res.json(10_000)
  }
}