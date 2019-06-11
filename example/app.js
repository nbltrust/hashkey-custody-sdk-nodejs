const API = require('../index.js')

const appKey = 'TyTLvCnHINbWZQag88hhmMz1'
const appSecret = 'uf0rPlTluGnIllGqx0X1os4hQ6rOdXDxStiN4qGd79lS6yeHZaOK4ldvRv1TBqr6'
const apiAddr = 'http://34.92.224.225:8092'

async function main () {
    const api = new API(appKey, appSecret, apiAddr)
    let result
    
    try {
        result= await api.createAddress("ETH")
        console.log(result)
        // 0xdd19b76786d04e82c1ca29c35d868e58641bc8fd
    } catch(e) {
        // do something
        console.log(e.response)
    }
    
    try {
        result = await api.verifyAddress("ETH", result.address) 
        console.log(result)
        // true
    } catch(e) {
        // do something
        console.log(e)
    }
    
    try {
        //result = await api.getBalance("ETH")
        //console.log(result)
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
    

    try {
        //result = await api.getAssets()
        //console.log(result)
        // [ 'ETH' ]
    } catch(e) {
        // do something
        console.log(e)
    }
    
    try {
        let id = ''+new Date().valueOf()
        let coinType = 'ETH'
        let to = '0x56204b988844b20160035273fD98Dbb2A54C85F5'
        let value = '0.01'
        let memo = ''
        result = await api.withdraw(id, coinType, to, value, memo)
        console.log(result)
        // {"id":"a79c02f9f4e40997235479f2cfdf280a6dd0cebc","status":"INIT"}
    } catch(e) {
        // do something
        console.log(e)
    }
    
    try {
        result = await api.getOrder("6reZqDxXwa2pBQ7AmV2K")
        console.log(result)
        // PENDING
    } catch(e) {
        // do something
        console.log(e)
    }
}

main()