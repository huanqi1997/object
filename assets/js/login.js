$(function(){
  $("#login-zc").on('click',function(){
    $('.logindl').show()
    $('.loginzc').hide()
  })
  $("#login-dl").on('click',function(){
    $('.logindl').hide()
    $('.loginzc').show()
  })
  // 去网站 查询并使用变量接受
  var form =layui.form
  var layer=layui.layer
  // 从网站接受过来的正则 必须先定义
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位,且不能出现空格'
    ] ,
   repass:function(value){
    var req=$(".loginzc [name=password]").val()

    if(req!==value){return '两次密码不一致'}

    
   }
  })
  // 给注册页面绑定 submit事件 阻止默认行为 调用psot 接口 填写值 为'#form-zc [name=unname]').val(),password:$('#form-zc [name=password]').val()

  $('#form-zc').on('submit',function(e){
e.preventDefault()
var data={username:$('#form-zc [name=unname]').val(),password:$('#form-zc [name=password]').val()}
$.post('/api/reguser',data,function(res){
  // 判断状态 
  if(res.status!==0){
    // 调用layui弹框
    return layer.msg(res.message);;
  }
 
  layer.msg('注册成功')
  // 模拟点击事件 
  $('#login-zc').click()
})
  })
  $('#form-dl').submit(function(e){
  e.preventDefault()
  $.ajax({
    // http://api-breakingnews-web.itheima.net
    url:'/api/login',
    method:'POST',
    data:$(this).serialize(),
success:function(res){
  if(res.status!==0){
    // 调用layui弹框
    return layer.msg('登录失败！');
  }
  layer.msg('登录成功')
  // 将登录成功的token保存到localstorage
  localStorage.setItem('token',res.token)
  // 跳转到主页
  location.href='/index.html'
}
  })
    
      })
})