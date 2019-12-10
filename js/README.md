# DDAM RPC

## Installing

Using npm:

```shell
$ npm install ddamrpc-sdk
```

## Usage

```Javascript
const { ddamrpc } = require('ddamrpc-sdk');

/**
 * 生成账户
 * 注意: 为了安全此方法仅在 rpclevel >= 3 的情况下可用
 *
 * @param {String} password 账户密码
 */
ddamrpc.Personal_newAccount('mypass!').then(resp => {
    console.log('new account: %o', resp);
});

/**
 * 发送交易(RPC节点负责签名交易)
 * 注意: 为了安全此方法仅在 rpclevel >= 3 的情况下可用
 *
 * @param {String} jsonstr 交易信息
 *
 * 例如:
 *  {
 *     \"target\":\"DD3240f6ac9f92aaee6183b3d3da603622f9c2481d49d88010954369e3e2882c5f\",
 *     \"value\":10000000000,
 *     \"gas\":3000,
 *     \"gasprice\":500,
 *     \"tx_type\":0,
 *     \"data\":null,
 *     \"from\":\"DD64fc25fb49cf3f2fae60b8bc66d32481bff74cf3831b8e4b1560ad07c436bac4\",
 *     \"phrase\":\"123456\"
 *  }
 *
 *  注意:
 *    value 参数单位是`AM`
 *    1 DDAM = 1000000000 AM
 */
ddamrpc.Personal_sendTx("{\"target\":\"DD3240f6ac9f92aaee6183b3d3da603622f9c2481d49d88010954369e3e2882c5f\",\"value\":10000000000,\"gas\":3000,\"gasprice\":500,\"tx_type\":0,\"data\":null,\"from\":\"DD64fc25fb49cf3f2fae60b8bc66d32481bff74cf3831b8e4b1560ad07c436bac4\",\"phrase\":\"123456\"}").then(resp => {

    console.log('new transaction: %o', resp)
})
```
