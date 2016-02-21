/**
 * 首页，不兼容IE
 */
define("js/index.js", function(require, exports, module) {

    var navs = id("nav").getElementsByTagName("li");
    var pages = id("content").getElementsByClassName("page");

    bindEvents();
    updateView();

    function updateView() {
        var pageId = location.hash.slice(1);
        id("page-" + pageId) || (pageId = "index");
        setActiveNav(pageId);
        setActivePage(pageId);
        window.scrollTo(0, 0);
    }

    function setActiveNav(pageId) {
        for (var i = 0, ii = navs.length; i < ii; i++) {
            var nav = navs[i];
            var link = nav.getElementsByTagName("a");
            var isActive = link[0].href.slice(-pageId.length) === pageId;
            nav.className = isActive ? "active" : "";
        }
    }

    function setActivePage(pageId) {
        for (var i = 0, ii = pages.length; i < ii; i++) {
            var page = pages[i];
            var isActive = page.id === "page-" + pageId;
            page.className = isActive ? "page page-active" : "page";
        };
    }

    function bindEvents() {
        if ("onhashchange" in window) {
            window.onhashchange = function() {
                updateView();
            }
        }
        return;
    }

    function id(elem) {
        return document.getElementById(elem);
    }

})
