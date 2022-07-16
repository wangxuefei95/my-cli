const axios = require('axios');
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(response => response.data);

module.exports = {
    fetchRepoList() {
        return axiosInstance.get('https://api.github.com/users/wangxuefei95/repos');
    },

    fetchRepoTagList(repo) {
        return axiosInstance.get(`https://api.github.com/repos/wangxuefei95/${repo}/tags`)
    },

    getRepoDefault(repo, tag) {
        return `github:wangxuefei95/${repo}${tag ? '#' + tag : ''}`
    }
}