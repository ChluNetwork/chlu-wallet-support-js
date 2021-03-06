import bitcoin from 'bitcoinjs-lib'
import coinSelect from 'coinselect'

import ImportPrivateKey from './import_private_key'
import GetUtxos from './get_utxos'
import PushTx from './push_tx'

import { isEmpty, map, forEach, get } from 'lodash'

export default class CreateChluTransaction {

  constructor (apiKey) {
    this.pusher = new PushTx(apiKey)
    this.getter = new GetUtxos(apiKey)
  }

  getImportedKey(mnemonic) {
    const keyPath = "m/44'/1'/0'/0/0"
    const importPrivateKey = new ImportPrivateKey()

    this.importedKp = importPrivateKey.importFromMnemonic(mnemonic, keyPath)
    this.feeRate = 55
  }

  getInputTxs(fromAddress, targets, feeRate) {
    return this.getter.getFromBlockchain(fromAddress).then((utxos) => {
      let unspents = map(utxos.txrefs, (tx) => ({ txId: tx.tx_hash, vout: tx.tx_output_n, value: tx.value }) )
      let { inputs, outputs, fee } = coinSelect(unspents, targets, feeRate)

      return { inputs, outputs, fee }
    })
  }

  pushTransaction(tx) {
    return this.pusher.push(tx.toHex()).then(response => response.tx)
  }
  
  create(fromAddress, toAddress, amount, changeAddress, contentHash) {
    if ( isEmpty(this.importedKp) ) {
      throw new Error('No key pair specified')
    }

    changeAddress = isEmpty(changeAddress) ? fromAddress : changeAddress

    const targets = [
      { address: toAddress, value: amount }
    ]
    
    return this.getInputTxs(fromAddress, targets, this.feeRate).then(({ inputs, outputs, fees }) => {
      let txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet)

      forEach(outputs, (o) => {
        if ( !isEmpty(o.address) ) {
          txb.addOutput(o.address, o.value)
        } else {
          txb.addOutput(changeAddress, o.value)
        }
      })

      let data = Buffer.from(contentHash, 'utf8')
      let dataScript = bitcoin.script.nullData.output.encode(data)
      txb.addOutput(dataScript, 0)

      // only one input allowed for now
      txb.addInput(get(inputs, '[0].txId', {}), get(inputs, '[0].vout', {}))
      txb.sign(0, this.importedKp)
      return txb.build()
    })
  }
}
