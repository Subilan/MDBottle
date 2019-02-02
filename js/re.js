var m = $.tr(window.location.href),
	s = m.split('#'),
	rh = m,
	np = 0,
	pt = 'normal',
	cpage = 1,
	nextkey, state = true,
	ver = '1.9.1',
	x = new Array();
document.getElementById('l').style.display = 'none'; /*预加载页头页尾*/
g('header', 'h'); /*页头*/
g('footer', 'f'); /*页尾*/
if (s[1] !== null && s[1] !== undefined && s[1] !== '') {
	state = false;
	if (s[1].indexOf('!') !== -1) { /*如果是文章或者页面*/
		pt = 'popage';
	} else if (s[1].indexOf('?') !== -1) { /*如果是搜索*/
		pt = 'search';
	} else {
		pt = 'normal';
	}
	np = 0;
	g(s[1], 'c');
	nextkey = '';
	cpage = 1;
} else {
	window.location.href = m + '#m';
}

function purge() {
	localStorage.removeItem('obottle');
}
if (localStorage.obottlev == undefined || localStorage.obottlev !== ver) {
	purge();
	localStorage.obottlev = ver;
}

function q(md, k, c, t, rt) { /*(mode,key,content,timestamp,readtime)*/
	/*初始化本地cache*/
	if (typeof localStorage.obottle == 'undefined') {
		localStorage.obottle = '{}';
	}
	var timestamp = 0,
		cache = '',
		caches = JSON.parse(localStorage.obottle),
		rs = new Array();
	if (typeof caches[k] !== 'undefined') {
		timestamp = caches[k].t;
		cache = caches[k].h;
	}
	if (md == 'w') {
		var caches = JSON.parse(localStorage.obottle);
		var cc = new Object();
		cc.h = c;
		cc.t = t;
		cc.rt = 0; /*使用缓存次数*/
		caches[k] = cc;
		try {
			localStorage.obottle = JSON.stringify(caches);
		} catch (e) {
			for (var d in caches) {
				if (Number(caches[d].rt) <= 8 || Number(t) - Number(caches[d].t) >= 172800) { /*自动清理缓存空间*/
					delete caches[d];
				}
			}
			localStorage.obottle = JSON.stringify(caches);
		}
	} else if (md == 'r') {
		rs['t'] = timestamp;
		rs['c'] = cache;
		return rs;
	} else if (md == 'e') {
		var caches = JSON.parse(localStorage.obottle);
		caches[k].rt = Number(caches[k].rt) + rt;
		localStorage.obottle = JSON.stringify(caches);
	}
}

function cu() {
	pt = 'normal';
	var i = $.tr(window.location.href);
	if (i !== rh) {
		state = false;
		rh = i;
		var t = i.split('#');
		if (t[1].indexOf('!') !== -1) { /*如果是文章或者页面*/
			pt = 'popage';
		} else if (t[1].indexOf('?') !== -1) { /*如果是搜索*/
			pt = 'search';
		} else {
			pt = 'normal';
		}
		np = 0;
		cpage = 1;
		g(t[1], 'c');
	}
}
window.onhashchange = function() {
	cu();
};
setInterval(cu, 1000);

function g(page, e) {
	var opg = page;
	var nhash = rh; /*标识加载page时的hash*/
	if (x[page] !== undefined && x[page] !== null) {
		var apage = page.split('/');
		if (apage[0] == 'm') {
			if (apage[1] == null || apage[1] == '') {
				np = 1;
			} else {
				np = parseInt(apage[1]) + 1;
			}
			cpage += 1;
		}
		$.op(0, e);
		$.ht(x[page], e);
		$.op(1, e);
	} else { /*预载入页码*/
		var cswitch = false;
		if (pt == 'normal') {
			var apage = page.split('/');
			if (apage[1] !== null && apage[1] !== undefined && apage[1] !== '' && apage[0] == 'm') {
				np = Number(apage[1]);
				page = 'm';
			}
		} else if (pt == 'popage') {
			var apage = page.split('!');
			if (apage[1] !== null && apage[1] !== undefined && apage[1] !== '') {
				page = apage[1];
				var cswitch = true;
			}
		}
		document.getElementById('l').style.display = 'block';
		$.op(0, e);
		var cache = q('r', 'b' + opg, '', '', '')['c'];
		var usecache = false;
		var timestamp = q('r', 'b' + opg, '', '', '')['t'];
		var pca = cpage,
			pnp = np; /*backup values*/
		if (cache !== '' && cache !== undefined) { /*预读缓存*/
			usecache = true;
			var apage = opg.split('/');
			if (apage[0] == 'm') {
				if (apage[1] == null || apage[1] == '') {
					np = 1;
				} else {
					np = parseInt(apage[1]) + 1;
				}
				cpage += 1;
			}
			setTimeout(function() {
				$.ht(cache, e);
				$.op(1, e);
				document.getElementById('l').style.display = 'none';
			}, 100);
			x[opg] = cache;
			q('e', 'b' + opg, '', '', 1);
		}
		$.aj('./c/g.php?type=getpage', {
			p: page,
			load: pnp,
			mode: pt,
			ts: timestamp
		}, {
			success: function(msg) {
				if ($.chash(nhash)) {
					var datat = '';
					if (msg != '') {
						datat = eval("(" + msg + ")");
					}
					data = datat;
					if (data.result == 'ok') {
						if (data.cm !== 'cache') {
							x[opg] = data.r; /*存入已加载区*/
							if (data.l !== 'yes') {
								q('w', 'b' + opg, data.r, data.ca, '');
							}
							$.ht(data.r, e);
							if (data.r.match(/^[ ]+$/)) {
								$.ht('<h2 class="error-info">QAQ 404</h2>', e);
							}
							if (page.indexOf('m') !== -1) {
								allnum = data.allp;
								if ((Number(allnum) - 1) <= pnp) { /*数组count比实际数量多1*/
									setTimeout(function() {
										$.rm('loadmore');
									}, 10);
								}
								cpage = pca + 1;
								np = pnp + 1;
							}
						}
					} else {
						$.ht('<h2 class="error-info">' + data.msg + '</h2>', e);
					}
					$.op(1, e);
					document.getElementById('l').style.display = 'none';
				}
				state = true;
			},
			failed: function(msg) {
				if (!usecache) {
					$.op(1, e);
					document.getElementById('l').style.display = 'none';
					$.ht('<h2 class="error-info">失去连接~OAO</h2>', e);
				}
				state = true;
			}
		})
	}
}

function getmore() { /*加载更多-函数*/
	var cp = np;
	if (cpage < 3) { /*自动换页*/
		$.rm('loadmore');
		var e = 'c';
		var c = document.getElementById(e);
		$.op(0, e);
		if (x['m' + np] !== undefined && x['m' + np] !== null) {
			$.ht(SC(e).innerHTML + x['m' + np], e);
			$.op(1, e);
			np += 1;
			cpage += 1;
		} else {
			document.getElementById('l').style.display = 'block';
			var cache = q('r', 'b' + cp, '', '', '')['c'];
			var timestamp = q('r', 'b' + cp, '', '', '')['t'];
			$.aj('./c/g.php?type=getmore', {
				load: np,
				ts: timestamp
			}, {
				success: function(msg) {
					var datat = '';
					if (msg != '') {
						datat = eval("(" + msg + ")");
					}
					data = datat;
					if (data.result == 'ok') {
						if (data.cm == 'cache') {
							$.ht(SC(e).innerHTML + cache, e);
							x['m' + cp] = cache;
							q('e', 'b' + cp, '', '', 1);
							np += 1;
							cpage += 1;
						} else {
							allnum = data.allp;
							if ((Number(allnum) - 1) <= np) { /*数组count比实际数量多1*/
								data.r = data.r + '<script>setTimeout(function(){$.rm(\'loadmore\');},10);</script>';
								console.log('No more');
							} else {
								np += 1;
							}
							cpage += 1;
							$.ht(SC(e).innerHTML + data.r, e);
							x['m' + cp] = data.r;
							if (data.l !== 'yes') {
								q('w', 'b' + cp, data.r, data.ca, '');
							}
						}
					} else {
						document.getElementById(e).innerHTML = document.getElementById(e).innerHTML + '<h2 class="error-info">' + data.msg + '</h2>';
					}
					$.op(1, e);
					document.getElementById('l').style.display = 'none';
					state = true;
				},
				failed: function(msg) {
					alert('加载失败');
					state = true;
				}
			}, '');
		}
	} else {
		cpage = 0;
		window.open('#m/' + np, '_self');
	}
}
setTimeout(function() {
	console.log('\n %c =3= OBottle  %c @SomeBottle 2019.1.20 \n\n', 'color:#484848;background:#ffffff;padding:5px 0;', 'color:#ffffff;background:#484848;padding:5px 0;');
}, 1000);