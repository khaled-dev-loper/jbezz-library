/*

	JBezz V1.3.1

	Khaled Developer
	https://github.com/khaled-dev-loper/jbezz-library

*/
"remove"in Element.prototype||(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)});var $$=function(t,n=null){let o=[];"string"==typeof t?o=null!==n?document.querySelectorAll(t+":nth-child("+n+")"):document.querySelectorAll(t):"[object Array]"===Object.prototype.toString.call(t)?o=t:o[0]=t;let i={watchAttr:function(e){return i.run(function(t){let n=new MutationObserver(function(t){t.forEach(function(t){"attributes"==t.type&&e(t.attributeName)})});n.observe(t,{attributes:!0})})},elem:o,data:function(t,n=void 0){return i.attr(t+"-data",n)},resetStyle:function(){return i.run(function(t){var n=$$(t).attr("class");$$(t).attr("class","").attr("class",n);$$(t).attr("style");$$(t).attr("style","").attr("style",n)})},fadeIn:function(t=100,e=function(){},o=function(){}){return i.run(function(n){$$(n).animation(function(t){0==t&&o(n,t),$$(n).css("opacity",t.toString()+"%"),100<=t&&e(n,t)},.06*t,t)})},fadeOut:function(t=100,e=function(){},o=function(){}){return i.run(function(n){$$(n).animation(function(t){0==t&&o(n,t),$$(n).css("opacity",(100-t).toString()+"%"),100<=t&&e(n,t)},.06*t,t)})},animation:function(t=function(){},n=100,e=2500){let o=0;function r(){o+=e/n,o<e&&u(),t(100*o/e)}function u(t){t?r():setTimeout(r,e/n)}t(100*o/e),u(!0)},childs:function(){let n=[];return i.run(function(t){n.push(t.children)}),n},parent:function(){return 0===arguments.length?o[0].parentElement:0<arguments.length?(arguments[0](o[0].parentElement,o[0]),i):void 0},hasChild:function(r=void 0,u=void 0){function t(e){let o=0;i.run(function(t){var n=i.childs();$$.each(n,function(t){$$.each(t,function(n){e?$$.each(r,function(t){u(t,n===t)}):u(cl,n===r),o++})})})}return void 0===r?e.hasChildNodes():("[object HTMLCollection]"===Object.prototype.toString.call(r)||"[object Array]"===Object.prototype.toString.call(r)?t(!0):t(),i)},removeChild:function(t){return i.run(function(n){if("[object HTMLCollection]"===Object.prototype.toString.call(t)||"[object Array]"===Object.prototype.toString.call(t))$$.each(t,function(t){try{n.removeChild(t)}catch(t){console.warn(t)}});else try{n.removeChild(t)}catch(t){console.warn(t)}})},addChild:function(t){return i.run(function(n){if("[object HTMLCollection]"===Object.prototype.toString.call(t)||"[object Array]"===Object.prototype.toString.call(t))$$.each(t,function(t){try{n.appendChild(t)}catch(t){console.warn(t)}});else try{n.appendChild(t)}catch(t){console.warn(t)}})},firstChild:function(){let n=[];return i.run(function(t){try{n.push(t.firstChild)}catch(t){}}),n},lastChild:function(){let n=[];return i.run(function(t){try{n.push(t.lastChild)}catch(t){}}),n},addFirstChild:function(t){return i.run(function(n){if("[object Array]"===Object.prototype.toString.call(t))$$.each(t,function(t){try{n.prepend(t)}catch(t){console.warn(t)}});else try{n.prepend(t)}catch(t){console.warn(t)}})},posX:function(){let n=[];return i.run(function(t){n.push(t.getBoundingClientRect().x)}),n},posY:function(){let n=[];return i.run(function(t){n.push(t.getBoundingClientRect().y)}),n},posTop:function(){let n=[];return i.run(function(t){n.push(t.getBoundingClientRect().top)}),n},posRight:function(){let n=[];return i.run(function(t){n.push(t.getBoundingClientRect().right)}),n},posLeft:function(){let n=[];return i.run(function(t){n.push(t.getBoundingClientRect().left)}),n},posBottom:function(){let n=[];return i.run(function(t){n.push(t.getBoundingClientRect().bottom)}),n},width:function(){let n=[];return i.run(function(t){n.push(t.getBoundingClientRect().width)}),n},height:function(){let n=[];return i.run(function(t){n.push(t.getBoundingClientRect().height)}),n},size:function(){let o=[];return i.run(function(t){let n=[];var e=t.getBoundingClientRect().width,t=t.getBoundingClientRect().height;n.push(e,t),o.push(n)}),o},attr:function(){if(0!==arguments.length)return 1===arguments.length?o[0].getAttribute(arguments[0]):(2===arguments.length&&(n=arguments[0],e=arguments[1],i.run(function(t){t.setAttribute(n,e)})),i);{let e=[],o=0;return i.run(function(t){e[o]=[];for(var n=0;n<t.attributes.length;n++)e[o][n]=t.attributes[n].nodeName;o++}),e}var n,e},removeAttr:function(n){return i.run(function(t){t.removeAttribute(n)})},addClass:function(t){return i.class.add(t)},removeClass:function(t){return i.class.remove(t)},toggleClass:function(t){return i.class.toggle(t)},class:{get:function(){let n=[],e=0;return i.run(function(t){n[e]=t.className,e++}),n},has:function(e){let o=[],r=0;return i.run(function(t){!function(n){if(o[r]=!1,n.className.includes(e)){let t=n.className.split(" ");t.forEach(function(t){t==e&&(o[r]=!0)})}r++}(t)}),o},remove:function(r){return i.run(function(t){!function(t){let o=!1;if(t.className.includes(r)){let n=t.className.split(" "),e=0;n.forEach(function(t){t==r&&(o=!0),o?n[e]="":e++}),t.className=n.join(" ")}""===t.className.replace(" ","")&&t.removeAttribute("class")}(t)}),i.class},add:function(o){return i.run(function(t){!function(e){if(e.hasAttribute("class")){let n=!1;if(e.className.includes(o)){let t=e.className.split(" ");t.forEach(function(t){t==o&&(n=!0)}),0==n&&(t[t.length]=o),e.className=t.join(" ")}else e.className+=" "+o}else e.setAttribute("class",o)}(t)}),i.class},toggle:function(r){return i.run(function(t){!function(t){let e=[],o=!1;if(t.className.includes(r)){let n=0;e=t.className.split(" "),e.forEach(function(t){t==r&&(o=!0),o?e[n]="":n++})}o||0==o&&(e[e.length]=r),e!==[]&&(t.className=e.join(" ")),""===t.className.replace(" ","")&&t.removeAttribute("class")}(t)}),i.class}},css:function(r,u=void 0,c=!1){let n=i;return i.run(function(t){void 0===u?n=window.getComputedStyle(t,null).getPropertyValue(r):function(n){let o="";if(n.hasAttribute("style")){let e=!0,t=n.getAttribute("style").replace("\n","").replace("\n","").replace("\r","").replace("\t","").split(";");t.forEach(function(n){if(n.includes(r)){let t=n.split(":");t.includes(r)&&t[0]==r&&(t[1]=u,e=!1),o+=t.join(": ")+(c?" !important":"")+";"}else""!==n&&(o+=n+";")}),e&&(o+=r+": "+u+";")}else o+=r+": "+u+";";n.setAttribute("style",o)}(t)}),n},ready:function(e){return i.run(function(t){let n=setInterval(function(){return"[object HTMLDocument]"==Object.prototype.toString.call(t)?i.on("DOMContentLoaded",e):"[object Window]"==Object.prototype.toString.call(t)?i.on("load",e):void(void 0!==t&&(0<t.length||t)&&(e(),clearInterval(n)))},1)})},hover:function(t){return this.mouseMove(t)},mouseEnter:function(t){return i.on("mouseenter",t)},mouseMove:function(t){return i.on("mousemove",t)},mouseOver:function(t){return i.on("mouseover",t)},mouseExit:function(t){return i.on("mouseleave",t)},mouseDown:function(t){return i.on("mousedown",t)},mouseUp:function(t){return i.on("mouseup",t)},focus:function(t){return i.on("focus",t)},blur:function(t){return i.on("blur",t)},unload:function(t){return i.on("unload",t)},input:function(t){return i.on("input",t)},change:function(t){return i.on("change",t)},click:function(t=void 0){return void 0===t?i.run(function(t){t.click()}):i.on("click",t)},dblclick:function(t){return i.on("dblclick",t)},keyDown:function(t){return i.on("keydown",t)},keyUp:function(t){return i.on("keyup",t)},show:function(n="block"){return i.run(function(t){$$(t).css("display",n).css("opacity","100%")})},hide:function(){return i.run(function(t){$$(t).css("display","none").css("opacity","0")})},off:function(n,e){return i.run(function(t){t.removeEventListener(n,e)})},on:function(t,e){return i.run(function(n){n.addEventListener(t,function(t){e(t,n)})})},val:function(n=void 0){if(o[0].tagName="radio"==o[0].getAttribute("type")){let n=null;return o.forEach(function(t){t.checked&&(n=t.value)}),n}return void 0===n?o[0].value:(this.run(function(t){t.value=n}),i)},text:function(n=void 0){return void 0===n?o[0].innerText:(this.run(function(t){t.innerText=n}),i)},html:function(n=void 0){return void 0===n?o[0].innerHTML:(this.run(function(t){t.innerHTML=n}),i)},empty:function(){return i.html(null)},self:function(t,e){return i.run(function(n){$$(n).on(t.replace("hover","mousemove"),function(t){t.stopPropagation(),t.target==n&&e(t.target)})}),i},kill:function(t){return i.run(function(t){t.remove()})},run:function(e){return null!==n?o.forEach(function(t,n){e(t,n)}):e(o[0],0),i},runEvent:function(n="",e=null){return i.run(function(t){t.dispatchEvent(new CustomEvent(n,e))})}};return i};$$.$save=function(){return null},$$.makeHttpObject=function(){try{return new XMLHttpRequest}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}throw new Error("Could not create HTTP request object.")},$$.get=function(t){var n=t.url;let e=t.success||function(){},o=t.error||function(){};var t=t.asyne||!1,r=$$.makeHttpObject();r.onreadystatechange=function(){4==r.readyState&&(200==r.status?e(r.responseText):o(r.statusText))},r.open("GET",n,t),r.ontimeout=o,r.send(null)},$$.api=function(t){var n=t.type||"GET",e=t.data;let o=t.url;var r=t.withCredentials||!1;let u=t.start||function(){},c=t.progress||!1,i=!1,l=t.success||function(){},a=t.error||function(){};t=t.asyne||!1;let s=null;try{s=new URLSearchParams(e).toString()}catch(t){s=Object.keys(e).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&")}"GET"==n&&(o+="?"+s);const f=$$.makeHttpObject();!(f.onload=function(){l(this.responseText)})!==c&&(f.onprogress=function(){var t=0;evt.lengthComputable&&(t=evt.loaded/evt.total*100),c(t,evt)}),f.withCredentials=r,f.onreadystatechange=function(){1==f.readyState&&0==i&&(u(),i=!0),4==f.readyState&&200!==f.status&&a(f.statusText)},f.open(n,o,t),f.setRequestHeader("Access-Control-Allow-Origin","*"),f.setRequestHeader("Content-type","application/x-www-form-urlencoded"),f.send(s)},$$.cssPath=function(t){if(t instanceof Element){for(var n=[];t.nodeType===Node.ELEMENT_NODE;){var e=t.nodeName.toLowerCase();if(t.id){e+="#"+t.id,n.unshift(e);break}for(var o=t,r=1;o=o.previousElementSibling;)o.nodeName.toLowerCase()==e&&r++;1!=r&&(e+=":nth-of-type("+r+")"),n.unshift(e),t=t.parentNode}return n.join(" > ")}},$$.toHtml=function(t){return(new DOMParser).parseFromString(t,"text/html")},$$.each=function(n,e){try{n.forEach(e)}catch(t){for(let t=0;t<n.length;t++)e(n[t])}},$$.loadScript=function(t,n="text/javascript",e=document){let o="";t.includes("://")?(o=e.createElement("script"),$$(o).attr("src",t).attr("type",n),$$(e.head).addChild(o)):(o="<script type='"+n+"'>"+o+"<\/script>",$$(e.head).html($$(e.head).html()+o))};
