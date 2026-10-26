// 端到端兼容性与单元测试脚本
const webCrypto = require('/tmp/web_crypto.js');
const mpCrypto = require('./utils/crypto.js');

async function runTests() {
    console.log('--- 运行加解密算法互通测试 ---');
    const password = 'SecretPassword123!@#';
    const plain = 'Hello 郁宝！这是剪切板微信小程序与 Web 端互通加密测试 🚀 1234567890';

    // 1. Web 加密 -> 小程序解密
    const webCipher = await webCrypto.encryptText(plain, password);
    console.log('Web 端加密结果:', webCipher.slice(0, 45) + '...');
    const mpDecrypted = mpCrypto.decryptText(webCipher, password);
    if (mpDecrypted !== plain) throw new Error('小程序解密 Web 密文失败');
    console.log('✔ 小程序成功解密 Web 端密文');

    // 2. 小程序加密 -> Web 解密
    const mpCipher = mpCrypto.encryptText(plain, password);
    console.log('小程序端加密结果:', mpCipher.slice(0, 45) + '...');
    const webDecrypted = await webCrypto.decryptText(mpCipher, password);
    if (webDecrypted !== plain) throw new Error('Web 端解密小程序密文失败');
    console.log('✔ Web 端成功解密小程序端密文');

    // 3. 错误密码拦截
    try {
        mpCrypto.decryptText(webCipher, 'wrong-password');
        throw new Error('小程序未拦截错误密码');
    } catch (e) {
        console.log('✔ 小程序正确拦截错误密码:', e.message);
    }

    try {
        await webCrypto.decryptText(mpCipher, 'wrong-password');
        throw new Error('Web 端未拦截错误密码');
    } catch (e) {
        console.log('✔ Web 端正确拦截错误密码');
    }

    // 4. isEncryptedContent 校验
    if (!mpCrypto.isEncryptedContent(webCipher)) throw new Error('isEncryptedContent 判定失败');
    if (mpCrypto.isEncryptedContent('普通明文内容')) throw new Error('普通内容误判为密文');
    console.log('✔ isEncryptedContent 判定准确');

    console.log('\n全部加解密互通单测通过！🎉\n');
}

runTests().catch(err => {
    console.error('测试失败:', err);
    process.exit(1);
});
