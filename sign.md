---
title: API Reference

---


# API签名认证

使用api之前，需要首先在SAAS后台里面创建一个钱包，默认是不能进行api访问的，在 钱包->API 配置里添加APP KEY。这样你会获得一个AppKey和一个AppSecret。

AppKey代表钱包，AppSecret代表钱包的钥匙，用来签名，为了安全，请定期更换AppKey/AppSecret。

所有的私有请求，都需要把AppKey放到http请求的header里，key为X-App-Key。
例如：

`
  X-App-Key=jFJDa2Iha04tED6fYBwsjMZC
`

## 签名机制

所有需要签名的接口，都需要携带timestamp和nonce两个参数。timestamp是unix时间戳，单位是秒，请校对好时间，误差不要超过1分钟。nonce是任意的字符串，需要保证10分钟内不能重复，否则会被识别为重放攻击。

签名的字符串需要将参数key按照字母排序，进行url参数化处理，然后用&符号进行连接。最后对数据使用AppSecret进行HMAC-SHA256签名，将结果转化为hex字符串，作为sign的值放到参数里。

``` 
例子1
GET请求的参数为：
timestamp=1559811763&nonce=1559811763025698274450320

进行处理后得到字符串：
nonce=1559811763025698274450320&timestamp=1559811763

AppSecret为"yeTJ3EnOkyQQEjhTMVqn165Dqjp43bhTwXLIv25Ycdu8qwDOyqpa0WV54C6sO4HW"，
进行HMAC-SHA256签名后得到
a0e18ef88ff9d2fb8ad417dace09834632732de86ae97bbba84186375dd0c0a8，

把它作为sign的值放到参数里得到：
timestamp=1559811763&nonce=1559811763025698274450320&sign=a0e18ef88ff9d2fb8ad417dace09834632732de86ae97bbba84186375dd0c0a8
 ```


``` 
例子2
POST请求body参数：
{ 
  "timestamp": 1559812986,
  "nonce": "155981298627351342141552796",
  "id": "1559812986272",
  "to": "0x56204b988844b20160035273fD98Dbb2A54C85F5",
  "value": "0.01",
  "memo": ""
}

进行字符串连接后得到：
id=1559812986272&memo=&nonce=155981298627351342141552796&timestamp=1559812986&to=0x56204b988844b20160035273fD98Dbb2A54C85F5&value=0.01

AppSecret为"yeTJ3EnOkyQQEjhTMVqn165Dqjp43bhTwXLIv25Ycdu8qwDOyqpa0WV54C6sO4HW"，
进行HMAC-SHA256签名后得到3e788b57abf09947e443a974a847ef82258a94bcdddb33932e9de0f8e10ed61f，

把它作为sign的值放到参数里得到：
{
  "timestamp": 1559812986,
  "nonce": "155981298627351342141552796",
  "id": "1559812986272",
  "to": "0x56204b988844b20160035273fD98Dbb2A54C85F5",
  "value": "0.01",
  "memo": "",
  "sign": "3e788b57abf09947e443a974a847ef82258a94bcdddb33932e9de0f8e10ed61f"
}
``` 