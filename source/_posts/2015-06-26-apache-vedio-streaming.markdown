---
layout: post
title: "apache vedio streaming"
date: 2015-06-26 10:04
comments: true
categories: 
math: 
abstract: 
---

##apache支持mp4的流播放
apache可以通过配置模块支持MP4和flv格式的视频流。[Mod\_h264 and mod\_FLV Streaming for Apache](https://www.alduccino.com/mod-h264-and-mod-flv-streaming-for-apache-on-whm-cpanel)
如果需要更多的视频流支持，建议使用 [ffserver](https://www.ffmpeg.org/ffserver.html)

下面以在centeros的apache上配置MP4模块的支持为例，首先是在apache端的配置

<!--more-->

## 安装mod\_h264\_streaming

安装apache httpd的apxs：

```bash
yum install httpd-devel
```

如果apache是通过yum安装在系统中的话， 需要root权限：

```bash
cd ~/download
wget http://h264.code-shop.com/download/apache_mod_h264_streaming-2.2.7.tar.gz
tar -xzvf apache_mod_h264_streaming-2.2.7.tar.gz
cd mod_h264_streaming-2.2.7
./configure --with-apxs='which apxs'
make && make install
```

配置apache，
在httpd.conf中添加配置, mod\_h264\_streaming.so的路径可能不一样：

```
AddType video/mp4 .mp4 .m4v
AddType video/ogg .ogv
AddType video/webm .webm

LoadModule h264_streaming_module /usr/lib64/httpd/modules/mod_h264_streaming.so
AddHandler h264-streaming.extensions .mp4
```

重启apache.
然后可以在httpd的根目录下放入一个mp4的文件

## 编写一个html文件

例子如下：

```html
<!DOCTYPE html> 
<html> 
<body> 

<video width="400" preload controls>
  <source src="http://localhost/h264.mp4" type="video/mp4">
  Your browser does not support HTML5 video.
</video>
</body> 
</html>
```

## pitfall
During I test using the html5 vedio tag to display the mp4 vedio, I only got the audio and no image at all when I open the html file with Chrome.
And I tried with firefox, and got this error: "No video with supported format and MIME type found".

I googled this error message, and didn't get a direct answer about how to fix it.

And luckly, I found the reason.
It turns out the html5 vedio tag support the vedio coded with H.264, and my mp4 file is coded with MPEG-4.
So I used another mp4 file with coding format h.264, and it works well.

(As I googled, but failed to find the solution, I wrote this solution in English, so everyone can get help from my contribution，if he saw this on google).


## 关于MP4的一些知识

当前，html5的video 元素支持三种视频格式：

* Ogg = 带有 Theora 视频编码和 Vorbis 音频编码的 Ogg 文件
* MPEG4 = 带有 H.264 视频编码和 AAC 音频编码的 MPEG 4 文件
* WebM = 带有 VP8 视频编码和 Vorbis 音频编码的 WebM 文件


MP4只是一种封装而已, 能封装H264, XVID, VC-1等编码进去。MPEG-4是一种编码。

MP4现在常用的只有 H264 和 MPEG4格式， H263 和VP6格式 已淘汰。Xvid.Divx 不是什么格式. Xvid.Divx是MPEG4的编码器 X264是H264的编码器

## reference
* [http://g33kinfo.com/info/archives/4305](http://g33kinfo.com/info/archives/4305)
* [http://universvideo.com/installing-apache-mod-h264/](http://universvideo.com/installing-apache-mod-h264/)
* [http://voice.firefallpro.com/2012/03/html5-audio-video-mime-types.html](http://voice.firefallpro.com/2012/03/html5-audio-video-mime-types.html)

## 查看模块加载状态

```bash
apachectl -t -D DUMP_MODULES | grep h264_streaming_module
httpd -M
```
