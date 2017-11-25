/*引入分享板块*/
$('#share').load("../include/share.html");
/*引入风格导航板块*/
$('#style-nav').load("../include/style-nav.html");
/*引入底部主导航板块*/
$('nav').load("../include/main-nav.html");
/*引入报名板块*/
$('.entered').load("../include/entered.html");
//判断是否在微信浏览器下
function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
if(is_weixin()){
    $('#share').css('display','none')
}