<?php require_once './c/f.php';?>
<html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
	  <meta name="description" content="<?php echo descript();?>" />
	  <meta name="keywords" content="<?php echo keyword();?>" />
    <link href="./css/mdui.css" rel="stylesheet">
    <script src="./js/jquery.min.js"></script>
    <script src="./js/mdui.min.js"></script>
	</head>
</html>
<div id="menu" class="<?php echo drawer_position();echo drawer_showing();?>" style="display: <?php echo drawer_enabled();?>;">
    <div style="padding: 5%;">
        <ul class="mdui-list">
            <h1><?php echo drawer_title();?></h1>
            <div class="mdui-divider"></div><br>
            <a><li class="mdui-list-item mdui-ripple">尚未设置</li></a>
            <!--可自行编写，需要用到上述类名 mdui-list-item mdui-ripple，且 <li> 标签总是在最内-->
        </ul>
    </div>
</div>
<body style="background-image: url('./img/<?php echo background();?>');" class="<?php echo drawer_position_body();?>">
    <div class="mdui-shadow-2 mdui-card mdui-hoverable mdui-typo mdui-img-rounded mdui-color-white" style="margin: 2%; min-height: 90%; height: auto;" id="container"> 
        <div style="padding: 3%;">
        <div style="display: <?php echo toolbar_show();?>;">
            <button <?php echo toolbar_tips();?>="{content: '管理'}" class="mdui-btn mdui-btn-icon mdui-ripple" style="float: right; display: <?php echo toolbar_manage();?>" onclick="window.location.href='./admin/'"><i class="mdui-icon material-icons">account_circle</i></button>
            <button <?php echo toolbar_tips();?>="{content: '菜单'}" class="mdui-btn mdui-btn-icon mdui-ripple" style="float: left; display: <?php echo menu_display();?>" mdui-drawer="{target: '<?php echo drawer_target();?>', swipe: true, <?php echo drawer_open();?>}"><i class="mdui-icon material-icons">menu</i></button>&emsp;
            <button <?php echo toolbar_tips();?>="{content: '刷新'}" class="mdui-btn mdui-btn-icon mdui-ripple" style="float: left" onclick="javascript:location.reload();"><i class="mdui-icon material-icons">refresh</i></button>&emsp;
            <button <?php echo toolbar_tips();?>="{content: '后退'}" class="mdui-btn mdui-btn-icon mdui-ripple" style="float: left" onclick="javascript:history.back(-1);"><i class="mdui-icon material-icons">arrow_back</i></button>&emsp;
            <button <?php echo toolbar_tips();?>="{content: '前进'}" class="mdui-btn mdui-btn-icon mdui-ripple" style="float: left" onclick="javascript:history.forward(1);"><i class="mdui-icon material-icons">arrow_forward</i></button>&emsp;
            <button <?php echo toolbar_tips();?>="{content: '主页'}" class="mdui-btn mdui-btn-icon mdui-ripple" style="float: left" onclick="window.location.href='#m'"><i class="mdui-icon material-icons">home</i></button>
            <div class="mdui-textfield mdui-textfield-expandable mdui-float-right" style="max-width: 25%; display: <?php echo search_enabled();?>">
                <button class="mdui-textfield-icon mdui-btn mdui-btn-icon" <?php echo toolbar_tips();?>="{content: '搜索'}"><i class="mdui-icon material-icons">search</i></button>
                <input class="mdui-textfield-input" id="search" type="text" placeholder="搜索" onkeypress="if(event.keyCode==13) {window.location.href='#?' + document.getElementById('search').value;};">
                <button class="mdui-textfield-close mdui-btn mdui-btn-icon" <?php echo toolbar_tips();?>="{content: '关闭'}"><i class="mdui-icon material-icons">close</i></button>
            </div>&emsp;
        </div>
            <div id="h" class="mdui-text-center"></div>
            <div id="l" class="mdui-text-center">
                <h2><strong>LOADING...</strong></h2>
            </div>
            <div style="padding-top: 2%;" id="c"></div>
        </div>
    </div>
</body>
<footer>
    <div style="text-align: center; color: <?php echo footer_color()?>;" id="f"></div>
</footer>
<script src="./js/re.js"></script>