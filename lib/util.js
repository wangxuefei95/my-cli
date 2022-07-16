const chalk = require('chalk');
const ora = require('ora');

function sleep(timer = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timer * 1000);
    })
}

async function wrapLoading(promiseFn, option = {}, ...args) {
    const loading = ora(option.message || 'loading');
    loading.start();
    
    try {
        const result = await promiseFn(...args);
        loading.succeed(option.success || 'success');
        return result;
    } catch (error) {
        console.log('\r\n', chalk.red(error));
        loading.fail(option.fail + ' retry...');
        await sleep(3);
        return wrapLoading(promiseFn, option, ...args);
    }
    
}


module.exports = {
    sleep,
    wrapLoading
}