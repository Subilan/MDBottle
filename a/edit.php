<?php 
require "./global.php";
header("Content-type: text/html; charset=utf-8");
error_reporting(E_ALL^E_NOTICE^E_WARNING);
session_start();
date_default_timezone_set("Asia/Shanghai");
$daten=date('Ymd');
$act=$_GET['t'];
$cof=$_GET['c'];
$edit=$_GET['e'];
$ptitle='';
$pcontent='';
$pdat='';
$tag='';
if($_SESSION['log']!=='yes'){
	header('Location: index.php');
	session_write_close();
	exit();
}
if(!is_numeric($edit)){$edit='';};
if(file_exists('./../p/'.$edit.'.php')){
	require './../p/'.$edit.'.php';
}else{
	$edit='';
}
function checkc(){
	global $edit;
	if($edit!==''){
require './../p/index.php';
$tops=explode(',',$tp);
if(in_array($edit,$tops)){
	return true;
}
	}
}
if($act=='out'){
	session_destroy();
	header('Location: index.php');
}else if($act=='del'){/*删除文章*/
	if($cof=='yes'){
	if(file_exists('./../p/index.php')){
	require './../p/index.php';
	if(array_key_exists($edit,$in)){
		unset($in[$edit]);
		unset($tagi[$edit]);
		/*删除置顶残留*/
		$tops=explode(',',$tp);
			if(in_array($edit,$tops)){
				$newtp='';
				foreach($tops as $key=>$val){
					if(intval($val)==intval($edit)){
						unset($tops[$key]);
					}
				}
				foreach($tops as $val){
					if(!empty($val)){
						$newtp=$newtp.$val.',';
					}
				}
				$rtp=preg_replace("/\t|,/",'',$newtp);
				if(empty($rtp)){
					$newtp='';
				}
				$tp=$newtp;
			}
		unlink('./../p/'.$edit.'.php');
		file_put_contents('./../p/index.php','<?php $inn='.$inn.';$in='.var_export($in,true).';$tp=\''.$tp.'\';$tagi='.var_export($tagi,true).';?>');
echo "
<script>window.open('edit.php', '_self');</script>";
}else{
echo "
<script>alert('该文章被吃了O_o'); window.open('edit.php', '_self');</script>";
}
}else{
echo "
<script>alert('你还没有任何文章'); window.open('edit.php', '_self');</script>";
}
}else{
echo "
<script>if (confirm('真的要删除这篇文章吗？！')) { window.open('?e=".$edit."&t=del&c=yes', '_self'); } else { window.open('edit.php?e=".$edit."', '_self'); };</script>";
}
exit();
}
session_write_close();
?>
<html>
<?php $content->GetContent("head");?>
<body>
	<div class='container'>
		<h2 id='zt'>EDIT -v-</h2>
		<?php if(is_numeric($edit)){?>
		<p>
			<a href='edit.php' target='_self' style='color:#AAA;'>新撰写文章/页面</a>&nbsp;<a href='edit.php?e=<?php echo $edit;?>&t=del'
			 target='_self' style='color:#AAA;'>删除这个</a>
		</p>
		<?php }; ?>
		<p>
			<input type='text' placeholder='标题Title' class='tagi input' name='t' id='t' value='<?php echo $ptitle;?>'></input>
		</p>
		<p>
			<textarea rows='20' class='area' placeholder='内容Content' name='c' id='c' class='input'><?php echo $pcontent;?></textarea>
		</p>
		<p>
			<input type='text' placeholder='日期Date/页面链接link' class='tagi input' value='<?php if(!empty($pdat)){echo $pdat;}else{echo $daten;};?>'
			 name='d' id='d'></input>
		</p>
		<p>
			<input type='text' placeholder='标签Tag' class='tagi input' name='a' id='a' value='<?php echo $tag;?>'></input>
		</p>
		<p class='s'>
			<a href="javascript:void(0);" onclick='edit()' class="button button-primary button-rounded" id='btn'>(O_o)?</a><input
			 type="checkbox" id='zd' <?php if(checkc()){echo 'checked="true"' ;}?>/>置顶&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);'
			 onclick='faq()'>FAQ</a>
		</p>
		<form action="https://sm.ms/api/upload" id="fileinfo" method="post" enctype="multipart/form-data" style='display:none;'>
			<input type="file" name="smfile" id="smfile" />
			<input type="hidden" name="ssl" value="true"></input>
			<input type="hidden" name="format" value="json"></input>
		</form>
		<input type="file" id="btn_file" style="display:none">
		<p class='s'></p>
	</div>
</body>
<script src='./../c/f.js'></script>

</html>