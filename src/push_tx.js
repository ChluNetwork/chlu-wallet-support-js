import getBlockchainClient from './blockchain_client'
import { isEmpty } from 'lodash'

class PushTx {

  constructor (apiKey) {
    this.blockchainClient = getBlockchainClient(apiKey)
  }

  push (txHash) {
    return new Promise((resolve, reject) => {
      this.blockchainClient.pushTX(txHash, (err, tx) => {
        if ( err  ) {
          reject(err )
        } else {
          resolve(tx)
        }
      })
    })
  }

}

export default PushTx
