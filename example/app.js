const API = require('../index.js')

const appKey = 'TyTLvCnHINbWZQag88hhmMz1'
const appSecret = 'uf0rPlTluGnIllGqx0X1os4hQ6rOdXDxStiN4qGd79lS6yeHZaOK4ldvRv1TBqr6'
const apiAddr = 'http://127.0.0.1:8092'

async function main () {
    const api = new API(appKey, appSecret, apiAddr)
    let result
    
    try {
        result= await api.createAddress("ETH")
        console.log(result)
        // { address: '0xd47237a2a1b6d313794d66162d86b887361e664d' }
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
    

    try {
        result = await api.getAssets()
        console.log(result)
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
        /* {    id: 'OR3PmG6r16rQ148YLDZX',
                bizType: 'WITHDRAW',
                coinName: 'ETH',
                type: 'ETH',
                state: 'INIT',
                memo: '',
                value: '0.005000000000000000',
                from: '',
                to: '0x56204b988844b20160035273fd98dbb2a54c85f5',
                txid:'',
                n: 0,
                comfirmations: 0
        }*/
    } catch(e) {
        // do something
        console.log(e)
    }
    
    try {
        result = await api.getOrder("6reZqDxXwa2pBQ7AmV2K")
        console.log(result)
        /* {    id: 'J8lzB9Lej8q9wO2nRGxy',
                bizType: 'WITHDRAW',
                coinName: 'ETH',
                type: 'ETH',
                state: 'DONE',
                memo: '',
                value: '0.005000000000000000',
                from: '0xdedc1eca923cc1227c20571030146d8a01b70774',
                to: '0x56204b988844b20160035273fd98dbb2a54c85f5',
                txid:
                '0xd9954987b33683af5f840688d3233aeb2e7e0f2e2be004fbc93e8965d11bd175',
                n: 0,
                comfirmations: 27 
        }*/
    } catch(e) {
        // do something
        console.log(e)
    }
}

main()
