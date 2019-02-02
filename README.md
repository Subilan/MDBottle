# Material Bottle 
![主页](https://i.loli.net/2018/10/06/5bb8c8ba220ca.png)

## 什么是 Material Bottle？
Material Bottle 是 OBottle 的质感设计分支，OBottle 是一款极简轻量级的博客程序，采用 PHP 编写。而本项目，则是在原有的功能基础上，加入了 [Material Design](https://material.io) 的设计元素，运用的库框架为 [MDUI](https://github.com/zdhxiong/mdui)。

## 如何使用 Material Bottle？
![编写](https://i.loli.net/2018/10/06/5bb8c8b9499b2.png)
使用 Material Bottle 的方式很简单，仅需将 Github 上的内容全部打包解压到网站的根目录，访问 `/admin/` 目录进行设置后，即可开始发布您的文章。

需要注意的是，Material Bottle **并不使用数据库存储数据**，而是将数据以 PHP 文件的形式存储在 `/p/` 目录。也正因此，您在备份的时候仅需备份 `/p/` 目录即可。

## 获得 Material Bottle
如果没有特殊需要，建议您直接前往 [Release](https://github.com/Subilan/MDBottle/releases) 下载最新的 Release 稳定版本。请不要直接在 Code 页面打包源码下载，因为很多时候源码都是处于半更新状态，只有完全确认了准确无误和功能性完全、完整，才会发布 Release。

## 自定义 Material Bottle 的使用
如果需要对网站进行更加详细的配置，请编辑 `/admin/conf.php` 并保存，您的修改将会即时生效。`conf.php` 会在以后的版本不断更新以添加更多功能。

`conf.php` 的更新往往搭配着 `/c/f.php` 以及其影响页面的文件更新，因此在更新 `conf.php` 时，需要在受影响的文件内以及函数库 `/c/f.php` 内添加支持。

## Material Bottle 的优势
**更加轻量**。这要归功于 OBottle 的开发宗旨。它并不需要数据库，也不需要繁杂的安装程序，仅需创建一个管理员账户，即可开始自己的创作。

**自由度高**。`conf.php` 在此分支版本中将会发挥更大的作用，在以后的更新中，可配置的内容将会变得更全面。此外，如果对这方面很熟悉的用户，可以通过修改文件的方式达到自己想要的结果，且中间没有任何第三方力量阻挡。

**Markdown 写作**。OBottle 采用 PHP-Markdown 解析器解析 Markdown，使您的书写更加便捷，也能够更加方便地定义自己文章的格式。

## 遇到问题？
尽管提交 [Issue](https://github.com/Subilan/MDBottle/issues)！您的问题将会在每个法定节假日或者双休日得到最全面的解答。
