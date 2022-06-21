$(function(){
    var layer=layui.layer
    getUserInfo ()
    $('#btnLogout').on('click',function(){
        layer.confirm('退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            
            layer.close(index);
          });
    })
   
})
function getUserInfo (){
    // 调用ajax请求 身份验证获取用户信息
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头
     
       
        success:function(res){
           if(res.status!==0){
            return layui.layer.msg('获取用户信息失败')
           }
           renderAvatar(res.data)
        },
        // 调用验证身份函数 判断如果为失败跳转页面 清除钥匙
       
    })
    }
    // 渲染函数
    function renderAvatar(user){
        // 获取用户名字
        var name=user.nickname||user.username
        // 把内容替换为用户名
        $('.welcome').html('欢迎&nbsp&nbsp'+name)
        // 渲染头像 如果有图片 展示隐藏 
        if(user.user_pic!==null){
            $('.layui-nav-img')
            .attr('src',user.user_pic)
            .show()
            $('.text-avatar').hide()
        }
        // 没有展示隐藏 
        else{
            $('.layui-nav-img').hide()
            // 名字的第一个字母 转换成大写
            var first =name[0].toUpperCase()
            // 替换 内容
$('.text-avatar').html(first).show()
        }
    }