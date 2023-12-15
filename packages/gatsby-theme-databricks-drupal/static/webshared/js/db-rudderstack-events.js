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
/*! js-cookie v3.0.5 | MIT */
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (function () {
    var current = global.Cookies;
    var exports = global.Cookies = factory();
    exports.noConflict = function () { global.Cookies = current; return exports; };
  })());
})(this, (function () { 'use strict';

  /* eslint-disable no-var */
  function assign (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target
  }
  /* eslint-enable no-var */

  /* eslint-disable no-var */
  var defaultConverter = {
    read: function (value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    },
    write: function (value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      )
    }
  };
  /* eslint-enable no-var */

  /* eslint-disable no-var */

  function init (converter, defaultAttributes) {
    function set (name, value, attributes) {
      if (typeof document === 'undefined') {
        return
      }

      attributes = assign({}, defaultAttributes, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }

      name = encodeURIComponent(name)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape);

      var stringifiedAttributes = '';
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue
        }

        // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...
        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return (document.cookie =
        name + '=' + converter.write(value, name) + stringifiedAttributes)
    }

    function get (name) {
      if (typeof document === 'undefined' || (arguments.length && !name)) {
        return
      }

      // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var value = parts.slice(1).join('=');

        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);

          if (name === found) {
            break
          }
        } catch (e) {}
      }

      return name ? jar[name] : jar
    }

    return Object.create(
      {
        set,
        get,
        remove: function (name, attributes) {
          set(
            name,
            '',
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function (attributes) {
          return init(this.converter, assign({}, this.attributes, attributes))
        },
        withConverter: function (converter) {
          return init(assign({}, this.converter, converter), this.attributes)
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    )
  }

  var api = init(defaultConverter, { path: '/' });
  /* eslint-enable no-var */

  return api;

}));

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendRudderStackPageView = exports.sendRudderStackIdentify = exports.sendQualifiedToRudderStack = exports.sendMarketoToRudderStack = exports.sendIdentifyEvent = exports.send6senseToRudderStack = exports.loadRudderStack = exports.loadOneTrust = exports.handleMarketoEvents = exports["default"] = exports.checkCookieConsent = exports.appendOneTrustCookieData = exports.append6SenseData = void 0;
var _jsCookie = _interopRequireDefault(require("js-cookie"));
var _getQueryParam = _interopRequireDefault(require("./getQueryParam"));
var _getPageTitle = _interopRequireDefault(require("./getPageTitle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var append6SenseData = function append6SenseData(originalData) {
  var includeTracking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var data = _objectSpread({}, originalData);
  if (typeof localStorage !== "undefined" && typeof localStorage._6senseCompanyDetails !== "undefined") {
    try {
      var _6senseData = JSON.parse(window.localStorage.getItem("_6senseCompanyDetails"));
      if (includeTracking) {
        data.company_annual_revenue_6sense = _6senseData.company.annual_revenue;
        data.company_name_6sense = _6senseData.company.name;
        data.company_state_6sense = _6senseData.company.state;
        data.company_country_6sense = _6senseData.company.country;
        data.company_domain_6sense = _6senseData.company.domain;
        data.company_employee_count_6sense = _6senseData.company.employee_count;
        data.company_employee_range_6sense = _6senseData.company.employee_range;
        data.company_industry_6sense = _6senseData.company.industry;
        data.company_naics_6sense = _6senseData.company.naics;
        data.company_naics_description_6sense = _6senseData.company.naics_description;
        data.company_country_iso_code_6sense = _6senseData.company.country_iso_code;
        data.company_region_6sense = _6senseData.company.region;
        data.company_revenue_range_6sense = _6senseData.company.revenue_range;
        data.scoreObject_6sense = _6senseData.scores;
        data.segmentsObject_6sense = _6senseData.segments;
        data.company_sic_6sense = _6senseData.company.sic;
        data.company_sic_description_6sense = _6senseData.company.sic_description;
      }
      data.segments_ids_6sense = _6senseData.segments.ids.join("|");
      data.confidence_6sense = _6senseData.confidence;
    } catch (_unused) {
      // JSON Parse failed, don't send any event
    }
  }
  return data;
};
exports.append6SenseData = append6SenseData;
var appendOneTrustCookieData = function appendOneTrustCookieData(originalData) {
  var includeTracking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var data = _objectSpread({}, originalData);
  var oneTrustCookie = _jsCookie["default"].get("OptanonConsent");
  var interactionCount = (0, _getQueryParam["default"])("interactionCount", oneTrustCookie);
  var consentId = (0, _getQueryParam["default"])("consentId", oneTrustCookie);
  var groups = (0, _getQueryParam["default"])("groups", oneTrustCookie);
  var awaitingReconsent = (0, _getQueryParam["default"])("AwaitingReconsent", oneTrustCookie);
  if (includeTracking) {
    data.ot_interactionCount = interactionCount;
    data.ot_consentId = consentId;
    data.ot_awaitingReconsent = awaitingReconsent;
  }
  data.ot_groups = groups;
  return data;
};
exports.appendOneTrustCookieData = appendOneTrustCookieData;
var sendRudderStackPageView = function sendRudderStackPageView(pageTitle) {
  if (typeof rudderanalytics !== "undefined") {
    var data = appendOneTrustCookieData({});
    if (typeof _jsCookie["default"].get("_mkto_trk") !== "undefined") {
      data.mkto_trk = _jsCookie["default"].get("_mkto_trk");
    }
    // eslint-disable-next-line no-undef
    rudderanalytics.page(pageTitle, data);
  }
};
exports.sendRudderStackPageView = sendRudderStackPageView;
var checkCookieConsent = function checkCookieConsent(groupId) {
  // checks if consent given for category, ex: C0002
  var consent = false;
  var oneTrustCookie = _jsCookie["default"].get("OptanonConsent");
  var groups = (0, _getQueryParam["default"])("groups", oneTrustCookie);
  var arrGroups = groups.split(",");
  arrGroups.forEach(function (el) {
    if (el.includes("".concat(groupId, ":"))) {
      var arrGroup = el.split(":");
      if (arrGroup.length === 2 && arrGroup[1] === "1") {
        consent = true;
      }
    }
  });
  return consent;
};
exports.checkCookieConsent = checkCookieConsent;
var sendIdentifyEvent = function sendIdentifyEvent(traits) {
  if (typeof rudderanalytics !== "undefined") {
    rudderanalytics.identify("", traits);
  }
};
exports.sendIdentifyEvent = sendIdentifyEvent;
var sendMarketoToRudderStack = function sendMarketoToRudderStack() {
  var marketoTracking = _jsCookie["default"].get("_mkto_trk");
  if (window.localStorage.getItem("_localmkto_trk") !== marketoTracking && typeof marketoTracking !== "undefined") {
    var data = {
      mkto_trk: marketoTracking
    };
    sendIdentifyEvent(data);
    window.localStorage.setItem("_localmkto_trk", marketoTracking);
  }
};
exports.sendMarketoToRudderStack = sendMarketoToRudderStack;
var eventTracking = function eventTracking(eventData) {
  var data = appendOneTrustCookieData(eventData);
  // Add munchkin cookie to GTM and rudderstack
  if (typeof _jsCookie["default"].get("_mkto_trk") !== "undefined") {
    data.mkto_trk = _jsCookie["default"].get("_mkto_trk");
  }
  if (typeof dataLayer !== "undefined") {
    dataLayer = dataLayer || [];
    // eslint-disable-next-line no-undef
    dataLayer.push(data);
  }
  if (typeof rudderanalytics !== "undefined") {
    var _data$properties, _data$context;
    var eventName = data.event;
    if (data.hasOwnProperty("event")) {
      delete data.event;
    }
    // remove extra props added by data layer from rudderstack
    if (data.hasOwnProperty("gtm.uniqueEventId")) {
      delete data["gtm.uniqueEventId"];
    }
    if (data.hasOwnProperty("track.properties")) {
      delete data["track.properties"];
    }
    if (data !== null && data !== void 0 && (_data$properties = data.properties) !== null && _data$properties !== void 0 && _data$properties["gtm.uniqueEventId"]) {
      delete data.properties["gtm.uniqueEventId"];
    }
    if (data !== null && data !== void 0 && (_data$context = data.context) !== null && _data$context !== void 0 && (_data$context = _data$context.traits) !== null && _data$context !== void 0 && _data$context.event) {
      // event is a reserved word within rudderstack traits
      delete data.context.traits.event;
    }
    // eslint-disable-next-line no-undef
    rudderanalytics.track(eventName, data);
  }
};
var sendQualifiedToRudderStack = function sendQualifiedToRudderStack() {
  window.qualified("handleEvents", function (name, data) {
    var _data$bot, _data$bot2, _data$sender;
    var eventData = {
      event: "Qualified Chat Custom Action",
      qualifiedAction: name,
      qualifiedBotId: data === null || data === void 0 || (_data$bot = data.bot) === null || _data$bot === void 0 ? void 0 : _data$bot.id,
      qualifiedBotName: data === null || data === void 0 || (_data$bot2 = data.bot) === null || _data$bot2 === void 0 ? void 0 : _data$bot2.name,
      qualifiedSenderType: data === null || data === void 0 || (_data$sender = data.sender) === null || _data$sender === void 0 ? void 0 : _data$sender.type
    };
    eventTracking(eventData);
  });
};
exports.sendQualifiedToRudderStack = sendQualifiedToRudderStack;
var send6senseToRudderStack = function send6senseToRudderStack() {
  var eventName = {
    event: "company_details_updated_6sense"
  };
  var eventDataTracking = append6SenseData(eventName);

  // the append functions were originally referencing and not making a copy
  // of the object, which caused oneTrust traits being added on the eventTracking function
  // from below. A call to the appendOneTrust function needs to be added here, since
  // that function call won't add those traits anymore
  var identify6sense = append6SenseData(eventName, false);
  var eventDataIdentify = appendOneTrustCookieData(identify6sense, false);

  // check if the local rl_trait cookie has any deprecated fields. If it does,
  // delete the cookie and trigger the identify event
  var hasDeprecatedFields = false;
  if (typeof rudderanalytics !== "undefined") {
    var traits = rudderanalytics.getUserTraits();
    hasDeprecatedFields = (traits === null || traits === void 0 ? void 0 : traits.company_name_6sense) || (traits === null || traits === void 0 ? void 0 : traits.ot_consentId);
  }

  // rudderstack seems to cache the initial values present in the cookie until
  // the next page load. Even if the cookie is deleted, the identify event will
  // still have the old fields. For this, we will remove the cookie and clear the
  // _local6senseCompanyDetails local storage to trigger the identify event
  // on the next page load
  if (hasDeprecatedFields) {
    _jsCookie["default"].remove("rl_trait", {
      path: "/",
      domain: ".databricks.com"
    });
    window.localStorage.removeItem("_local6senseCompanyDetails");
    return;
  }
  if (window.localStorage.getItem("_6senseCompanyDetails") !== window.localStorage.getItem("_local6senseCompanyDetails")) {
    eventTracking(eventDataTracking);
    sendIdentifyEvent(eventDataIdentify);
    window.localStorage.setItem("_local6senseCompanyDetails", window.localStorage.getItem("_6senseCompanyDetails"));
  }
};
exports.send6senseToRudderStack = send6senseToRudderStack;
var loadOneTrust = function loadOneTrust() {
  if (typeof OneTrust !== "undefined") {
    // eslint-disable-next-line no-undef
    OneTrust.OnConsentChanged(function (e) {
      var eventData = {
        event: "Onetrust Consent Updated"
      };
      eventTracking(eventData);
      var data = appendOneTrustCookieData({}, true);
      var interactionCount = parseInt(data.ot_interactionCount, 10);
      if (!Number.isNaN(interactionCount)) {
        data.ot_interactionCount = (interactionCount + 1).toString();
      }
      sendIdentifyEvent(data);
    });
  } else {
    setTimeout(loadOneTrust, 300);
  }
};
exports.loadOneTrust = loadOneTrust;
var loadRudderStack = function loadRudderStack(seo) {
  if (typeof rudderanalytics !== "undefined") {
    sendRudderStackPageView((0, _getPageTitle["default"])(seo));
    document.addEventListener("6si_company_details_loaded", function () {
      send6senseToRudderStack();
    }, {
      once: true
    });
    if (typeof qualified !== "undefined") {
      sendQualifiedToRudderStack();
    }
    if (typeof Munchkin !== "undefined") {
      sendMarketoToRudderStack();
    }
  } else {
    setTimeout(loadRudderStack, 300);
  }
};
exports.loadRudderStack = loadRudderStack;
var handleMarketoEvents = function handleMarketoEvents() {
  if (typeof window.MktoForms2 !== "undefined") {
    // const formId = window.MktoForms2.getId()
    window.MktoForms2.whenReady(function (form) {
      var formInstance = window.MktoForms2.allForms()[0];
      var eventData = {
        event: "Form Loaded",
        formId: formInstance.getId(),
        formValueCountry: form.vals().Country,
        formSource: "Marketo",
        formRegion: "EN",
        formFailReason: "",
        formFailCode: ""
      };
      eventTracking(eventData);
      formInstance.onValidate(function () {
        var timer = setInterval(function () {
          var currentError = document.getElementsByClassName("mktoErrorMsg")[0];
          if (document.getElementsByClassName("mktoErrorMsg").length > 0) {
            var _document$getElementB, _currentError$id;
            var validateEventData = {
              event: "Form Submit Failed",
              formId: formInstance.getId(),
              formSource: "Marketo",
              formValueCountry: (_document$getElementB = document.getElementById("Country")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value,
              formRegion: "EN",
              formFailReason: "".concat(currentError === null || currentError === void 0 || (_currentError$id = currentError.id) === null || _currentError$id === void 0 ? void 0 : _currentError$id.replace("ValidMsg", ""), " is invalid"),
              formFailCode: "400"
            };
            clearInterval(timer);
            eventTracking(validateEventData);
          }
        }, 200);
      });
      formInstance.onSuccess(function (values) {
        var successEventData = {
          event: "Form Submit Success",
          formId: formInstance.getId(),
          formValueCountry: values.Country,
          formSource: "Marketo",
          formRegion: "EN",
          formFailReason: "",
          formFailCode: ""
        };
        eventTracking(successEventData);
      });
    });
  }
};
exports.handleMarketoEvents = handleMarketoEvents;
var sendRudderStackIdentify = function sendRudderStackIdentify(mktoLeadId) {
  if (typeof rudderanalytics === "undefined") {
    return setTimeout(function () {
      return sendRudderStackIdentify(mktoLeadId);
    }, 1500);
  }

  // eslint-disable-next-line no-undef
  rudderanalytics.identify(mktoLeadId, {
    mkto_lead_id: mktoLeadId
  });
};
exports.sendRudderStackIdentify = sendRudderStackIdentify;
var _default = eventTracking;
exports["default"] = _default;

},{"./getPageTitle":4,"./getQueryParam":5,"js-cookie":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var getPageTitle = function getPageTitle(seo) {
  var title = "";
  if (_typeof(seo) === "object") {
    var _seo$metaTags;
    var metaTitle = seo === null || seo === void 0 || (_seo$metaTags = seo.metaTags) === null || _seo$metaTags === void 0 ? void 0 : _seo$metaTags.filter(function (meta) {
      return meta.key === "title";
    }).shift();
    if (metaTitle && metaTitle.hasOwnProperty("value")) {
      title = metaTitle.value;
    }
  }
  return title;
};
var _default = getPageTitle;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var getQueryParam = function getQueryParam(queryName, queryPath) {
  queryName = queryName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); // eslint-disable-line
  var regex = new RegExp("[\\?&]".concat(queryName, "=([^&#]*)"), "i");
  var results = regex.exec(queryPath);
  if (!results) {
    return "";
  }
  var decodedValue = results[1].replace(/\+/g, " ");
  try {
    var decodedQueryParam = decodeURIComponent(decodedValue);
    return decodedQueryParam;
  } catch (error) {
    return "";
  }
};
var _default = getQueryParam;
exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugBody = void 0;
// eslint-disable-next-line import/prefer-default-export
var debugBody = "\n    var is_DB_Debug = false;\n    var db_debug = function(){}\n\n    function db_marketopages_getCookie(name) {\n        var cookie_match = document.cookie.match('(^|;)\\\\s*' + name + '\\\\s*=\\\\s*([^;]+)');\n        if(cookie_match) {\n            return cookie_match.pop();\n        }\n        return '';\n    }\n\n    var cookie_db_debug = db_marketopages_getCookie('wp-db_debug');\n    if(cookie_db_debug != '') {\n        is_DB_Debug = true;\n    }\n\n    if (is_DB_Debug) {\n      db_debug = console.log.bind(window.console)\n    }\n";
exports.debugBody = debugBody;

},{}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _onetrust = require("./onetrust");
var _debug = require("./debug");
var _rudderstack = require("./rudderstack");
var _eventTracking = _interopRequireWildcard(require("../helpers/eventTracking"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var debugBodyScript = document.createElement("script");
debugBodyScript.innerHTML = _debug.debugBody;
debugBodyScript.async = true;
document.head.appendChild(debugBodyScript);
var onetrustScript = document.createElement("script");
onetrustScript.innerHTML = _onetrust.onetrustBody;
onetrustScript.async = true;
document.head.appendChild(onetrustScript);
var rudderstackScriptBody = document.createElement("script");
rudderstackScriptBody.innerHTML = _rudderstack.rudderstackScript;
rudderstackScriptBody.async = true;
document.head.appendChild(rudderstackScriptBody);
(0, _eventTracking.loadOneTrust)();
(0, _eventTracking.loadRudderStack)();
(0, _eventTracking.handleMarketoEvents)();
document.addEventListener("click", function (e) {
  var origin = e.target.closest("a");
  if (origin) {
    var elementText = origin.hasAttribute("text") ? origin.text : origin.innerText;
    var elementHref = origin.hasAttribute("href") ? origin.href.replaceAll("https://", "").replaceAll("http://", "") : undefined;
    var eventData = {
      event: "Link Clicked",
      elementType: "a",
      elementText: elementText,
      elementHref: elementHref
    };
    (0, _eventTracking["default"])(eventData);
  }
});

},{"../helpers/eventTracking":3,"./debug":6,"./onetrust":8,"./rudderstack":9}],8:[function(require,module,exports){
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
},{"_process":1}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rudderstackScript = void 0;
var rudderstackScript = "!function(){var e=window.rudderanalytics=window.rudderanalytics||[];e.methods=[\"load\",\"page\",\"track\",\"identify\",\"alias\",\"group\",\"ready\",\"reset\",\"getAnonymousId\",\"setAnonymousId\",\"getUserId\",\"getUserTraits\",\"getGroupId\",\"getGroupTraits\",\"startSession\",\"endSession\"],e.factory=function(t){return function(){e.push([t].concat(Array.prototype.slice.call(arguments)))}};for(var t=0;t<e.methods.length;t++){var r=e.methods[t];e[r]=e.factory(r)}e.loadJS=function(e,t){var r=document.createElement(\"script\");r.type=\"text/javascript\",r.async=!0,r.src=\"https://notebooks.databricks.com/v1.1/rudder-analytics.min.js\";var a=document.getElementsByTagName(\"script\")[0];a.parentNode.insertBefore(r,a)},e.loadJS()}();";
exports.rudderstackScript = rudderstackScript;

},{}]},{},[3,7]);
