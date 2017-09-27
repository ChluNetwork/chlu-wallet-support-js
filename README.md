
[![Build Status](https://travis-ci.org/ChluNetwork/chlu-wallet-support-js.svg?branch=master)](https://travis-ci.org/ChluNetwork/chlu-wallet-support-js)

## Install ##

```npm install chlu-wallet-support-js --save-dev```

## Usage ##

Simple transaction creation for use in Demo

```
    const importPrivateKey = new ImportPrivateKey()
    const mnemonic = "mnemonic..."
    const keyPath = "m/44'/1'/0'/0/0"

    let txBuilder = new CreateChluTransaction()
    txBuilder.importedKp = importPrivateKey.importFromMnemonic(mnemonic, keyPath)

    return txBuilder.create(fromAddress, toAddress, amountSatoshis, changeAddress, 'ipfs content address')
```

## ToDo ##

1. Vendor registration - import PK and saving encryption keys on IPFS and IPNS
2. Customer registration - import PK and discover addresses and UTXOs

-------------------------------------------------------------------------------

## What is Chlu? ##

Chlu a decentralised reputation system.

Vendor reputation is backed by payments received via cryptocurrencies.

Vendors completely control who can access their reputation data, and
marketplaces can not limit access to a vendor's data.

Chlu supports payments with any cryptocurrencies as long there are
wallets for that cryptocurrency with support for Chlu.

### How does Chlu work? ###

Chlu enables paying customers to leave reviews and ratings for
vendors. The reviews and ratings are saved on IPFS and vendors remain
in complete control of their reputation data. Vendors can choose to
publicly share them with anyone, or selectively share them with
marketplaces where they sell their services and products.

The position paper on https://chlu.io has more details.

### Who runs Chlu? ###

Short answer - no one. But there is a team developing the protocols
and reference open source implementations of the wallets and services.

There is no smart contract that any one organisation controls.

## What are Chlu protocols? ##

Chlu requires customer and vendor wallets to provide functionality
that enables customers and vendors to leave reviews, edit them later
and share them if they want to.

The Chlu protocol specifies the behaviours that wallet providers need
to build to provide support for Chlu reputation on their wallet. The
protocol specifies the format of messages and when and how the
messages are to be exchanged, where the data is to be saved and how
this data should be interpreted by wallets.

## Can anyone create a wallet? ##

Yes, any wallet can support the Chlu reputation platform by providing
support for the Chlu protocols specified in this repository.

## Contribution ##

To contribute to our reference open source implementation of wallets,
please create an issue in this repository and/or a pull request with
associated changes.

To make suggestions for improving the Chlu protocol, please go to our
[protocol repository](git@github.com:ChluNetwork/chlu-protocol.git)

