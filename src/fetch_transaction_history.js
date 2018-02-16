import getBlockchainClient from './blockchain_client'

class FetchTransactionHistory {
    
    constructor (apiKey) {
        this.blockchainClient = getBlockchainClient(apiKey)
    }

    getFromBlockchain (address) {
        return new Promise((resolve, reject) => {
            this.blockchainClient.getAddrFull(address, {}, (err, res) => {
                if ( err ) {
                    reject(err)
                } else {
                    resolve(res.txs)
                }
            })
        })
    }
}

export default FetchTransactionHistory
