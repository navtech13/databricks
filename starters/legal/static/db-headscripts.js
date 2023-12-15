(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugBody = void 0;
// eslint-disable-next-line import/prefer-default-export
var debugBody = "\n    var is_DB_Debug = false;\n    var db_debug = function(){}\n\n    function db_marketopages_getCookie(name) {\n        var cookie_match = document.cookie.match('(^|;)\\\\s*' + name + '\\\\s*=\\\\s*([^;]+)');\n        if(cookie_match) {\n            return cookie_match.pop();\n        }\n        return '';\n    }\n\n    var cookie_db_debug = db_marketopages_getCookie('wp-db_debug');\n    if(cookie_db_debug != '') {\n        is_DB_Debug = true;\n    }\n\n    if (is_DB_Debug) {\n      db_debug = console.log.bind(window.console)\n    }\n";
exports.debugBody = debugBody;

},{}],3:[function(require,module,exports){
"use strict";

var _onetrust = require("./onetrust");
var _debug = require("./debug");
var debugBodyScript = document.createElement("script");
debugBodyScript.innerHTML = _debug.debugBody;
document.head.appendChild(debugBodyScript);

},{"./debug":2,"./onetrust":4}],4:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onetrustBody = void 0;
// eslint-disable-next-line import/prefer-default-export
var onetrustBody = "\nfunction OptanonWrapper() {\n    db_debug(\"OptanonWrapper():DB:v1.3\")\n\n    let otInitialGroupsStr = null;\n    let otActiveGroupsStr = null;\n    // Get initial OnetrustActiveGroups ids\n    if(typeof OptanonWrapperCount == \"undefined\"){\n      db_debug(\"otInitialGroups()\", OnetrustActiveGroups);\n      OptanonWrapperCount = '';\n      otInitialGroupsStr = OnetrustActiveGroups\n    }\n    otActiveGroupsStr =  OnetrustActiveGroups;\n    const rudderstackKey = (typeof window !== 'undefined' && window.rudderstackKey) || \"".concat(process.env.GATSBY_RUDDERSTACK_API_KEY, "\"\n    // Load rudderstack\n    rudderanalytics.load(rudderstackKey,\"https://ue.databricks.com\", {\n        cookieConsentManager: {\n            oneTrust: {\n                enabled: true\n            }\n        }\n    });\n\n    //Delete cookies\n    otRemoveOptOutCookies(otActiveGroupsStr);\n\n    function otRemoveOptOutCookies(otActiveGroupsStr)\n    {\n        db_debug(\"otRemoveOptOutCookies()\");\n\n        var otDomainGroups = JSON.parse(JSON.stringify(Optanon.GetDomainData().Groups));\n        var dbDomainGroups = [\"C0001\",\"C0002\",\"C0003\",\"C0004\"];\n        var erasedCookie = false;\n\n        dbDomainGroups.forEach((domainGroup) => {\n            // check if group is inactive\n            if (!otActiveGroupsStr.includes(domainGroup)) {\n                // if inactive, time to delete cookies for that group\n                for(var i=0; i < otDomainGroups.length; i++){\n                    // small array so brute force search\n                    if(otDomainGroups[i]['CustomGroupId'] == domainGroup){\n                        for(var j=0; j < otDomainGroups[i]['Cookies'].length; j++){\n                            var regexp = new RegExp(\"^(.*;)?\\\\s*\" + otDomainGroups[i]['Cookies'][j]['Name'] + \"\\\\s*=\\\\s*[^;]+(.*)?$\")\n                            if (document.cookie.match(regexp)) {\n                                db_debug(\"Found cookie to erase: \" + otDomainGroups[i]['Cookies'][j]['Name'])\n                                erasedCookie = true;\n                                eraseCookie(otDomainGroups[i]['Cookies'][j]['Name']);\n                            }\n                        }\n                    }\n                }\n            }\n        });\n    }\n\n      //Delete cookie\n      function eraseCookie(name) {\n          db_debug(\"eraseCookie(\" + name + \")\")\n\n          // Delete DB domain cookies just to be sure\n          document.cookie = name + \"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Domain=.databricks.com\";\n          document.cookie = name + \"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Domain=.databricksweb.com\";\n\n          //Delete root path cookies\n          domainName = window.location.hostname;\n          document.cookie = name+'=; Max-Age=-99999999; Path=/;Domain='+ domainName;\n          document.cookie = name+'=; Max-Age=-99999999; Path=/;';\n\n          //Delete LSO incase LSO being used, cna be commented out.\n          localStorage.removeItem(name);\n\n          //Check for the current path of the page\n          pathArray = window.location.pathname.split('/');\n          //Loop through path hierarchy and delete potential cookies at each path.\n          for (var i=0; i < pathArray.length; i++){\n              if (pathArray[i]){\n                  //Build the path string from the Path Array e.g /site/login\n                  var currentPath = pathArray.slice(0,i+1).join('/');\n                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + ';Domain='+ domainName;\n                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + ';';\n                  //Maybe path has a trailing slash!\n                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + '/;Domain='+ domainName;\n                  document.cookie = name+'=; Max-Age=-99999999; Path=' + currentPath + '/;';\n              }\n          }\n\n          var regexp = new RegExp(\"^(.*;)?\\\\s*\" + name + \"\\\\s*=\\\\s*[^;]+(.*)?$\")\n          if (document.cookie.match(regexp)) {\n              db_debug(\"Error: Cookie not deleted (\" + name + \")\")\n          }\n          else {\n              // not needed extra debug info\n              // db_debug(\"Cookie successfully deleted (\" + name + \")\")\n          }\n      }\n  }\n");
exports.onetrustBody = onetrustBody;

}).call(this)}).call(this,require('_process'))
},{"_process":1}]},{},[3]);
