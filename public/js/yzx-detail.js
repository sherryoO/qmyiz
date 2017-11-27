/**
 * Created by nekojita on 2017/11/26.
 */
//获取地址栏参数
function getQueryString(key) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}

var id = getQueryString('id');

$.ajax({
    url: 'http://10.100.10.47:8888/ecs/article/getArticleById',
    type: 'POST',
    data: {
        id: id
    }
})
    .then(function (response) {
        if(response.code === '200') {
            $('.article-detail').html(response.detail.content);
        }
    })
    .catch(function () {
        layer.msg('网络错误');
        return false;
    });