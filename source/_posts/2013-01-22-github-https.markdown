---
layout: post
title: "使用https连接github"
date: 2013-01-22 13:08
comments: true
categories: Fuck&nbsp;GFW
math: 
abstract: 
---

火车票插件拖垮github的事件的结果，就是github被悲催地墙掉了。愤慨啊。Fuck GFW!

不过有了goagent的代理，github的网站是可以上了，但是命令行上面pull，push就不灵了。新浪微博上[@蒋伟](http://www.weibo.com/neilxp)找到了一个通过[https连接github的办法](http://www.weibo.com/1791166224/zfvJvnG39)，总结一下如下：

1. 安装goagent
2. 导入ca.crt证书
    导入goagent目录下的local/CA.crt     
    ubuntu导入证书      
    http://askubuntu.com/questions/73287/how-do-i-install-a-root-certificate        

3. 启动代理 python proxy.py
4. 设置代理： export HTTPS\_PROXY="http://127.0.0.1:8087"
5. github配置，关键一步是remote add的时候，方法是：     
    git remote add origin https://liuhongjiang@github.com/liuhongjiang/tech.git     
    这样就可以正常地pull和push了，麻烦的是，每次都要输入秘密。      
6. 接下来就是octopress的rake deploy了：
    需要修改Rakefile：

        # user = repo_url.match(/:([^\/]+)/)[1]
        user = repo_url.match(/github\.com.([^\/]+)/)[1]
        # branch = (repo_url.match(/\/[\w-]+.github.com/).nil?) ? 'gh-pages' : 'master'
        branch = (repo_url.match(/\/[\w-]+\.github\.com$/).nil?) ? 'gh-pages' : 'master'
        # project = (branch == 'gh-pages') ? repo_url.match(/\/([^\.]+)/)[1] : ''
        project = (branch == 'gh-pages') ? repo_url.match(/\/([^\/^\.]+)$/)[1] : ''

    然后在`rake setup_github_pages`命令中填https的url地址：          
    https://liuhongjiang@github.com/liuhongjiang/tech       
    同样在部署的时候，还是要输入密码
