class D {
}
D.ACCESS_TOKEN_EXPIRED = "00100100004016";
D.ACCESS_TOKEN_INVALID = "00100100004014";
D.REFRESH_TOKEN_EXPIRED = "00100100004017";
D.REFRESH_TOKEN_INVALID = "00100100004015";
const ue = {
  /**
   * 获取数据类型
   * @param params 
   * @returns 'String','Number'...
   */
  getTypeOf: (e) => {
    let o = Object.prototype.toString.call(e).match(/\[\w+\W(\w+)\]$/);
    return o ? o[1] : null;
  },
  /**
   * https://stackoverflow.com/questions/69983708/how-to-make-the-javascript-null-check-more-clear
   * 数据空检查
   * @param AnyObject
   * @returns 
   */
  isNull: (e) => !!(!e || typeof e == "object" && (Array.isArray(e) && e.length === 0 || e.toString() === "[object Object]" && JSON.stringify(e) === "{}")),
  /**
   * https://stackoverflow.com/questions/23437476/in-typescript-how-to-check-if-a-string-is-numeric
   * @param value 
   * @returns 
   */
  isNumber: (e) => e != null && e !== "" && !isNaN(Number(e.toString())),
  /**
   * 数组，字符串去重
   * @param Array,String
   * @returns 
   */
  unique: function(e) {
  }
};
class l {
}
l.MOUSE_UP = "mouseup";
l.MOUSE_CLICK = "click";
l.ACCESS_TOKEN_NAME = "x-access-token";
l.REFRESH_TOKEN_NAME = "x-refresh-token";
l.REQUEST_ID_NAME = "x-request-id";
l.REDDWARF_APP_ID_KEY = "app-id";
l.REDDWARF_PRODUCT_ID_KEY = "product-id";
l.USER_NAME = "username";
l.PASSWORD = "password";
l.BASE_AUTH_URL = "base-auth-url";
l.USER_LOGIN_URL_PATH = "user-login-url-path";
l.ACCESS_TOKEN_URL_PATH = "access-token-url-path";
l.REFRESH_TOKEN_URL_PATH = "refresh-token-url-path";
const C = {
  readLocalStorage: async (e) => new Promise((t, o) => {
    chrome.storage.local.get([e], function(a) {
      a[e] === void 0 ? t("") : t(a[e]);
    });
  }),
  setLocalStorage: async (e, t) => new Promise((o, a) => {
    chrome.storage.local.set({
      [e]: t
    }, function() {
      o("");
    });
  })
}, le = Object.freeze({
  PHONE: 1
}), fe = {
  getDeviceId: async () => new Promise((e, t) => {
    e("xxxx");
  }),
  getDeviceIdEnhance: async () => new Promise((e, t) => {
    require("@fingerprintjs/fingerprintjs").load().then((a) => a.get()).then(async (a) => {
      const i = a.visitorId;
      e(i);
    });
  })
}, ee = {
  isTokenNeedRefresh: (e) => {
    const t = localStorage.getItem(l.ACCESS_TOKEN_NAME);
    if (!t)
      return !1;
    const a = JSON.parse(atob(t.split(".")[1])).exp, i = Math.floor(Date.now() / 1e3);
    return a < i + e;
  },
  storeLoginAuthInfo: (e, t, o) => {
    localStorage.setItem("isLoggedIn", "true"), localStorage.setItem(l.ACCESS_TOKEN_NAME, e.accessToken), localStorage.setItem(l.REFRESH_TOKEN_NAME, e.refreshToken), localStorage.setItem("avatarUrl", e.avatarUrl), localStorage.setItem(l.BASE_AUTH_URL, t), localStorage.setItem(l.ACCESS_TOKEN_URL_PATH, o);
  },
  storeCookieAuthInfo: (e, t, o) => {
    var m, y;
    const a = e.split("=")[1], i = (m = document.cookie.split("; ").find((R) => R.startsWith("refreshToken="))) == null ? void 0 : m.split("=")[1], g = (y = document.cookie.split("; ").find((R) => R.startsWith("avatarUrl="))) == null ? void 0 : y.split("=")[1];
    localStorage.setItem("isLoggedIn", "true"), localStorage.setItem(l.ACCESS_TOKEN_NAME, a), localStorage.setItem(l.REFRESH_TOKEN_NAME, i || ""), localStorage.setItem("avatarUrl", g || ""), localStorage.setItem(l.BASE_AUTH_URL, t), localStorage.setItem(l.ACCESS_TOKEN_URL_PATH, o);
  },
  pluginLogin: async () => {
    let e = await C.readLocalStorage(l.USER_NAME), t = await C.readLocalStorage(l.PASSWORD), o = await fe.getDeviceIdEnhance(), a = await C.readLocalStorage(l.REDDWARF_APP_ID_KEY), i = {
      phone: e,
      password: t,
      deviceId: o,
      deviceName: o,
      appId: Number(a),
      deviceType: 7,
      loginType: le.PHONE
    };
    return ee.login(i);
  },
  login: async (e) => {
    const t = await C.readLocalStorage(l.BASE_AUTH_URL), o = await C.readLocalStorage(l.USER_LOGIN_URL_PATH), a = t + o;
    let g = await (await fetch(a, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(e)
    })).json();
    if (g && g.result && g.result.accessToken) {
      const m = g.result.accessToken, y = g.result.refreshToken;
      chrome.storage.local.set(
        {
          [l.ACCESS_TOKEN_NAME]: m,
          [l.REFRESH_TOKEN_NAME]: y
        }
      );
    }
    return g;
  }
};
var J, de = new Uint8Array(16);
function he() {
  if (!J && (J = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !J))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return J(de);
}
const ge = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function Se(e) {
  return typeof e == "string" && ge.test(e);
}
var T = [];
for (var X = 0; X < 256; ++X)
  T.push((X + 256).toString(16).substr(1));
function pe(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, o = (T[e[t + 0]] + T[e[t + 1]] + T[e[t + 2]] + T[e[t + 3]] + "-" + T[e[t + 4]] + T[e[t + 5]] + "-" + T[e[t + 6]] + T[e[t + 7]] + "-" + T[e[t + 8]] + T[e[t + 9]] + "-" + T[e[t + 10]] + T[e[t + 11]] + T[e[t + 12]] + T[e[t + 13]] + T[e[t + 14]] + T[e[t + 15]]).toLowerCase();
  if (!Se(o))
    throw TypeError("Stringified UUID is invalid");
  return o;
}
function Ee(e, t, o) {
  e = e || {};
  var a = e.random || (e.rng || he)();
  if (a[6] = a[6] & 15 | 64, a[8] = a[8] & 63 | 128, t) {
    o = o || 0;
    for (var i = 0; i < 16; ++i)
      t[o + i] = a[i];
    return t;
  }
  return pe(a);
}
var Y = !1, q = null;
const N = {
  post: async (e, t) => Y === !0 ? q == null ? void 0 : q.then(async () => await N.api_post(e, t)) : await N.api_post(e, t).then((o) => {
    if (o.resultCode === D.ACCESS_TOKEN_EXPIRED)
      Y = !0, N.handleAccessTokenExpire();
    else
      return o;
  }),
  api_post: async (e, t) => {
    let o = await C.readLocalStorage(l.ACCESS_TOKEN_NAME);
    return o ? await N.do_api_post(e, t, o) : (await ee.pluginLogin(), await N.do_api_post(e, t, o));
  },
  do_api_post: async (e, t, o) => fetch(e, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-access-token": o,
      "x-request-id": Ee()
    },
    body: JSON.stringify(t)
  }).then((a) => {
    if (!a.ok)
      throw new Error(a.statusText);
    return a.json();
  }),
  handleRefreshTokenInvalid: async () => {
    window.location.href = "/user/login";
  },
  handleWebAccessTokenExpire: async () => {
    const t = {
      grant_type: "refresh_token",
      refresh_token: localStorage.getItem(l.REFRESH_TOKEN_NAME)
    };
    return await N.refreshWebAccessToken(t);
  },
  handleAccessTokenExpire: async () => {
    const t = {
      grant_type: "refresh_token",
      refresh_token: await C.readLocalStorage(l.REFRESH_TOKEN_NAME)
    };
    N.refreshAccessToken(t);
  },
  refreshWebAccessToken: async (e) => {
    const t = localStorage.getItem(l.BASE_AUTH_URL), o = localStorage.getItem(l.ACCESS_TOKEN_URL_PATH), a = t + o;
    return fetch(a, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(e)
    }).then((i) => i.json()).then((i) => {
      if (i && i.resultCode === "200") {
        const g = i.result.accessToken;
        return localStorage.setItem(l.ACCESS_TOKEN_NAME, g), Y = !1, Promise.resolve(i);
      }
      return Promise.reject(i);
    });
  },
  refreshAccessToken: async (e) => {
    const t = await C.readLocalStorage(l.BASE_AUTH_URL), o = await C.readLocalStorage(l.ACCESS_TOKEN_URL_PATH), a = t + o;
    fetch(a, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(e)
    }).then((i) => i.json()).then((i) => {
      if ((i && i.resultCode === D.REFRESH_TOKEN_EXPIRED || i && i.resultCode === D.REFRESH_TOKEN_INVALID) && N.handleRefreshTokenInvalid(), i && i.resultCode === "200") {
        const g = i.result.accessToken;
        chrome.storage.local.set(
          {
            [l.ACCESS_TOKEN_NAME]: g
          },
          function() {
            Y = !1;
          }
        );
      }
    });
  },
  refreshRefreshToken: async (e) => {
    const t = await C.readLocalStorage(l.BASE_AUTH_URL), o = await localStorage.readLocalStorage(l.REFRESH_TOKEN_URL_PATH), a = t + o;
    fetch(a, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(e)
    }).then((i) => i.json()).then((i) => {
      if (i && i.resultCode === D.REFRESH_TOKEN_INVALID && ee.pluginLogin(), i && i.resultCode === "200") {
        const g = i.result.accessToken, m = i.result.refreshToken;
        chrome.storage.local.set(
          {
            [l.ACCESS_TOKEN_NAME]: g,
            [l.REFRESH_TOKEN_NAME]: m
          },
          function() {
            Y = !1;
          }
        );
      }
    });
  }
}, ye = {
  responseSuccess: (e) => ue.isNull(e) ? !1 : e.statusCode === "200" && e.resultCode === "200",
  handleCommonFailure: (e) => {
    e.resultCode === D.ACCESS_TOKEN_EXPIRED && N.handleAccessTokenExpire();
  },
  handleWebCommonFailure: async (e) => {
    if (e.resultCode === D.ACCESS_TOKEN_EXPIRED)
      return await N.handleWebAccessTokenExpire();
  },
  mapPageResponse: (e) => ({
    data: e.result.list,
    pagination: {
      total: e.result.pagination.total,
      per_page: e.result.pagination.pageSize,
      page: e.result.pagination.pageNum
    }
  })
};
var me = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _e(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var oe = { exports: {} };
(function(e, t) {
  (function(o, a) {
    e.exports = a();
  })(me, function() {
    var o = 1e3, a = 6e4, i = 36e5, g = "millisecond", m = "second", y = "minute", R = "hour", M = "day", v = "week", A = "month", b = "quarter", I = "year", P = "date", te = "Invalid Date", se = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, ae = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, ie = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_") }, Z = function(c, s, n) {
      var u = String(c);
      return !u || u.length >= s ? c : "" + Array(s + 1 - u.length).join(n) + c;
    }, ce = { s: Z, z: function(c) {
      var s = -c.utcOffset(), n = Math.abs(s), u = Math.floor(n / 60), r = n % 60;
      return (s <= 0 ? "+" : "-") + Z(u, 2, "0") + ":" + Z(r, 2, "0");
    }, m: function c(s, n) {
      if (s.date() < n.date())
        return -c(n, s);
      var u = 12 * (n.year() - s.year()) + (n.month() - s.month()), r = s.clone().add(u, A), d = n - r < 0, f = s.clone().add(u + (d ? -1 : 1), A);
      return +(-(u + (n - r) / (d ? r - f : f - r)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: A, y: I, w: v, d: M, D: P, h: R, m: y, s: m, ms: g, Q: b }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, K = "en", H = {};
    H[K] = ie;
    var z = function(c) {
      return c instanceof V;
    }, W = function(c, s, n) {
      var u;
      if (!c)
        return K;
      if (typeof c == "string")
        H[c] && (u = c), s && (H[c] = s, u = c);
      else {
        var r = c.name;
        H[r] = c, u = r;
      }
      return !n && u && (K = u), u || !n && K;
    }, _ = function(c, s) {
      if (z(c))
        return c.clone();
      var n = typeof s == "object" ? s : {};
      return n.date = c, n.args = arguments, new V(n);
    }, h = ce;
    h.l = W, h.i = z, h.w = function(c, s) {
      return _(c, { locale: s.$L, utc: s.$u, x: s.$x, $offset: s.$offset });
    };
    var V = function() {
      function c(n) {
        this.$L = W(n.locale, null, !0), this.parse(n);
      }
      var s = c.prototype;
      return s.parse = function(n) {
        this.$d = function(u) {
          var r = u.date, d = u.utc;
          if (r === null)
            return /* @__PURE__ */ new Date(NaN);
          if (h.u(r))
            return /* @__PURE__ */ new Date();
          if (r instanceof Date)
            return new Date(r);
          if (typeof r == "string" && !/Z$/i.test(r)) {
            var f = r.match(se);
            if (f) {
              var S = f[2] - 1 || 0, E = (f[7] || "0").substring(0, 3);
              return d ? new Date(Date.UTC(f[1], S, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, E)) : new Date(f[1], S, f[3] || 1, f[4] || 0, f[5] || 0, f[6] || 0, E);
            }
          }
          return new Date(r);
        }(n), this.$x = n.x || {}, this.init();
      }, s.init = function() {
        var n = this.$d;
        this.$y = n.getFullYear(), this.$M = n.getMonth(), this.$D = n.getDate(), this.$W = n.getDay(), this.$H = n.getHours(), this.$m = n.getMinutes(), this.$s = n.getSeconds(), this.$ms = n.getMilliseconds();
      }, s.$utils = function() {
        return h;
      }, s.isValid = function() {
        return this.$d.toString() !== te;
      }, s.isSame = function(n, u) {
        var r = _(n);
        return this.startOf(u) <= r && r <= this.endOf(u);
      }, s.isAfter = function(n, u) {
        return _(n) < this.startOf(u);
      }, s.isBefore = function(n, u) {
        return this.endOf(u) < _(n);
      }, s.$g = function(n, u, r) {
        return h.u(n) ? this[u] : this.set(r, n);
      }, s.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, s.valueOf = function() {
        return this.$d.getTime();
      }, s.startOf = function(n, u) {
        var r = this, d = !!h.u(u) || u, f = h.p(n), S = function(x, O) {
          var k = h.w(r.$u ? Date.UTC(r.$y, O, x) : new Date(r.$y, O, x), r);
          return d ? k : k.endOf(M);
        }, E = function(x, O) {
          return h.w(r.toDate()[x].apply(r.toDate("s"), (d ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), r);
        }, p = this.$W, $ = this.$M, L = this.$D, w = "set" + (this.$u ? "UTC" : "");
        switch (f) {
          case I:
            return d ? S(1, 0) : S(31, 11);
          case A:
            return d ? S(1, $) : S(0, $ + 1);
          case v:
            var F = this.$locale().weekStart || 0, j = (p < F ? p + 7 : p) - F;
            return S(d ? L - j : L + (6 - j), $);
          case M:
          case P:
            return E(w + "Hours", 0);
          case R:
            return E(w + "Minutes", 1);
          case y:
            return E(w + "Seconds", 2);
          case m:
            return E(w + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, s.endOf = function(n) {
        return this.startOf(n, !1);
      }, s.$set = function(n, u) {
        var r, d = h.p(n), f = "set" + (this.$u ? "UTC" : ""), S = (r = {}, r[M] = f + "Date", r[P] = f + "Date", r[A] = f + "Month", r[I] = f + "FullYear", r[R] = f + "Hours", r[y] = f + "Minutes", r[m] = f + "Seconds", r[g] = f + "Milliseconds", r)[d], E = d === M ? this.$D + (u - this.$W) : u;
        if (d === A || d === I) {
          var p = this.clone().set(P, 1);
          p.$d[S](E), p.init(), this.$d = p.set(P, Math.min(this.$D, p.daysInMonth())).$d;
        } else
          S && this.$d[S](E);
        return this.init(), this;
      }, s.set = function(n, u) {
        return this.clone().$set(n, u);
      }, s.get = function(n) {
        return this[h.p(n)]();
      }, s.add = function(n, u) {
        var r, d = this;
        n = Number(n);
        var f = h.p(u), S = function($) {
          var L = _(d);
          return h.w(L.date(L.date() + Math.round($ * n)), d);
        };
        if (f === A)
          return this.set(A, this.$M + n);
        if (f === I)
          return this.set(I, this.$y + n);
        if (f === M)
          return S(1);
        if (f === v)
          return S(7);
        var E = (r = {}, r[y] = a, r[R] = i, r[m] = o, r)[f] || 1, p = this.$d.getTime() + n * E;
        return h.w(p, this);
      }, s.subtract = function(n, u) {
        return this.add(-1 * n, u);
      }, s.format = function(n) {
        var u = this, r = this.$locale();
        if (!this.isValid())
          return r.invalidDate || te;
        var d = n || "YYYY-MM-DDTHH:mm:ssZ", f = h.z(this), S = this.$H, E = this.$m, p = this.$M, $ = r.weekdays, L = r.months, w = function(O, k, G, B) {
          return O && (O[k] || O(u, d)) || G[k].substr(0, B);
        }, F = function(O) {
          return h.s(S % 12 || 12, O, "0");
        }, j = r.meridiem || function(O, k, G) {
          var B = O < 12 ? "AM" : "PM";
          return G ? B.toLowerCase() : B;
        }, x = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: p + 1, MM: h.s(p + 1, 2, "0"), MMM: w(r.monthsShort, p, L, 3), MMMM: w(L, p), D: this.$D, DD: h.s(this.$D, 2, "0"), d: String(this.$W), dd: w(r.weekdaysMin, this.$W, $, 2), ddd: w(r.weekdaysShort, this.$W, $, 3), dddd: $[this.$W], H: String(S), HH: h.s(S, 2, "0"), h: F(1), hh: F(2), a: j(S, E, !0), A: j(S, E, !1), m: String(E), mm: h.s(E, 2, "0"), s: String(this.$s), ss: h.s(this.$s, 2, "0"), SSS: h.s(this.$ms, 3, "0"), Z: f };
        return d.replace(ae, function(O, k) {
          return k || x[O] || f.replace(":", "");
        });
      }, s.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, s.diff = function(n, u, r) {
        var d, f = h.p(u), S = _(n), E = (S.utcOffset() - this.utcOffset()) * a, p = this - S, $ = h.m(this, S);
        return $ = (d = {}, d[I] = $ / 12, d[A] = $, d[b] = $ / 3, d[v] = (p - E) / 6048e5, d[M] = (p - E) / 864e5, d[R] = p / i, d[y] = p / a, d[m] = p / o, d)[f] || p, r ? $ : h.a($);
      }, s.daysInMonth = function() {
        return this.endOf(A).$D;
      }, s.$locale = function() {
        return H[this.$L];
      }, s.locale = function(n, u) {
        if (!n)
          return this.$L;
        var r = this.clone(), d = W(n, u, !0);
        return d && (r.$L = d), r;
      }, s.clone = function() {
        return h.w(this.$d, this);
      }, s.toDate = function() {
        return new Date(this.valueOf());
      }, s.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, s.toISOString = function() {
        return this.$d.toISOString();
      }, s.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), ne = V.prototype;
    return _.prototype = ne, [["$ms", g], ["$s", m], ["$m", y], ["$H", R], ["$W", M], ["$M", A], ["$y", I], ["$D", P]].forEach(function(c) {
      ne[c[1]] = function(s) {
        return this.$g(s, c[0], c[1]);
      };
    }), _.extend = function(c, s) {
      return c.$i || (c(s, V, _), c.$i = !0), _;
    }, _.locale = W, _.isDayjs = z, _.unix = function(c) {
      return _(1e3 * c);
    }, _.en = H[K], _.Ls = H, _.p = {}, _;
  });
})(oe);
var Te = oe.exports;
const Q = /* @__PURE__ */ _e(Te), U = {
  getMonthStart: () => {
    Q().startOf("month").add(1, "day").set("year", 2018).format("YYYY-MM-DD HH:mm:ss");
  },
  getMonthStartMilliseconds: () => {
    Q().startOf("month").valueOf();
  },
  getMonthEndMilliseconds: () => {
    Q().endOf("month").valueOf();
  },
  getFormattedTime(e) {
    var t = new Date(e);
    return U.getCurrentFormattedTime(t);
  },
  getCurrentFormattedTime(e = /* @__PURE__ */ new Date()) {
    const t = e.getFullYear(), o = U.padLeftZero(e.getMonth() + 1), a = U.padLeftZero(e.getDate()), i = U.padLeftZero(e.getHours()), g = U.padLeftZero(e.getMinutes()), m = U.padLeftZero(e.getSeconds()), y = U.padLeftZero(e.getMilliseconds(), 3);
    return `${t}-${o}-${a} ${i}:${g}:${m} ${y}`;
  },
  padLeftZero(e, t = 2) {
    return (Array(t).join("0") + e).slice(-t);
  },
  getPrevFormattedTime: (e) => {
    let t = /* @__PURE__ */ new Date(), o = parseInt((t.getTime() / 1e3).toString()), a = new Date(e), i = parseInt((a.getTime() / 1e3).toString()), g = a.getFullYear(), m = a.getMonth() + 1, y = a.getDate(), R = a.getHours(), M = a.getMinutes();
    a.getSeconds();
    let v = o - i;
    if (v < 60)
      return "刚刚";
    if (v < 60 * 60)
      return Math.floor(v / 60) + "分钟前";
    if (g === t.getFullYear() && m === t.getMonth() + 1 && y === t.getDate())
      return `${A(R)}:${A(M)}`;
    return `${g}-${A(m)}-${A(y)}`;
    function A(b) {
      return b < 10 ? "0" + b : b;
    }
  }
}, re = {
  // https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
  colorToRGBA: (e) => {
    let t = document.createElement("canvas");
    t.height = 1, t.width = 1;
    let o = t.getContext("2d");
    return o ? (o.fillStyle = e, o.fillRect(0, 0, 1, 1), o.getImageData(0, 0, 1, 1).data) : [];
  },
  byteToHex: (e) => ("0" + e.toString(16)).slice(-2),
  colorToHex: (e) => {
    var t, o;
    return t = re.colorToRGBA(e), o = [0, 1, 2].map(
      function(a) {
        return re.byteToHex(t[a]);
      }
    ).join(""), "#" + o;
  }
}, Ae = {
  fileToBase64: (e) => new Promise((t, o) => {
    const a = new FileReader();
    a.readAsDataURL(e), a.onload = () => t(a.result), a.onerror = (i) => o(i);
  })
};
export {
  ee as AuthHandler,
  re as RdColor,
  Ae as RdFile,
  N as RequestHandler,
  D as ResponseCode,
  ye as ResponseHandler,
  U as TimeUtils,
  l as WheelGlobal
};
//# sourceMappingURL=rd-component.es.js.map
