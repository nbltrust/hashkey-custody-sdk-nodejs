const API = require('../index.js')


const appKey = 'jFJDa2Iha04tED6fYBwsjMZC'
const appSecret = 'yeTJ3EnOkyQQEjhTMVqn165Dqjp43bhTwXLIv25Ycdu8qwDOyqpa0WV54C6sO4HW'
const apiAddr = 'http://127.0.0.1:8092'


async function main () {
    const api = new API(appKey, appSecret, apiAddr)
    let result

    /*try {
        result= await api.createAddress("ETH", "auto")
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/
    
    /*try {
        result = await api.verifyAddress("ETH", result.address) 
        console.log(result)
    } catch(e) {
        console.log(e)
    }*/
    
    /*try {
        result = await api.getBalance("ETH")
        console.log(result)
    } catch(e) {
        console.log(e)
    }*/
    
    /*try {
        result = await api.getAssets()
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/
       
    /*try {
        let id = ''+new Date().valueOf()
        let coinType = 'ETH'
        let to = '0x0701C454D88d69B66007Bf8A03584C263D3266bb'
        let value = '0.01'
        let memo = ''
        reusult = await api.withdraw(id, coinType, to, value, memo)
        console.log(reusult)
    } catch(e) {
        // do something
        console.log(e)
    }*/ 

    /*try {
        result = await api.getOrder("J6NzaoL13lqBj85ZqE0Y")
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/

    /*try {
        let id = ''+new Date().valueOf()
        let coinType = 'IRIS'
        let value = '0.06'
        result = await api.delegate(id, coinType, value)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/

    /*try {
        let id = ''+new Date().valueOf()
        let coinType = 'IRIS'
        let value = '0.01'
        result = await api.undelegate(id, coinType, value)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/

    /*try {
        result = await api.getValidators("IRIS")
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/

    /*try {
        result = await api.getFundingWallets()
        console.dir(result, {depth: null})
    } catch(e) {
        // do something
        console.log(e)
    }*/

    /*try {
        const from = 'L6RayqPn4jXExW0'
        const to = 'e5dJyVp8R3B1m4o'
        const coinType = 'ETH'
        const value = '0.01'
        result = await api.fundingTransfer(from, to, coinType, value)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/

    /*try {
        result = await api.getFundingRecords()
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/

    /*try {
        let id = ''+new Date().valueOf()
        let coinType = 'ATOM'
        let value = '0.06'
        let expiredAt = parseInt(new Date().valueOf()/1000) + 86400 * 21
        result = await api.addUrgentStakingFunding(id, coinType, value, expiredAt)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/

    /*try {
        result = await api.getDayInterest("IRIS", "2019-09-26")
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }*/
    
}

main()