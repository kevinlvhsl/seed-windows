#!/bin/bash
#
# 浙江卫视-绿荫继承者
#
# 会将项目根目录下的index.html文件打包成素材包要求的格式
#
# zjws-lyjcz-wechat.zip
#
# [+] closed folder
# [-] opened folder
#
# 目录结构如下图:
# |-- [-]zjws-lyjcz-wechat
#      |-- [-]zjws
#           |-- [-]lyjcz
#                |-- index.html
#
# base path /d/projects/intvstatic/zjws/lyjcz
#
# 根据当前路径区分出电视台名和项目名
if [ ! -f "index.html" ]
then
    echo "index.html not existed"
    exit 0
fi

# 取出版本号
sed 's/\(\/static\/build.js\)?.*"/\1"/' < index.html > index.tmp.html

path=`pwd`
basePath=$path
tmp=${path%/*}
tmp=${tmp%/*}
path=${path:${#tmp}}
path=${path:1}

project=${path##*/}
tv=${path%/*}

# echo "prject name : $project"
# echo "tv name : $tv"

# 清除多余文件和目录
if [ -f "$tv/$project/index.html" ]
then
    rm "$tv/$project/index.html"
    rmdir -p "$tv/$project"
    rm "$tv-$project-wechat.zip"
    echo "clean up"
else
    echo "no need for clean up"
fi

# 创建目录-> 移动文件 -> zip打包
mkdir $tv
cd $tv
mkdir $project
cd $project
mv "$basePath/index.tmp.html" ./index.html
cd $basePath
# "C:\Program Files (x86)\WinRAR\Rar.exe" a "$tv-$project-wechat" $tv
echo "--- start packing ---"
# tar -cvf "$tv-$project-wechat.zip" $tv
zip "$tv-$project-wechat.zip" "$tv/$project/index.html"
echo "--- packing is done successfully! ---"

# 清除多余文件和目录
rm "$basePath/$tv/$project/index.html"
rmdir -p "$tv/$project"
echo "clean up"

# 发送邮件
node build/sendmail.js "$tv-$project-wechat.zip"
