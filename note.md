# 生成定制的脚手架工具


### 引用的第三方库

    commander           命令行工具
    chalk               上色的
    fs-extra            fs的扩展、支持了promise
    inquirer            通用交互命令行用户界面的集合
    ora                 loading
    download-git-repo   从git拉取仓库代码

### 非全局安装使用命令

    进入此项目根路径，执行`npm link`


### 生成模版

    实现方式：将一套写好的基础框架放在git上,使用的时候从代码库远程拉取模版


### 查看脚手架版本

```bash
my-cli -v
my-cli --version
```


### 创建脚手架

```bash
my-cli create <app-name>
```