webpackJsonp([1],{"1ApN":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"footer"},[n("p",{staticClass:"footer-text"},[n("anchor",{staticClass:"footer-link",attrs:{href:t.repositoryUrl,shouldTrackClicks:!0}},[t._v("This site is open source")]),n("span",{staticClass:"copyright"},[t._v("© "+t._s(t.year)+" Adam Lynch")])],1)])};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},"3znZ":function(t,e,n){var r=n("u/4p");t.exports=function(t){return r(t,{weekStartsOn:1})}},"607n":function(t,e){t.exports=function(t){return t instanceof Date}},"7uvA":function(t,e,n){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return this.isAnchor?e("anchor",{attrs:{href:this.anchorUrl,rel:"noopener",shouldTrackClicks:this.shouldTrackAnchorClicks}},[this._t("default")],2):e("nuxt-link",{attrs:{to:this.nuxtLinkTo}},[this._t("default")],2)};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},D6ie:function(t,e,n){var r=n("xA5w"),a=n("3znZ"),i=n("iRXW"),s=6048e5;t.exports=function(t){var e=r(t),n=a(e).getTime()-i(e).getTime();return Math.round(n/s)+1}},DLCH:function(t,e,n){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"wrapper"},[e("main",{staticClass:"content"},[e("my-header"),e("nuxt"),e("my-footer")],1)])};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},DZXC:function(t,e,n){"use strict";var r=n("Dd8w"),a=n.n(r),i=n("GlXt"),s=n("NYxO"),o=n("z5cm");e.a={components:{Anchor:i.a,Navigation:o.a},computed:a()({},Object(s.mapState)(["githubAccountUrl","siteUrl"]))}},E9eh:function(t,e,n){"use strict";var r=n("cU7t"),a=n("aN3X");e.a={components:{"my-header":r.a,"my-footer":a.a}}},"Eoz/":function(t,e,n){var r=n("ymQ7"),a=n("D6ie"),i=n("zZbG"),s=n("xA5w"),o=n("dH3X"),u=n("uyaC");var c={M:function(t){return t.getMonth()+1},MM:function(t){return f(t.getMonth()+1,2)},Q:function(t){return Math.ceil((t.getMonth()+1)/3)},D:function(t){return t.getDate()},DD:function(t){return f(t.getDate(),2)},DDD:function(t){return r(t)},DDDD:function(t){return f(r(t),3)},d:function(t){return t.getDay()},E:function(t){return t.getDay()||7},W:function(t){return a(t)},WW:function(t){return f(a(t),2)},YY:function(t){return f(t.getFullYear(),4).substr(2)},YYYY:function(t){return f(t.getFullYear(),4)},GG:function(t){return String(i(t)).substr(2)},GGGG:function(t){return i(t)},H:function(t){return t.getHours()},HH:function(t){return f(t.getHours(),2)},h:function(t){var e=t.getHours();return 0===e?12:e>12?e%12:e},hh:function(t){return f(c.h(t),2)},m:function(t){return t.getMinutes()},mm:function(t){return f(t.getMinutes(),2)},s:function(t){return t.getSeconds()},ss:function(t){return f(t.getSeconds(),2)},S:function(t){return Math.floor(t.getMilliseconds()/100)},SS:function(t){return f(Math.floor(t.getMilliseconds()/10),2)},SSS:function(t){return f(t.getMilliseconds(),3)},Z:function(t){return l(t.getTimezoneOffset(),":")},ZZ:function(t){return l(t.getTimezoneOffset())},X:function(t){return Math.floor(t.getTime()/1e3)},x:function(t){return t.getTime()}};function l(t,e){e=e||"";var n=t>0?"-":"+",r=Math.abs(t),a=r%60;return n+f(Math.floor(r/60),2)+e+f(a,2)}function f(t,e){for(var n=Math.abs(t).toString();n.length<e;)n="0"+n;return n}t.exports=function(t,e,n){var r=e?String(e):"YYYY-MM-DDTHH:mm:ss.SSSZ",a=(n||{}).locale,i=u.format.formatters,l=u.format.formattingTokensRegExp;a&&a.format&&a.format.formatters&&(i=a.format.formatters,a.format.formattingTokensRegExp&&(l=a.format.formattingTokensRegExp));var f=s(t);return o(f)?function(t,e,n){var r,a,i,s=t.match(n),o=s.length;for(r=0;r<o;r++)a=e[s[r]]||c[s[r]],s[r]=a||(i=s[r],i.match(/\[[\s\S]/)?i.replace(/^\[|]$/g,""):i.replace(/\\/g,""));return function(t){for(var e="",n=0;n<o;n++)s[n]instanceof Function?e+=s[n](t,c):e+=s[n];return e}}(r,i,l)(f):"Invalid Date"}},GlXt:function(t,e,n){"use strict";var r=n("NiQ3"),a=n("WmDo"),i=n("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Anchor/Anchor.vue",e.a=i.exports},"I+Sj":function(t,e,n){"use strict";var r=n("Dd8w"),a=n.n(r),i=n("GlXt"),s=n("Eoz/"),o=n.n(s),u=n("NYxO");e.a={components:{Anchor:i.a},data:function(){return{year:o()(new Date,"YYYY")}},computed:a()({},Object(u.mapState)(["repositoryUrl"]))}},JURy:function(t,e,n){var r=n("xA5w");t.exports=function(t){var e=r(t),n=new Date(0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}},LfSB:function(t,e,n){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"header"},[e("h1",{staticClass:"site-title"},[e("nuxt-link",{staticClass:"site-link",attrs:{to:{name:"@nuxtjs/blog:index"}}},[this._v("Adam Lynch")])],1),e("div",{staticClass:"site-happy-text-wrapper"},[e("p",{staticClass:"site-happy-text"},[e("span",{staticClass:"site-happy-text-headline"},[this._v("\n                I'm "),e("nuxt-link",{staticClass:"site-happy-text-headline-link",attrs:{to:{name:"@nuxtjs/blog:index"}}},[this._v("Adam Lynch")]),this._v(".\n            ")],1),e("span",{staticClass:"site-happy-text-tagline"},[this._v("\n                I like to\n                "),e("anchor",{staticClass:"site-happy-text-tagline-link",attrs:{href:this.githubAccountUrl,shouldTrackClicks:!0}},[this._v("code")]),this._v(",\n                "),e("nuxt-link",{staticClass:"site-happy-text-tagline-link",attrs:{to:{name:"@nuxtjs/blog:index"}}},[this._v("write")]),this._v(", and dabble in design.\n            ")],1),e("span",{staticClass:"site-happy-text-tagline"},[this._v("\n                I lead "),e("anchor",{staticClass:"site-happy-text-tagline-link",attrs:{href:"https://www.teamwork.com",shouldTrackClicks:!0}},[this._v("Teamwork.com")]),this._v("'s next product.\n            ")],1)])]),e("navigation")],1)};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},MANi:function(t,e,n){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"navigation-item",class:this.specificClasses},[e("anchor-or-nuxt-link",{staticClass:"navigation-link",attrs:{anchorUrl:this.url,isAnchor:this.isExternal,nuxtLinkTo:this.url,shouldTrackAnchorClicks:this.shouldTrackAnchorClicks}},[e("span",{staticClass:"navigation-item-text"},[this._v(this._s(this.text))])])],1)};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},Ma2J:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("E9eh"),a=n("DLCH"),i=n("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="layouts/default.vue",e.default=i.exports},Mn49:function(t,e,n){"use strict";var r=n("VPB+"),a=n("7uvA"),i=n("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/AnchorOrNuxtLink/AnchorOrNuxtLink.vue",e.a=i.exports},NiQ3:function(t,e,n){"use strict";var r=n("YK/h");e.a={methods:{onClick:function(t){var e=t.target;this.shouldTrackClicks&&Object(r.a)(e.href)}},props:{shouldTrackClicks:Boolean}}},Ptqd:function(t,e){t.exports=function(){var t={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};return{localize:function(e,n,r){var a;return r=r||{},a="string"==typeof t[e]?t[e]:1===n?t[e].one:t[e].other.replace("{{count}}",n),r.addSuffix?r.comparison>0?"in "+a:a+" ago":a}}}},SJLv:function(t,e){var n=["M","MM","Q","D","DD","DDD","DDDD","d","E","W","WW","YY","YYYY","GG","GGGG","H","HH","h","hh","m","mm","s","ss","S","SS","SSS","Z","ZZ","X","x"];t.exports=function(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r);var a=n.concat(e).sort().reverse();return new RegExp("(\\[[^\\[]*\\])|(\\\\)?("+a.join("|")+"|.)","g")}},"VPB+":function(t,e,n){"use strict";var r=n("GlXt");e.a={components:{Anchor:r.a},props:{anchorUrl:String,nuxtLinkTo:{type:[Object,String],required:!0},isAnchor:Boolean,shouldTrackAnchorClicks:Boolean}}},WNGz:function(t,e,n){var r=n("xA5w");t.exports=function(t){var e=r(t);return e.setHours(0,0,0,0),e}},WmDo:function(t,e,n){"use strict";var r=function(){var t=this.$createElement;return(this._self._c||t)("a",{on:{click:this.onClick}},[this._t("default")],2)};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},"YK/h":function(t,e,n){"use strict";e.a=function(t){"function"==typeof ga&&ga("send","event","outbound","click",t)}},YijW:function(t,e,n){"use strict";var r=n("Dd8w"),a=n.n(r),i=n("NYxO"),s=n("dYJn");e.a={components:{NavigationItem:s.a},computed:a()({},Object(i.mapState)(["githubAccountUrl","repositoryUrl"]))}},aN3X:function(t,e,n){"use strict";var r=n("I+Sj"),a=n("1ApN"),i=n("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Footer/Footer.vue",e.a=i.exports},cU7t:function(t,e,n){"use strict";var r=n("DZXC"),a=n("LfSB"),i=n("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Header/Header.vue",e.a=i.exports},d4mu:function(t,e,n){"use strict";var r=n("Mn49");e.a={components:{AnchorOrNuxtLink:r.a},computed:{isExternal:function(){return/^[a-z]+:/.test(this.url)}},props:{shouldTrackAnchorClicks:Boolean,specificClasses:String,text:{required:!0,type:String},url:{required:!0,type:String}}}},dH3X:function(t,e,n){var r=n("607n");t.exports=function(t){if(r(t))return!isNaN(t);throw new TypeError(toString.call(t)+" is not an instance of Date")}},dYJn:function(t,e,n){"use strict";var r=n("d4mu"),a=n("MANi"),i=n("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/NavigationItem/NavigationItem.vue",e.a=i.exports},iRXW:function(t,e,n){var r=n("zZbG"),a=n("3znZ");t.exports=function(t){var e=r(t),n=new Date(0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),a(n)}},jQas:function(t,e,n){var r=n("SJLv");t.exports=function(){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Su","Mo","Tu","We","Th","Fr","Sa"],a=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],i=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=["AM","PM"],o=["am","pm"],u=["a.m.","p.m."],c={MMM:function(e){return t[e.getMonth()]},MMMM:function(t){return e[t.getMonth()]},dd:function(t){return n[t.getDay()]},ddd:function(t){return a[t.getDay()]},dddd:function(t){return i[t.getDay()]},A:function(t){return t.getHours()/12>=1?s[1]:s[0]},a:function(t){return t.getHours()/12>=1?o[1]:o[0]},aa:function(t){return t.getHours()/12>=1?u[1]:u[0]}};return["M","D","DDD","d","Q","W"].forEach(function(t){c[t+"o"]=function(e,n){return function(t){var e=t%100;if(e>20||e<10)switch(e%10){case 1:return t+"st";case 2:return t+"nd";case 3:return t+"rd"}return t+"th"}(n[t](e))}}),{formatters:c,formattingTokensRegExp:r(c)}}},nizW:function(t,e,n){var r=n("WNGz"),a=6e4,i=864e5;t.exports=function(t,e){var n=r(t),s=r(e),o=n.getTime()-n.getTimezoneOffset()*a,u=s.getTime()-s.getTimezoneOffset()*a;return Math.round((o-u)/i)}},oE8Y:function(t,e,n){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return e("nav",{staticClass:"navigation-wrapper",attrs:{role:"navigation"}},[e("ul",{staticClass:"navigation"},[e("navigation-item",{attrs:{shouldTrackAnchorClicks:!1,specificClasses:"writing-navigation-item",text:"Writing",url:"/"}}),e("navigation-item",{attrs:{shouldTrackAnchorClicks:!0,specificClasses:"code-navigation-item",text:"Code",url:this.githubAccountUrl}}),e("navigation-item",{attrs:{shouldTrackAnchorClicks:!0,specificClasses:"edit-navigation-item",text:"Edit page",url:this.repositoryUrl}}),e("navigation-item",{attrs:{shouldTrackAnchorClicks:!0,specificClasses:"twitter-navigation-item",text:"Twitter",url:"https://twitter.com/lynchy010/"}}),e("navigation-item",{attrs:{shouldTrackAnchorClicks:!0,specificClasses:"email-navigation-item",text:"Email",url:"mailto:contact@adamlynch.com"}}),e("navigation-item",{attrs:{shouldTrackAnchorClicks:!0,specificClasses:"linkedin-navigation-item",text:"LinkedIn",url:"https://www.linkedin.com/in/adamlynch010/"}})],1)])};r._withStripped=!0;var a={render:r,staticRenderFns:[]};e.a=a},"u/4p":function(t,e,n){var r=n("xA5w");t.exports=function(t,e){var n=e?Number(e.weekStartsOn)||0:0,a=r(t),i=a.getDay(),s=(i<n?7:0)+i-n;return a.setDate(a.getDate()-s),a.setHours(0,0,0,0),a}},uyaC:function(t,e,n){var r=n("Ptqd"),a=n("jQas");t.exports={distanceInWords:r(),format:a()}},xA5w:function(t,e,n){var r=n("607n"),a=36e5,i=6e4,s=2,o=/[T ]/,u=/:/,c=/^(\d{2})$/,l=[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],f=/^(\d{4})/,h=[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],p=/^-(\d{2})$/,d=/^-?(\d{3})$/,v=/^-?(\d{2})-?(\d{2})$/,m=/^-?W(\d{2})$/,g=/^-?W(\d{2})-?(\d{1})$/,x=/^(\d{2}([.,]\d*)?)$/,y=/^(\d{2}):?(\d{2}([.,]\d*)?)$/,D=/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,k=/([Z+-].*)$/,C=/^(Z)$/,T=/^([+-])(\d{2})$/,S=/^([+-])(\d{2}):?(\d{2})$/;function w(t,e,n){e=e||0,n=n||0;var r=new Date(0);r.setUTCFullYear(t,0,4);var a=7*e+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+a),r}t.exports=function(t,e){if(r(t))return new Date(t.getTime());if("string"!=typeof t)return new Date(t);var n=(e||{}).additionalDigits;n=null==n?s:Number(n);var _=function(t){var e,n={},r=t.split(o);if(u.test(r[0])?(n.date=null,e=r[0]):(n.date=r[0],e=r[1]),e){var a=k.exec(e);a?(n.time=e.replace(a[1],""),n.timezone=a[1]):n.time=e}return n}(t),M=function(t,e){var n,r=l[e],a=h[e];if(n=f.exec(t)||a.exec(t)){var i=n[1];return{year:parseInt(i,10),restDateString:t.slice(i.length)}}if(n=c.exec(t)||r.exec(t)){var s=n[1];return{year:100*parseInt(s,10),restDateString:t.slice(s.length)}}return{year:null}}(_.date,n),A=M.year,Y=function(t,e){if(null===e)return null;var n,r,a,i;if(0===t.length)return(r=new Date(0)).setUTCFullYear(e),r;if(n=p.exec(t))return r=new Date(0),a=parseInt(n[1],10)-1,r.setUTCFullYear(e,a),r;if(n=d.exec(t)){r=new Date(0);var s=parseInt(n[1],10);return r.setUTCFullYear(e,0,s),r}if(n=v.exec(t)){r=new Date(0),a=parseInt(n[1],10)-1;var o=parseInt(n[2],10);return r.setUTCFullYear(e,a,o),r}if(n=m.exec(t))return i=parseInt(n[1],10)-1,w(e,i);if(n=g.exec(t)){i=parseInt(n[1],10)-1;var u=parseInt(n[2],10)-1;return w(e,i,u)}return null}(M.restDateString,A);if(Y){var b,F=Y.getTime(),U=0;return _.time&&(U=function(t){var e,n,r;if(e=x.exec(t))return(n=parseFloat(e[1].replace(",",".")))%24*a;if(e=y.exec(t))return n=parseInt(e[1],10),r=parseFloat(e[2].replace(",",".")),n%24*a+r*i;if(e=D.exec(t)){n=parseInt(e[1],10),r=parseInt(e[2],10);var s=parseFloat(e[3].replace(",","."));return n%24*a+r*i+1e3*s}return null}(_.time)),_.timezone?(H=_.timezone,b=(N=C.exec(H))?0:(N=T.exec(H))?(z=60*parseInt(N[2],10),"+"===N[1]?-z:z):(N=S.exec(H))?(z=60*parseInt(N[2],10)+parseInt(N[3],10),"+"===N[1]?-z:z):0):(b=new Date(F+U).getTimezoneOffset(),b=new Date(F+U+b*i).getTimezoneOffset()),new Date(F+U+b*i)}var H,N,z;return new Date(t)}},ymQ7:function(t,e,n){var r=n("xA5w"),a=n("JURy"),i=n("nizW");t.exports=function(t){var e=r(t);return i(e,a(e))+1}},z5cm:function(t,e,n){"use strict";var r=n("YijW"),a=n("oE8Y"),i=n("VU/8")(r.a,a.a,!1,null,null,null);i.options.__file="components/Navigation/Navigation.vue",e.a=i.exports},zZbG:function(t,e,n){var r=n("xA5w"),a=n("3znZ");t.exports=function(t){var e=r(t),n=e.getFullYear(),i=new Date(0);i.setFullYear(n+1,0,4),i.setHours(0,0,0,0);var s=a(i),o=new Date(0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);var u=a(o);return e.getTime()>=s.getTime()?n+1:e.getTime()>=u.getTime()?n:n-1}}});