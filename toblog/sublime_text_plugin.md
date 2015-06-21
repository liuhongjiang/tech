
## example 
article: http://code.tutsplus.com/tutorials/how-to-create-a-sublime-text-2-plugin--net-22685
example code on github: http://code-tech.diandian.com/post/2012-11-16/40042306130

API reference: http://www.sublimetext.com/docs/2/api_reference.html

## problems
1. how to debug the plug in?

## reference

http://code-tech.diandian.com/post/2012-11-16/40042306130

http://stackoverflow.com/questions/16384626/how-to-debug-sublime-plugins-during-development

## plugin debugger

https://packagecontrol.io/packages/Plugin%20Debugger

Additionally to this package you have to install Winpdb from http://winpdb.org/download/ (or apt-get install winpdb on debian-like systems).
The only configuration option is plugin_debugger_python, which can be set in your User Settings file Packages/User/Preferences.sublime-sttings. This specifies the full path to your python installation, where you installed Winpdb. Please note, that this must be a python 2.x (2.7 recommended). You can also debug Python3 with this.

I recommend using Preferences Editor to set it ;) .

我安装的sublime text 3，所以我只有在下载一个python 27，并且安装了winpdb这个插件。

winpdp依赖wxPython这个库，所以还需要安装这个库。通过官网下载即可。http://www.wxpython.org/download.php

用sublime2？
配置："plugin_debugger_python": "C:\\Python27\\python.exe" ？
