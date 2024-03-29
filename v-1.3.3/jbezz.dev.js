/*
	JBezz V1.3.3

	Khaled Developer
	https://github.com/khaled-dev-loper/jbezz-library
*/
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
var $$ = function(q,a = null){
		let elem = []
		if(typeof q === 'string' && !$$.isHtml(q)){
			elem = (a !== null) ? document.querySelectorAll(q+":nth-child("+a+")") : document.querySelectorAll(q)
		}else if (Object.prototype.toString.call(q) === '[object Array]'){
			elem = q;
		}else if(typeof q === 'string' && $$.isHtml(q)){
			elem[0] = $$.toHtml(q);
		} else {
			elem[0] = q;
		}

	let resulater =  {
		elem: $$.uniqeArray(elem),
		setElem: function (arr){
			this.elem = $$.uniqeArray(arr);
			return this;
		},
		find: function(q){
			newElems = [];
			this.run( function (e2) {
					try {
						let me = e2.querySelectorAll(q);
						newElems.push(me);
					} catch (error) {
						console.warn(error);
					}
				}
			);	
			this.setElem(newElems);
			return this;
		},
		closest: function(q){
			newElems = [];
			this.run( function (e2) {
					try {
						let me = e2.closest(q);
						newElems.push(me);
					} catch (error) {
						console.warn(error);
					}
				}
			);	
			this.setElem(newElems);
			return this;
		},
		watchAttr:function(func){
			return this.run(function(elm){
				let observer = new MutationObserver(function(mutations) {
				  mutations.forEach(function(mutation) {
					if (mutation.type == "attributes") {
					  func(mutation.attributeName);
					}
				  });
				});
				observer.observe(elm, {
				  attributes: true //configure it to listen to attribute changes
				});
			});
		},
		data:function(key,val = undefined){
			return this.attr(key+"-data",val);
		},
		resetStyle:function(){
			return this.run(function(e){
					//reset Class
					let cls = $$(e).attr("class");
					$$(e).attr("class","").attr("class",cls)
					//reset CSS Style
					let sty = $$(e).attr("style");
					$$(e).attr("style","").attr("style",cls)
			});
		},
		fadeIn:function(ms = 100,finish = function(){},start = function(){} ){
			return this.run(function(elem){
				$$(elem).animation(function(p){
					if(p == 0){
						start(elem,p);
					}
					$$(elem).css("opacity",p.toString()+"%");
					if(p >= 100){
						finish(elem,p);
					}
				},(6 / 100) * ms,ms);
			});
		},
		fadeOut:function(ms = 100,finish = function(){},start = function(){} ){
			return this.run(function(elem){
				$$(elem).animation(function(p){
					if(p == 0){
						start(elem,p);
					}
					$$(elem).css("opacity",(100 - p).toString()+"%");
					if(p >= 100){
						finish(elem,p);
					}
				},(6 / 100) * ms,ms);
			});
		},
		animation:function(func = function(){},step = 100,ms = 2500){
			let AllSec = 0;
			func((AllSec * 100) / ms)
			function apply(){
				AllSec += (ms / step);
				if(AllSec < ms){
					RunAgain();
					func((AllSec * 100) / ms)
				}else{
					//end
					func((AllSec * 100) / ms)
				}
			}
			function RunAgain(first = false){
				if(first){
					apply();
					return null;
				}
				setTimeout(apply,(ms / step))
			}
			RunAgain(true);
			
		},
		childs:function(){
			let arr = []
			this.run(function(e){
				arr.push(e.children);
			})
			return arr;
		},
		parent:function(q = undefined){
			if(q === undefined){
				return elem[0].parentElement;
			}else if(typeof q === 'string' || q instanceof String){ 
				return this.closest(q);
			} else {
				// run as function
				return this.run(function(er){
					q(elem[0].parentElement, elem[0]);
				});
			}
		},
		hasChild:function (c = undefined, func = undefined, bk = undefined){
			function apply(multi = false){
					let j = 0;
					resulater.run(function(e){
						let childs = resulater.childs();
						$$.each(childs,function(l){
							$$.each(l,function(el){
								if(multi){
									$$.each(c,function(cl){
										func(cl,el === cl);
									});
								}else{
									func(cl,el === c);
								}
								j++;
								
							});
						});
					});
			}
			if(c===undefined){
				return e.hasChildNodes()
			}else{
				if(bk == undefined)
					bk = this.elem;
				if (typeof c === 'string' || c instanceof String) {
					this.find(c);
					return this.hasChild(this.elem, func, bk);
				} else if(Object.prototype.toString.call(c) === '[object HTMLCollection]' || Object.prototype.toString.call(c) === '[object Array]'){
					apply(true);
				}else{
					apply();
				}
			}
			this.setElem(bk);
			return this;
		},
		removeChild:function(child){
			return this.run(function(e){
				if(Object.prototype.toString.call(child) === '[object HTMLCollection]' || Object.prototype.toString.call(child) === '[object Array]'){
					$$.each(child,function(r){
						try{e.removeChild(r);}catch(err){console.warn(err)}
					});
					
				}else{
					try{e.removeChild(child);}catch(err){console.warn(err)}
				}
			})
		},
		addChild:function(child){
			return this.run(function(e){
				if(Object.prototype.toString.call(child) === '[object HTMLCollection]' || Object.prototype.toString.call(child) === '[object Array]'){
					$$.each(child,function(r){
						try{
							if($$.isHtml(r)){
								$$(e).html($$(e).html() + r);
							}else{
								e.appendChild(r);
							}
						}catch(err){
							console.warn(err)
						}
					});
				}else{
					try{
						if($$.isHtml(child)){
							$$(e).html($$(e).html() + child);
						}else{
							e.appendChild(child);
						}
					}catch(err){
						console.warn(err)
					}
				}
			})
		},
		firstChild:function(){
			let arr = []
			this.run(function(e){
				try{arr.push(e.firstChild);}catch(err){}
			});
			return arr;
		},
		lastChild:function(){
			let arr = []
			this.run(function(e){
				try{arr.push(e.lastChild);}catch(err){}
			});
			return arr;
		},
		addFirstChild:function(child){
			return this.run(function(e){
				if(Object.prototype.toString.call(child) === '[object Array]'){
					$$.each(child,function(r){
						try{e.prepend(r);}catch(err){console.warn(err)}
					});
				}else{
					try{e.prepend(child);}catch(err){console.warn(err)}
				}
			})
		},
		posX:function(){
			let arr = []
			this.run(function(e){
				arr.push(e.getBoundingClientRect().x);
			})
			return arr;
		},
		posY:function(){
			let arr = []
			this.run(function(e){
				arr.push(e.getBoundingClientRect().y);
			})
			return arr;
		},
		posTop:function(){
			let arr = []
			this.run(function(e){
				arr.push(e.getBoundingClientRect().top);
			})
			return arr;
		},
		posRight:function(){
			let arr = []
			this.run(function(e){
				arr.push(e.getBoundingClientRect().right);
			})
			return arr;
		},
		posLeft:function(){
			let arr = []
			this.run(function(e){
				arr.push(e.getBoundingClientRect().left);
			})
			return arr;
		},
		posBottom:function(){
			let arr = []
			this.run(function(e){
				arr.push(e.getBoundingClientRect().bottom);
			})
			return arr;
		},
		width:function(){
			let arr = []
			this.run(function(e){
				arr.push(e.getBoundingClientRect().width);
			})
			return arr;
		},
		height:function(){
			let arr = []
			this.run(function(e){
				arr.push(e.getBoundingClientRect().height);
			})
			return arr;
		},
		offset: {
			top: function (){
				let arr = []
				this.run(function(e){
					arr.push(e.offsetTop);
				})
				return arr;
			},
			right: function (){
				let arr = []
				this.run(function(e){
					arr.push(window.innerWidth - e.getBoundingClientRect().right);
				})
				return arr;
			},
			bottom: function (){
				let arr = []
				this.run(function(e){
					arr.push(window.innerHeight - e.getBoundingClientRect().bottom);
				})
				return arr;
			},
			left: function (){
				let arr = []
				this.run(function(e){
					arr.push(e.offsetLeft);
				})
				return arr;
			},
			width: function (client = false){
				let arr = []
				this.run(function(e){
					arr.push(client ? e.clientWidth : e.offsetWidth);
				})
				return arr;
			},
			height: function (client = false){
				let arr = []
				this.run(function(e){
					arr.push(client ? e.clientHeight : e.offsetHeight);
				})
				return arr;
			}
		},
		size:function(){
			let arr = []
			this.run(function(e){
				let temp = [];
				let wid = e.getBoundingClientRect().width;
				let hei = e.getBoundingClientRect().height;
				temp.push(wid,hei);
				arr.push(temp);
			})
			return arr;
		},
		attr:function(){
			if(arguments.length === 0){
				let arr = [];
				let j = 0;
				this.run(function(el){
					arr[j] = [];
					for(var i = 0;i < el.attributes.length;i++){
						arr[j][i] = el.attributes[i].nodeName;
						}
					j++;
					
				})
				return arr;
			}else if(arguments.length === 1){
				return elem[0].getAttribute(arguments[0]);
			}else if(arguments.length === 2){
				let key = arguments[0];
				let val = arguments[1];
				this.run(function(el){
					el.setAttribute(key,val)
				});
			}
			return this;
		},
		removeAttr:function(s){
			return this.run(function(e){
				e.removeAttribute(s);
			})
		},
		addClass:function(classname){
			return this.class.add(classname)
		},
		removeClass:function(classname){
			return this.class.remove(classname)
		},
		toggleClass:function(classname){
			return this.class.toggle(classname)
		},
		class:{
			get:function(){
				let arr = [];
				let j = 0;
				resulater.run(function(e){
					arr[j] = e.className;
					j++;
				});
				return arr;
			},
			has:function(classname){
				let find = [];
				let j = 0
				function apply(e){
					find[j] = false;
					if(e.className.includes(classname)){
						let sl = e.className.split(" ")
						sl.forEach(function(b){
							if(b == classname){
								find [j] = true;
							}
						});
					}
					j++;
				}
				resulater.run(function(el){apply(el)})
				return find;
			},
			remove:function(classname){
				function apply(e){
					let find = false;
					if(e.className.includes(classname)){
						let sl = e.className.split(" ")
						let j = 0 // index
						sl.forEach(function(b){
							if(b == classname){
								find = true;
								
							}
							if(find){
								sl[j] = ""
							}else{
								j++
							}
						})
						e.className = sl.join(" ")
						
					}
					if(e.className.replace(" ","") === '')
						e.removeAttribute("class");
				}
				resulater.run(function(e){apply(e)});
				return resulater.class;
			},
			add:function(classname){
				function apply(e){
					
					if(e.hasAttribute("class")){
						let find = false;
						if(e.className.includes(classname)){
							let sl = e.className.split(" ")
							sl.forEach(function(b){
								if(b == classname){
									find = true;
								}
							})
							if(find == false){
								sl[sl.length] = classname
							}
							e.className = sl.join(" ")
							
						}else{
							e.className += " " + classname
						}
					}else{
						e.setAttribute("class",classname)
					}
				}
				resulater.run(function(e){apply(e)});
				return resulater.class;
			},
			toggle:function(classname){
				
				//has
				function apply(e){
					if($$(e).class.has(classname)[0]){
						$$(e).class.remove(classname)
					}else{
						$$(e).class.add(classname)
					}
				}
				resulater.run(function(el){apply(el)})
				return resulater.class;
			},
		},
		css:function(key,val = undefined,important = false){
			function add_style(e){
				let MainStyle = "";
				if($$(e).attr("style")){
					let notFound = true;
					let styles = e.getAttribute("style").replace('\n',"").replace("\n","").replace('\r',"").replace("\t","").split(";")
					styles.forEach(function(el){
						if(el.includes(key)){
							let keys = el.split(":");
							if(keys.includes(key)){
								if(keys[0] == key){
									keys[1] = val
									notFound = false;
								}
							}
							MainStyle += keys.join(": ")+(important ? " !important" : "" )+";"
						}else if(el !== ''){
							
							MainStyle += el + ";"; //el.replace(" !important","")+(important ? " !important" : "" )+";"
						}
					})
					if(notFound){
						MainStyle += key+": "+val+";";
					}
				}else{
					MainStyle += key+": "+val+";";
				}
				$$(e).attr("style", MainStyle);
			}
			let res = this;
			this.run(function(elm){
				if(val === undefined){
					res = window.getComputedStyle(elm,null).getPropertyValue(key);
				}else{
					add_style(elm);
				}
			});
			return res;
		},
		monitor: function (){
			Object.keys(window).forEach(key => {
				if (/^on/.test(key)) {
					window.addEventListener(key.slice(2), event => {
						console.log(event);
					});
				}
			});
			return this;
		},
		ready:function(func, q = undefined, ms = 100){
			function findElem(func2 , b = undefined, mms = 100){
				if(b !== undefined && $$(b).elem.length){
					func2()
				}else{
					setTimeout((a,c,d)=>{
						findElem(a,c,d);
					}, mms, func2 , b, mms);
				}
			}
			return this.run(function(e){
				let LiveAction = null;
				if(Object.prototype.toString.call(e) == '[object HTMLDocument]' && q === undefined){
					$$(e).on("DOMContentLoaded",() =>{func()});
					clearInterval(LiveAction);
				}else if(Object.prototype.toString.call(e) == '[object Window]' && q === undefined){
					$$(e).on("load",() =>{func()});
					clearInterval(LiveAction);
				}else if(q !== undefined){
					findElem(func, q, ms);
				}
			});
		},
		hover:function(onEnter, onMove, onExit){
			this.mouseEnter(onEnter)
			this.mouseMove(onMove);
			this.mouseExit(onExit);
			return this;
		},
		mouseEnter:function(func){
			return this.on("mouseenter",func);
		},
		mouseMove:function(func){
			return this.on("mousemove",func);
		},
		mouseOver:function(func){
			return this.on("mouseover",func);
		},
		mouseExit:function(func){
			return this.on("mouseleave",func);
		},
		mouseDown:function(func){
			return this.on("mousedown",func);
		},
		mouseUp:function(func){
			return this.on("mouseup",func);
		},
		focus:function(func){
			return this.on("focus",func);
		},
		blur:function(func){
			return this.on("blur",func);
		},
		unload:function(func){
			return this.on("unload",func);
		},
		input:function(func){
			return this.on("input",func);
		},
		change:function(func){
			return this.on("change",func);
		},
		click:function(func = undefined){
			if(func === undefined){
				return this.run(function(e){
					e.click();
				})
			}else{
				return this.on("click",func);
			}
		},
		dblclick:function(func){
			return this.on("dblclick",func);
		},
		keyDown:function(func){
			return this.on("keydown",func);
		},
		keyUp:function(func){
			return this.on("keyup",func);
		},
		show:function(display = "block"){
			return this.run(function(el){$$(el).css("display",display).css("opacity","100%");});
		},
		hide:function(){
			return this.run(function(el){$$(el).css("display","none").css("opacity","0");});
		},
		off:function(eventStr,func){
			return this.run(function(e){e.removeEventListener(eventStr,func)});
		},
		on:function(eventStr,func){
			return this.run(function(e){e.addEventListener(eventStr,function(even){func(even,e)})});
		},
		val:function(e=undefined){
			if(elem[0].tagName = "input" && elem[0].getAttribute("type") == "radio"){
				let res = null;
				this.run(function(e){
					if(e.checked)
						res = e.value;
				});
				return res;
			}else{
				if(e===undefined){
					return elem[0].value;
				}else{
					this.run(function(elm){elm.value = e});
					return this;
				}
			}
			
		},
		text:function(e=undefined){
			if(e===undefined){
				return elem[0].innerText;
			}else{
				this.run(function(elm){elm.innerText = e});
				return this;
			}
		},
		html:function(e=undefined){
			if(e===undefined){
				return elem[0].innerHTML;
			}else{
				this.run(function(elm){elm.innerHTML = e});
				return this;
			}
		},
		empty:function(){
			return this.run(function(e){e.innerHTML = null});
		},
		self:function(eventQ,func){
			return this.run(function(elm){
				$$(elm).on(eventQ.replace("hover","mousemove"),function(even){
					 even.stopPropagation();
					if(even.target == elm){
						func(even.target)
					}
				})
			});
		},
		clickOnly: function(func){
			return this.self('click', func);
		},
		kill:function(func = undefined){
			return this.run(function(el){el.remove(); if(func !== undefined) {func()}})
		},
		remove: function(func = undefined){
			return this.kill(func);
		},
		run:function(func){
			// ForEech of Elements
			if(this.elem.length){
				this.elem.forEach(function(E,i){
					func(E,i);
				});
			}
			return this;
		},
		runEvent:function(ev = "" , data = undefined, isCustom = false ){
			// Run Custom Event
			return this.run(function(el){
				el.dispatchEvent(isCustom ? (new CustomEvent(ev,data)) : (new Event(ev, data)))
			});
		}
		
	}
	return resulater;
}
$$['$save'] = function(){return null;}
$$.makeHttpObject = function () {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}
  throw new Error("Could not create HTTP request object.");
}
$$.get = function(data){
	let url = data.url;
	let func = (data.success ? data.success : function(){})
	let funcE =(data.error ? data.error : function(){})
	let a_syne = (data.asyne ? data.asyne : false);	
	var xmlHttp = $$.makeHttpObject();
	xmlHttp.onreadystatechange = function() {if (xmlHttp.readyState == 4){if(xmlHttp.status == 200){func(xmlHttp.responseText)}else{funcE(xmlHttp.statusText)}}}
	xmlHttp.open("GET", url, a_syne);
	xmlHttp.ontimeout = funcE;
	xmlHttp.send(null); 
}
$$.api = function(data){
	let type = (data.type ? data.type : "GET")
	let DataS = data.data;
	let url = data.url;
	let withCredentials = (data.withCredentials ? data.withCredentials : false)
	let funcS = (data.start ? data.start : function(){})
	let progress = (data.progress ? data.progress : false)
	let OnceFuncS = false;
	let func = (data.success ? data.success : function(){})
	let funcE =(data.error ? data.error : function(){})
	let a_syne = (data.asyne ? data.asyne : false);	
	let u = null;
	try{u = new URLSearchParams(DataS).toString();}catch(e){u = Object.keys(DataS).map(function(k) {return encodeURIComponent(k) + '=' + encodeURIComponent(DataS[k])}).join('&')}
	if(type == "GET"){url +="?"+u}
	const xhttp =  $$.makeHttpObject();
	xhttp.onload = function(){func(this.responseText)}
	if(progress !== false){
		xhttp.onprogress  = function(){
			var percentComplete = 0;
			if (evt.lengthComputable) 
			{ 
				percentComplete = (evt.loaded / evt.total) * 100;  
			} 
			progress(percentComplete,evt);
		}
	}
	xhttp.withCredentials = withCredentials;
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 1){
			if(OnceFuncS == false){
				funcS();
				OnceFuncS = true;
			}
		}
		if (xhttp.readyState == 4){
			if(xhttp.status !== 200){
				funcE(xhttp.statusText)
			}
		}
	}
	xhttp.open(type,url,a_syne);
	xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(u);
	
}
$$.cssPath = function(el) {
        if (!(el instanceof Element)) 
		{
			let m = $$(el);
			let arr = []
			m.run(function(e){
				arr.push($$.cssPath(e))
			})
			return $$.uniqeArray(arr);
		}
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
            var selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
                path.unshift(selector);
                break;
            } else {
                var sib = el, nth = 1;
                while (sib = sib.previousElementSibling) {
                    if (sib.nodeName.toLowerCase() == selector)
                       nth++;
                }
                if (nth != 1)
                    selector += ":nth-of-type("+nth+")";
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(" > ");
     }
$$.toHtml = function (str) {
	return new DOMParser().parseFromString(str, "text/html");
}
$$.isHtml = function (str) {
	var doc = $$.toHtml(str)
	return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
}
$$.each = function(list,func){
	try{list.forEach(func);}catch (e){for(let o=0;o<list.length;o++){func(list[o]);}}
}
$$.loadScript = function(url,type = "text/javascript",doc = document){
	let script = "";
	if(url.includes("://")){
		script = doc.createElement('script');
		$$(script).attr("src",url).attr("type",type);
		$$(doc.head).addChild(script);
	}else{
		script = "<script type='"+type+"'>"+script+"</script>"
		$$(doc.head).addChild(script);
	}
}
$$.uniqeArray = function(arr) {
	var seen = {};
	if(typeof arr.filter === 'function'){
		return arr.filter(function(item) {
			return seen.hasOwnProperty(item) ? false : (seen[item] = true);
		});
	}
	return arr;
}
$$.ready = function(func, q = undefined){
	return $$(document || window).ready(func, q);
}
$$.monitor = function(){
	return $$(window).monitor();
}
$$.load = function (){
	window.dispatchEvent( new Event('load') );
	document.dispatchEvent( new Event('DOMContentLoaded') );
}
