document.write("<script type='text/javascript' src='./mdui.min.js'></script>");
function getTextResponse(theurl)
{
ajax=InitAjax();
ajax.open("GET", theurl, false); 
ajax.send(null); 
if (ajax.readyState == 4 && ajax.status == 200) {
　　var value = 'true';
}
else
{
value = 'false';
}
return value;
}

function InitAjax()
{
　var ajax=false; 
　try { 
　　ajax = new ActiveXObject("Msxml2.XMLHTTP"); 
　} catch (e) { 
　　try { 
　　　ajax = new ActiveXObject("Microsoft.XMLHTTP"); 
　　} catch (E) { 
　　　ajax = false; 
　　} 
　}
　if (!ajax && typeof XMLHttpRequest!='undefined') { 
　　ajax = new XMLHttpRequest(); 
　} 
　return ajax;
}

function deleteConfirm()
{
    mdui.confirm("是否确实要删除这篇文章？此操作不可逆。", "<i class='mdui-icon material-icons'>warning</i> 警告",
    function(){
        window.open("?e='.$edit.'&t=del&c=yes','_self");
    },
    0)
}