webpackJsonp([2],{"/fYM":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("PYO4"),i=n("7tzp"),o=n("VU/8"),a=o(r.a,i.a,!1,null,null,null);e.default=a.exports},"3znZ":function(t,e,n){function r(t){return i(t,{weekStartsOn:1})}var i=n("u/4p");t.exports=r},"607n":function(t,e){function n(t){return t instanceof Date}t.exports=n},"7Khn":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{attrs:{id:"disqus_thread"}})},i=[],o={render:r,staticRenderFns:i};e.a=o},"7tzp":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("article",{staticClass:"post"},[n("h2",{staticClass:"post-title-wrapper"},[n("nuxt-link",{staticClass:"post-title",attrs:{to:t.to}},[t._v(t._s(t.article.title))])],1),n("div",{staticClass:"post-meta"},[n("time",{staticClass:"post-blog-date"},[t._v(t._s(t.prettyDate))]),t.article.original?n("span",{staticClass:"post-blog-title"},[t._v("\n            Originally posted on "),n("anchor",{staticClass:"post-blog-link",attrs:{href:t.article.original.url,shouldTrackClicks:!0}},[t._v(t._s(t.article.original.blogName))])],1):t._e()]),n("div",{staticClass:"post-content",domProps:{innerHTML:t._s(t.contents)}})]),n("aside",{staticClass:"post-comments"},[n("DisqusComments",t._b({on:{ready:t.onDisqusReady}},"DisqusComments",t.disqus,!1)),n("div",{staticClass:"post-skeleton",class:t.classes,attrs:{"aria-hidden":"true"}},t._l(t.numberOfWordsInCommentsSkeleton,function(t,e){return n("span",{key:e,staticClass:"post-skeleton-word"})}))],1)])},i=[],o={render:r,staticRenderFns:i};e.a=o},"Bj/7":function(t,e,n){function r(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!s.string(e))throw new TypeError("Second argument must be a String");if(!s.fn(n))throw new TypeError("Third argument must be a Function");if(s.node(t))return i(t,e,n);if(s.nodeList(t))return o(t,e,n);if(s.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function i(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function o(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return u(document.body,t,e,n)}var s=n("iDEd"),u=n("ZE5A");t.exports=r},D6ie:function(t,e,n){function r(t){var e=i(t),n=o(e).getTime()-a(e).getTime();return Math.round(n/s)+1}var i=n("xA5w"),o=n("3znZ"),a=n("iRXW"),s=6048e5;t.exports=r},"Eoz/":function(t,e,n){function r(t,e,n){var r=e?String(e):"YYYY-MM-DDTHH:mm:ss.SSSZ",o=n||{},a=o.locale,s=d.format.formatters,u=d.format.formattingTokensRegExp;a&&a.format&&a.format.formatters&&(s=a.format.formatters,a.format.formattingTokensRegExp&&(u=a.format.formattingTokensRegExp));var c=f(t);return h(c)?i(r,s,u)(c):"Invalid Date"}function i(t,e,n){var r,i,a=t.match(n),s=a.length;for(r=0;r<s;r++)i=e[a[r]]||p[a[r]],a[r]=i||o(a[r]);return function(t){for(var e="",n=0;n<s;n++)a[n]instanceof Function?e+=a[n](t,p):e+=a[n];return e}}function o(t){return t.match(/\[[\s\S]/)?t.replace(/^\[|]$/g,""):t.replace(/\\/g,"")}function a(t,e){e=e||"";var n=t>0?"-":"+",r=Math.abs(t),i=Math.floor(r/60),o=r%60;return n+s(i,2)+e+s(o,2)}function s(t,e){for(var n=Math.abs(t).toString();n.length<e;)n="0"+n;return n}var u=n("ymQ7"),c=n("D6ie"),l=n("zZbG"),f=n("xA5w"),h=n("dH3X"),d=n("uyaC"),p={M:function(t){return t.getMonth()+1},MM:function(t){return s(t.getMonth()+1,2)},Q:function(t){return Math.ceil((t.getMonth()+1)/3)},D:function(t){return t.getDate()},DD:function(t){return s(t.getDate(),2)},DDD:function(t){return u(t)},DDDD:function(t){return s(u(t),3)},d:function(t){return t.getDay()},E:function(t){return t.getDay()||7},W:function(t){return c(t)},WW:function(t){return s(c(t),2)},YY:function(t){return s(t.getFullYear(),4).substr(2)},YYYY:function(t){return s(t.getFullYear(),4)},GG:function(t){return String(l(t)).substr(2)},GGGG:function(t){return l(t)},H:function(t){return t.getHours()},HH:function(t){return s(t.getHours(),2)},h:function(t){var e=t.getHours();return 0===e?12:e>12?e%12:e},hh:function(t){return s(p.h(t),2)},m:function(t){return t.getMinutes()},mm:function(t){return s(t.getMinutes(),2)},s:function(t){return t.getSeconds()},ss:function(t){return s(t.getSeconds(),2)},S:function(t){return Math.floor(t.getMilliseconds()/100)},SS:function(t){return s(Math.floor(t.getMilliseconds()/10),2)},SSS:function(t){return s(t.getMilliseconds(),3)},Z:function(t){return a(t.getTimezoneOffset(),":")},ZZ:function(t){return a(t.getTimezoneOffset())},X:function(t){return Math.floor(t.getTime()/1e3)},x:function(t){return t.getTime()}};t.exports=r},FwK0:function(t,e,n){"use strict";var r=n("YK/h");e.a={methods:{onClick:function(t){var e=t.target;this.shouldTrackClicks&&Object(r.a)(e.href)}},props:{shouldTrackClicks:Boolean}}},GlXt:function(t,e,n){"use strict";var r=n("FwK0"),i=n("xaQP"),o=n("VU/8"),a=o(r.a,i.a,!1,null,null,null);e.a=a.exports},IZDP:function(t,e){t.exports=function(t){var e=new Date(t);return["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()]+" "+e.getDate()+", "+e.getFullYear()}},JURy:function(t,e,n){function r(t){var e=i(t),n=new Date(0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}var i=n("xA5w");t.exports=r},Jssu:function(t,e){function n(t,e){for(;t&&t.nodeType!==r;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}var r=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var i=Element.prototype;i.matches=i.matchesSelector||i.mozMatchesSelector||i.msMatchesSelector||i.oMatchesSelector||i.webkitMatchesSelector}t.exports=n},"LF/X":function(t,e,n){var r,i,o;!function(a,s){i=[t,n("SPM9")],r=s,void 0!==(o="function"==typeof r?r.apply(e,i):r)&&(t.exports=o)}(0,function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=function(t){return t&&t.__esModule?t:{default:t}}(e),i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=function(){function t(e){n(this,t),this.resolveOptions(e),this.initSelection()}return o(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,r.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,r.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":i(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=a})},PYO4:function(t,e,n){"use strict";var r=n("woOf"),i=n.n(r),o=n("Eoz/"),a=n.n(o),s=n("uuwg"),u=n("V33R"),c=n.n(u),l=n("d9EC"),f=n("GlXt");e.a={components:{Anchor:f.a,DisqusComments:l.a},computed:{classes:function(){return{"post-skeleton--visible":!this.isDiqsusReady}},contents:function(){return this.article.rendered.replace(/<h2[^>]*>.+?<\/h2>/i,"")},prettyDate:function(){var t=a()(new Date,"YYYY"),e=a()(this.article.published_at,"YYYY"),n=t===e?"":", "+e;return a()(this.article.published_at,"MMMM Do")+n},to:function(){return{name:"@nuxtjs/blog:article",params:i()({id:this.$route.params.id},this.$attrs)}}},data:function(){return{isDiqsusReady:!1,numberOfWordsInCommentsSkeleton:85,postHeaderAnchorClass:"post-header-anchor"}},beforeDestroy:function(){},created:function(){var t=this;this.article.original.onlyExternal&&(window.location=this.article.original.url),this.clipboard=new c.a("."+this.postHeaderAnchorClass,{text:function(t){return t.href}}),this.clipboard.on("success",function(e){var n=e.trigger;t.onCopyPostHeaderLink(n)})},extends:s.a,methods:{onCopyPostHeaderLink:function(t){var e=this.postHeaderAnchorClass+"--copied";t.classList.add(e),setTimeout(function(){t.classList.remove(e)},3e3)},onDisqusReady:function(){this.isDiqsusReady=!0}},name:"Article"}},Ptqd:function(t,e){function n(){function t(t,n,r){r=r||{};var i;return i="string"==typeof e[t]?e[t]:1===n?e[t].one:e[t].other.replace("{{count}}",n),r.addSuffix?r.comparison>0?"in "+i:i+" ago":i}var e={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};return{localize:t}}t.exports=n},SJLv:function(t,e){function n(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);var i=r.concat(e).sort().reverse();return new RegExp("(\\[[^\\[]*\\])|(\\\\)?("+i.join("|")+"|.)","g")}var r=["M","MM","Q","D","DD","DDD","DDDD","d","E","W","WW","YY","YYYY","GG","GGGG","H","HH","h","hh","m","mm","s","ss","S","SS","SSS","Z","ZZ","X","x"];t.exports=n},SPM9:function(t,e){function n(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var r=window.getSelection(),i=document.createRange();i.selectNodeContents(t),r.removeAllRanges(),r.addRange(i),e=r.toString()}return e}t.exports=n},Tzyb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("Xxa5"),i=n.n(r),o=n("exGp"),a=n.n(o),s=n("pFYg"),u=n.n(s),c=n("fZjL"),l=n.n(c),f=this,h="http://localhost:3000".replace(/\/$/,""),d=function(t,e){return l()(e).forEach(function(n){["number","string"].includes(u()(e[n]))&&(t=t.replace(new RegExp(":"+n,"gi"),""+e[n]))}),t.replace(/\/?:[^\/]+/g,"").replace(/\/+/g,"/").replace(/\/$/,"")},p=function(){function t(t,n){return e.apply(this,arguments)}var e=a()(i.a.mark(function t(e,n){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n&&"$axios"in n){t.next=5;break}return console.log("Use @nuxtjs/axios or axios plugin.\nthis.$axios is requried to fetch from blog API.\nFalling back to fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"),t.next=4,fetch(e);case 4:return t.abrupt("return",t.sent.json());case 5:return t.next=7,n.$axios.get(e);case 7:return t.abrupt("return",t.sent.data);case 8:case"end":return t.stop()}},t,this)}));return t}(),m=function(){var t=a()(i.a.mark(function t(e,n,r){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",p(""+h+d("/_nuxt/api/writing/"+e,n)+".json",r));case 2:return t.abrupt("return",p(""+h+d("/api/writing/"+e,n),r));case 3:case"end":return t.stop()}},t,f)}));return function(e,n,r){return t.apply(this,arguments)}}();e.default={api:m,get:p,format:d}},UxaL:function(t,e,n){"use strict";e.a={name:"vue-disqus",props:{shortname:{type:String,required:!0},identifier:{type:String,required:!1},url:{type:String,required:!1},title:{type:String,required:!1},remote_auth_s3:{type:String,required:!1},api_key:{type:String,required:!1},sso_config:{type:Object,required:!1}},mounted:function(){if(window.DISQUS)return void this.reset(window.DISQUS);this.init()},methods:{reset:function(t){var e=this;t.reset({reload:!0,config:function(){e.setBaseConfig(this)}})},init:function(){var t=this,e=this;window.disqus_config=function(){e.setBaseConfig(this)},setTimeout(function(){var e=document,n=e.createElement("script");n.setAttribute("id","embed-disqus"),n.setAttribute("data-timestamp",+new Date),n.type="text/javascript",n.async=!0,n.src="//"+t.shortname+".disqus.com/embed.js",(e.head||e.body).appendChild(n)},0)},setBaseConfig:function(t){var e=this;t.page.identifier=this.identifier||this.$route.path||window.location.pathname,t.page.url=this.url||this.$el.baseURI,this.title&&(t.page.title=this.title),this.remote_auth_s3&&(t.page.remote_auth_s3=this.remote_auth_s3),this.key&&(t.page.api_key=this.key),this.sso_config&&(t.sso=this.sso_config),t.callbacks.onReady=[function(){e.$emit("ready")}]}}}},V33R:function(t,e,n){var r,i,o;!function(a,s){i=[t,n("LF/X"),n("WreF"),n("Bj/7")],r=s,void 0!==(o="function"==typeof r?r.apply(e,i):r)&&(t.exports=o)}(0,function(t,e,n,r){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var c=i(e),l=i(n),f=i(r),h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=function(t){function e(t,n){o(this,e);var r=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return r.resolveOptions(n),r.listenClick(t),r}return s(e,t),d(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===h(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,f.default)(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new c.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return u("action",t)}},{key:"defaultTarget",value:function(t){var e=u("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return u("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}(l.default);t.exports=p})},WNGz:function(t,e,n){function r(t){var e=i(t);return e.setHours(0,0,0,0),e}var i=n("xA5w");t.exports=r},WreF:function(t,e){function n(){}n.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function r(){i.off(t,r),e.apply(n,arguments)}var i=this;return r._=e,this.on(t,r,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,i=n.length;for(r;r<i;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],i=[];if(r&&e)for(var o=0,a=r.length;o<a;o++)r[o].fn!==e&&r[o].fn._!==e&&i.push(r[o]);return i.length?n[t]=i:delete n[t],this}},t.exports=n},"YK/h":function(t,e,n){"use strict";e.a=function(t){"function"==typeof ga&&ga("send","event","outbound","click",t)}},ZE5A:function(t,e,n){function r(t,e,n,r,o){var a=i.apply(this,arguments);return t.addEventListener(n,a,o),{destroy:function(){t.removeEventListener(n,a,o)}}}function i(t,e,n,r){return function(n){n.delegateTarget=o(n.target,e),n.delegateTarget&&r.call(t,n)}}var o=n("Jssu");t.exports=r},d9EC:function(t,e,n){"use strict";var r=n("UxaL"),i=n("7Khn"),o=n("VU/8"),a=o(r.a,i.a,!1,null,null,null);e.a=a.exports},dH3X:function(t,e,n){function r(t){if(i(t))return!isNaN(t);throw new TypeError(toString.call(t)+" is not an instance of Date")}var i=n("607n");t.exports=r},iDEd:function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},iRXW:function(t,e,n){function r(t){var e=i(t),n=new Date(0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),o(n)}var i=n("zZbG"),o=n("3znZ");t.exports=r},jQas:function(t,e,n){function r(){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Su","Mo","Tu","We","Th","Fr","Sa"],r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s=["AM","PM"],u=["am","pm"],c=["a.m.","p.m."],l={MMM:function(e){return t[e.getMonth()]},MMMM:function(t){return e[t.getMonth()]},dd:function(t){return n[t.getDay()]},ddd:function(t){return r[t.getDay()]},dddd:function(t){return a[t.getDay()]},A:function(t){return t.getHours()/12>=1?s[1]:s[0]},a:function(t){return t.getHours()/12>=1?u[1]:u[0]},aa:function(t){return t.getHours()/12>=1?c[1]:c[0]}};return["M","D","DDD","d","Q","W"].forEach(function(t){l[t+"o"]=function(e,n){return i(n[t](e))}}),{formatters:l,formattingTokensRegExp:o(l)}}function i(t){var e=t%100;if(e>20||e<10)switch(e%10){case 1:return t+"st";case 2:return t+"nd";case 3:return t+"rd"}return t+"th"}var o=n("SJLv");t.exports=r},nizW:function(t,e,n){function r(t,e){var n=i(t),r=i(e),s=n.getTime()-n.getTimezoneOffset()*o,u=r.getTime()-r.getTimezoneOffset()*o;return Math.round((s-u)/a)}var i=n("WNGz"),o=6e4,a=864e5;t.exports=r},"u/4p":function(t,e,n){function r(t,e){var n=e?Number(e.weekStartsOn)||0:0,r=i(t),o=r.getDay(),a=(o<n?7:0)+o-n;return r.setDate(r.getDate()-a),r.setHours(0,0,0,0),r}var i=n("xA5w");t.exports=r},uuwg:function(t,e,n){"use strict";var r=n("fZjL"),i=n.n(r),o=n("woOf"),a=n.n(o),s=n("Xxa5"),u=n.n(s),c=n("pFYg"),l=n.n(c),f=n("exGp"),h=n.n(f),d=n("IZDP").formatDate,p=n("Tzyb").default.api;e.a={name:"Article",asyncData:function(){function t(t){return e.apply(this,arguments)}var e=h()(u.a.mark(function t(e){var n,r,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.params,r=e.payload,i=e.app,"object"!==(void 0===r?"undefined":l()(r))||!r){t.next=3;break}return t.abrupt("return",{article:r});case 3:return t.next=5,p("/:id",n,i);case 5:return t.t0=t.sent,t.abrupt("return",{article:t.t0});case 7:case"end":return t.stop()}},t,this)}));return t}(),head:function(){if(!this.article)return{title:"404. Not Found"};var t=[{hid:"description",name:"description",content:this.article.summary},{hid:"keywords",name:"keywords",content:(this.article.keywords||[]).join(", ")}],e=[];if(this.article.highlightedLanguages&&this.article.highlightedLanguages.length){var n="prism"+(this.article.attributes.highlight?"-"+this.article.attributes.highlight:"");e.push({rel:"stylesheet",href:"//unpkg.com/prismjs/themes/"+n+".css"})}var r=a()({card:"summary",title:this.article.title,description:this.article.summary,image:this.article.photo,url:this.$route.path},this.article.attributes.twitter||{},{}),o=i()(r).map(function(t){return"image"===t?{name:"twitter:"+t,content:r[t]}:{hid:"twitter:"+t,name:"twitter:"+t,content:r[t]}}),s=a()({type:"article",title:this.article.title,description:this.article.summary,image:this.article.photo,url:this.$route.path},this.article.attributes.og||{},{}),u=i()(s).map(function(t){return{hid:"og:"+t,name:"og:"+t,content:s[t]}}),c=a()(this.article.attributes.fb||{},{}),l=i()(c).map(function(t){return{hid:"fb:"+t,name:"fb:"+t,content:c[t]}});return{title:this.article.attributes.title,meta:[].concat(t,o,u,l),link:e}},filters:{formatDate:d},computed:{disqus:function(){var t={url:"https://adamlynch.com",shortname:"adamlynch-1",api_key:void 0,sso_config:JSON.parse("{}")},e=this.article;return a()({},t,{identifier:e.id,title:e.title,url:""+(t.url||"").replace(/\/$/,"")+this.$route.path})},comments:function(){return"comments"in this.article.attributes&&this.article.attributes.comments}}}},uyaC:function(t,e,n){var r=n("Ptqd"),i=n("jQas");t.exports={distanceInWords:r(),format:i()}},xA5w:function(t,e,n){function r(t,e){if(l(t))return new Date(t.getTime());if("string"!=typeof t)return new Date(t);var n=e||{},r=n.additionalDigits;r=null==r?d:Number(r);var c=i(t),f=o(c.date,r),p=f.year,m=f.restDateString,g=a(m,p);if(g){var y,v=g.getTime(),b=0;return c.time&&(b=s(c.time)),c.timezone?y=u(c.timezone):(y=new Date(v+b).getTimezoneOffset(),y=new Date(v+b+y*h).getTimezoneOffset()),new Date(v+b+y*h)}return new Date(t)}function i(t){var e,n={},r=t.split(p);if(m.test(r[0])?(n.date=null,e=r[0]):(n.date=r[0],e=r[1]),e){var i=_.exec(e);i?(n.time=e.replace(i[1],""),n.timezone=i[1]):n.time=e}return n}function o(t,e){var n,r=y[e],i=b[e];if(n=v.exec(t)||i.exec(t)){var o=n[1];return{year:parseInt(o,10),restDateString:t.slice(o.length)}}if(n=g.exec(t)||r.exec(t)){var a=n[1];return{year:100*parseInt(a,10),restDateString:t.slice(a.length)}}return{year:null}}function a(t,e){if(null===e)return null;var n,r,i,o;if(0===t.length)return r=new Date(0),r.setUTCFullYear(e),r;if(n=x.exec(t))return r=new Date(0),i=parseInt(n[1],10)-1,r.setUTCFullYear(e,i),r;if(n=k.exec(t)){r=new Date(0);var a=parseInt(n[1],10);return r.setUTCFullYear(e,0,a),r}if(n=w.exec(t)){r=new Date(0),i=parseInt(n[1],10)-1;var s=parseInt(n[2],10);return r.setUTCFullYear(e,i,s),r}if(n=S.exec(t))return o=parseInt(n[1],10)-1,c(e,o);if(n=D.exec(t)){o=parseInt(n[1],10)-1;return c(e,o,parseInt(n[2],10)-1)}return null}function s(t){var e,n,r;if(e=T.exec(t))return(n=parseFloat(e[1].replace(",",".")))%24*f;if(e=E.exec(t))return n=parseInt(e[1],10),r=parseFloat(e[2].replace(",",".")),n%24*f+r*h;if(e=M.exec(t)){n=parseInt(e[1],10),r=parseInt(e[2],10);var i=parseFloat(e[3].replace(",","."));return n%24*f+r*h+1e3*i}return null}function u(t){var e,n;return(e=C.exec(t))?0:(e=A.exec(t))?(n=60*parseInt(e[2],10),"+"===e[1]?-n:n):(e=Y.exec(t),e?(n=60*parseInt(e[2],10)+parseInt(e[3],10),"+"===e[1]?-n:n):0)}function c(t,e,n){e=e||0,n=n||0;var r=new Date(0);r.setUTCFullYear(t,0,4);var i=r.getUTCDay()||7,o=7*e+n+1-i;return r.setUTCDate(r.getUTCDate()+o),r}var l=n("607n"),f=36e5,h=6e4,d=2,p=/[T ]/,m=/:/,g=/^(\d{2})$/,y=[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],v=/^(\d{4})/,b=[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],x=/^-(\d{2})$/,k=/^-?(\d{3})$/,w=/^-?(\d{2})-?(\d{2})$/,S=/^-?W(\d{2})$/,D=/^-?W(\d{2})-?(\d{1})$/,T=/^(\d{2}([.,]\d*)?)$/,E=/^(\d{2}):?(\d{2}([.,]\d*)?)$/,M=/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,_=/([Z+-].*)$/,C=/^(Z)$/,A=/^([+-])(\d{2})$/,Y=/^([+-])(\d{2}):?(\d{2})$/;t.exports=r},xaQP:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;return(t._self._c||e)("a",{on:{click:t.onClick}},[t._t("default")],2)},i=[],o={render:r,staticRenderFns:i};e.a=o},ymQ7:function(t,e,n){function r(t){var e=i(t);return a(e,o(e))+1}var i=n("xA5w"),o=n("JURy"),a=n("nizW");t.exports=r},zZbG:function(t,e,n){function r(t){var e=i(t),n=e.getFullYear(),r=new Date(0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);var a=o(r),s=new Date(0);s.setFullYear(n,0,4),s.setHours(0,0,0,0);var u=o(s);return e.getTime()>=a.getTime()?n+1:e.getTime()>=u.getTime()?n:n-1}var i=n("xA5w"),o=n("3znZ");t.exports=r}});
//# sourceMappingURL=2.21a1d4b69bc870889f90.js.map