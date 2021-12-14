require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV || "development"
export const isDev = NODE_ENV === "development"

// Website
export const SITE_URL = isDev
  ? "http://localhost:3000"
  : "https://spacedicks.xyz"

// SVG gen. config
export const buildSize = 96;
export const displaySize = 600;

// API config
export const PORT = process.env.PORT || 3001;
export const API_URL = isDev
  ? `http://localhost:${PORT}`
  : "https://spacedicks-api.herokuapp.com"

// Web3 config
// mainnet | mumbai
const network = process.env.NETWORK || "mumbai"
export const RPC_URL = isDev
  ? "http://localhost:8545"
  : `https://polygon-${network}.infura.io/v3/${process.env.INFURA_TOKEN}`

export const WEB3_STORAGE_TOKEN = process.env.WEB3_STORAGE_TOKEN