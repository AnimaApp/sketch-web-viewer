setTimeout(function(){
	animaShowHomepageBannerIfNotHidden();
}, 2000);

var animaHomepageBannerHTML = '<div id="fixed-banner" class="fixed-banner" style="opacity: 0; background: rgba(255, 255, 255, 0.0); bottom: 10px; height: 314px; width: 600px; position: fixed; margin: 0 0 0 0; left: 10px;"> <a href="https://www.animaapp.com/joinfree?utm_medium=web&amp;utm_source=github.io&amp;utm_campaign=banner2&amp;page=1" style="text-decoration: none;" target="_blank"> <img class="banner-content" src="./static/img/fb-banner4.png" style=" background: rgba(255, 255, 255, 0.0); top: 0px; height: 314px; width: 600px; position: absolute; margin: 0 0 0 0; left: 0px;"/> </a> <a href="javascript:animaHideBanner();" style="text-decoration: none;" target="_blank"> <img class="close" src="https://anima-uploads.s3.amazonaws.com/579e85495f622300092a7d24/593679e513a7293551dfced9/593926250e080a000c6f8910/img/websitebannerjune mobileclose@2x.png" style=" background: rgba(255, 255, 255, 0.0); top: 16px; height: 18px; width: 18px; position: absolute; margin: 0 0 0 0; left: 566px;"/> </a> </div>';

var animaHomepageBannerMobileHTML = ' <div class="fixed-banner" id="fixed-banner" style="opacity: 0; background: rgba(255, 255, 255, 0.0); left: 10px; position: fixed; height: 258px; margin: 0 0 0 0; width: 328px; bottom: 10px;"> <a href="https://www.animaapp.com/joinfree?utm_medium=web&amp;utm_source=github.io&amp;campaign=banner2&amp;page=1" style="text-decoration: none;" target="_blank"> <img class="banner-content" src="./static/img/fb-banner4.png" style=" background: rgba(255, 255, 255, 0.0); top: 0px; left: 0px; position: absolute; height: 258px; margin: 0 0 0 0; width: 328px;"/> </a> <a href="javascript:animaHideBanner();" style="text-decoration: none;" target="_blank"> <img class="close" src="https://anima-uploads.s3.amazonaws.com/579e85495f622300092a7d24/593679e513a7293551dfced9/593926250e080a000c6f8910/img/websitebannerjune mobileclose@2x.png" style=" background: rgba(255, 255, 255, 0.0); right: 13px; top: 14px; position: absolute; height: 18px; margin: 0 0 0 0; width: 18px;"/> </a> </div>';
var animaHomepageBannerID = 'banner2';

function animaShowHomepageBannerIfNotHidden() {
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var wasHidden = getCookie(animaHomepageBannerID);
    if (wasHidden != "") {
        return;
    }
    if (document.getElementById("fixed-banner") != undefined) {
        return;
    }
    if (viewportWidth < 768) {
        document.body.innerHTML = document.body.innerHTML + "\n" + animaHomepageBannerMobileHTML;
    }
    else {
        document.body.innerHTML = document.body.innerHTML + "\n" + animaHomepageBannerHTML;
    }
    animaFade(document.getElementById("fixed-banner"), true);
}

function animaHideBanner() {
    setCookie(animaHomepageBannerID, "True", 1);
    animaFade(document.getElementById("fixed-banner"), false);
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function animaFade(element, show) {
    var op = 0.1;
    if (!show) {
        op = 1;
    }
    var timer = setInterval(function() {
        if ((op >= 1 && show) || (op <= 0 && !show)) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        if (show) {
            op += 0.05;
        } else {
            op -= 0.05;
        }
    }, 10);
}