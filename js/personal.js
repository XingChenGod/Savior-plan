/*--写入存储信息--*/
(function () {
    var oImagLog = document.querySelector("#personal .per-left .per-l-info .per-l-info-log img"),
        oInfoNickname = document.querySelector("#personal .per-left .per-l-info .per-l-info-log .per-info-nickname"),
        oInfoSignature = document.querySelector("#personal .per-left .per-l-info .per-l-info-log .per-info-signature");

    var oMan = document.getElementById("man"),
        oWoman = document.getElementById("woman");

    if (window.localStorage.getItem("avatar")) {
        oImagLog.src = window.localStorage.getItem("avatar");
    } else {
        oImagLog.src = "img/personal/personal-big.png";
    }
    oInfoNickname.innerHTML = window.localStorage.getItem("nickname");
    oInfoSignature.innerHTML = window.localStorage.getItem("token");
    var sexnumber = window.localStorage.getItem("sex")*1;
    console.log(sexnumber , typeof sexnumber)
    if (!sexnumber) {
        console.log(1);
        oMan.checked = "checked";
    } else {
        oWoman.checked = "checked";
    }
})();
/*--左边区块 开始--*/
//个性签名
(function () {
    var oSignature = document.querySelector("#personal .per-left .per-l-info input.per-info-signature"),
        oSignatureP = document.querySelector("#personal .per-left .per-l-info p.per-info-signature"),
        signaturePtext = oSignatureP.innerHTML;

    oSignatureP.onclick = function (ev) {
        var ev = ev || window.event;
        ev.stopPropagation() || (ev.cancelBubble = true);
        this.style.display = "none";
        oSignature.style.display = "block";
    };
    oSignature.onclick = function (ev) {
        ev.stopPropagation() || (ev.cancelBubble = true);
    }
    document.onclick = function () {
        if (oSignature.value) {
            oSignatureP.innerHTML = oSignature.value;
        } else {
            oSignatureP.innerHTML = signaturePtext;
        }
        oSignature.style.display = "none";
        oSignatureP.style.display = "block";
    };
})();
//左边，点击列表 右边对于区块显示 开始
(function () {
    var aLeftli = document.querySelectorAll("#personal .per-left .per-l-nav ul li"),
        aRightitem = document.querySelectorAll("#personal .per-right div.item"),
        length = aLeftli.length,
        index = 0;

    for (var i = 0;i < length;i++) {
        (function (i) {
            aLeftli[i].onclick = function () {
                aLeftli[index].classList.remove("on");
                aRightitem[index].classList.remove("active");
                index = i;
                aLeftli[index].classList.add("on");
                aRightitem[index].classList.add("active");
            }
        })(i);
    }
})();
/*--右边部分 开始--*/
//我的信息
(function () {
    var oInfoSubmit = document.querySelector("#per-r-info-submit");

    oInfoSubmit.onclick = function (ev) {
        ev.cancelBubble = true || ev.stopPropagation();
        return false;
    }
})();

//修改密码
(function () {
    var oTel = document.getElementById("tel"),
        oNewPwd = document.getElementById("newpwd"),
        oNewPwd2 = document.getElementById("newpwd-again"),
        oCheck = document.querySelector("#personal .per-right .per-r-revisepwd .check #check"),
        oreviseBtn = document.querySelector("#personal .per-right .per-r-revisepwd .check .revise-btn"),
        oreviseSubmit = document.getElementById("per-r-revise-submit");

    oreviseSubmit.onclick = function () {
        var mobile = oTel.value,
            pwd = oNewPwd.value,
            pwd2 = oNewPwd2.value,
            smsCode = oCheck.value;
        if (mobile&&pwd&&pwd2&&smsCode) {
            var xhr = new XMLHttpRequest();
            xhr.open("post" , "http://yjhapi.agxx.club/iweb/Forgetpwd/reset" , true);
            xhr.setRequestHeader("content-Type" , "application/x-www-form-urlencoded");
            xhr.send("mobile="+mobile+"&pwd="+pwd+"&pwd2="+pwd2+"&sms_code="+smsCode);
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log(this.responseText)
                }
            }

        }
    };
})();
