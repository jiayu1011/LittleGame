function Nothing(){
    alert("我也不知道你的密码噢，再好好想想叭！");
}

function Check(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    if(username.value == "InSelchen-" && password.value == "20010720")
    {
        alert("登录成功， 点击确认进入游戏界面吧！");
        window.location.href = "Loading_Page.html";
    } 
    else
    {
        alert("账号密码错误！再好好想一想哦");
    }
}