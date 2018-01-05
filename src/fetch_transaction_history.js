import getBlockchainClient from './blockchain_client'

class fetchTransactionHistory {

  constructor (apiKey) {
    this.blockchainClient = getBlockchainClient(apiKey)
  }

  getFromBlockchain (address) {
    return new Promise((resolve, reject) => {
      this.blockchainClient.getAddrFull(address, {}, (err, txs) => {
        if ( err ) {
          reject(err)
        } else {
          resolve(txs)
        }
      })
    })
  }
}

export default fetchTransactionHistory
