const API = require('../index.js')


const appKey = 'n6ulC0zWR4IegxZSvXI9yB6o'
const appSecret = 'SlQSoHPlZUwEhbymk5DJggRk0tjk4T6WdtqQXTT4QyfKpjWOBG60yiibA1TE3wmY'
const apiAddr = 'https://openapi.jadepool.io'
const api = new API(appKey, appSecret, apiAddr)

async function main () {
    await createAddress("ETH") 
}

main()

async function createAddress(coinType) {
    try {
        result= await api.createAddress(coinType, "auto")
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function verifyAddress(coinType, address) {
    try {
        result = await api.verifyAddress(coinType, address) 
        console.log(result)
    } catch(e) {
        console.log(e)
    }
}

async function getBalance(coinType) {
    try {
        result = await api.getBalance(coinType)
        console.log(result)
    } catch(e) {
        console.log(e)
    }
}

async function getBalance(coinType) {
    try {
        result = await api.getBalance(coinType)
        console.log(result)
    } catch(e) {
        console.log(e)
    }
}

async function getAssets() {
    try {
        result = await api.getAssets()
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function withdraw() {
    try {
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
    }
}

async function getOrder(orderID) {
    try {
        result = await api.getOrder(orderID)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function getValidators(coinType) {
    try {
        result = await api.getValidators(coinType)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function delegate(coinType, value) {
    try {
        let id = ''+new Date().valueOf()
        result = await api.delegate(id, coinType, value)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function undelegate(coinType, value) {
    try {
        let id = ''+new Date().valueOf()
        result = await api.undelegate(id, coinType, value)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function claimReward(coinType) {
    try {
        result = await api.claimReward(coinType)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function getFundingWallets() {
    try {
        result = await api.getFundingWallets()
        console.dir(result, {depth: null})
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function fundingTransfer() {
    try {
        const from = 'L6RayqPn4jXExW0'
        const to = 'e5dJyVp8R3B1m4o'
        const coinType = 'ETH'
        const value = '0.01'
        result = await api.fundingTransfer(from, to, coinType, value)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function getFundingRecords() {
    try {
        result = await api.getFundingRecords()
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function addUrgentStakingFunding() {
    try {
        let id = ''+new Date().valueOf()
        let coinType = 'ATOM'
        let value = '0.06'
        let expiredAt = parseInt(new Date().valueOf()/1000) + 86400 * 21
        result = await api.addUrgentStakingFunding(id, coinType, value, expiredAt)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}

async function getStakingInterest(coinType, date) {
    try {
        result = await api.getStakingInterest(coinType, date)
        console.log(result)
    } catch(e) {
        // do something
        console.log(e)
    }
}
