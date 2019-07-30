# saas node.js sdk

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
    

    try {
        let id = ''+new Date().valueOf()
        let coinType = 'ATOM'
        let value = '0.06'
        result = await api.delegate(id, coinType, value)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }

    try {
        let id = ''+new Date().valueOf()
        let coinType = 'ATOM'
        let value = '0.01'
        result = await api.undelegate(id, coinType, value)
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

## 订单通知示例：

```
{ id: '9J6NzaoL13lj85ZqE0YO',
  bizType: 'DEPOSIT',
  coinName: 'ATOM',
  type: 'ATOM',
  state: 'DONE',
  memo: '',
  value: '10.000000000000000000',
  fee: '0.000000000000000000',
  from: 'cosmos1z7jw2deueg37nd6v3flmn4wy2v3nhz55wyjqgk',
  to: 'cosmos1q0fskv7x737mx5ma7ts8n25l6tudf36jr2x2rl',
  txid: 'AF6660242D98767322E75B40A49CFDD3578D5AC02F52411B5FAD523AAB7F6E64',
  n: 0,
  block: -1,
  confirmations: 0,
  sign: '62d90927ce1fbdac2eeaf117facae55005678ed0016e3c57c0ca1148a027b570' 
}
```
## License

MIT
