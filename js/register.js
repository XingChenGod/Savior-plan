(function () {
    var oUserName = document.querySelector("#register #register-form .reg-user-name"),
        oNickname = document.querySelector("#register #register-form .reg-nickname"),
        oTipRight = document.querySelector("#register #register-form .reg-tip-right"),
        oTipError = document.querySelector("#register #register-form .reg-tip-error"),
        oPwd = document.querySelector("#register #register-form .reg-pwd"),
        oPwdAgain = document.querySelector("#register #register-form .reg-pwd-again"),
        oIndentify = document.querySelector("#register #register-form .reg-indentify"),
        oMessage = document.querySelector("#register #register-form .reg-message"),
        oMegClick = document.querySelector("#register #register-form .reg-message-click"),
        oRegBtn = document.querySelector("#register #reg-btn");

    var reg = {
        user : /^1[3-9]\d{9}$/,
        nickname : /^[^\n]{3,20}$/,
        pwd : /^[\w~!@#$%^&*()+{}[\]:"|',.?\-/]{6,16}$/
    }
    //验证账号
    oUserName.onblur = function () {
        var val = this.value;
        if (val) {
            if (reg.user.test(val)) {
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

    //验证昵称
    var oTipRight1 = document.querySelector("#register #register-form .reg-tip-right1"),
        oTipError1 = document.querySelector("#register #register-form .reg-tip-error1");
    oNickname.onblur = function () {
        var val = this.value;
        if (val) {
            if (reg.nickname.test(val)) {
                oTipRight1.style.display = "block";
                oTipError1.style.display = "none";
            } else {
                oTipRight1.style.display = "none";
                oTipError1.style.display = "block";
            }
        } else {
            oTipError1.style.display = "none";
            oTipRight1.style.display = "none";
        }
    };
    //验证密码
    var oTipRight2 = document.querySelector("#register #register-form .reg-tip-right2"),
        oTipError2 = document.querySelector("#register #register-form .reg-tip-error2");
    oPwd.onblur = function () {
        var val = this.value;
        if (val) {
            if (reg.pwd.test(val)) {
                oTipRight2.style.display = "block";
                oTipError2.style.display = "none";
            } else {
                oTipRight2.style.display = "none";
                oTipError2.style.display = "block";
            }
        } else {
            oTipError2.style.display = "none";
            oTipRight2.style.display = "none";
        }
    };
    //第二次验证密码
    var oTipRight3 = document.querySelector("#register #register-form .reg-tip-right3"),
        oTipError3 = document.querySelector("#register #register-form .reg-tip-error3");
    oPwdAgain.onblur = function () {
        var val = this.value;
        var val1 = oPwd.value;
        if (val) {
            if (val === val1) {
                oTipRight3.style.display = "block";
                oTipError3.style.display = "none";
            } else {
                oTipRight3.style.display = "none";
                oTipError3.style.display = "block";
            }
        } else {
            oTipError3.style.display = "none";
            oTipRight3.style.display = "none";
        }
    };
    //获取验证码
    oMegClick.onclick = click;
    function click() {
        var n = 60;
        var text = this.innerHTML;
        if (oUserName.value) {
            this.innerHTML = "";
            this.innerHTML = n+"秒后重新获取";
            this.onclick = null;
            //设置倒计时
            var time = setInterval(function () {
                n--;
                oMegClick.innerHTML = n+"秒后重新获取";
                if (n <= 0) {
                    clearInterval(time);
                    oMegClick.onclick = click;
                    oMegClick.innerHTML = text;
                }
            },1000);
            //数据交互部分
            var xhr = new XMLHttpRequest();
            xhr.open("post" , "http://yjhapi.agxx.club/iweb/Sendsms/send" , true);
            xhr.setRequestHeader("content-Type" , "application/x-www-form-urlencoded");
            xhr.send("mobile="+oUserName.value);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var rep = this.responseText;
                    //处理后台数据
                    rep = rep.slice(1,rep.length);

                    rep = JSON.parse(rep);
                    if (rep.status === 1) {
                        alert("发送成功,验证码为：123456");
                    }
                }
            };
        } else {
            alert("请输入手机号码");
        }
    };
    //点击注册
    oRegBtn.onclick = function () {
        if (oUserName.value && oPwd.value && oMessage.value) {
            var xhr = new XMLHttpRequest();
            xhr.open("post" , "http://yjhapi.agxx.club/iweb/regist/index" , true);
            xhr.setRequestHeader("content-Type" , "application/x-www-form-urlencoded");
            xhr.send("mobile="+oUserName.value+"&pwd="+oPwd.value+"&sms_code="+oMessage.value);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    var rep = this.responseText;
                    //处理后台数据
                    rep = rep.slice(1,rep.length);

                    rep = JSON.parse(rep);
                    console.log(rep);
                    if (rep.status === 1) {
                        alert("注册成功");
                    } else {
                        alert(rep.info);
                    }
                }
            };
        } else {
            alert("请填写完信息");
        }
    };
})();