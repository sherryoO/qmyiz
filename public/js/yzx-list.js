Vue.filter('toTimeArray', function (num, which, toCharacter) {

    var oDate = new Date(num*1000),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds();

    var result = '';
    if(which) {
        result = [[oYear, oMonth, oDay], [oHour, oMin, oSen]][which];

        if(toCharacter) {
            result = result[0] + '年' + result[1] + '月' + result[2] + '日';
        }

        return result
    }
    result = [[oYear, oMonth, oDay], [oHour, oMin, oSen]];
    return result;
});

new Vue({
    el: '#list-box',
    data: {
        listData: [],
        nowPage: 1,
        row: 5,
        noMoreData: false,
        isLoading: false
    },
    created: function () {
        this.getListData();
    },
    methods: {
        scrollRequestNextPage: function () {

            if(this.noMoreData) {
                return false;
            }

            if(this.isLoading) {
                return false;
            }

            if(this.listData.length < this.row) {
                layer.msg('没有更多文章了');
                this.noMoreData = true;
                return false;
            }

            var listBox = $('listBox');

            var scrollTop = $(document).scrollTop(),
                windowHeight = $(window).height(),
                pageHeight = $(document).height(),
                slideHeight = $('.up-slide-load').height();

            if(pageHeight - (scrollTop + windowHeight + slideHeight) < 20) {
                this.nowPage = this.nowPage + 1;
                var that = this;
                this.isLoading = true;
                this.getListData(function () {
                    that.isLoading = false;
                });

            }

        },

        getListData: function (fn) {
            var that = this;
            fn = fn || function () {};
            $.ajax({
                url: '//10.100.10.47:8888/ecs/article/selectWapArticle',
                type: 'POST',
                data: {
                    page: this.nowPage,
                    rows: this.row
                }
            })
                .then(function (response) {
                    if(response.code === '200') {
                        that.listData = that.listData.concat(response.detail);
                        fn();
                    }

                    if(response.code === '202') {
                        layer.msg('没有更多文章了');
                        that.noMoreData = true;
                        return false;
                    }
                })
                .catch(function () {
                    layer.msg('网络错误');
                    return false;
                });
        }
    }
});