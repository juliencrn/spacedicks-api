import { Request, Response } from 'express'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

import { RPC_URL, SITE_URL } from '../config'
import generateSVG, { TraitName } from '../svg'
import { isNumeric, validateAttributes } from './utils'
import { uploadSVG } from '../ipfs.storage'
import SpaceDicks from '../contracts/SpaceDicks.json'
import { getArm, getBackground, getClothe, getEye, getHat, getMouth, getSkin, getSpecial } from '../svg/utils'

// Instantiate the web3
const web3Provider = new Web3.providers.HttpProvider(RPC_URL)
const web3 = new Web3(web3Provider)

export async function getTokenMetadata(req: Request, res: Response) {
  try {
    if (!isNumeric(req.params.tokenId)) {
      return res.status(500).json({ message: "Token id is missing." })
    }

    // Extract metadata from the blockchain
    const tokenId = Number(req.params.tokenId)

    // Instantiate the contract
    const networkId = await web3.eth.net.getId();
    const networkData = (SpaceDicks.networks as Record<string, { address: string }>)[networkId];
    const contract = new web3.eth.Contract(
      SpaceDicks.abi as AbiItem | AbiItem[],
      networkData.address
    )

    const currentSupply = await contract.methods.currentSupply().call()
    if (tokenId > Number(currentSupply)) {
      return res.status(404).json({ message: "Token does not exist." })
    }

    // Get metadata
    const metadata = await contract.methods.get(tokenId).call()
    const attributes = validateAttributes(metadata)

    // Generate the SVG string and upload it
    const svgString = generateSVG({ id: tokenId, ...attributes })
    const imageUrl = await uploadSVG(svgString, `cryptoDicks-${tokenId}.svg`)

    // https://docs.opensea.io/docs/metadata-standards
    res.json({
      name: `SpaceDicks #${tokenId}`,
      image: imageUrl,
      external_url: SITE_URL,
      attributes: formatAttributes(attributes)
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Could not get the token." })
  }
}

type OpenSeaAttribute = { trait_type: string; value: string }

function formatAttributes(attributes: Record<TraitName, number>): OpenSeaAttribute[] {
  const mapTitleToAttributes: [string, string][] = [
    ["Background color", getBackground(attributes.background).name],
    ["Dick skin", getSkin(attributes.skin).name],
    ["Hat", getHat(attributes.hat).name],
    ["Eyes", getEye(attributes.eye).name],
    ["Mouth", getMouth(attributes.mouth).name],
    ["Clothe", getClothe(attributes.clothe).name],
    ["Arms", getArm(attributes.arm).name],
    ["Special", getSpecial(attributes.special).name],
  ]
  return mapTitleToAttributes
    .filter(([, value]) => value !== "Empty")
    .map(([trait_type, value]) => ({ trait_type, value }))
}