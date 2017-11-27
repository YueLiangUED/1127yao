;(function($){
    var loadImg = function(pics, callback){
        var index = 0;
        var len = pics.length;
        var img = new Image();
        var flag = false;
        var load = function(){
            img.src = pics[index];
            img.onload = function() {
                index ++ ;
                if (index < len) {
                    load();
                }else{
                    callback();
                }
            }
            return img;
        }
        if(len > 0){
            load();
        }
        return {
            pics: pics,
            load: load
        };
    }
    
    if(typeof(pics) == 'undefined'){
        pics = [];
    }
    $.extend({
        uImgLoad : function(options){

            var options = options || {};
            var defaults = {
                pics : [],
                loaded : function(){},
            }
            options = $.extend({},defaults,options);
            loadImg(options.pics, function(){}, 1200);
        }
    });
})(jQuery);

$(function () {
    // 图片预加载
    var pics = [
        'images/arr_1.png',
        'images/bg_01.jpg',
        'images/boot.png',
        'images/box_01.png',
        'images/btn_01.png',
        'images/btn_02.png',
        'images/ewm.jpg',
        'images/gamebg.jpg',
        'images/icon_01.png',
        'images/icon_02.png',
        'images/modal_bg_01.png',
        'images/modal_bg_02.png',
        'images/modal_bg_03.png',
        'images/modal_bg_04.png',
        'images/modal_btn_01.png',
        'images/modal_btn_02.png',
        'images/modal_btn_03.png',
        'images/modal_btn_04.png',
        'images/modal_btn_05.png',
        'images/modal_close.png',
        'images/play-btn.png',
        'images/text_01.png',
        'images/title_01.png',
        'images/yg_01.png',
        'images/yg_02.png'
    ];
    $.uImgLoad({
        pics : pics
    });




    // 点击摇杆触发
    (function () {
        // 获取1个 0 - 2的随机数: 
        function numRand() {
            var rand = Math.random() * 3 + 1;
                rand = Math.floor(rand) - 1;
            return rand
        }
        // 是否在抽奖
        var isBegin = false;

        $('.game-begin').on('touchend', function () {
            if(isBegin) return false;
            isBegin = true;
            $(".num").css('backgroundPositionY',0);
            // 改变摇杆状态
            $('.game-begin').css('background-image', 'url(./images/yg_02.png)');

            // 老虎机转动
            $('.num').each(function(index){
                var _num = $(this);
                var result = numRand();
                setTimeout(function(){
                    _num.animate({
                        backgroundPositionY: (684 * 6 + result * 228) * 0.01 + 'rem'
                    },{
                        duration: 6000 + index*1000,
                        easing: "swing",
                        complete: function(){
                            if (index==2){
                                isBegin = false;
                                $('.game-begin').css('background-image', 'url(./images/yg_01.png)');
                                $('.mask').fadeIn();
                                $('.modal-getPrize').fadeIn();
                            }

                        }
                    });
                }, index * 300);
            });
        });
    })();

    $('.modal-close').on('touchend', function () {
        var $modal = $(this).parents('.modal');
        $('.mask').fadeOut();
        $modal.fadeOut();
    });

    //规则弹窗
    $('.game-rule-btn').on('touchend', function () {
        $('.mask').fadeIn();
        $('.modal-rule').fadeIn();
    });
    
    // 奖品点击弹窗
    $('.game-prize-btn').on('touchend', function () {
        $('.mask').fadeIn();
        $('.modal-kong').fadeIn();
    });

    $('.play-again').on('touchend', function () {
        $('.mask').show();
        $('.share-tip').show();
    });
    $('.share-tip').on('touchend', function () {
        $('.mask').hide();
        $('.share-tip').hide();
    });
});