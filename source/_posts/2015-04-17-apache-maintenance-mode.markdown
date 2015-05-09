---
layout: post
title: "apache maintenance mode"
date: 2015-04-17 19:39
comments: true
categories: 
math: 
abstract: 
---


## How to set devcenter or webconsole into maintenance mode
I found a way to set devcenter or webconsole show maintenance page automatically without restart apache.
With the following method, we just touch or remove one file, it will turn on or off the maintenance mode.
Basically, I learnt from this page:
[Redirect-Site-to-Maintenance-Page-using-Apache-and-HTAccess](http://www.shellhacks.com/en/Redirect-Site-to-Maintenance-Page-using-Apache-and-HTAccess)

<!--more -->
## Change httpd.conf
make sure the rewrite module is loaded:

    LoadModule rewrite_module modules/mod_rewrite.so

Then add rewrite rule:

    DocumentRoot "/opt/root_dir/"
    <IfModule mod_rewrite.c>
       RewriteEngine On
       #RewriteCond %{REMOTE_ADDR} !^123\.456\.789\.000
       RewriteCond %{DOCUMENT_ROOT}/maintenance.html -f
       RewriteCond %{DOCUMENT_ROOT}/maintenance.enable -f
       RewriteCond %{SCRIPT_FILENAME} !maintenance.html
       RewriteRule ^.*$ /maintenance.html [R=503,L]
       ErrorDocument 503 /maintenance.html
       Header Set Cache-Control "max-age=0, no-store"
    </IfModule>

Then add the `maintenance.html` page in the `DocumentRoot`.
When the site is under maintenance mode, please touch `maintenance.enable` file in `DocumentRoot`.
After the site becomes normally, please just remove the `maintenance.enable`

    TIPs: as we used the wsgi in apache, any changes to python file, we need to restart the apache.

## Add alias in wsgi conf
add the following line in the `conf.d/myproject.conf` or `conf.d/otherproject.conf`:

    Alias /maintenance.html /opt/root_dir/maintenance.html

## Restart Apache and Demo
restart Apache, it should work.
And I already make a demo, here are the config files with path:

    httpd.conf -> /opt/root_dir/httpd/conf
    devcenter.conf -> /opt/root_dir/httpd/conf.d
    maintenance.html -> /opt/root_dir
    maintenance.enable -> /opt/root_dir


