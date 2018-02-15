import bitcoin from 'bitcoinjs-lib'

export default class VendorSetup {

    generateKeys() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.generateSigningKeyPair(),
                this.generateEncryptionKeyPair()]).then((keys) => {
                    resolve({
                        signing: keys[0],
                        encryption: keys[1]
                    })
                }).catch((error) => {
                    reject(error)
                })
        })
    }
    
    generateSigningKeyPair() {
        return new Promise((resolve, reject) => {
            const kp = bitcoin.ECPair.makeRandom()
            if (kp) {
                resolve(kp)
            } else {
                reject(kp)
            }
        })
    }

    generateEncryptionKeyPair() {
        return new Promise((resolve, reject) => {
            const kp = bitcoin.ECPair.makeRandom()
            if (kp) {
                resolve(kp)
            } else {
                reject(kp)
            }
        })
    }                           
}
