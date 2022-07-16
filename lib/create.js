const fs = require('fs-extra');
const path = require('path');
const Inquirer = require('inquirer');
const Creator = require('./Creator');

module.exports = async function (appName, option) {
    const cwd = process.cwd();
    const targetDir = path.join(cwd, appName);
    
    if (fs.existsSync(targetDir)) {
        if (option.force) {
            await fs.remove(targetDir);
        } else {
            const { action } = await Inquirer.prompt({
                type: 'list',
                name: `action`,
                message: 'The destination directory already exists, please select whether to overwrite',
                choices: [
                    { name: 'Overwrite', value: 'overwrite' },
                    { name: 'Cancel', value: false },
                ]
            });
            if (!action) return;
            if (action === 'overwrite') {
                console.log('\r\log: removing old dir...')
                await fs.remove(targetDir)
            }
        }
    }
    // 创建项目
    const creator = new Creator(appName, targetDir);
    creator.create();
}