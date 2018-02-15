import VendorSetup from '../src/vendor_setup'

test('generating keys for vendor wallet setup', async () => {

    let vendorSetup = new VendorSetup()
    const keyPairs = await vendorSetup.generateKeys()

    expect(keyPairs.signing).not.toBeNull()
    expect(keyPairs.encryption).not.toBeNull()  
})
     
