import { Request, Response } from 'express'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import { network, RPC_URL } from '../config'
import SpaceDicks from '../contracts/SpaceDicks.json'

// Instantiate the web3
const web3Provider = new Web3.providers.HttpProvider(RPC_URL)
const web3 = new Web3(web3Provider)

export async function getLastMinted(req: Request, res: Response) {
  try {
    // 1. Get the current supply
    // Instantiate the contract
    const networkId = await web3.eth.net.getId();
    const networkData = (SpaceDicks.networks as Record<string, { address: string }>)[networkId];
    const contract = new web3.eth.Contract(
      SpaceDicks.abi as AbiItem | AbiItem[],
      networkData.address
    )

    const currentSupply = await contract.methods.currentSupply().call()

    // 2. From the supply, build an array of the 5 latest tokens ids
    const DICK_COUNT = 4
    const lastId = Number(currentSupply)
    const lastDicks = Array(lastId)
      .fill(0)
      .map((_, i) => i + 1)
      .slice(lastId - DICK_COUNT, lastId)
      .reverse()


    // 3. Fetch metadata for each one
    const results = []
    for (const id of lastDicks) {
      const metadata = await contract.methods.get(id).call()
      const openseaUrl = network === "mainnet"
        ? `https://opensea.io/assets/matic/${networkData.address}/${id}`
        : `https://testnets.opensea.io/assets/mumbai/${networkData.address}/${id}`

      results.push({
        id,
        path: `/${id}/${metadata.join('/')}`,
        openseaUrl
      })
    }

    // 4. Finally, return an array of the 5 latest dicks
    res.json(results)
  } catch (error) {
    console.log(error);
    res.status(500)
  }
}

