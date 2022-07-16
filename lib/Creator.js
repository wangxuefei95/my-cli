const Inquirer = require('inquirer');
const { fetchRepoList, fetchRepoTagList, getRepoDefault } = require('./request');
const { wrapLoading } = require('./util');
const downloadGitRepo = require('download-git-repo');
const util = require('util');

class Creator {
    constructor(appName, targetDir) {
        this.appName = appName;
        this.targetDir = targetDir;
        this.downloadGitRepo = util.promisify(downloadGitRepo)
    }
    
    async create() {
        const repo = await this.fetchRepo();

        const tag = await this.fetchTag(repo);

        this.download(repo, tag);
    }

    async fetchRepo() {
        const repos = await wrapLoading(fetchRepoList, {
            message: 'waiting fetch repos...',
            success: 'fetch repos success',
            fail: 'fetch repos fail',
        });
        if (!repos) return;

        const { name } = await Inquirer.prompt({
            type: 'list',
            name: 'name',
            message: 'please choose a template to create project',
            choices: repos,
        });

        return name;
    }

    async fetchTag(repo) {
        const tags = await wrapLoading(fetchRepoTagList, {
            message: 'waiting fetch repo tags...',
            success: 'fetch repo tags success',
            fail: 'fetch repo tags fail',
        }, repo);

        if (!tags?.length) return;

        const { name } = await Inquirer.prompt({
            type: 'list',
            name: 'name',
            message: 'please choose tag to create project',
            choices: tags,
        });

        return name;
    }

    async download(repo, tag) {
        await wrapLoading(this.downloadGitRepo, {
            message: 'download template...',
            success: 'download template success',
            fail: 'download template fail'
        }, getRepoDefault(repo, tag), this.targetDir)
    }
}


module.exports = Creator