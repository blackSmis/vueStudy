$(function () {
  const content = new Map();
  // 获取内容
  $('button').click(() => {
    let a = $("input").val();
    let b = $("textarea").val();
    if (a.length === 0 || b.length === 0) {
      return;
    }
    content.set(a, b);
    show(content);
    $("input").val("");
    $("textarea").val("");
  })
  // 展示内容
  let show = m => {
    let str = '';
    for (const [name, value] of m) {
      str += `<li>${name}:${value}</li>`
    }
    $("ul").html(str);
  }
})
