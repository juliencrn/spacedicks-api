# SpaceDicks - API

10,000 unique NTFs with proof of ownership living on the Polygon blockchain and following the ERC-721 standard, but yeah, these are DICKs.

## Repositories

This project is composed with different pieces:
- [Contract](https://github.com/juliencrn/spacedicks-contract): Solidity ERC-721 smart-contracts that is responsible to create the NFT tokens with random metadata with rarity rules.
- [API](https://github.com/juliencrn/spacedicks-api) (this): Build and upload SVG on IPFS. Return token Metadata for Opensea marketplace.
- [Website](https://github.com/juliencrn/spacedicks-website): Frontend React application using web3 and Truffle that provides an user interface to interact with the smart-contract.

## Install

Require Node.js, npm, the ganache local blockchain.

```sh
git clone https://github.com/juliencrn/spacedicks-api
cd spacedicks-api
```

Then see the `package.json` in the `script` section.
