/*--登录页 开始--*/
(function () {
    var oLogin = document.getElementById("login"),
        oForm = document.getElementById("login-form"),
        oSubmit = document.getElementById("submit"),
        aInput = document.querySelectorAll("#login-form input"),
        oUserName = aInput[0],
        oPwd = aInput[1],
        oCheck = document.querySelector("#login-form .login-text .log-t-auto .check"),
        flag = false;
    //点击自动登录按钮
    oCheck.onclick = function () {
        if (!flag) {
            //记录用户账号，密码
            if (oUserName.value && oPwd.value) {
                window.localStorage.setItem("user" , oUserName.value);
                window.localStorage.setItem("pwd" , oPwd.value);
                window.localStorage.setItem("check" , "url(./img/auto-gou.png)");
            }
            oCheck.style.backgroundImage = "url(./img/auto-gou.png)";
            flag = true;
        } else {
            oCheck.style.backgroundImage = "url(./img/auto-uncheck.png)";
            flag = false;
            //清除记录值
            window.localStorage.clear();
        }
    };
    //账号输入时候，失去焦点时候检测
    var reg = {
        user : /^1[3-9]\d{9}$/,
        pwd : /^[^\n]{6,16}&/
    };
    var oTipRight = document.querySelector("#login-form .tip-right"),
        oTipError = document.querySelector("#login-form .tip-error");
    oUserName.onblur = function () {
        var valUser = oUserName.value;
        if (valUser) {//账号处有值
            if (reg.user.test(valUser)) {//检测账号是否符合格式
                oTipRight.style.display = "block";
                oTipError.style.display = "none";
            } else {
                oTipRight.style.display = "none";
                oTipError.style.display = "block";
            }
        } else {
            oTipError.style.display = "none";
            oTipRight.style.display = "none";
        }
    };
    //点击登录
    oSubmit.onclick = function () {
        var a = oUserName.value,//账号
            b = oPwd.value;//密码
        if (a && b) {
            var xhr = new XMLHttpRequest();
            xhr.open("post" , "http://yjhapi.agxx.club/iweb/login/check" , true);
            xhr.setRequestHeader('content-Type','application/x-www-form-urlencoded');
            xhr.send("mobile="+a+"&pwd="+b);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4){
                    var rep = this.responseText;
                    rep = rep.slice(1,rep.length);
                    rep = JSON.parse(rep);
                    console.log(rep);
                    if (rep.status === 1) {
                        var name = rep.data.nick_name;
                        window.sessionStorage.setItem("avatar" , rep.data.avatar);
                        window.localStorage.setItem("mobile" , rep.data.mobile);
                        window.localStorage.setItem("nickname" , rep.data.nick_name);
                        window.localStorage.setItem("sex" , rep.data.sex);
                        window.localStorage.setItem("token" , rep.data.token);
                        console.log(rep.data.avatar,rep.data.mobile,rep.data.nick_name,rep.data.sex)
                        window.open("personal.html" , "_self")
                        alert("欢迎"+name+"先生回到猿计划");
                    } else {
                        alert(rep.info||"你不属于源星球,快去注册吧");
                    }
                }
            };
        } else {
            alert("请输入账号密码");
        }
    }
    //页面加载完成时候
    window.onload = function () {

        if (window.localStorage.getItem("user") && window.localStorage.getItem("pwd")) {
            oUserName.value = window.localStorage.getItem("user");
            oPwd.value = window.localStorage.getItem("pwd");
            oCheck.style.backgroundImage = window.localStorage.getItem("check");
            flag = true;
        }
    };
})();



