
  // Modular way
  module("sdk.js", ["sdk-track.js", "sdk-beacon.js"], function(track, beacon) {
    // Some operation
  });

  (function() {
    var modules = {};

    function module(name, imports, mod) {
      console.log("Found Module " + name);
      modules[name] = {name, imports, mod};

      for(let imp in imports) {
        loadModule([imp]);
      }

      loadedModule(name);
    }

    window.module = module;

    function loadModule() {
      // load this module
    }

    function loadedModule() {
      // module already loaded
    }
  })();

// Cookie 
var checkCookieWritable = function() {
  try {
    document.cookie = "test=1" + (domain ? "domain=" + domain : "");
    var ret = document.cookie.indexOf("test") > -1;
    return ret;
  } catch(e) {
    return false;
  }
}

var cookie = {
  write: function(name, value, days, domain, path) {
    var date = new Date();
    days = days || 730;
    path = path || "/";
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
    var cookieValue = name + "=" + value + expires + "; path=" + path;
    if(domain) {
      cookieValue += "; domain=" + domain;
    }

    document.cookie = cookieValue;
  },
  read: function(name) {
    var allCookie = "" + document.cookie;
    var index = allCookie.indexOf(name);
    if(name === undefined || name === "" || index === -1) return "";
    var ind1 = allCookie.indexOf(";", index);
    if(ind1 === -1) ind1 = allCookie.length;
    return unescape(allCookie.substr(index + name.length + 1, ind1));
  },
  remove: function() {
    if(this.read(name)) {
      this.write(name, "", -1, "/");
    }
  }
}

// Local Storage
var testCanLocalStorage = function() {
  var mod = "modernizr";
  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch(e) {
    return false;
  }
}

// Session Storage
var checkCanSessionStorage = function() {
  var mod = "modernizr";
  try {
    sessionStorage.setItem(mod, mod);
    sessionStorage.rmoveItem(mod);
    return true;
  } catch(e) {
    return false;
  }
}

// Events
// Document ready
// handle IE 8+
function ready(fn) {
  if(document.readyState !== "loading") {
    fn();
  } else if(window.addEventListener) {
    window.addEventListener("DOMContentLoaded", fn);
  } else {
    window.attachEvent("onreadystatechange", function() {
      if(document.readyState !== "loading") {
        fn();
      }
    });
  }

}

// Messaging
parent.postMessage("Hello");

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"

eventer(messageEvent, function(e) {
  console.log("Parent recieved message: " + e.data);
  
}, false);

window.addEventListener('orientationchange', fn);

var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;

document.addEventListener("touchstart", function(e) { e.preventDefault(); });

document.body.addEventListener("touchstart", function(e) { e.preventDefault(); });

document.addEventListener("touchmove", function(e) { e.preventDefault(); });

// Requests
var img = new Image();
img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRa7q8XhBB5inHO3kZa7CMM3NLEnAiVmgxTChTdxorZeVPQRRPu";
img.onload = successCallBack;
img.onerror = errorCallback;

var form = document.createElement("form");
var input = document.createElement("input");

form.style.display = "none";
form.setAttribute("method", "post");
form.setAttribute("action", "someAction`");

input.name = "username";
input.value = "attacker";
form.appendChild(input);
document.getElementsByTagName("body")[0].appendChild(form);

form.submit();

function requestWithoutAjax(url, params, method) {
  params = params || {};
  method = method || "post";
  var removeIframe = function(iframe) {
    iframe.parentElement.removeChild(iframe);
  }

  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.onload = function() {
    var iframeDoc = this.contentWindow.document;
    var form = iframeDoc.createElement("form");
    form.method = method;
    form.action = url;
    iframeDoc.body.appendChild(form);
    
    for(var name in params) {
      var input = iframeDoc.createElement("input");
      input.type = 'hidden';
      input.name = name;
      input.value = params[name];
      form.appendChild(input);
    }

    form.submit();

    setTimeout(() => {
      removeIframe(iframe);
    }, 500);
  }

  document.body.appendChild(iframe);
}


var iframe = document.createElement("iframe");
var body = document.getElementsByTagName("body")[0];

iframe.style.display = "none";
iframe.src = "some-url";
iframe.onreadystatechange = () => {
  if(iframe.readyState !== "complete") {
    return; 
  }
}
iframe.onload = loadClassback;

body.appendChild(iframe);

// Load script with CallBack
function loadScript(url, callBack) {
  var scr = document.createElement("script");
  scr.async = true;
  scr.src = url;

  var entry = document.getElementsByTagName("script")[0];
  entry.parantNode.insertBefore(script, entry);
  scr.onload = scr.onreadystatechange = function() {
    var rdyState = scr.readyState;

    if(!rdyState || /complete|loaded/.test(scr.readyState)) {
      callBack();

      scr.onload = null;
      scr.onreadystatechange = null;
    }
  }
}

// Once Function
function once(fn, context) {
  var result;
  return function() {
    if(fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  }
}

var canOnlyFireOnce = once(function() {
  console.log(123);
});

canOnlyFireOnce(); // Fired
canOnlyFireOnce(); // nothing

function isElementInViewport (el) {

  //special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}

var isVisible = function(b) {
    var a = window.getComputedStyle(b);
    return 0 === a.getPropertyValue("opacity") || "none" === a.getPropertyValue("display") || "hidden" === a.getPropertyValue("visibility") || 0 === parseInt(b.style.opacity, 10) || "none" === b.style.display || "hidden" === b.style.visibility ? false : true;
}

var element = document.getElementById('box');
isVisible(element); // => false or true

var getViewportSize = function() {
  try {
      var doc = top.document.documentElement
        , g = (e = top.document.body) && top.document.clientWidth && top.document.clientHeight;
  } catch (e) {
      var doc = document.documentElement
        , g = (e = document.body) && document.clientWidth && document.clientHeight;
  }
  var vp = [];
  doc && doc.clientWidth && doc.clientHeight && ("CSS1Compat" === document.compatMode || !g) ? vp = [doc.clientWidth, doc.clientHeight] : g && (vp = [doc.clientWidth, doc.clientHeight]);
  return vp;
}

// return as array [viewport_width, viewport_height]
