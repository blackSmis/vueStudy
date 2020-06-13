// $(function () {
//   waterFall();
// })
$(window).on('load', function () {
  waterFall();
})
function waterFall() {
  // 求出列数
  var box = $(".box")
  var boxWidth = box.outerWidth(); //当前图片的宽度
  var screenWidth = $(window).width();  //整个屏幕的宽度
  var cols = parseInt(screenWidth / boxWidth);
  var left = (screenWidth % boxWidth) / 2;
  // 创建数组
  var heightArr = [];
  // 遍历图片，除第一排不需要定位，取高度 其他排定位处理
  $.each(box, function (index, item) {
    // 取出图片的高度
    var boxHeight = $(item).outerHeight();
    if (index < cols) {  //判断是不是第一排
      heightArr[index] = boxHeight;
      $(item).css({
        position: 'absolute',
        left: left + index * boxWidth + 'px'
      })
    } else {
      // 最小图片的高度
      // 数组中的最小值
      var minBoxHeight = Math.min(...heightArr);
      // 最小值的索引
      var minBoxIndex = $.inArray(minBoxHeight, heightArr);
      $(item).css({
        position: 'absolute',
        left: left + minBoxIndex * boxWidth + 'px',
        top: minBoxHeight + 'px'
      })
      heightArr[minBoxIndex] += boxHeight;
    }
  })

}