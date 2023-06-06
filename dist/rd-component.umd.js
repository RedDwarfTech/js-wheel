(function(M,R){typeof exports=="object"&&typeof module<"u"?R(exports):typeof define=="function"&&define.amd?define(["exports"],R):(M=typeof globalThis<"u"?globalThis:M||self,R(M["rdjs-wheel"]={}))})(this,function(M){"use strict";class R{}R.ACCESS_TOKEN_EXPIRED="00100100004016",R.ACCESS_TOKEN_INVALID="00100100004014",R.REFRESH_TOKEN_EXPIRED="00100100004017",R.REFRESH_TOKEN_INVALID="00100100004015";const ae={getTypeOf:e=>{let o=Object.prototype.toString.call(e).match(/\[\w+\W(\w+)\]$/);return o?o[1]:null},isNull:e=>!!(!e||typeof e=="object"&&(Array.isArray(e)&&e.length===0||e.toString()==="[object Object]"&&JSON.stringify(e)==="{}")),isNumber:e=>e!=null&&e!==""&&!isNaN(Number(e.toString())),unique:function(e){}};class l{}l.MOUSE_UP="mouseup",l.MOUSE_CLICK="click",l.ACCESS_TOKEN_NAME="x-access-token",l.REFRESH_TOKEN_NAME="x-refresh-token",l.REQUEST_ID_NAME="x-request-id",l.REDDWARF_APP_ID_KEY="app-id",l.REDDWARF_PRODUCT_ID_KEY="product-id",l.USER_NAME="username",l.PASSWORD="password",l.BASE_AUTH_URL="base-auth-url",l.USER_LOGIN_URL_PATH="user-login-url-path",l.ACCESS_TOKEN_URL_PATH="access-token-url-path",l.REFRESH_TOKEN_URL_PATH="refresh-token-url-path";const D={readLocalStorage:async e=>new Promise((t,o)=>{chrome.storage.local.get([e],function(a){a[e]===void 0?t(""):t(a[e])})}),setLocalStorage:async(e,t)=>new Promise((o,a)=>{chrome.storage.local.set({[e]:t},function(){o("")})})},ie=Object.freeze({PHONE:1}),ce={getDeviceId:async()=>new Promise((e,t)=>{e("xxxx")}),getDeviceIdEnhance:async()=>new Promise((e,t)=>{require("@fingerprintjs/fingerprintjs").load().then(a=>a.get()).then(async a=>{const i=a.visitorId;e(i)})})},V={isTokenNeedRefresh:e=>{const t=localStorage.getItem(l.ACCESS_TOKEN_NAME);if(!t)return!1;const a=JSON.parse(atob(t.split(".")[1])).exp,i=Math.floor(Date.now()/1e3);return a<i+e},storeLoginAuthInfo:(e,t,o)=>{localStorage.setItem("isLoggedIn","true"),localStorage.setItem(l.ACCESS_TOKEN_NAME,e.accessToken),localStorage.setItem(l.REFRESH_TOKEN_NAME,e.refreshToken),localStorage.setItem("avatarUrl",e.avatarUrl),localStorage.setItem(l.BASE_AUTH_URL,t),localStorage.setItem(l.ACCESS_TOKEN_URL_PATH,o)},storeCookieAuthInfo:(e,t,o)=>{var E,y;const a=e.split("=")[1],i=(E=document.cookie.split("; ").find(C=>C.startsWith("refreshToken=")))==null?void 0:E.split("=")[1],g=(y=document.cookie.split("; ").find(C=>C.startsWith("avatarUrl=")))==null?void 0:y.split("=")[1];localStorage.setItem("isLoggedIn","true"),localStorage.setItem(l.ACCESS_TOKEN_NAME,a),localStorage.setItem(l.REFRESH_TOKEN_NAME,i||""),localStorage.setItem("avatarUrl",g||""),localStorage.setItem(l.BASE_AUTH_URL,t),localStorage.setItem(l.ACCESS_TOKEN_URL_PATH,o)},pluginLogin:async()=>{let e=await D.readLocalStorage(l.USER_NAME),t=await D.readLocalStorage(l.PASSWORD),o=await ce.getDeviceIdEnhance(),a=await D.readLocalStorage(l.REDDWARF_APP_ID_KEY),i={phone:e,password:t,deviceId:o,deviceName:o,appId:Number(a),deviceType:7,loginType:ie.PHONE};return V.login(i)},login:async e=>{const t=await D.readLocalStorage(l.BASE_AUTH_URL),o=await D.readLocalStorage(l.USER_LOGIN_URL_PATH),a=t+o;let g=await(await fetch(a,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)})).json();if(g&&g.result&&g.result.accessToken){const E=g.result.accessToken,y=g.result.refreshToken;chrome.storage.local.set({[l.ACCESS_TOKEN_NAME]:E,[l.REFRESH_TOKEN_NAME]:y})}return g}};var B,ue=new Uint8Array(16);function le(){if(!B&&(B=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!B))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return B(ue)}const de=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function fe(e){return typeof e=="string"&&de.test(e)}for(var T=[],q=0;q<256;++q)T.push((q+256).toString(16).substr(1));function he(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,o=(T[e[t+0]]+T[e[t+1]]+T[e[t+2]]+T[e[t+3]]+"-"+T[e[t+4]]+T[e[t+5]]+"-"+T[e[t+6]]+T[e[t+7]]+"-"+T[e[t+8]]+T[e[t+9]]+"-"+T[e[t+10]]+T[e[t+11]]+T[e[t+12]]+T[e[t+13]]+T[e[t+14]]+T[e[t+15]]).toLowerCase();if(!fe(o))throw TypeError("Stringified UUID is invalid");return o}function ge(e,t,o){e=e||{};var a=e.random||(e.rng||le)();if(a[6]=a[6]&15|64,a[8]=a[8]&63|128,t){o=o||0;for(var i=0;i<16;++i)t[o+i]=a[i];return t}return he(a)}var x=!1,z=null;const N={post:async(e,t)=>x===!0?z==null?void 0:z.then(async()=>await N.api_post(e,t)):await N.api_post(e,t).then(o=>{if(o.resultCode===R.ACCESS_TOKEN_EXPIRED)x=!0,N.handleAccessTokenExpire();else return o}),api_post:async(e,t)=>{let o=await D.readLocalStorage(l.ACCESS_TOKEN_NAME);return o?await N.do_api_post(e,t,o):(await V.pluginLogin(),await N.do_api_post(e,t,o))},do_api_post:async(e,t,o)=>fetch(e,{method:"POST",headers:{"Content-type":"application/json","x-access-token":o,"x-request-id":ge()},body:JSON.stringify(t)}).then(a=>{if(!a.ok)throw new Error(a.statusText);return a.json()}),handleRefreshTokenInvalid:async()=>{window.location.href="/user/login"},handleWebAccessTokenExpire:async()=>{const t={grant_type:"refresh_token",refresh_token:localStorage.getItem(l.REFRESH_TOKEN_NAME)};return await N.refreshWebAccessToken(t)},handleAccessTokenExpire:async()=>{const t={grant_type:"refresh_token",refresh_token:await D.readLocalStorage(l.REFRESH_TOKEN_NAME)};N.refreshAccessToken(t)},refreshWebAccessToken:async e=>{const t=localStorage.getItem(l.BASE_AUTH_URL),o=localStorage.getItem(l.ACCESS_TOKEN_URL_PATH),a=t+o;return fetch(a,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then(i=>i.json()).then(i=>{if(i&&i.resultCode==="200"){const g=i.result.accessToken;return localStorage.setItem(l.ACCESS_TOKEN_NAME,g),x=!1,Promise.resolve(i)}return Promise.reject(i)})},refreshAccessToken:async e=>{const t=await D.readLocalStorage(l.BASE_AUTH_URL),o=await D.readLocalStorage(l.ACCESS_TOKEN_URL_PATH),a=t+o;fetch(a,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then(i=>i.json()).then(i=>{if((i&&i.resultCode===R.REFRESH_TOKEN_EXPIRED||i&&i.resultCode===R.REFRESH_TOKEN_INVALID)&&N.handleRefreshTokenInvalid(),i&&i.resultCode==="200"){const g=i.result.accessToken;chrome.storage.local.set({[l.ACCESS_TOKEN_NAME]:g},function(){x=!1})}})},refreshRefreshToken:async e=>{const t=await D.readLocalStorage(l.BASE_AUTH_URL),o=await localStorage.readLocalStorage(l.REFRESH_TOKEN_URL_PATH),a=t+o;fetch(a,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then(i=>i.json()).then(i=>{if(i&&i.resultCode===R.REFRESH_TOKEN_INVALID&&V.pluginLogin(),i&&i.resultCode==="200"){const g=i.result.accessToken,E=i.result.refreshToken;chrome.storage.local.set({[l.ACCESS_TOKEN_NAME]:g,[l.REFRESH_TOKEN_NAME]:E},function(){x=!1})}})}},Se={responseSuccess:e=>ae.isNull(e)?!1:e.statusCode==="200"&&e.resultCode==="200",handleCommonFailure:e=>{e.resultCode===R.ACCESS_TOKEN_EXPIRED&&N.handleAccessTokenExpire()},handleWebCommonFailure:async e=>{if(e.resultCode===R.ACCESS_TOKEN_EXPIRED)return await N.handleWebAccessTokenExpire()},mapPageResponse:e=>({data:e.result.list,pagination:{total:e.result.pagination.total,per_page:e.result.pagination.pageSize,page:e.result.pagination.pageNum}})};var pe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function me(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var re={exports:{}};(function(e,t){(function(o,a){e.exports=a()})(pe,function(){var o=1e3,a=6e4,i=36e5,g="millisecond",E="second",y="minute",C="hour",w="day",L="week",A="month",P="quarter",k="year",j="date",oe="Invalid Date",Te=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,ye=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,Ae={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},ee=function(c,s,n){var u=String(c);return!u||u.length>=s?c:""+Array(s+1-u.length).join(n)+c},$e={s:ee,z:function(c){var s=-c.utcOffset(),n=Math.abs(s),u=Math.floor(n/60),r=n%60;return(s<=0?"+":"-")+ee(u,2,"0")+":"+ee(r,2,"0")},m:function c(s,n){if(s.date()<n.date())return-c(n,s);var u=12*(n.year()-s.year())+(n.month()-s.month()),r=s.clone().add(u,A),f=n-r<0,d=s.clone().add(u+(f?-1:1),A);return+(-(u+(n-r)/(f?r-d:d-r))||0)},a:function(c){return c<0?Math.ceil(c)||0:Math.floor(c)},p:function(c){return{M:A,y:k,w:L,d:w,D:j,h:C,m:y,s:E,ms:g,Q:P}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(c){return c===void 0}},F="en",U={};U[F]=Ae;var te=function(c){return c instanceof Z},J=function(c,s,n){var u;if(!c)return F;if(typeof c=="string")U[c]&&(u=c),s&&(U[c]=s,u=c);else{var r=c.name;U[r]=c,u=r}return!n&&u&&(F=u),u||!n&&F},_=function(c,s){if(te(c))return c.clone();var n=typeof s=="object"?s:{};return n.date=c,n.args=arguments,new Z(n)},h=$e;h.l=J,h.i=te,h.w=function(c,s){return _(c,{locale:s.$L,utc:s.$u,x:s.$x,$offset:s.$offset})};var Z=function(){function c(n){this.$L=J(n.locale,null,!0),this.parse(n)}var s=c.prototype;return s.parse=function(n){this.$d=function(u){var r=u.date,f=u.utc;if(r===null)return new Date(NaN);if(h.u(r))return new Date;if(r instanceof Date)return new Date(r);if(typeof r=="string"&&!/Z$/i.test(r)){var d=r.match(Te);if(d){var S=d[2]-1||0,m=(d[7]||"0").substring(0,3);return f?new Date(Date.UTC(d[1],S,d[3]||1,d[4]||0,d[5]||0,d[6]||0,m)):new Date(d[1],S,d[3]||1,d[4]||0,d[5]||0,d[6]||0,m)}}return new Date(r)}(n),this.$x=n.x||{},this.init()},s.init=function(){var n=this.$d;this.$y=n.getFullYear(),this.$M=n.getMonth(),this.$D=n.getDate(),this.$W=n.getDay(),this.$H=n.getHours(),this.$m=n.getMinutes(),this.$s=n.getSeconds(),this.$ms=n.getMilliseconds()},s.$utils=function(){return h},s.isValid=function(){return this.$d.toString()!==oe},s.isSame=function(n,u){var r=_(n);return this.startOf(u)<=r&&r<=this.endOf(u)},s.isAfter=function(n,u){return _(n)<this.startOf(u)},s.isBefore=function(n,u){return this.endOf(u)<_(n)},s.$g=function(n,u,r){return h.u(n)?this[u]:this.set(r,n)},s.unix=function(){return Math.floor(this.valueOf()/1e3)},s.valueOf=function(){return this.$d.getTime()},s.startOf=function(n,u){var r=this,f=!!h.u(u)||u,d=h.p(n),S=function(K,O){var H=h.w(r.$u?Date.UTC(r.$y,O,K):new Date(r.$y,O,K),r);return f?H:H.endOf(w)},m=function(K,O){return h.w(r.toDate()[K].apply(r.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(O)),r)},p=this.$W,$=this.$M,b=this.$D,v="set"+(this.$u?"UTC":"");switch(d){case k:return f?S(1,0):S(31,11);case A:return f?S(1,$):S(0,$+1);case L:var W=this.$locale().weekStart||0,Y=(p<W?p+7:p)-W;return S(f?b-Y:b+(6-Y),$);case w:case j:return m(v+"Hours",0);case C:return m(v+"Minutes",1);case y:return m(v+"Seconds",2);case E:return m(v+"Milliseconds",3);default:return this.clone()}},s.endOf=function(n){return this.startOf(n,!1)},s.$set=function(n,u){var r,f=h.p(n),d="set"+(this.$u?"UTC":""),S=(r={},r[w]=d+"Date",r[j]=d+"Date",r[A]=d+"Month",r[k]=d+"FullYear",r[C]=d+"Hours",r[y]=d+"Minutes",r[E]=d+"Seconds",r[g]=d+"Milliseconds",r)[f],m=f===w?this.$D+(u-this.$W):u;if(f===A||f===k){var p=this.clone().set(j,1);p.$d[S](m),p.init(),this.$d=p.set(j,Math.min(this.$D,p.daysInMonth())).$d}else S&&this.$d[S](m);return this.init(),this},s.set=function(n,u){return this.clone().$set(n,u)},s.get=function(n){return this[h.p(n)]()},s.add=function(n,u){var r,f=this;n=Number(n);var d=h.p(u),S=function($){var b=_(f);return h.w(b.date(b.date()+Math.round($*n)),f)};if(d===A)return this.set(A,this.$M+n);if(d===k)return this.set(k,this.$y+n);if(d===w)return S(1);if(d===L)return S(7);var m=(r={},r[y]=a,r[C]=i,r[E]=o,r)[d]||1,p=this.$d.getTime()+n*m;return h.w(p,this)},s.subtract=function(n,u){return this.add(-1*n,u)},s.format=function(n){var u=this,r=this.$locale();if(!this.isValid())return r.invalidDate||oe;var f=n||"YYYY-MM-DDTHH:mm:ssZ",d=h.z(this),S=this.$H,m=this.$m,p=this.$M,$=r.weekdays,b=r.months,v=function(O,H,ne,G){return O&&(O[H]||O(u,f))||ne[H].substr(0,G)},W=function(O){return h.s(S%12||12,O,"0")},Y=r.meridiem||function(O,H,ne){var G=O<12?"AM":"PM";return ne?G.toLowerCase():G},K={YY:String(this.$y).slice(-2),YYYY:this.$y,M:p+1,MM:h.s(p+1,2,"0"),MMM:v(r.monthsShort,p,b,3),MMMM:v(b,p),D:this.$D,DD:h.s(this.$D,2,"0"),d:String(this.$W),dd:v(r.weekdaysMin,this.$W,$,2),ddd:v(r.weekdaysShort,this.$W,$,3),dddd:$[this.$W],H:String(S),HH:h.s(S,2,"0"),h:W(1),hh:W(2),a:Y(S,m,!0),A:Y(S,m,!1),m:String(m),mm:h.s(m,2,"0"),s:String(this.$s),ss:h.s(this.$s,2,"0"),SSS:h.s(this.$ms,3,"0"),Z:d};return f.replace(ye,function(O,H){return H||K[O]||d.replace(":","")})},s.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},s.diff=function(n,u,r){var f,d=h.p(u),S=_(n),m=(S.utcOffset()-this.utcOffset())*a,p=this-S,$=h.m(this,S);return $=(f={},f[k]=$/12,f[A]=$,f[P]=$/3,f[L]=(p-m)/6048e5,f[w]=(p-m)/864e5,f[C]=p/i,f[y]=p/a,f[E]=p/o,f)[d]||p,r?$:h.a($)},s.daysInMonth=function(){return this.endOf(A).$D},s.$locale=function(){return U[this.$L]},s.locale=function(n,u){if(!n)return this.$L;var r=this.clone(),f=J(n,u,!0);return f&&(r.$L=f),r},s.clone=function(){return h.w(this.$d,this)},s.toDate=function(){return new Date(this.valueOf())},s.toJSON=function(){return this.isValid()?this.toISOString():null},s.toISOString=function(){return this.$d.toISOString()},s.toString=function(){return this.$d.toUTCString()},c}(),se=Z.prototype;return _.prototype=se,[["$ms",g],["$s",E],["$m",y],["$H",C],["$W",w],["$M",A],["$y",k],["$D",j]].forEach(function(c){se[c[1]]=function(s){return this.$g(s,c[0],c[1])}}),_.extend=function(c,s){return c.$i||(c(s,Z,_),c.$i=!0),_},_.locale=J,_.isDayjs=te,_.unix=function(c){return _(1e3*c)},_.en=U[F],_.Ls=U,_.p={},_})})(re);var Ee=re.exports;const X=me(Ee),I={getMonthStart:()=>{X().startOf("month").add(1,"day").set("year",2018).format("YYYY-MM-DD HH:mm:ss")},getMonthStartMilliseconds:()=>{X().startOf("month").valueOf()},getMonthEndMilliseconds:()=>{X().endOf("month").valueOf()},getFormattedTime(e){var t=new Date(e);return I.getCurrentFormattedTime(t)},getCurrentFormattedTime(e=new Date){const t=e.getFullYear(),o=I.padLeftZero(e.getMonth()+1),a=I.padLeftZero(e.getDate()),i=I.padLeftZero(e.getHours()),g=I.padLeftZero(e.getMinutes()),E=I.padLeftZero(e.getSeconds()),y=I.padLeftZero(e.getMilliseconds(),3);return`${t}-${o}-${a} ${i}:${g}:${E} ${y}`},padLeftZero(e,t=2){return(Array(t).join("0")+e).slice(-t)},getPrevFormattedTime:e=>{let t=new Date,o=parseInt((t.getTime()/1e3).toString()),a=new Date(e),i=parseInt((a.getTime()/1e3).toString()),g=a.getFullYear(),E=a.getMonth()+1,y=a.getDate(),C=a.getHours(),w=a.getMinutes();a.getSeconds();let L=o-i;if(L<60)return"刚刚";if(L<60*60)return Math.floor(L/60)+"分钟前";if(g===t.getFullYear()&&E===t.getMonth()+1&&y===t.getDate())return`${A(C)}:${A(w)}`;return`${g}-${A(E)}-${A(y)}`;function A(P){return P<10?"0"+P:P}}},Q={colorToRGBA:e=>{let t=document.createElement("canvas");t.height=1,t.width=1;let o=t.getContext("2d");return o?(o.fillStyle=e,o.fillRect(0,0,1,1),o.getImageData(0,0,1,1).data):[]},byteToHex:e=>("0"+e.toString(16)).slice(-2),colorToHex:e=>{var t,o;return t=Q.colorToRGBA(e),o=[0,1,2].map(function(a){return Q.byteToHex(t[a])}).join(""),"#"+o}},_e={fileToBase64:e=>new Promise((t,o)=>{const a=new FileReader;a.readAsDataURL(e),a.onload=()=>t(a.result),a.onerror=i=>o(i)})};M.AuthHandler=V,M.RdColor=Q,M.RdFile=_e,M.RequestHandler=N,M.ResponseCode=R,M.ResponseHandler=Se,M.TimeUtils=I,M.WheelGlobal=l,Object.defineProperty(M,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=rd-component.umd.js.map
