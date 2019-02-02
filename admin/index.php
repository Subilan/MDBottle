<?php
require_once './../c/f.php';
error_reporting(E_ALL^E_NOTICE^E_WARNING);
session_start();
function grc($length){
   $str = null;
   $strPol = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz7823647^&*^&*^&(^GYGdghevghwevfghfvgrf_+KD:QW{D
   NUIGH^&S%$X%#$"}{{}":":L:"';
   $max = strlen($strPol)-1;
   for($i=0;$i<$length;$i++){
    $str.=$strPol[rand(0,$max)];
   }
   return $str;
  }  
$salt=base64_encode(base64_encode(grc(64)).base64_encode(grc(64)).base64_encode(grc(64)).base64_encode(grc(64)).base64_encode(grc(64)));
function fcrypt($s){
	global $salt;
	return sha1(crypt(sha1($s),sha1(base64_encode(md5(substr($s,0,6)))).$salt));
}
$request=@explode('?',$_SERVER['REQUEST_URI'])[1];
if($_SESSION['log']!=='yes'){
if($request=='log'){
	if(!file_exists('./passport.php')){
		if(stripos($_POST['auth'],':')!==false){
		file_put_contents('./passport.php','<?php $authid=\''.fcrypt($_POST['auth']).'\';$authsalt=\''.$salt.'\';?>');
		}else{
			echo "<script>alert('请按格式来哦');</script>";
		}
	}else{
		require_once './passport.php';
		if($authid==sha1(crypt(sha1($_POST['auth']),sha1(base64_encode(md5(substr($_POST['auth'],0,6)))).$authsalt))){
			$_SESSION['log']='yes';
			header('Location: edit.php');
		}else{
			echo "<script>alert('验证错误QAQ');</script>";
		}
	}
}
}else{
	header('Location: edit.php');
}
session_write_close();
?>
<head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
	  <script src="./../js/jquery.min.js"></script>
	  <link href="./../css/mdui.css" rel="stylesheet">
	  <script src="./../js/mdui.min.js"></script>
	  <title>MDBottle - 验证</title>
</head>
<body class="mdui-container" style="background-color: <?php echo admin_color()?>;">
	<div class="mdui-shadow-2 mdui-hoverable mdui-text-center mdui-color-white mdui-typo mdui-center" style="margin-top: 15%; margin-left: 10%; margin-right: 10%;">
		<div style="padding: 3%;">
		<button class="mdui-btn mdui-ripple mdui-ripple-blue mdui-btn-icon" onclick="window.location.href='./../#m'" style="float: left;"><i class="mdui-icon material-icons">arrow_back</i></button><br>
			<?php if(!file_exists('./passport.php')){?>
				<h2><b>验证</b></h2>
				<p>请以"用户名:密码"的格式键入以创建一个新的验证文件。<a href="javascript:;" mdui-dialog="{target: '#need-help'}">遇到问题？</a><br></p>
			<?php }else{ ?>
				<h2><b>登录</b></h2>
				<p>键入"用户名:密码"以登录。</p>
			<?php } ?>
			<br>
			<div style="margin-right: 20%; margin-left: 20%;">
				<form action="?log" method="post" class="mdui-textfield" style="padding-left: 35%; padding-right: 35%;">
					<input class="mdui-textfield-input" type="<?php if(!file_exists('./passport.php')){echo 'text';}else{echo 'password';}?>" name="auth" placeholder="键入以继续">
					<br><br><button class="mdui-btn mdui-ripple mdui-shadow-1 mdui-color-blue-accent" style="display: inline;">确定</button>
				</form>
			</div>
		</div>
	</div>
	<div id="need-help" class="mdui-dialog">
		<div class="mdui-dialog-title"><i class="mdui-icon material-icons">help_outline</i> 帮助</div>
		<div class="mdui-dialog-content">
			<p>请键入类似于"用户名:密码"的格式。例如 SomeBottle:123456，中间不含空格。如果点击确定按钮没有任何反应，请检查服务器的权限是否到位。</p>
		</div>
		<div class="mdui-dialog-actions">
			<button class="mdui-btn mdui-ripple mdui-ripple-blue" mdui-dialog-confirm><span style="color: #2196F3">OK</span></button>
		</div>
	</div>
</body>