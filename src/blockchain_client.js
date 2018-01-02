import blockcypher from 'blockcypher'

export default function getBlockchainClient (apiKey) {
  return new blockcypher('btc', 'test3', apiKey)
}
