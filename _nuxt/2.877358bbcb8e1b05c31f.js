webpackJsonp([2],{"/fYM":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("8jqR"),i=n("oNlG"),o=n("VU/8")(r.a,i.a,!1,null,null,null);o.options.__file="components/Article/Article.vue",e.default=o.exports},"3znZ":function(t,e,n){var r=n("u/4p");t.exports=function(t){return r(t,{weekStartsOn:1})}},"607n":function(t,e){t.exports=function(t){return t instanceof Date}},"8jqR":function(t,e,n){"use strict";var r=n("woOf"),i=n.n(r),o=n("Eoz/"),a=n.n(o),s=n("uuwg"),u=n("V33R"),c=n.n(u),l=n("d9EC"),f=n("GlXt");e.a={components:{Anchor:f.a,DisqusComments:l.a},computed:{classes:function(){return{"post-skeleton--visible":!this.isDiqsusReady}},contents:function(){return this.article.rendered.replace(/<h2[^>]*>.+?<\/h2>/i,"")},prettyDate:function(){var t=a()(new Date,"YYYY"),e=a()(this.article.published_at,"YYYY"),n=t===e?"":", "+e;return a()(this.article.published_at,"MMMM Do")+n},to:function(){return{name:"@nuxtjs/blog:article",params:i()({id:this.$route.params.id},this.$attrs)}}},data:function(){return{isDiqsusReady:!1,numberOfWordsInCommentsSkeleton:85,postHeaderAnchorClass:"post-header-anchor"}},beforeDestroy:function(){},created:function(){var t=this;this.article.original&&this.article.original.onlyExternal&&(window.location=this.article.original.url),this.clipboard=new c.a("."+this.postHeaderAnchorClass,{text:function(t){return t.href}}),this.clipboard.on("success",function(e){var n=e.trigger;t.onCopyPostHeaderLink(n)})},extends:s.a,methods:{onCopyPostHeaderLink:function(t){var e=this.postHeaderAnchorClass+"--copied";t.classList.add(e),setTimeout(function(){t.classList.remove(e)},3e3)},onDisqusReady:function(){this.isDiqsusReady=!0}},mounted:function(){console.log("test7")},name:"Article"}},"Bj/7":function(t,e,n){var r=n("iDEd"),i=n("ZE5A");t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!r.string(e))throw new TypeError("Second argument must be a String");if(!r.fn(n))throw new TypeError("Third argument must be a Function");if(r.node(t))return h=e,d=n,(f=t).addEventListener(h,d),{destroy:function(){f.removeEventListener(h,d)}};if(r.nodeList(t))return u=t,c=e,l=n,Array.prototype.forEach.call(u,function(t){t.addEventListener(c,l)}),{destroy:function(){Array.prototype.forEach.call(u,function(t){t.removeEventListener(c,l)})}};if(r.string(t))return o=t,a=e,s=n,i(document.body,o,a,s);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,a,s,u,c,l,f,h,d}},D6ie:function(t,e,n){var r=n("xA5w"),i=n("3znZ"),o=n("iRXW"),a=6048e5;t.exports=function(t){var e=r(t),n=i(e).getTime()-o(e).getTime();return Math.round(n/a)+1}},"Eoz/":function(t,e,n){var r=n("ymQ7"),i=n("D6ie"),o=n("zZbG"),a=n("xA5w"),s=n("dH3X"),u=n("uyaC");var c={M:function(t){return t.getMonth()+1},MM:function(t){return f(t.getMonth()+1,2)},Q:function(t){return Math.ceil((t.getMonth()+1)/3)},D:function(t){return t.getDate()},DD:function(t){return f(t.getDate(),2)},DDD:function(t){return r(t)},DDDD:function(t){return f(r(t),3)},d:function(t){return t.getDay()},E:function(t){return t.getDay()||7},W:function(t){return i(t)},WW:function(t){return f(i(t),2)},YY:function(t){return f(t.getFullYear(),4).substr(2)},YYYY:function(t){return f(t.getFullYear(),4)},GG:function(t){return String(o(t)).substr(2)},GGGG:function(t){return o(t)},H:function(t){return t.getHours()},HH:function(t){return f(t.getHours(),2)},h:function(t){var e=t.getHours();return 0===e?12:e>12?e%12:e},hh:function(t){return f(c.h(t),2)},m:function(t){return t.getMinutes()},mm:function(t){return f(t.getMinutes(),2)},s:function(t){return t.getSeconds()},ss:function(t){return f(t.getSeconds(),2)},S:function(t){return Math.floor(t.getMilliseconds()/100)},SS:function(t){return f(Math.floor(t.getMilliseconds()/10),2)},SSS:function(t){return f(t.getMilliseconds(),3)},Z:function(t){return l(t.getTimezoneOffset(),":")},ZZ:function(t){return l(t.getTimezoneOffset())},X:function(t){return Math.floor(t.getTime()/1e3)},x:function(t){return t.getTime()}};function l(t,e){e=e||"";var n=t>0?"-":"+",r=Math.abs(t),i=r%60;return n+f(Math.floor(r/60),2)+e+f(i,2)}function f(t,e){for(var n=Math.abs(t).toString();n.length<e;)n="0"+n;return n}t.exports=function(t,e,n){var r=e?String(e):"YYYY-MM-DDTHH:mm:ss.SSSZ",i=(n||{}).locale,o=u.format.formatters,l=u.format.formattingTokensRegExp;i&&i.format&&i.format.formatters&&(o=i.format.formatters,i.format.formattingTokensRegExp&&(l=i.format.formattingTokensRegExp));var f=a(t);return s(f)?function(t,e,n){var r,i,o,a=t.match(n),s=a.length;for(r=0;r<s;r++)i=e[a[r]]||c[a[r]],a[r]=i||(o=a[r],o.match(/\[[\s\S]/)?o.replace(/^\[|]$/g,""):o.replace(/\\/g,""));return function(t){for(var e="",n=0;n<s;n++)a[n]instanceof Function?e+=a[n](t,c):e+=a[n];return e}}(r,o,l)(f):"Invalid Date"}},GlXt:function(t,e,n){"use strict";var r=n("NiQ3"),i=n("WmDo"),o=n("VU/8")(r.a,i.a,!1,null,null,null);o.options.__file="components/Anchor/Anchor.vue",e.a=o.exports},IZDP:function(t,e){t.exports=function(t){var e=new Date(t);return["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()]+" "+e.getDate()+", "+e.getFullYear()}},JURy:function(t,e,n){var r=n("xA5w");t.exports=function(t){var e=r(t),n=new Date(0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}},Jssu:function(t,e){var n=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}t.exports=function(t,e){for(;t&&t.nodeType!==n;){if("function"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}},"LF/X":function(t,e,n){var r,i,o,a;a=function(t,e){"use strict";var n,r=(n=e)&&n.__esModule?n:{default:n};var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.resolveOptions(e),this.initSelection()}return o(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,r.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,r.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==(void 0===t?"undefined":i(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=a},i=[t,n("SPM9")],void 0===(o="function"==typeof(r=a)?r.apply(e,i):r)||(t.exports=o)},NiQ3:function(t,e,n){"use strict";var r=n("YK/h");e.a={methods:{onClick:function(t){var e=t.target;this.shouldTrackClicks&&Object(r.a)(e.href)}},props:{shouldTrackClicks:Boolean}}},Ptqd:function(t,e){t.exports=function(){var t={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};return{localize:function(e,n,r){var i;return r=r||{},i="string"==typeof t[e]?t[e]:1===n?t[e].one:t[e].other.replace("{{count}}",n),r.addSuffix?r.comparison>0?"in "+i:i+" ago":i}}}},SJLv:function(t,e){var n=["M","MM","Q","D","DD","DDD","DDDD","d","E","W","WW","YY","YYYY","GG","GGGG","H","HH","h","hh","m","mm","s","ss","S","SS","SSS","Z","ZZ","X","x"];t.exports=function(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r);var i=n.concat(e).sort().reverse();return new RegExp("(\\[[^\\[]*\\])|(\\\\)?("+i.join("|")+"|.)","g")}},SPM9:function(t,e){t.exports=function(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var r=window.getSelection(),i=document.createRange();i.selectNodeContents(t),r.removeAllRanges(),r.addRange(i),e=r.toString()}return e}},Tzyb:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=n("Xxa5"),o=n.n(i),a=n("exGp"),s=n.n(a),u=n("pFYg"),c=n.n(u),l=n("fZjL"),f=n.n(l),h=this,d="https://adamlynch.com".replace(/\/$/,""),p=function(t,e){return f()(e).forEach(function(n){["number","string"].includes(c()(e[n]))&&(t=t.replace(new RegExp(":"+n,"gi"),""+e[n]))}),t.replace(/\/?:[^/]+/g,"").replace(/\/+/g,"/").replace(/\/$/,"")},m=function(){var t=s()(o.a.mark(function t(e,n){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n&&"$axios"in n){t.next=5;break}return console.log("Use @nuxtjs/axios or axios plugin.\nthis.$axios is requried to fetch from blog API.\nFalling back to fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"),t.next=4,fetch(e);case 4:return t.abrupt("return",t.sent.json());case 5:return t.next=7,n.$axios.get(e);case 7:return t.abrupt("return",t.sent.data);case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}(),g=(r=s()(o.a.mark(function t(e,n,r,i){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",m(""+d+p("/_nuxt/api/writing/"+e,n)+".json",r));case 2:return t.abrupt("return",m(""+d+p("/api/writing/"+e,n),r));case 3:case"end":return t.stop()}},t,h)})),function(t,e,n,i){return r.apply(this,arguments)});e.default={api:g,get:m,format:p}},V33R:function(t,e,n){var r,i,o,a;a=function(t,e,n,r){"use strict";var i=s(e),o=s(n),a=s(r);function s(t){return t&&t.__esModule?t:{default:t}}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var l=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return r.resolveOptions(n),r.listenClick(t),r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,o.default),c(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText,this.container="object"===u(t.container)?t.container:document.body}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,a.default)(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new i.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return f("action",t)}},{key:"defaultTarget",value:function(t){var e=f("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return f("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}();function f(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}t.exports=l},i=[t,n("LF/X"),n("WreF"),n("Bj/7")],void 0===(o="function"==typeof(r=a)?r.apply(e,i):r)||(t.exports=o)},WNGz:function(t,e,n){var r=n("xA5w");t.exports=function(t){var e=r(t);return e.setHours(0,0,0,0),e}},WmDo:function(t,e,n){"use strict";var r=function(){var t=this.$createElement;return(this._self._c||t)("a",{on:{click:this.onClick}},[this._t("default")],2)};r._withStripped=!0;var i={render:r,staticRenderFns:[]};e.a=i},WreF:function(t,e){function n(){}n.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var r=this;function i(){r.off(t,i),e.apply(n,arguments)}return i._=e,this.on(t,i,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,i=n.length;r<i;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],i=[];if(r&&e)for(var o=0,a=r.length;o<a;o++)r[o].fn!==e&&r[o].fn._!==e&&i.push(r[o]);return i.length?n[t]=i:delete n[t],this}},t.exports=n},"YK/h":function(t,e,n){"use strict";e.a=function(t){"function"==typeof ga&&ga("send","event","outbound","click",t)}},ZE5A:function(t,e,n){var r=n("Jssu");t.exports=function(t,e,n,i,o){var a=function(t,e,n,i){return function(n){n.delegateTarget=r(n.target,e),n.delegateTarget&&i.call(t,n)}}.apply(this,arguments);return t.addEventListener(n,a,o),{destroy:function(){t.removeEventListener(n,a,o)}}}},d9EC:function(t,e,n){"use strict";var r=n("lki5"),i=n("guhs"),o=n("VU/8")(r.a,i.a,!1,null,null,null);o.options.__file="node_modules/vue-disqus/VueDisqus.vue",e.a=o.exports},dH3X:function(t,e,n){var r=n("607n");t.exports=function(t){if(r(t))return!isNaN(t);throw new TypeError(toString.call(t)+" is not an instance of Date")}},guhs:function(t,e,n){"use strict";var r=function(){var t=this.$createElement;return(this._self._c||t)("div")};r._withStripped=!0;var i={render:r,staticRenderFns:[]};e.a=i},iDEd:function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){return"[object Function]"===Object.prototype.toString.call(t)}},iRXW:function(t,e,n){var r=n("zZbG"),i=n("3znZ");t.exports=function(t){var e=r(t),n=new Date(0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),i(n)}},jQas:function(t,e,n){var r=n("SJLv");t.exports=function(){var t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],e=["January","February","March","April","May","June","July","August","September","October","November","December"],n=["Su","Mo","Tu","We","Th","Fr","Sa"],i=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a=["AM","PM"],s=["am","pm"],u=["a.m.","p.m."],c={MMM:function(e){return t[e.getMonth()]},MMMM:function(t){return e[t.getMonth()]},dd:function(t){return n[t.getDay()]},ddd:function(t){return i[t.getDay()]},dddd:function(t){return o[t.getDay()]},A:function(t){return t.getHours()/12>=1?a[1]:a[0]},a:function(t){return t.getHours()/12>=1?s[1]:s[0]},aa:function(t){return t.getHours()/12>=1?u[1]:u[0]}};return["M","D","DDD","d","Q","W"].forEach(function(t){c[t+"o"]=function(e,n){return function(t){var e=t%100;if(e>20||e<10)switch(e%10){case 1:return t+"st";case 2:return t+"nd";case 3:return t+"rd"}return t+"th"}(n[t](e))}}),{formatters:c,formattingTokensRegExp:r(c)}}},lki5:function(t,e,n){"use strict";e.a={name:"vue-disqus",props:{shortname:{type:String,required:!0},identifier:{type:String,required:!1},url:{type:String,required:!1},title:{type:String,required:!1},remote_auth_s3:{type:String,required:!1},api_key:{type:String,required:!1},sso_config:{type:Object,required:!1}},mounted:function(){window.DISQUS?this.reset(window.DISQUS):this.init()},methods:{reset:function(t){var e=this;t.reset({reload:!0,config:function(){this.page.identifier=e.identifier||e.$route.path||window.location.pathname,this.page.url=e.url||e.$el.baseURI,e.title&&(this.page.title=e.title),e.remote_auth_s3&&(this.page.remote_auth_s3=e.remote_auth_s3),e.key&&(this.page.api_key=e.key),e.sso_config&&(this.sso=e.sso_config)}})},init:function(){var t=this,e=this;window.disqus_config=function(){this.page.identifier=e.identifier||e.$route.path||window.location.pathname,this.page.url=e.url||e.$el.baseURI,e.title&&(this.page.title=e.title),e.remote_auth_s3&&(this.page.remote_auth_s3=e.remote_auth_s3),e.api_key&&(this.page.api_key=e.api_key),e.sso_config&&(this.sso=e.sso_config)},setTimeout(function(){var e=document,n=e.createElement("script");n.type="text/javascript",n.async=!0,n.setAttribute("id","embed-disqus"),n.setAttribute("data-timestamp",+new Date),n.src="//"+t.shortname+".disqus.com/embed.js",console.log("vd",e,e.head,e.body,document.getElementById("disqus_thread")),(e.head||e.body).appendChild(n)},500)}}}},nizW:function(t,e,n){var r=n("WNGz"),i=6e4,o=864e5;t.exports=function(t,e){var n=r(t),a=r(e),s=n.getTime()-n.getTimezoneOffset()*i,u=a.getTime()-a.getTimezoneOffset()*i;return Math.round((s-u)/o)}},oNlG:function(t,e,n){"use strict";var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("article",{staticClass:"post"},[e("h2",{staticClass:"post-title-wrapper"}),e("div",{staticClass:"post-meta"},[e("time",{staticClass:"post-blog-date"},[this._v(this._s(this.prettyDate))]),e("no-ssr",[this.article&&this.article.original?e("span",{staticClass:"post-blog-title"}):this._e()])],1)]),e("aside",{staticClass:"post-comments"},[e("div",{staticClass:"post-skeleton",class:this.classes,attrs:{"aria-hidden":"true"}},this._l(this.numberOfWordsInCommentsSkeleton,function(t,n){return e("span",{key:n,staticClass:"post-skeleton-word"})}))])])};r._withStripped=!0;var i={render:r,staticRenderFns:[]};e.a=i},"u/4p":function(t,e,n){var r=n("xA5w");t.exports=function(t,e){var n=e?Number(e.weekStartsOn)||0:0,i=r(t),o=i.getDay(),a=(o<n?7:0)+o-n;return i.setDate(i.getDate()-a),i.setHours(0,0,0,0),i}},uuwg:function(t,e,n){"use strict";var r=n("fZjL"),i=n.n(r),o=n("woOf"),a=n.n(o),s=n("Xxa5"),u=n.n(s),c=n("pFYg"),l=n.n(c),f=n("exGp"),h=n.n(f),d=n("IZDP").formatDate,p=n("Tzyb").default.api;e.a={name:"Article",asyncData:function(){var t=h()(u.a.mark(function t(e){var n,r,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.params,r=e.payload,i=e.app,"object"!==(void 0===r?"undefined":l()(r))||!r){t.next=3;break}return t.abrupt("return",{article:r});case 3:return t.next=5,p("/:id",n,i);case 5:return t.t0=t.sent,t.abrupt("return",{article:t.t0});case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),head:function(){if(!this.article)return{title:"404. Not Found"};var t=[{hid:"description",name:"description",content:this.article.summary},{hid:"keywords",name:"keywords",content:(this.article.keywords||[]).join(", ")}],e=[];if(this.article.highlightedLanguages&&this.article.highlightedLanguages.length){var n="prism"+(this.article.attributes.highlight?"-"+this.article.attributes.highlight:"");e.push({rel:"stylesheet",href:"//unpkg.com/prismjs/themes/"+n+".css"})}var r=a()({card:"summary",title:this.article.title,description:this.article.summary,image:this.article.photo,url:this.$route.path},this.article.attributes.twitter||{},{}),o=i()(r).map(function(t){return"image"===t?{name:"twitter:"+t,content:r[t]}:{hid:"twitter:"+t,name:"twitter:"+t,content:r[t]}}),s=a()({type:"article",title:this.article.title,description:this.article.summary,image:this.article.photo,url:this.$route.path},this.article.attributes.og||{},{}),u=i()(s).map(function(t){return{hid:"og:"+t,name:"og:"+t,content:s[t]}}),c=a()(this.article.attributes.fb||{},{}),l=i()(c).map(function(t){return{hid:"fb:"+t,name:"fb:"+t,content:c[t]}});return{title:this.article.attributes.title,meta:[].concat(t,o,u,l),link:e}},filters:{formatDate:d},computed:{disqus:function(){var t={url:"https://adamlynch.com",shortname:"adamlynch-1",api_key:void 0,sso_config:JSON.parse("{}")},e=this.article;return a()({},t,{identifier:e.id,title:e.title,url:""+(t.url||"").replace(/\/$/,"")+this.$route.path})},comments:function(){return"comments"in this.article.attributes&&this.article.attributes.comments}}}},uyaC:function(t,e,n){var r=n("Ptqd"),i=n("jQas");t.exports={distanceInWords:r(),format:i()}},xA5w:function(t,e,n){var r=n("607n"),i=36e5,o=6e4,a=2,s=/[T ]/,u=/:/,c=/^(\d{2})$/,l=[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],f=/^(\d{4})/,h=[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],d=/^-(\d{2})$/,p=/^-?(\d{3})$/,m=/^-?(\d{2})-?(\d{2})$/,g=/^-?W(\d{2})$/,v=/^-?W(\d{2})-?(\d{1})$/,y=/^(\d{2}([.,]\d*)?)$/,b=/^(\d{2}):?(\d{2}([.,]\d*)?)$/,x=/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,w=/([Z+-].*)$/,k=/^(Z)$/,S=/^([+-])(\d{2})$/,D=/^([+-])(\d{2}):?(\d{2})$/;function T(t,e,n){e=e||0,n=n||0;var r=new Date(0);r.setUTCFullYear(t,0,4);var i=7*e+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+i),r}t.exports=function(t,e){if(r(t))return new Date(t.getTime());if("string"!=typeof t)return new Date(t);var n=(e||{}).additionalDigits;n=null==n?a:Number(n);var _=function(t){var e,n={},r=t.split(s);if(u.test(r[0])?(n.date=null,e=r[0]):(n.date=r[0],e=r[1]),e){var i=w.exec(e);i?(n.time=e.replace(i[1],""),n.timezone=i[1]):n.time=e}return n}(t),E=function(t,e){var n,r=l[e],i=h[e];if(n=f.exec(t)||i.exec(t)){var o=n[1];return{year:parseInt(o,10),restDateString:t.slice(o.length)}}if(n=c.exec(t)||r.exec(t)){var a=n[1];return{year:100*parseInt(a,10),restDateString:t.slice(a.length)}}return{year:null}}(_.date,n),M=E.year,A=function(t,e){if(null===e)return null;var n,r,i,o;if(0===t.length)return(r=new Date(0)).setUTCFullYear(e),r;if(n=d.exec(t))return r=new Date(0),i=parseInt(n[1],10)-1,r.setUTCFullYear(e,i),r;if(n=p.exec(t)){r=new Date(0);var a=parseInt(n[1],10);return r.setUTCFullYear(e,0,a),r}if(n=m.exec(t)){r=new Date(0),i=parseInt(n[1],10)-1;var s=parseInt(n[2],10);return r.setUTCFullYear(e,i,s),r}if(n=g.exec(t))return o=parseInt(n[1],10)-1,T(e,o);if(n=v.exec(t)){o=parseInt(n[1],10)-1;var u=parseInt(n[2],10)-1;return T(e,o,u)}return null}(E.restDateString,M);if(A){var C,Y=A.getTime(),F=0;return _.time&&(F=function(t){var e,n,r;if(e=y.exec(t))return(n=parseFloat(e[1].replace(",",".")))%24*i;if(e=b.exec(t))return n=parseInt(e[1],10),r=parseFloat(e[2].replace(",",".")),n%24*i+r*o;if(e=x.exec(t)){n=parseInt(e[1],10),r=parseInt(e[2],10);var a=parseFloat(e[3].replace(",","."));return n%24*i+r*o+1e3*a}return null}(_.time)),_.timezone?(H=_.timezone,C=(O=k.exec(H))?0:(O=S.exec(H))?(j=60*parseInt(O[2],10),"+"===O[1]?-j:j):(O=D.exec(H))?(j=60*parseInt(O[2],10)+parseInt(O[3],10),"+"===O[1]?-j:j):0):(C=new Date(Y+F).getTimezoneOffset(),C=new Date(Y+F+C*o).getTimezoneOffset()),new Date(Y+F+C*o)}var H,O,j;return new Date(t)}},ymQ7:function(t,e,n){var r=n("xA5w"),i=n("JURy"),o=n("nizW");t.exports=function(t){var e=r(t);return o(e,i(e))+1}},zZbG:function(t,e,n){var r=n("xA5w"),i=n("3znZ");t.exports=function(t){var e=r(t),n=e.getFullYear(),o=new Date(0);o.setFullYear(n+1,0,4),o.setHours(0,0,0,0);var a=i(o),s=new Date(0);s.setFullYear(n,0,4),s.setHours(0,0,0,0);var u=i(s);return e.getTime()>=a.getTime()?n+1:e.getTime()>=u.getTime()?n:n-1}}});