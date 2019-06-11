# saas node.js sdk
-----

## Installing

Using npm:

```bash
npm install @jadepool/saas-sdk
```

## Example

```js
const API = require('@jadepool/saas-sdk')

const appKey = 'TyTLvCnHINbWZQag88hhmMz1'
const appSecret = 'uf0rPlTluGnIllGqx0X1os4hQ6rOdXDxStiN4qGd79lS6yeHZaOK4ldvRv1TBqr6'
const apiAddr = 'http://127.0.0.1:8092'

async function main () {
    const api = new API(appKey, appSecret, apiAddr)
    let result
    
    // create a new address
    try {
        result = await api.createAddress("ETH")
        console.log(result)
    } catch(e) {
        // do something
        console.log(e.response)
    }
    
    // vefify address
    try {
        result = await api.verifyAddress("ETH", result.address) 
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
    
    // get coin balance
    try {
        result = await api.getBalance("ETH")
        console.log(result)
        /* { balance: '0.0082000000',
            inLocked: '0.0000000000',
            inLockedFee: '0.0000000000',
            outLocked: '0.0800000000',
            outLockedFee: '0.0400000000' 
        }*/
    } catch(e) {
        // do something
        console.log(e)
    }
    


    // get all coin list
    try {
        result = await api.getAssets()
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
    
    // withdraw
    try {
        let id = ''+new Date().valueOf()
        let coinType = 'ETH'
        let to = '0x56204b988844b20160035273fD98Dbb2A54C85F5'
        let value = '0.01'
        let memo = ''
        result = await api.withdraw(id, coinType, to, value, memo)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
    

    // get a order info
    try {
        result = await api.getOrder("6reZqDxXwa2pBQ7AmV2K")
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

main()
```

## License

MIT