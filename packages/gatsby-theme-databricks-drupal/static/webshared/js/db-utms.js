(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCookie = exports.prefillMarketoForm = exports.isOrganicSocial = exports.isOrganicSearch = exports.isDirect = exports.hasUTMsParams = exports.hasOnlyScId = exports.hasOnlyGclId = exports.getUTMs = exports.getSocialMedias = exports.getSearchEngines = exports.getExistingCookies = exports.getDomainName = exports.defineReferrer = exports["default"] = exports.clearMarketoToken = exports.clearCookies = exports.appendCookiesToLinks = exports._debugDBUTMs = void 0;
var _jsCookie = _interopRequireDefault(require("js-cookie"));
var _getQueryParam = _interopRequireDefault(require("../../../../gatsby-theme-databricks-drupal/src/helpers/getQueryParam"));
var _cloudflareTrace = _interopRequireDefault(require("../../../../gatsby-theme-databricks-drupal/src/helpers/cloudflareTrace"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /* eslint-disable import/no-extraneous-dependencies */
var COOKIE_NAME_UTM_SOURCE = "_db_utm_source__c";
var COOKIE_NAME_UTM_CAMPAIGN = "_db_utm_campaign__c";
var COOKIE_NAME_UTM_MEDIUM = "_db_utm_medium__c";
var COOKIE_NAME_UTM_TERM = "_db_utm_term__c";
var COOKIE_NAME_UTM_CONTENT = "_db_utm_content__c";
var COOKIE_NAME_UTM_OFFER = "_db_utm_offer__c";
var COOKIE_NAME_UTM_KEYWORD = "_db_utm_keyword__c";
var COOKIE_NAME_UTM_GROUP = "_db_utm_ad_group__c";
var COOKIE_NAME_UTM_AD = "_db_utm_ad__c";
var COOKIE_NAME_GCLID = "_db_gclid";
var COOKIE_NAME_SCID = "_db_scid";
var COOKIE_NAME_ITM = "_dbw_itm_data";
var COOKIE_NAME_REFERRER = "_dbw_referrer";
var ORGANIC_SEARCH = "organic_search";
var DIRECT_SEARCH = "direct";
var ORGANIC_SOCIAL_SEARCH = "organic_social";
var WEB_SOURCE = "web";
var DB_DOMAIN = "databricks.com";
var _debugDBUTMs = function _debugDBUTMs(step, value) {
  if (document.cookie.indexOf("_debug_db_dev_utms") > 0) {
    if (value) {
      console.log("Debug:", step, "Value:", value || "Not defined");
    } else {
      console.log("Debug:", step);
    }
  }
};
exports._debugDBUTMs = _debugDBUTMs;
var hasUTMsParams = function hasUTMsParams() {
  var utmParams = [COOKIE_NAME_UTM_SOURCE, COOKIE_NAME_UTM_CAMPAIGN, COOKIE_NAME_UTM_MEDIUM, COOKIE_NAME_UTM_TERM, COOKIE_NAME_UTM_CONTENT, COOKIE_NAME_UTM_OFFER, COOKIE_NAME_UTM_KEYWORD, COOKIE_NAME_UTM_GROUP, COOKIE_NAME_UTM_AD];
  var found = false;
  utmParams.forEach(function (val) {
    if (typeof window !== "undefined" && window.location.search.indexOf(val.replace("_db_", "").replace("__c", "")) !== -1) {
      found = true;
    }
  });
  if (found) {
    _debugDBUTMs("URL contains UTMs", window.location.search);
  } else {
    _debugDBUTMs("URL doesn't contain any UTMs", window.location.search);
  }
  return found;
};
exports.hasUTMsParams = hasUTMsParams;
var getSocialMedias = function getSocialMedias() {
  var socialMediasDomains = ["facebook.", "youtube.", "instagram.", "tiktok.", "pinterest.", "reddit.", "linkedin.", "lnkd.in", "twitter.", "t.co", "snapchat."];
  _debugDBUTMs("Returned Social media", socialMediasDomains);
  return socialMediasDomains;
};
exports.getSocialMedias = getSocialMedias;
var getSearchEngines = function getSearchEngines() {
  var searchEnginesDomains = ["google.", "bing.", "yahoo.", "yandex.", "duckduckgo.", "baidu.", "ask.", "naver.", "ecosia.", "aol."];
  _debugDBUTMs("Returned Search Engines", searchEnginesDomains);
  return searchEnginesDomains;
};
exports.getSearchEngines = getSearchEngines;
var getExistingCookies = function getExistingCookies() {
  _debugDBUTMs("Checking for existing cookies...", "");
  if (document.cookie.indexOf("_db_utm") > 0 || document.cookie.indexOf("_db_scid") > 0 || document.cookie.indexOf("_db_gclid") > 0) {
    _debugDBUTMs("Found some _db_utm cookies", "");
    if (document.cookie.indexOf("_db_utm_medium__c=direct") > 0) {
      _debugDBUTMs("But _db_utm_medium__c is not one of them", "");
      return false;
    }
    _debugDBUTMs("And _db_utm_medium__c is one of them", "");
    return true;
  }
  _debugDBUTMs("No existing cookies", "");
  return false;
};
exports.getExistingCookies = getExistingCookies;
var isOrganicSearch = function isOrganicSearch() {
  var _document = document,
    referrer = _document.referrer;
  if (referrer) {
    var domain = getDomainName(referrer);
    if (typeof domain !== "undefined" && hasUTMsParams() === false && getSearchEngines().includes(domain)) {
      _debugDBUTMs("Is Organic Search");
      return true;
    }
  }
  _debugDBUTMs("Is NOT Organic Search");
  return false;
};
exports.isOrganicSearch = isOrganicSearch;
var hasOnlyGclId = function hasOnlyGclId() {
  if (typeof window !== "undefined") {
    if (window.location.search.indexOf("gclid=") >= 0 && !hasUTMsParams()) {
      _debugDBUTMs("Url has Gclid and no UTMs");
      return true;
    }
  }
  _debugDBUTMs("Url is missing Gclid");
  return false;
};
exports.hasOnlyGclId = hasOnlyGclId;
var hasOnlyScId = function hasOnlyScId() {
  if (typeof window !== "undefined") {
    if (window.location.search.indexOf("scid=") >= 0 && !hasUTMsParams()) {
      _debugDBUTMs("Url has scid and no UTMs");
      return true;
    }
  }
  _debugDBUTMs("Url is missing scid");
  return false;
};
exports.hasOnlyScId = hasOnlyScId;
var isDirect = function isDirect() {
  var _document2;
  var domain = getDomainName((_document2 = document) === null || _document2 === void 0 ? void 0 : _document2.referrer);
  var direct = false;
  if (!domain && hasUTMsParams() === false && !getExistingCookies() && window.location.search.indexOf("scid=") === -1 && window.location.search.indexOf("gclid=") === -1) {
    direct = true;
  } else {
    direct = false;
  }
  _debugDBUTMs("Is Direct Traffic?", direct ? "Yes" : "No");
  return direct;
};

// https://google.com => google.
// https://www.google.com => google.
// https://google.co.uk => google.
// https://www.google.co.uk => google.
// https://internal.www.google.co.uk => google.
// https://internal.google.co.uk => google.
// https://internal.test.io => test.
exports.isDirect = isDirect;
var getDomainName = function getDomainName(url) {
  // Tentatively trying to find the domain name without using a large library
  try {
    var parsedURl = new URL(url);
    var domain = parsedURl.hostname;
    var domainParts = domain.split(".");
    var domainIndex = 2;
    if (domainParts.length === 1 || domainParts.length === 2) {
      domainIndex = 0;
    } else if (domainParts.length === 3) {
      domainIndex = domainParts.length - 2;
    } else if (domainParts.length === 4) {
      domainIndex = domainParts.length - 3;
    } else if (domainParts.length === 5) {
      domainIndex = domainParts.length - 3;
    } else {
      domainIndex = domainParts.length - 2;
    }
    // if the part we found is too short, pick the first item
    if (domainParts[domainIndex].length <= 3) {
      domainIndex = 0;
    }
    return "".concat(domainParts[domainIndex], ".");
  } catch (e) {
    _debugDBUTMs("URL is not a valid referrer", url);
  }
};
exports.getDomainName = getDomainName;
var isOrganicSocial = function isOrganicSocial() {
  var _document3 = document,
    referrer = _document3.referrer;
  if (referrer) {
    var domain = getDomainName(referrer);
    if (typeof domain !== "undefined" && getSocialMedias().includes(domain) && window.location.href.indexOf("gclid=") === -1 && window.location.href.indexOf("scid=") === -1 && window.location.href.indexOf("utm_medium=paid social") === -1 || window.location.href.indexOf("utm_medium=social") >= 0 || window.location.href.indexOf("utm_medium=organic_social") >= 0) {
      _debugDBUTMs("Is Social");
      return true;
    }
  }
  _debugDBUTMs("Is Not Social");
  return false;
};
exports.isOrganicSocial = isOrganicSocial;
var defineReferrer = function defineReferrer() {
  if (typeof window !== "undefined") {
    var _document4 = document,
      referrer = _document4.referrer;
    if (referrer) {
      _debugDBUTMs("Found Referrer", referrer);
      if (referrer.indexOf(".databricks.com") === -1 && referrer.indexOf(".dataaisummit.com") === -1) {
        _jsCookie["default"].set(COOKIE_NAME_REFERRER, referrer, {
          domain: "databricks.com"
        });
        _debugDBUTMs("Referrer is not DB web property, setting referrer cookie", referrer);
      } else {
        _debugDBUTMs("Referrer is DB web property", referrer);
      }
    } else {
      _debugDBUTMs("Referrer is empty");
    }
  }
};
exports.defineReferrer = defineReferrer;
var clearCookies = function clearCookies() {
  _debugDBUTMs("Clearing Cookies...");
  Object.keys(_jsCookie["default"].get()).forEach(function (cookieName) {
    if (cookieName.indexOf("_db_") === 0) {
      _jsCookie["default"].remove(cookieName, {
        domain: "databricks.com"
      });
      _debugDBUTMs("Deleting Cookie", cookieName);
    }
  });
};
exports.clearCookies = clearCookies;
var clearMarketoToken = function clearMarketoToken() {
  var params = window.location.search;
  if (params !== "") {
    var mktTok = (0, _getQueryParam["default"])("mkt_tok", params);
    if (mktTok) {
      // Remove mkt_tok from urls
      var urlWithToken = new URL(window.location.href);
      var searchParams = urlWithToken.searchParams;
      searchParams["delete"]("mkt_tok");
      var nextURL = urlWithToken.toString();
      var nextState = {
        additionalInformation: "Updated the URL with JS"
      };
      // This will replace the current entry in the browser's history, without reloading
      window.history.replaceState(nextState, "", nextURL);
    }
  }
};
exports.clearMarketoToken = clearMarketoToken;
var appendCookiesToLinks = function appendCookiesToLinks() {
  // Get all cookies
  var allCookies = document.cookie.split("; ");

  // Filter cookies starting with "_db_"
  var dbCookies = allCookies.filter(function (cookie) {
    return cookie.startsWith("_db_");
  });

  // Get all links within the page
  var links = document.querySelectorAll('[href*="register.dataaisummit.com"]');
  var appendedCookies = dbCookies.map(function (cookie) {
    var _cookie$split = cookie.split("="),
      _cookie$split2 = _slicedToArray(_cookie$split, 2),
      cookieName = _cookie$split2[0],
      cookieValue = _cookie$split2[1];
    return "".concat(cookieName.replace("_db_", "").replace("__c", "").replace("_dbw_", ""), "=").concat(cookieValue);
  }).join("&");

  // Loop through the links and append cookie name and value to them
  links.forEach(function (link) {
    var linkHref = link.getAttribute("href");

    // Append cookies to link
    if (appendedCookies && linkHref.indexOf("&utm_") === -1) {
      if (linkHref.includes("?")) {
        link.setAttribute("href", "".concat(linkHref, "&").concat(appendedCookies));
      } else {
        link.setAttribute("href", "".concat(linkHref, "?").concat(appendedCookies));
      }
    }
  });
};
exports.appendCookiesToLinks = appendCookiesToLinks;
var getUTMs = function getUTMs() {
  var params = window.location.search;
  if (params !== "") {
    if (hasOnlyGclId() || hasOnlyScId()) {
      clearCookies();
    }
    if (hasUTMsParams() === true) {
      clearCookies();
    }
    var utmCampaign = (0, _getQueryParam["default"])("utm_campaign", params);
    var utmSource = (0, _getQueryParam["default"])("utm_source", params);
    var utmMedium = (0, _getQueryParam["default"])("utm_medium", params);
    var utmTerm = (0, _getQueryParam["default"])("utm_term", params);
    var utmContent = (0, _getQueryParam["default"])("utm_content", params);
    var gclId = (0, _getQueryParam["default"])("gclid", params);
    var utmKeyword = (0, _getQueryParam["default"])("utm_keyword", params);
    var utmOffer = (0, _getQueryParam["default"])("utm_offer", params);
    var utmAdGroup = (0, _getQueryParam["default"])("utm_adgroup", params);
    var utmAd = (0, _getQueryParam["default"])("utm_ad", params);
    var itmData = (0, _getQueryParam["default"])("itm_data", params);
    var scId = (0, _getQueryParam["default"])("scid", params);
    var values = {
      utmSource: utmSource || "",
      utmCampaign: utmCampaign || "",
      utmMedium: utmMedium || "",
      utmTerm: utmTerm || "",
      utmContent: utmContent || "",
      utmKeyword: utmKeyword || "",
      scId: scId || "",
      gclId: gclId || "",
      utmAd: utmAd || "",
      utmAdGroup: utmAdGroup || "",
      utmOffer: utmOffer || "",
      itmData: itmData || ""
    };
    setCookie(values);
  }
};
exports.getUTMs = getUTMs;
var prefillMarketoForm = function prefillMarketoForm() {
  if (typeof window !== "undefined") {
    var retries = 0;
    var timer = setInterval(function () {
      _debugDBUTMs("is Marketo Ready...?");
      retries += 1;
      if (window.MktoForms2) {
        var utmCampaign = _jsCookie["default"].get(COOKIE_NAME_UTM_CAMPAIGN);
        var utmSource = _jsCookie["default"].get(COOKIE_NAME_UTM_SOURCE);
        var utmMedium = _jsCookie["default"].get(COOKIE_NAME_UTM_MEDIUM);
        var utmTerm = _jsCookie["default"].get(COOKIE_NAME_UTM_TERM);
        var utmContent = _jsCookie["default"].get(COOKIE_NAME_UTM_CONTENT);
        var gclId = _jsCookie["default"].get(COOKIE_NAME_GCLID);
        var utmKeyword = _jsCookie["default"].get(COOKIE_NAME_UTM_KEYWORD);
        var utmOffer = _jsCookie["default"].get(COOKIE_NAME_UTM_OFFER);
        var utmAdGroup = _jsCookie["default"].get(COOKIE_NAME_UTM_GROUP);
        var utmAd = _jsCookie["default"].get(COOKIE_NAME_UTM_AD);
        var itmData = _jsCookie["default"].get(COOKIE_NAME_ITM);
        var scId = _jsCookie["default"].get(COOKIE_NAME_SCID);
        window.MktoForms2.whenReady(function (form) {
          _debugDBUTMs("Marketo is finally ready!");
          // In case GTM or Marketo is overriding the values, set them on validate
          form.onValidate(function () {
            form.vals({
              UTM_Campaign__c: utmCampaign,
              UTM_Source__c: utmSource,
              UTM_Keyword__c: utmKeyword,
              UTM_Medium__c: utmMedium,
              UTM_Term__c: utmTerm,
              UTM_Content__c: utmContent,
              UTM_Offer__c: utmOffer,
              UTM_Ad_Group__c: utmAdGroup,
              UTM_Ad__c: utmAd,
              sCID: scId,
              GCLID__c: gclId,
              ITM__c: itmData
            });
            _debugDBUTMs("on Validate Marketo Form and set hidden fields", form.vals());
          });
          form.onSubmit(function () {
            form.vals({
              UTM_Campaign__c: utmCampaign,
              UTM_Source__c: utmSource,
              UTM_Keyword__c: utmKeyword,
              UTM_Medium__c: utmMedium,
              UTM_Term__c: utmTerm,
              UTM_Content__c: utmContent,
              UTM_Offer__c: utmOffer,
              UTM_Ad_Group__c: utmAdGroup,
              UTM_Ad__c: utmAd,
              sCID: scId,
              GCLID__c: gclId,
              ITM__c: itmData
            });
            _debugDBUTMs("on Marketo Form submit and set hidden fields", form.vals());
          });
          clearInterval(timer);
        });
      }
      if (retries === 10) {
        clearInterval(timer);
        _debugDBUTMs("Marketo is not available");
      }
    }, 200);
  }
  // For Trial, see freeTrialSignup
};
exports.prefillMarketoForm = prefillMarketoForm;
var setCookie = function setCookie(values) {
  var utmMedium = values.utmMedium,
    utmSource = values.utmSource,
    utmCampaign = values.utmCampaign,
    utmTerm = values.utmTerm,
    utmContent = values.utmContent,
    itmData = values.itmData,
    utmAd = values.utmAd,
    utmAdGroup = values.utmAdGroup,
    utmOffer = values.utmOffer,
    utmKeyword = values.utmKeyword,
    scId = values.scId,
    gclId = values.gclId;
  if (utmMedium && utmMedium !== "") {
    _jsCookie["default"].set(COOKIE_NAME_UTM_MEDIUM, utmMedium, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_MEDIUM), utmMedium);
  }
  if (utmSource && utmSource !== "") {
    _jsCookie["default"].set(COOKIE_NAME_UTM_SOURCE, utmSource, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_SOURCE), utmSource);
  }
  if (utmCampaign && utmCampaign !== "") {
    _jsCookie["default"].set(COOKIE_NAME_UTM_CAMPAIGN, utmCampaign, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_CAMPAIGN), utmCampaign);
  }
  if (utmTerm && utmTerm !== "") {
    _jsCookie["default"].set(COOKIE_NAME_UTM_TERM, utmTerm, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_TERM), utmCampaign);
  }
  if (utmContent && utmContent !== "") {
    _jsCookie["default"].set(COOKIE_NAME_UTM_CONTENT, utmContent, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_CONTENT), utmContent);
  }
  if (utmKeyword && utmKeyword !== "") {
    _jsCookie["default"].set(COOKIE_NAME_UTM_KEYWORD, utmKeyword, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_KEYWORD), utmKeyword);
  }
  if (itmData && itmData !== "") {
    _jsCookie["default"].set(COOKIE_NAME_ITM, itmData, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_ITM), itmData);
  }
  if (utmAd && utmAd !== "") {
    _jsCookie["default"].set(COOKIE_NAME_UTM_AD, utmAd, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_AD), utmAd);
  }
  if (utmOffer && utmOffer !== "") {
    _jsCookie["default"].set(COOKIE_NAME_UTM_OFFER, utmOffer, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_OFFER), utmOffer);
  }
  if (utmAdGroup && utmAdGroup !== "") {
    _jsCookie["default"].set(COOKIE_NAME_UTM_GROUP, utmAdGroup, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_GROUP), utmAdGroup);
  }
  if (gclId && gclId !== "") {
    _jsCookie["default"].set(COOKIE_NAME_GCLID, gclId, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_GCLID), gclId);
  }
  if (scId && scId !== "") {
    _jsCookie["default"].set(COOKIE_NAME_SCID, scId, {
      domain: "databricks.com"
    });
    _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_SCID), scId);
  }
};
exports.setCookie = setCookie;
var getSearchType = function getSearchType() {
  var fromOrganicSearch = !hasUTMsParams() && !hasOnlyGclId() && !hasOnlyScId() && isOrganicSearch();
  var fromOrganicSocialSearch = isOrganicSocial() && !hasUTMsParams();
  if (isDirect()) {
    return DIRECT_SEARCH;
  }
  if (fromOrganicSearch) {
    return ORGANIC_SEARCH;
  }
  if (fromOrganicSocialSearch) {
    return ORGANIC_SOCIAL_SEARCH;
  }
  return "";
};
var setSearchTypeCookies = function setSearchTypeCookies(medium) {
  clearCookies();
  _jsCookie["default"].set(COOKIE_NAME_UTM_SOURCE, WEB_SOURCE, {
    domain: DB_DOMAIN
  });
  _jsCookie["default"].set(COOKIE_NAME_UTM_MEDIUM, medium, {
    domain: DB_DOMAIN
  });
  _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_SOURCE), WEB_SOURCE);
  _debugDBUTMs("Setting cookie for ".concat(COOKIE_NAME_UTM_MEDIUM), medium);
};

/**
 * Set cookies for different types of search
 * it could be organic_search, organic_social, or direct
 */
var setSearchType = function setSearchType() {
  var searchType = getSearchType();
  switch (searchType) {
    case ORGANIC_SEARCH:
      setSearchTypeCookies(ORGANIC_SEARCH);
      break;
    case ORGANIC_SOCIAL_SEARCH:
      setSearchTypeCookies(ORGANIC_SOCIAL_SEARCH);
      break;
    case DIRECT_SEARCH:
      setSearchTypeCookies(DIRECT_SEARCH);
      break;
    default:
      break;
  }
};
var initUTMs = function initUTMs() {
  _debugDBUTMs("Started UTMs Debugging...");
  _debugDBUTMs("Setting Country cookie...");
  (0, _cloudflareTrace["default"])();
  _debugDBUTMs("Country cookie is set", _jsCookie["default"].get("db_country"));
  _debugDBUTMs("Setting Referrer...", "");
  defineReferrer();
  _debugDBUTMs("Checking for UTMs...", "");
  getUTMs();
  _debugDBUTMs("Checking for Organic/Social...", "");
  setSearchType();
  appendCookiesToLinks();
  _debugDBUTMs("Prefill Marketo Form", "");
  prefillMarketoForm();
  clearMarketoToken();
};
var _default = initUTMs;
exports["default"] = _default;

},{"../../../../gatsby-theme-databricks-drupal/src/helpers/cloudflareTrace":3,"../../../../gatsby-theme-databricks-drupal/src/helpers/getQueryParam":4,"js-cookie":1}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _getVisitorLocation = _interopRequireDefault(require("../utils/get-visitor-location"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return { value: void 0, done: !0 }; } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable || "" === iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } throw new TypeError(_typeof(iterable) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /* eslint-disable no-unused-vars */
var setCookie = function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=".concat(date.toUTCString());
  }
  document.cookie = "".concat(name, "=").concat(value || "").concat(expires, "; path=/");
};
var isValidJson = function isValidJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
var cloudflareTrace = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _document$cookie$matc;
    var dbCountry, countryCode, countryName, dbCountryCookie;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          dbCountry = null;
          countryCode = "";
          countryName = "";
          dbCountryCookie = ((_document$cookie$matc = document.cookie.match("(^|;)\\s*db_country\\s*=\\s*([^;]+)")) === null || _document$cookie$matc === void 0 ? void 0 : _document$cookie$matc.pop()) || "";
          if (!(dbCountryCookie !== "" && isValidJson(dbCountryCookie))) {
            _context.next = 9;
            break;
          }
          dbCountryCookie = JSON.parse(dbCountryCookie);
          countryCode = dbCountryCookie.country_code;
          countryName = dbCountryCookie.country_name;
          return _context.abrupt("return", {
            countryCode: countryCode,
            countryName: countryName
          });
        case 9:
          return _context.abrupt("return", fetch("https://www.databricks.com/cdn-cgi/trace").then(function (res) {
            return res.text();
          }).then(function (response) {
            var cfTrace = [];
            var lines = response.split("\n");
            lines.forEach(function (line) {
              var keyValue = line.split("=");
              cfTrace[keyValue[0]] = decodeURIComponent(keyValue[1] || "");
            });
            // eslint-disable-next-line no-shadow
            var countryCode = "";
            var ipAddress = "";
            if (cfTrace.loc !== undefined) {
              countryCode = cfTrace.loc;
              var regionNames = new Intl.DisplayNames(["en"], {
                type: "region"
              });
              countryName = regionNames.of(countryCode);
            }
            if (cfTrace.ip !== undefined) {
              ipAddress = cfTrace.ip;
            }
            if (countryCode !== "") {
              dbCountry = {
                country_code: countryCode,
                country_name: countryName,
                IP: ipAddress
              };
              setCookie("db_country", JSON.stringify(dbCountry), 30);
            }
            return {
              countryCode: countryCode,
              countryName: countryName
            };
          })["catch"](function (error) {
            console.log(error);
            return {
              countryCode: "",
              countryName: ""
            };
          }));
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function cloudflareTrace() {
    return _ref.apply(this, arguments);
  };
}();
var _default = cloudflareTrace;
exports["default"] = _default;

},{"../utils/get-visitor-location":6}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

var _UTMS = _interopRequireDefault(require("databricks-ui/src/components/UTMS"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
(0, _UTMS["default"])();

},{"databricks-ui/src/components/UTMS":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsCookie = _interopRequireDefault(require("js-cookie"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var handleMaxMindResponse = function handleMaxMindResponse(geoipResponse) {
  var setCookie = function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=".concat(date.toUTCString());
    }
    document.cookie = "".concat(name, "=").concat(value || "").concat(expires, "; path=/");
  };
  var dbCountry = {
    country_code: geoipResponse.country.iso_code,
    country_name: geoipResponse.country.names.en
  };
  if (_jsCookie["default"]) {
    // Not using js-cookie to write since the character encoding causes issues with Wordpress, which doesn't use js-cookie
    // Cookies.set("db_country", JSON.stringify(dbCountry), { expires: 30 })
    setCookie("db_country", JSON.stringify(dbCountry), 30);
  }
};
var getVisitorLocation = function getVisitorLocation() {
  if (_jsCookie["default"]) {
    var knownLocationCookie = _jsCookie["default"].get("db_country");
    if (typeof knownLocationCookie === "undefined") {
      var geoip2 = window.geoip2 || undefined;
      return new Promise(function (resolve, reject) {
        if (typeof geoip2 !== "undefined") {
          var onSuccess = function onSuccess(location) {
            handleMaxMindResponse(location);
            resolve(location);
          };
          var onError = function onError(error) {
            reject(error);
          };
          geoip2.country(onSuccess, onError);
        }
      });
    }
    var knownLocation = JSON.parse(knownLocationCookie);
    if (!knownLocation.country_code) {
      _jsCookie["default"].remove("db_country");
    }
  }
  return false;
};
var _default = getVisitorLocation;
exports["default"] = _default;

},{"js-cookie":1}]},{},[2,5]);
