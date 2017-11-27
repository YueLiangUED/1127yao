$(function () {

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