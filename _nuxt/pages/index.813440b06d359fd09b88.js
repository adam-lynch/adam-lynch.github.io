webpackJsonp([0],{"+ptz":function(t,e,n){"use strict";var r=function(){var t=this.$createElement;return(this._self._c||t)("blog",{attrs:{page:this.page}})};r._withStripped=!0;var o={render:r,staticRenderFns:[]};e.a=o},"/TYz":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("EdF1"),o=n("+ptz"),a=n("VU/8")(r.a,o.a,!1,null,null,null);a.options.__file="pages/index.vue",e.default=a.exports},"3eiB":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("article",{staticClass:"post"},[n("h3",{staticClass:"post-title-wrapper"},[n("a",{staticClass:"post-title",attrs:{href:"/"},on:{click:function(e){e.preventDefault(),t.onClickPostTitle(e)}}},[t._v("\n        "+t._s(t.title)+"\n        "),t.isBook?n("span",{staticClass:"post-title-label"},[n("span",{staticClass:"post-title-label-parenthesis"},[t._v("(")]),t._v("Book"),n("span",{staticClass:"post-title-label-parenthesis"},[t._v(")")])]):t._e()])]),n("div",{staticClass:"post-meta"},[n("time",{staticClass:"post-blog-date"},[t._v(t._s(t.prettyDate))]),t.original.onlyExternal?n("span",{staticClass:"post-blog-title"},[n("anchor",{staticClass:"post-blog-link",attrs:{href:t.original.blogLink,shouldTrackClicks:!0}},[t._v(t._s(t.original.blogName))])],1):t._e()]),n("div",{staticClass:"post-summary"},[n("div",{staticClass:"post-content",domProps:{innerHTML:t._s(t.renderedSummary)}}),t._v("  \n      "),n("anchor-or-nuxt-link",{staticClass:"post-read-more-link",attrs:{anchorUrl:t.original.url,isAnchor:t.original.onlyExternal,nuxtLinkTo:t.to,shouldTrackAnchorClicks:!0}},[t.isBook?n("span",[t._v("Get the book")]):n("span",[t._v("Read more")])])],1),t._l(t.skeletons,function(e,r){return n("div",{key:r,staticClass:"post-skeleton",attrs:{"aria-hidden":"true"}},t._l(e.words,function(t,e){return n("span",{key:e,staticClass:"post-skeleton-word"})}))})],2)};r._withStripped=!0;var o={render:r,staticRenderFns:[]};e.a=o},"3znZ":function(t,e,n){var r=n("u/4p");t.exports=function(t){return r(t,{weekStartsOn:1})}},"607n":function(t,e){t.exports=function(t){return t instanceof Date}},"7uvA":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isAnchor?n("anchor",{attrs:{href:t.anchorUrl,rel:"noopener",shouldTrackClicks:t.shouldTrackAnchorClicks}},[t._t("default")],2):n("anchor",{attrs:{href:t.nuxtHref},nativeOn:{click:function(e){e.preventDefault(),t.navigate(e)}}},[t._t("default")],2)};r._withStripped=!0;var o={render:r,staticRenderFns:[]};e.a=o},D6ie:function(t,e,n){var r=n("xA5w"),o=n("3znZ"),a=n("iRXW"),s=6048e5;t.exports=function(t){var e=r(t),n=o(e).getTime()-a(e).getTime();return Math.round(n/s)+1}},EdF1:function(t,e,n){"use strict";var r=n("Zx67"),o=n.n(r),a=n("Xxa5"),s=n.n(a),u=n("pFYg"),i=n.n(u),c=n("exGp"),l=n.n(c),f=n("GsWm"),p=n("lHNk"),d=n("Tzyb").default.api;e.a={asyncData:function(){var t=l()(s.a.mark(function t(e){var n,r,o;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.params,r=e.payload,o=e.app,"object"!==(void 0===r?"undefined":i()(r))||!r){t.next=3;break}return t.abrupt("return",{page:r});case 3:return t.next=5,d("/writing",n,o);case 5:return t.t0=t.sent,t.abrupt("return",{page:t.t0});case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),beforeCreate:function(){},components:{Blog:f.a},transition:function(t,e){if(e&&t&&"@nuxtjs/blog:article"===t.name&&requestAnimationFrame){var n=document.querySelector('.posts a.post-title[href="'+t.fullPath+'"]');if(n&&o()(n).closest){var r=document.body.getBoundingClientRect().top,a=n.closest(".post-wrapper");a.classList.add("post-wrapper--entering-from-posts");var s=a.closest(".posts"),u=Math.abs(r-s.getBoundingClientRect().top),i=parseInt(window.getComputedStyle(s,null).getPropertyValue("padding-top"),10),c=Math.abs(r-a.getBoundingClientRect().top),l=c-u-i,f=document.createElement("li");return f.innerHTML=a.innerHTML,f.classList.add("post-wrapper","post-wrapper--entering-from-posts"),f.style.top=Math.max(l,i)+"px",f.style.position="absolute",f.style.zIndex=1e4,s.classList.add("posts--entering-post"),s.appendChild(f),requestAnimationFrame(function(){l&&(f.style.transform="translate3d(0, -"+(c-u-2*i)+"px, 0)"),Object(p.a)(0,function(){},300)}),{duration:400}}}}}},"Eoz/":function(t,e,n){var r=n("ymQ7"),o=n("D6ie"),a=n("zZbG"),s=n("xA5w"),u=n("dH3X"),i=n("uyaC");var c={M:function(t){return t.getMonth()+1},MM:function(t){return f(t.getMonth()+1,2)},Q:function(t){return Math.ceil((t.getMonth()+1)/3)},D:function(t){return t.getDate()},DD:function(t){return f(t.getDate(),2)},DDD:function(t){return r(t)},DDDD:function(t){return f(r(t),3)},d:function(t){return t.getDay()},E:function(t){return t.getDay()||7},W:function(t){return o(t)},WW:function(t){return f(o(t),2)},YY:function(t){return f(t.getFullYear(),4).substr(2)},YYYY:function(t){return f(t.getFullYear(),4)},GG:function(t){return String(a(t)).substr(2)},GGGG:function(t){return a(t)},H:function(t){return t.getHours()},HH:function(t){return f(t.getHours(),2)},h:function(t){var e=t.getHours();return 0===e?12:e>12?e%12:e},hh:function(t){return f(c.h(t),2)},m:function(t){return t.getMinutes()},mm:function(t){return f(t.getMinutes(),2)},s:function(t){return t.getSeconds()},ss:function(t){return f(t.getSeconds(),2)},S:function(t){return Math.floor(t.getMilliseconds()/100)},SS:function(t){return f(Math.floor(t.getMilliseconds()/10),2)},SSS:function(t){return f(t.getMilliseconds(),3)},Z:function(t){return l(t.getTimezoneOffset(),":")},ZZ:function(t){return l(t.getTimezoneOffset())},X:function(t){return Math.floor(t.getTime()/1e3)},x:function(t){return t.getTime()}};function l(t,e){e=e||"";var n=t>0?"-":"+",r=Math.abs(t),o=r%60;return n+f(Math.floor(r/60),2)+e+f(o,2)}function f(t,e){for(var n=Math.abs(t).toString();n.length<e;)n="0"+n;return n}t.exports=function(t,e,n){var r=e?String(e):"YYYY-MM-DDTHH:mm:ss.SSSZ",o=(n||{}).locale,a=i.format.formatters,l=i.format.formattingTokensRegExp;o&&o.format&&o.format.formatters&&(a=o.format.formatters,o.format.formattingTokensRegExp&&(l=o.format.formattingTokensRegExp));var f=s(t);return u(f)?function(t,e,n){var r,o,a,s=t.match(n),u=s.length;for(r=0;r<u;r++)o=e[s[r]]||c[s[r]],s[r]=o||(a=s[r],a.match(/\[[\s\S]/)?a.replace(/^\[|]$/g,""):a.replace(/\\/g,""));return function(t){for(var e="",n=0;n<u;n++)s[n]instanceof Function?e+=s[n](t,c):e+=s[n];return e}}(r,a,l)(f):"Invalid Date"}},GlXt:function(t,e,n){"use strict";var r=n("NiQ3"),o=n("WmDo"),a=n("VU/8")(r.a,o.a,!1,null,null,null);a.options.__file="components/Anchor/Anchor.vue",e.a=a.exports},GsWm:function(t,e,n){"use strict";var r=n("gq/a"),o=n("ShsV"),a=n("VU/8")(r.a,o.a,!1,null,null,null);a.options.__file="components/Blog/Blog.vue",e.a=a.exports},JURy:function(t,e,n){var r=n("xA5w");t.exports=function(t){var e=r(t),n=new Date(0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}},Kh5d:function(t,e,n){var r=n("sB3e"),o=n("PzxK");n("uqUo")("getPrototypeOf",function(){return function(t){return o(r(t))}})},Mn49:function(t,e,n){"use strict";var r=n("VPB+"),o=n("7uvA"),a=n("VU/8")(r.a,o.a,!1,null,null,null);a.options.__file="components/AnchorOrNuxtLink/AnchorOrNuxtLink.vue",e.a=a.exports},NiQ3:function(t,e,n){"use strict";var r=n("YK/h");e.a={methods:{onClick:function(t){var e=t.target;this.shouldTrackClicks&&Object(r.a)(e.href)}},props:{shouldTrackClicks:Boolean}}},Ptqd:function(t,e){t.exports=function(){var t={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};return{localize:function(e,n,r){var o;return r=r||{},o="string"==typeof t[e]?t[e]:1===n?t[e].one:t[e].other.replace("{{count}}",n),r.addSuffix?r.comparison>0?"in "+o:o+" ago":o}}}},"R/Eb":function(t,e,n){"use strict";var r=n("z8J+"),o=n("3eiB"),a=n("VU/8")(r.a,o.a,!1,null,null,null);a.options.__file="components/PostPreview/PostPreview.vue",e.a=a.exports},SJLv:function(t,e){var n=["M","MM","Q","D","DD","DDD","DDDD","d","E","W","WW","YY","YYYY","GG","GGGG","H","HH","h","hh","m","mm","s","ss","S","SS","SSS","Z","ZZ","X","x"];t.exports=function(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r);var o=n.concat(e).sort().reverse();return new RegExp("(\\[[^\\[]*\\])|(\\\\)?("+o.join("|")+"|.)","g")}},ShsV:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ol",{staticClass:"posts",attrs:{id:"writing"}},t._l(t.articles,function(e){return n("li",{key:e.title,staticClass:"post-wrapper"},[n("post-preview",t._b({},"post-preview",e,!1))],1)}))};r._withStripped=!0;var o={render:r,staticRenderFns:[]};e.a=o},Tzyb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n("Xxa5"),a=n.n(o),s=n("exGp"),u=n.n(s),i=n("pFYg"),c=n.n(i),l=n("fZjL"),f=n.n(l),p=this,d="http://localhost:3000".replace(/\/$/,""),h=function(t,e){return f()(e).forEach(function(n){["number","string"].includes(c()(e[n]))&&(t=t.replace(new RegExp(":"+n,"gi"),""+e[n]))}),t.replace(/\/?:[^/]+/g,"").replace(/\/+/g,"/").replace(/\/$/,"")},g=function(){var t=u()(a.a.mark(function t(e,n){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n&&"$axios"in n){t.next=5;break}return console.log("Use @nuxtjs/axios or axios plugin.\nthis.$axios is requried to fetch from blog API.\nFalling back to fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"),t.next=4,fetch(e);case 4:return t.abrupt("return",t.sent.json());case 5:return t.next=7,n.$axios.get(e);case 7:return t.abrupt("return",t.sent.data);case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}(),m=(r=u()(a.a.mark(function t(e,n,r){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",g(""+d+h("/_nuxt/api/writing/"+e,n)+".json",r));case 2:return t.abrupt("return",g(""+d+h("/api/writing/"+e,n),r));case 3:case"end":return t.stop()}},t,p)})),function(t,e,n){return r.apply(this,arguments)});e.default={api:m,get:g,format:h}},"VPB+":function(t,e,n){"use strict";var r=n("GlXt");e.a={components:{Anchor:r.a},computed:{nuxtHref:function(){return this.$router.resolve(this.nuxtLinkTo).href}},methods:{navigate:function(){this.$router.push(this.nuxtLinkTo)}},props:{anchorUrl:String,nuxtLinkTo:{type:[Object,String],required:!0},isAnchor:Boolean,shouldTrackAnchorClicks:Boolean}}},WNGz:function(t,e,n){var r=n("xA5w");t.exports=function(t){var e=r(t);return e.setHours(0,0,0,0),e}},WmDo:function(t,e,n){"use strict";var r=function(){var t=this.$createElement;return(this._self._c||t)("a",{on:{click:this.onClick}},[this._t("default")],2)};r._withStripped=!0;var o={render:r,staticRenderFns:[]};e.a=o},"YK/h":function(t,e,n){"use strict";e.a=function(t){"function"==typeof ga&&ga("send","event","outbound","click",t)}},Zx67:function(t,e,n){t.exports={default:n("fS6E"),__esModule:!0}},dH3X:function(t,e,n){var r=n("607n");t.exports=function(t){if(r(t))return!isNaN(t);throw new TypeError(toString.call(t)+" is not an instance of Date")}},fS6E:function(t,e,n){n("Kh5d"),t.exports=n("FeBl").Object.getPrototypeOf},gDPd:function(t,e,n){var r=n("xA5w");t.exports=function(t,e){var n=r(t),o=r(e);return n.getTime()<o.getTime()}},"gq/a":function(t,e,n){"use strict";var r=n("gDPd"),o=n.n(r),a=n("R/Eb");e.a={components:{PostPreview:a.a},computed:{articles:function(){return this.page?this.page.sort(function(t,e){var n=t.published_at,r=e.published_at;return n===r?0:o()(n,r)?1:-1}):[]}},props:{page:{type:Array,required:!0}}}},iRXW:function(t,e,n){var r=n("zZbG"),o=n("3znZ");t.exports=function(t){var e=r(t),n=new Date(0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),o(n)}},jQas:function(t,e,n){var r=n("SJLv");t.exports=function(){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Su","Mo","Tu","We","Th","Fr","Sa"],o=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=["AM","PM"],u=["am","pm"],i=["a.m.","p.m."],c={MMM:function(e){return t[e.getMonth()]},MMMM:function(t){return e[t.getMonth()]},dd:function(t){return n[t.getDay()]},ddd:function(t){return o[t.getDay()]},dddd:function(t){return a[t.getDay()]},A:function(t){return t.getHours()/12>=1?s[1]:s[0]},a:function(t){return t.getHours()/12>=1?u[1]:u[0]},aa:function(t){return t.getHours()/12>=1?i[1]:i[0]}};return["M","D","DDD","d","Q","W"].forEach(function(t){c[t+"o"]=function(e,n){return function(t){var e=t%100;if(e>20||e<10)switch(e%10){case 1:return t+"st";case 2:return t+"nd";case 3:return t+"rd"}return t+"th"}(n[t](e))}}),{formatters:c,formattingTokensRegExp:r(c)}}},lHNk:function(t,e,n){"use strict";e.a=function(t,e,n){var r=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,o=t-r,a=0;n=void 0===n?500:n,function t(){a+=20;var s,u=Math.easeInOutQuad(a,r,o,n);s=u,document.documentElement.scrollTop=s,document.body.parentNode.scrollTop=s,document.body.scrollTop=s,a<n?requestAnimationFrame(t):e&&"function"==typeof e&&e()}()},Math.easeInOutQuad=function(t,e,n,r){return(t/=r/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e},Math.easeInCubic=function(t,e,n,r){return e+n*((t/=r)*t*t)},Math.inOutQuintic=function(t,e,n,r){var o=(t/=r)*t,a=o*t;return e+n*(6*a*o+-15*o*o+10*a)}},nizW:function(t,e,n){var r=n("WNGz"),o=6e4,a=864e5;t.exports=function(t,e){var n=r(t),s=r(e),u=n.getTime()-n.getTimezoneOffset()*o,i=s.getTime()-s.getTimezoneOffset()*o;return Math.round((u-i)/a)}},"u/4p":function(t,e,n){var r=n("xA5w");t.exports=function(t,e){var n=e?Number(e.weekStartsOn)||0:0,o=r(t),a=o.getDay(),s=(a<n?7:0)+a-n;return o.setDate(o.getDate()-s),o.setHours(0,0,0,0),o}},uyaC:function(t,e,n){var r=n("Ptqd"),o=n("jQas");t.exports={distanceInWords:r(),format:o()}},xA5w:function(t,e,n){var r=n("607n"),o=36e5,a=6e4,s=2,u=/[T ]/,i=/:/,c=/^(\d{2})$/,l=[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],f=/^(\d{4})/,p=[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],d=/^-(\d{2})$/,h=/^-?(\d{3})$/,g=/^-?(\d{2})-?(\d{2})$/,m=/^-?W(\d{2})$/,v=/^-?W(\d{2})-?(\d{1})$/,x=/^(\d{2}([.,]\d*)?)$/,y=/^(\d{2}):?(\d{2}([.,]\d*)?)$/,b=/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,D=/([Z+-].*)$/,T=/^(Z)$/,M=/^([+-])(\d{2})$/,w=/^([+-])(\d{2}):?(\d{2})$/;function k(t,e,n){e=e||0,n=n||0;var r=new Date(0);r.setUTCFullYear(t,0,4);var o=7*e+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+o),r}t.exports=function(t,e){if(r(t))return new Date(t.getTime());if("string"!=typeof t)return new Date(t);var n=(e||{}).additionalDigits;n=null==n?s:Number(n);var S=function(t){var e,n={},r=t.split(u);if(i.test(r[0])?(n.date=null,e=r[0]):(n.date=r[0],e=r[1]),e){var o=D.exec(e);o?(n.time=e.replace(o[1],""),n.timezone=o[1]):n.time=e}return n}(t),_=function(t,e){var n,r=l[e],o=p[e];if(n=f.exec(t)||o.exec(t)){var a=n[1];return{year:parseInt(a,10),restDateString:t.slice(a.length)}}if(n=c.exec(t)||r.exec(t)){var s=n[1];return{year:100*parseInt(s,10),restDateString:t.slice(s.length)}}return{year:null}}(S.date,n),C=_.year,Y=function(t,e){if(null===e)return null;var n,r,o,a;if(0===t.length)return(r=new Date(0)).setUTCFullYear(e),r;if(n=d.exec(t))return r=new Date(0),o=parseInt(n[1],10)-1,r.setUTCFullYear(e,o),r;if(n=h.exec(t)){r=new Date(0);var s=parseInt(n[1],10);return r.setUTCFullYear(e,0,s),r}if(n=g.exec(t)){r=new Date(0),o=parseInt(n[1],10)-1;var u=parseInt(n[2],10);return r.setUTCFullYear(e,o,u),r}if(n=m.exec(t))return a=parseInt(n[1],10)-1,k(e,a);if(n=v.exec(t)){a=parseInt(n[1],10)-1;var i=parseInt(n[2],10)-1;return k(e,a,i)}return null}(_.restDateString,C);if(Y){var A,F=Y.getTime(),z=0;return S.time&&(z=function(t){var e,n,r;if(e=x.exec(t))return(n=parseFloat(e[1].replace(",",".")))%24*o;if(e=y.exec(t))return n=parseInt(e[1],10),r=parseFloat(e[2].replace(",",".")),n%24*o+r*a;if(e=b.exec(t)){n=parseInt(e[1],10),r=parseInt(e[2],10);var s=parseFloat(e[3].replace(",","."));return n%24*o+r*a+1e3*s}return null}(S.time)),S.timezone?(H=S.timezone,A=($=T.exec(H))?0:($=M.exec(H))?(E=60*parseInt($[2],10),"+"===$[1]?-E:E):($=w.exec(H))?(E=60*parseInt($[2],10)+parseInt($[3],10),"+"===$[1]?-E:E):0):(A=new Date(F+z).getTimezoneOffset(),A=new Date(F+z+A*a).getTimezoneOffset()),new Date(F+z+A*a)}var H,$,E;return new Date(t)}},ymQ7:function(t,e,n){var r=n("xA5w"),o=n("JURy"),a=n("nizW");t.exports=function(t){var e=r(t);return a(e,o(e))+1}},"z8J+":function(t,e,n){"use strict";for(var r=n("woOf"),o=n.n(r),a=n("Eoz/"),s=n.n(a),u=n("GlXt"),i=n("Mn49"),c=[],l=0;l<3;l++){for(var f=[],p=0;p<65;p++)f.push(null);c.push({words:f})}e.a={components:{Anchor:u.a,AnchorOrNuxtLink:i.a},computed:{prettyDate:function(){var t=s()(new Date,"YYYY"),e=s()(this.published_at,"YYYY"),n=t===e?"":", "+e;return s()(this.published_at,"MMMM Do")+n},to:function(){return{name:"@nuxtjs/blog:article",params:o()({id:this.id},this.$attrs)}}},data:function(){return{skeletons:c}},methods:{onClickPostTitle:function(){console.log("onClickPostTitle"),this.$router.push(this.to)}},name:"Article",props:{id:{required:!0,type:String},isBook:Boolean,title:{required:!0,type:String},summary:{required:!0,type:String},original:Object,renderedSummary:{required:!0,type:String},published_at:{required:!0,type:String}}}},zZbG:function(t,e,n){var r=n("xA5w"),o=n("3znZ");t.exports=function(t){var e=r(t),n=e.getFullYear(),a=new Date(0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);var s=o(a),u=new Date(0);u.setFullYear(n,0,4),u.setHours(0,0,0,0);var i=o(u);return e.getTime()>=s.getTime()?n+1:e.getTime()>=i.getTime()?n:n-1}}});