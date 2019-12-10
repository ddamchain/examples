const { jsonrpc } = require('ddamrpc-sdk');
const myrpc = jsonrpc({ url: 'http://127.0.0.1:8101' });

(async function () {

    // 生成账户
    myrpc.Personal_newAccount('mypass!').then(resp => {
        console.log('new account: %o', resp);
    });

    // 发送交易
    myrpc.Personal_sendTx("{\"target\":\"DD3240f6ac9f92aaee6183b3d3da603622f9c2481d49d88010954369e3e2882c5f\",\"value\":10000000000,\"gas\":3000,\"gasprice\":500,\"tx_type\":0,\"data\":null,\"from\":\"DD64fc25fb49cf3f2fae60b8bc66d32481bff74cf3831b8e4b1560ad07c436bac4\",\"phrase\":\"123456\"}").then(resp => {
        console.log('new transaction: %o', resp)
    });

    // 发送离线签名交易
    myrpc.Gx_tx("{\"target\":\"DD3240f6ac9f92aaee6183b3d3da603622f9c2481d49d88010954369e3e2882c5f\",\"value\":10000000000,\"gas\":3000,\"gasprice\":500,\"tx_type\":0,\"data\":null,\"sign\":\"1234\"}").then(resp => {
        console.log('====> 发送离线签名交易')
        console.log('  注意:')
        console.log('    1. `Personal_sendTx`方法需要`from`和`phrase`参数')
        console.log('    2. `Gx_tx`方法需要`sign`参数')
        console.log(resp)
        console.log('\n')
    })

    // 查询余额
    await myrpc.Gx_balance('DD3240f6ac9f92aaee6183b3d3da603622f9c2481d49d88010954369e3e2882c5f').then(resp => {
        console.log('====> 查询余额')
        console.log(resp)
        console.log('\n')
    })

    // 查询Nonce
    await myrpc.Gx_nonce('DD3240f6ac9f92aaee6183b3d3da603622f9c2481d49d88010954369e3e2882c5f').then(resp => {
        console.log('====> 查询Nonce')
        console.log(resp)
        console.log('\n')
    })

    // 查询当前块高度
    await myrpc.Gx_blockHeight().then(async resp => {
        console.log('====> 当前块高度')
        console.log('====> BlockHeight is %o', resp.data)
        console.log('\n')

        // 1.根据块⾼度查询块信息
        const info = await myrpc.Gx_getBlockByHeight(resp.data).then(info => {
            return info.data
        })

        console.log('====> 根据块⾼度查询块信息')
        console.log('====> BlockInfo By Height:  %o', info)
        console.log('\n')

        // 2.根据块哈希查询块信息
        await myrpc.Gx_getBlockByHash(info.hash).then(info => {
            console.log('====> 根据块哈希查询块信息')
            console.log('====> BlockInfo By Hash:  %o', info.data)
            console.log('\n')
        })
    })

    // 根据块高度查询块交易列表
    await myrpc.Explorer_explorerBlockDetail(2972).then(info => {
        console.log('====> 根据块高度查询交易列表')
        console.log('====> BlockDetailInfo By Height:  %s', JSON.stringify(info.data, null, 2))
        console.log('\n')
    })

    // 查询账户抵押资产
    await myrpc.Gx_stake('DD3240f6ac9f92aaee6183b3d3da603622f9c2481d49d88010954369e3e2882c5f').then(resp => {
        console.log('====> 查询账户抵押资产')
        console.log(resp)
        console.log('\n')
    })

    // 查询交易回执信息
    await myrpc.Gx_txReceipt('0x2e4ca8d4397433fdf402ee1ddb19124d32d49b94e2bd9e7caa14677e8acbe216').then(resp => {
        console.log('====> 查询交易回执信息')
        console.log(resp)
        console.log('\n')
    })

    // 查询交易详情
    await myrpc.Gx_transDetail('0x2e4ca8d4397433fdf402ee1ddb19124d32d49b94e2bd9e7caa14677e8acbe216').then(resp => {
        console.log('====> 查询交易详情')
        console.log(resp)
        console.log('\n')
    })

})()





