document.write("<script type='text/javascript' src='./mdui.min.js'></script>");
var timer = false;
var ct = 0;
var t, c, times = 0,
	lastrequest = 0;

function edit() {
	if (timer == false) {
		times = 0;
		lastrequest = 0;
		timer = true;
		t = setInterval(function() {
			times += 0.5
		}, 500);
		c = setInterval(function() {
			if (times - lastrequest >= 1) {
				console.log('Chosen.');
				clearInterval(t);
				clearInterval(c);
				timer = false;
				act(ct);
				ct = 0;
			}
		}, 500);
	} else {
		lastrequest = times;
	}
	ct += 1;
	$('#btn').html( ct + 'x COMBO');
}

function act(step) {
	if (step == 1) {
		$('#btn').html('编辑/发布');
		submits();
	} else if (step == 2) {
		$('#btn').html('预览');
		previews();
	} else if (step == 3) {
		$('#btn').html('读取草稿');
		mdui.confirm('你是要读取草稿吗？', '<i class="mdui-icon material-icons">info_outline</i> 确认',
		function(){
			mdui.snackbar({
				message: "<i class='mdui-icon material-icons'>done</i>&emsp;&emsp;读取草稿成功！",
				position: "left-bottom"
			});
			document.getElementById("t").value = localStorage.edittitle;
			document.getElementById("c").value = localStorage.editcontent;
			document.getElementById("d").value = localStorage.editdal;
			document.getElementById("a").value = localStorage.edittag;
		},
		0);
	} else if (step == 4) {
		$('#btn').html('保存草稿成功');
		localStorage.edittitle = document.getElementById("t").value;
		localStorage.editcontent = document.getElementById("c").value;
		localStorage.editdal = document.getElementById("d").value;
		localStorage.edittag = document.getElementById("a").value;
	} else if (step == 5) {
		$('#btn').html('登出');
		mdui.confirm('你是要退出登录吗？', '<i class="mdui-icon material-icons">info_outline</i> 确认', 
		function(){
			window.open('?t=out', '_self');
			// TODO - FIX
		},
		0);
	} else if (step >= 6) {
		$('#btn').html('成绩: ' + step);
		if (step > 6) {
			if (step >= 15) {
				if (step >= 30) {
					if (step >= 50) {
						if (step >= 100){
							if (step >= 200){
								if (step >= 500){
									if (step >= 1000){
										if (step >= 10000){
											if (step >= 100000){
												mdui.alert('...已经说不出话来了，大佬怎么做到的教教我呗，你居然达到了 ' + step + ' 次啊，要么你是机器人，要么... ！！！真是太秀了吧。', '提示')
											} else {
												mdui.alert('兄弟，你是怎么做到的？你点了 ' + step + ' 次呢！', '提示');
											}
										} else {
											mdui.alert('我开始怀疑你是不是人类了！你已经点击了 ' + step + ' 次！', '提示');
										}
									} else {
										mdui.alert('？？！？！？？！？！你已经点击了 ' + step + ' 次！', '提示');
									}
								} else {
									mdui.alert('怎么可能！200 次？！你已经点击 ' + step + ' 次了！', '提示');
								}
							} else {
								mdui.alert('简直不敢相信OwO，达到 100 啦！你一共点击了 ' + step + ' 次~', '提示');
							}
						} else {
							mdui.alert('QAQ好厉害！达到 50 次了！你一共点击了 ' + step + ' 次~', '提示');
						}
					} else {
						mdui.alert('OwO 达到 30 次啦~ 你一共点击了 ' + step + ' 次~', '提示');
					}
				} else {
					mdui.alert('Wow~ 你一共点击了 ' + step + ' 次~', '提示');
				}
			} else {
				mdui.alert('OwO你一共点击了 ' + step + ' 次~', '提示');
			}
		}
	}
	setTimeout(function() {
		$('#btn').html('(O_o)?');
	}, 1000);
}

function upload() {
	document.getElementById("fileinfo").style.display = 'block';
}
document.getElementById('fileinfo').onchange = function() {
	console.log("submit pic");
	var fd = new FormData(document.getElementById("fileinfo"));
	fd.append("label", "WEBUPLOAD");
	$.ajax({
		url: "https://sm.ms/api/upload",
		type: "POST",
		data: fd,
		enctype: 'multipart/form-data',
		processData: false,
		// tell jQuery not to process the data
		contentType: false // tell jQuery not to set contentType
	}).done(function(data) {
		mains = eval(data.data);
		document.getElementById("fileinfo").style.display = 'none';
		document.getElementById("c").value = document.getElementById("c").value + '![' + mains.filename + '](' + mains.url + ')';
	});
	return false;
}

function submits() {
	var t = document.getElementById("t").value;
	var c = document.getElementById("c").value;
	var d = document.getElementById("d").value;
	var a = document.getElementById("a").value;
	var zd = 'no';
	if (document.getElementById('zd').checked) {
		zd = 'yes';
	}
	mdui.confirm('你是要发布或者应用你的编辑吗？', '<i class="mdui-icon material-icons">info_outline</i> 确认',
	function (){
		$('#zt').html('正在发布...');
		$.ajax({
			type: "post",
			url: './../c/t.php?type=submit',
			data: {
				title: t,
				content: c,
				dat: d,
				tag: a,
				ifzd: zd,
				editn: editnum
			},
			dataType: "text",
			success: function(msg) {
				var datat = '';
				if (msg != '') {
					datat = eval("(" + msg + ")");
				}
				data = datat;
				if (data.result == 'ok') {
					mdui.snackbar({
						message: "<i class='mdui-icon material-icons'>done</i>&emsp;&emsp;页面发布成功！",
						position: "left-bottom"
					});
					$('#zt').html('EDIT -v-');
				} else {
					mdui.snackbar({
						message: '<i class="mdui-icon material-icons">warning</i>&emsp;&emsp;发布失败:\n' + data.msg,
						position: 'left-bottom'
					});
					$('#zt').html('EDIT -v-');
				}
			},
			error: function(msg) {
				mdui.alert('失去了与服务器的连接', '<i class="mdui-icon material-icons">warning</i> 错误');
				mdui.confirm("是否需要保存草稿？", "<i class='mdui-icon material-icons'>info_outline</i> 确认", function(){
					localStorage.edittitle = document.getElementById("t").value;
					localStorage.editcontent = document.getElementById("c").value;
					localStorage.editdal = document.getElementById("d").value;
					localStorage.edittag = document.getElementById("a").value;
				},
				0);
			}
		});
	},
	0);
}

function previews() {
	var a = document.getElementById('c').value;
	var wd;
	wd = window.open('', '_blank', '');
	var converter = new Markdown.Converter();
	var rhtml = converter.makeHtml(a);
	//THIS PROBLEM
	wd.document.write("<body style='background-color: #2196f3;'><link rel='stylesheet' href='./../css/mdui.css'><div style='margin-left: 1%; margin-right: 1%;'><button mdui-tooltip='返回' onclick='javascript:history.back(-1);' class='mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white'><span style='color: white'><i class='mdui-icon material-icons'>arrow_back</i></span></button><button mdui-tooltip='发布' onclick='javascript:submits()' class='mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white'><span style='color: white'><i class='mdui-icon material-icons'>send</i></span></button></div><div style='margin: 5%; min-height: 85%; height: auto' class='mdui-shadow-2 mdui-hoverable mdui-img-rounded mdui-color-white'><div style='padding: 3%;'><h1>预览</h1><div class='mdui-divider'></div><br>" + rhtml + '</div></div></body>');
	wd.document.close();
}