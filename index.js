var axios = require('axios')
var crypto = require('crypto')
const _ = require('lodash')

/**
 * API class
 * @class API
 */
class API {
    /**
     * constructor
     * @param {string} key key
     * @param {string} secret secret
     * @param {string} apiAddr api srv addr, http://host:port, https://host:port
     */
    constructor (key, secret, apiAddr) {
      if (!key || !secret || !apiAddr) {
        throw new Error('initialization failed, missing parameter...')
      }

      this.key = key
      this.secret = secret
      this.apiAddr = apiAddr
      this._nonceCount = 0
    }

    /**
     * create a new address
     * @param {string} coinType coin type, such as ETH, BTC
     * @return {string} coin address
     */
    async createAddress (coinType, mode) {
        if (!coinType) {
            throw new Error('sorry, coinType must be nonempty')
        }
        let url = this.apiAddr + "/api/v1/address/"+coinType+"/new"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
            mode: mode || "",
        }
        data.sign = this.sign(data)
    
        let result = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)
        
        return result.data.data
    }

    /**
     * verify a address
     * @param {string} coinType such as ETH, BTC
     * @param {string} address address
     * @return {bool} true or false
     */
    async verifyAddress (coinType, address) {
        if (!coinType || !address) {
            throw new Error('sorry, coinType and address must be nonempty')
        }

        let url = this.apiAddr + "/api/v1/address/" + coinType + "/verify"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
            address: address
        }
        data.sign = this.sign(data)

        let result = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })
        this.checkData(result.data)
        
        return result.data.data.valid
    }

    /**
     * get asset list
     * @return {array} coin type list
     */
    async getAssets () {
        let url = this.apiAddr + "/api/v1/app/assets"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce()
        }
        data.sign = this.sign(data)
    
        let result = await axios.get(url, {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)

        return result.data.data.assets
    }

    /**
     * get app balance
     * @param {string} coinType such as ETH, BTC
     * @return {Object} 
     */
    async getBalance (coinType) {
        if (!coinType) {
            throw new Error('sorry, coinType must be nonempty')
        }
        let url = this.apiAddr + "/api/v1/app/balance/" + coinType
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
        }
        data.sign = this.sign(data)
        
        let result = await axios.get(url, {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)
        return result.data.data
    }

    /**
     * get order status
     * @param {string} id saas order id
     * @param {string} hash txid
     * @return {String} 
     */
    async getOrder (id, hash) {
        if (!id && !hash) {
            throw new Error('sorry, id or hash must be nonempty')
        }
        let url = this.apiAddr + "/api/v1/app/order/"+ id
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce()
        }
        data.sign = this.sign(data)
    
        let result = await axios.get(url, {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)
        return result.data.data
    }

    /**
     * withdraw
     * @param {string} id withdraw request id, unique
     * @param {string} coinType coin type
     * @param {string} to withdraw address
     * @param {string} value withdraw value
     * @param {string} memo memo
     * @return {Object} 
     */
    async withdraw (id, coinType, to, value, memo) {
        if (!id || !coinType || !to || !value) {
            throw new Error('sorry, id & coinType & to & value must be nonempty')
        }
        if (isNaN(value)) {
            throw new Error('sorry, value must be a number')
        }

        let url = this.apiAddr + "/api/v1/app/" + coinType + "/withdraw"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
            to: to,
            value: value,
            memo: memo,
            id: id
        }
        data.sign = this.sign(data)
        
        let result = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)
        return result.data.data
    }

    /**
     * get funding wallets list
     * @return {array} funding wallets list
     */
    async getFundingWallets () {
        let url = this.apiAddr + "/api/v1/funding/balances"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce()
        }
        data.sign = this.sign(data)
    
        let result = await axios.get(url, {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'X-Company-Key': this.key
            }
        })

        this.checkData(result.data)
        return result.data.data
    }

    /**
     * funding transfer
     * @param {string} from from wallet id
     * @param {string} to to wallet id
     * @param {string} coinType coin type
     * @param {string} value transfer value
     * @param {string} memo memo
     * @return {Object} 
     */
    async fundingTransfer (from, to, coinType, value, memo) {
        if (!from || !coinType || !to || !value) {
            throw new Error('sorry, from & to & coinType & value must be nonempty')
        }
        if (isNaN(value)) {
            throw new Error('sorry, value must be a number')
        }

        let url = this.apiAddr + "/api/v1/funding/transfer"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
            from: from,
            to: to,
            assetName: coinType,
            value: value,
            memo: memo || ''
        }
        data.sign = this.sign(data)
        
        let result = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Company-Key': this.key
            }
        })

        this.checkData(result.data)
        return result.data.data
    }

    /**
     * get funding records list
     * @param {int} page page number
     * @param {int} amount item amount
     * @param {string} sort sort, available values: DESC, ASC
     * @return {array} funding records list
     */
    async getFundingRecords (page, amount, sort, coins, froms, toes, type, orderBy) {
        let url = this.apiAddr + "/api/v1/funding/records"
        var data = {
            page: page || 1,
            amount: amount || 10,
            sort: sort || 'DESC',
            coins: coins || '',
            froms: froms || '',
            toes: toes || '',
            type: type || '',
            orderBy: orderBy || 'created_at',
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce()
        }
        data.sign = this.sign(data)
    
        let result = await axios.get(url, {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'X-Company-Key': this.key
            }
        })

        this.checkData(result.data)
        return result.data.data
    }

    /**
     * delegate
     * @param {string} id request id, unique
     * @param {string} coinType coin type
     * @param {string} value value
     * @return {Object} 
     */
    async delegate (id, coinType, value) {
        if (!id || !coinType || !value) {
            throw new Error('sorry, id & coinType & to & value must be nonempty')
        }
        if (isNaN(value)) {
            throw new Error('sorry, value must be a number')
        }

        let url = this.apiAddr + "/api/v1/staking/" + coinType + "/delegate"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
            value: value,
            id: id
        }
        let msg = _buildMsg(data)
        var sign = crypto.createHmac('SHA256', this.secret).update(msg).digest('hex');
        data.sign = sign
        
        let result = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)

        return result.data
    }

    /**
     * undelegate
     * @param {string} id  request id, unique
     * @param {string} coinType coin type
     * @param {string} value  value
     * @return {Object} 
     */
    async undelegate (id, coinType, value) {
        if (!id || !coinType || !value) {
            throw new Error('sorry, id & coinType & to & value must be nonempty')
        }
        if (isNaN(value)) {
            throw new Error('sorry, value must be a number')
        }

        let url = this.apiAddr + "/api/v1/staking/" + coinType + "/undelegate"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
            value: value,
            id: id
        }
        let msg = _buildMsg(data)
        var sign = crypto.createHmac('SHA256', this.secret).update(msg).digest('hex');
        data.sign = sign
        
        let result = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)

        return result.data
    }

    /**
     * get asset all validators
     * @param {string} coinType such as ETH, BTC
     * @return {Object} 
     */
    async getValidators (coinType) {
        if (!coinType) {
            throw new Error('sorry, coinType must be nonempty')
        }
        let url = this.apiAddr + "/api/v1/staking/" + coinType + "/validators"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
        }
        let msg = _buildMsg(data)
        var sign = crypto.createHmac('SHA256', this.secret).update(msg).digest('hex');
        data.sign = sign
        
        let result = await axios.get(url, {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)
        return result.data.data
    }

    /**
     * get asset one day interest
     * @param {string} coinType such as ETH, BTC
     * @param {string} date such as 2019-10-01
     * @return {Object} 
     */
    async getStakingInterest (coinType, date) {
        if (!coinType) {
            throw new Error('sorry, coinType must be nonempty')
        }

        let url = this.apiAddr + "/api/v1/staking/" + coinType + "/interest"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
            date: date,
        }
        let msg = _buildMsg(data)
        var sign = crypto.createHmac('SHA256', this.secret).update(msg).digest('hex');
        data.sign = sign
        
        let result = await axios.get(url, {
            params: data,
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)
        return result.data.data
    }

    /**
     * addUrgentStakingFunding
     * @param {string} id  request id, unique
     * @param {string} coinType coin type
     * @param {string} value  value
     * @param {number} expiredAt  value
     * @return {Object} 
     */
    async addUrgentStakingFunding (id, coinType, value, expiredAt) {
        if (!id || !coinType || !value || !expiredAt) {
            throw new Error('sorry, id & expiredAt & value must be nonempty')
        }
        if (isNaN(value)) {
            throw new Error('sorry, value must be a number')
        }
        if (isNaN(expiredAt)) {
            throw new Error('sorry, value must be a number')
        }

        let url = this.apiAddr + "/api/v1/staking/" + coinType + "/funding"
        var data = {
            timestamp: Number.parseInt(new Date().valueOf()/1000),
            nonce: this.generateNonce(),
            value: value,
            expiredAt: expiredAt,
            id: id
        }
        let msg = _buildMsg(data)
        var sign = crypto.createHmac('SHA256', this.secret).update(msg).digest('hex');
        data.sign = sign
        
        let result = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-App-Key': this.key
            }
        })

        this.checkData(result.data)

        return result.data
    }

    generateNonce() {
        this._nonceCount++
        let timestamp = new Date().valueOf()
        let rand = Math.round(Math.random() * timestamp)
        return ('' + timestamp + this._nonceCount + rand)
    }

    /**
     * check data
     * @param {Object} data
     * @return {String} 
     */
    checkData(data) {
        if (!data || !data.sign) {
            throw new Error(JSON.stringify(data))
        }

        let sign = this.sign(data.data)
        if (sign != data.sign) {
            throw new Error("sign error")
        }

        if (!!data.code) {
            throw new Error(JSON.stringify(data))
        }
    }

        /**
     * verify sign
     * @param {Object} data
     * @return {Boolean} 
     */
    verifySign (data) {
        if (!data) {
            throw new Error('sorry, data must be nonempty')
        }
        if (!data.sign) {
            throw new Error('sorry, data.sign must be nonempty')
        }
        
        sign = data.sign
        delete(data.sign)
        let msg = _buildMsg(data)
        return crypto.createHmac('SHA256', this.secret).update(msg).digest('hex') == sign
    }

    /**
     * sign data
     * @param {Object} data
     * @return {String} 
     */
    sign(data) {
        if (!data) {
            throw new Error('sorry, data must be nonempty')
        }
        
        let msg = _buildMsg(data)
        return crypto.createHmac('SHA256', this.secret).update(msg).digest('hex')
    }
}

/**
 * build message
 * @param {object} obj
 */
function _buildMsg(obj) {
    let arr = []
    if (_.isArray(obj)) {
        arr = obj.map((o, i) => ({
            k: i,
            v: _buildMsg(o)
        }))
    } else if (_.isObject(obj)) {
        for (let k in obj) {
            if (obj[k] !== undefined) {
                arr.push({ k, v: _buildMsg(obj[k]) })
            }
        }
    } else if (obj === undefined || obj === null) {
        return ''
    } else {
        return obj.toString()
    }

    // Sort Array
    arr.sort((a, b) => {
        let aVal
        let bVal
        aVal = a.k.toString()
        bVal = b.k.toString()
        if (aVal < bVal) {
            return -1
        } else if (aVal === bVal) {
            return 0
        } else {
            return 1
        }
    })

    let keyVals = []
    for (let i = 0; i < arr.length; i++) {
        keyVals.push(arr[i].k + "=" + arr[i].v)
    }

    return keyVals.join('&')
}

module.exports = API