// Analytics
(function () {
    var href = window.location.href.toLowerCase();
    var enabled =
            href.indexOf("localhost") == -1 &&
            href.indexOf("l.jimu.com") == -1 &&
            href.indexOf("jimubox.com") == -1 &&
            href.indexOf("qa-") == -1 &&
            href.indexOf("gray") == -1 &&
            href.indexOf("test") == -1 &&
            href.indexOf("wf.") == -1 &&
            href.indexOf("jmbx") == -1;

    if (enabled) {
        // 积木统计类,兼容各家统计的JS统计API,目前仅支持百度
        window.JMAnalytics = {
            trackEvent: function(category, action, label, value) {
                // http://tongji.baidu.com/open/api/more?p=guide_trackEvent
                _hmt.push(['_trackEvent', category || '', action || '', label || '', value || '']);
                if ($ && $.ajax) {
                    var url = "";
                    url += "//campaigns.jimu.com/box/category/" + (category || "category");
                    url += "/action/" + (action || "action");
                    $.ajax({
                        url: url,
                        type: "GET"
                    });
                }
            }
        };

        // 异步加载统计代码
        var load_analysis = function () {
            var default_options = {
                type: 'text/javascript',
                async: 'true',
                protocol: siteProtocol
            };
            return {
                init: function(url, options) {
                    var options = options || {};
                    var ele = document.createElement('script');
                    ele.type = options.type || default_options.type;
                    (options.async === false ? ele.async = false : ele.async = true);
                    ele.src = (options.protocol || default_options.protocol) + url;
                    document.body.appendChild(ele);
                }
            }
        };
        var async_analysis = function() {
            var any = load_analysis();
            any.init('dn-growing.qbox.me/vds.js');
            any.init('t.agrantsem.com/js/agt.js');
        };
        if (window.addEventListener) {
            window.addEventListener('load', async_analysis, false);
        } else if (window.attachEvent) {
            window.attachEvent('onload', async_analysis);
        } else {
            window.onload = async_analysis;
        }

        // Baidu Analytics
        var siteProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        var s = document.getElementsByTagName("body")[0];
        // for market
        var hm2 = document.createElement("script");
        hm2.src = siteProtocol + "hm.baidu.com/hm.js?b52e68eb56d57aeecdafc769040770d4";
        s.appendChild(hm2);
        // for pm
        var hm1 = document.createElement("script");
        hm1.src = siteProtocol + "hm.baidu.com/hm.js?1dc096a18210fb74c17c2feb1eb75e9c";
        s.appendChild(hm1);

        var console = window.console || {"log":function(){}};
        if (console && console.log) {
            console.log("加入积木，成为一名耐撕的前端工程师。");
            console.log("请将简历发送至 %c hr#jimu.com (邮件标题请以“姓名-应聘前端工程师-来自console”命名)","color:red");
        }
    } else {
        window.JMAnalytics = {
            trackEvent: function() {
                // do nothing in case error occur on console
            }
        }
    }
})();