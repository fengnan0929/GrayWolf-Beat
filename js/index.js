$(function () {
    // 1.监听规则、开始按钮、重新开始按钮的点击
    $(".rule").click(function () {
        $(".rule_detail").stop().fadeIn(100);
    });
    $(".close").click(function () {
        $(".rule_detail").stop().fadeOut(100);
    });

    // 2.监听开始按钮的点击
    $(".begin").click(function () {
        startAnimation();
        wolfAnimation();
    });
    // 3.监听重新开始按钮的点击
    $(".reStart").click(function () {

        // 3.1 把进度条设置到满格位置
        $(".progress").css({
            width: 180,
        });
        //3.2 分数清零
        $('.score').text('0');
        $(".mask").stop().fadeOut(100);
        startAnimation();
        wolfAnimation();
    });

    function  startAnimation() {
        $(".begin").stop().fadeOut(100);
        // 进度条控制部分
        progressTimer = setInterval(function () {
            var width = $(".progress").width() - 1;
            if (width < 0) {
                // 监听游戏结束
                $(".mask").stop().fadeIn(100);
                // 删掉动画和图片内容
                clearInterval(progressTimer);
                clearInterval(wolfTimer);
                $('.wolf').remove();
            }
            else {
                $(".progress").css({
                    width: width,
                })
            }
        }, 100);
    }
    var wolfTimer;
    function wolfAnimation(){
        // 1.定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'];
        var wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'];
        // 2.定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left: "100px", top: "115px"},
            {left: "20px", top: "160px"},
            {left: "190px", top: "142px"},
            {left: "105px", top: "193px"},
            {left: "19px", top: "221px"},
            {left: "202px", top: "212px"},
            {left: "120px", top: "275px"},
            {left: "30px", top: "295px"},
            {left: "209px", top: "297px"}
        ];
        // 控制 狼出现的随机坑位
        var randomPosition = Math.round( Math.random()*8);
        // 随机出现小灰灰 或 灰太狼
        var wolf = Math.round(Math.random()*2) == 0 ? wolf_2 : wolf_1;
        // 创建图片动画
        window.indexBegin = 0;
        window.indexEnd = 5;

        var $wolfimage = $('<img src="" class="wolf">');
        wolfTimer = setInterval(function () {
            $(".wolf").remove();
            if(indexBegin < indexEnd){
                $wolfimage.attr('src',wolf[indexBegin]);
                indexBegin++;
                $wolfimage.css({
                    position: "absolute",
                    left:arrPos[randomPosition].left,
                    top:arrPos[randomPosition].top
                });
                $('.container').append($wolfimage);
                // 把wolfimage作为参数传给规则处理函数
                rules($wolfimage);
            }
            else{
                clearInterval(wolfTimer);
                wolfAnimation();
            }
        },200);
    }
    function rules($wolfimage){
        $wolfimage.one('click',function () {
            indexBegin = 6;
            indexEnd = 7 ;
            var $src =$(this).attr('src');

            var flag = $src.indexOf('h') >=0;
            if(flag){
                $('.score').text(parseInt($('.score').text())+ 10);
            }
            else{
                $('.score').text(parseInt($('.score').text())- 10);
            }
        })
    }
});