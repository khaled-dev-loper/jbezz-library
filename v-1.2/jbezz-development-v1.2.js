/*

	JBezz V1.2

	Khaled Developer
	https://github.com/khaled-dev-loper/jbezz-library

*/
//IE Support
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
var $$ = function(q,a = null){
		let elem = []
		if(typeof q === 'string'){
			elem = (a !== null) ? document.querySelectorAll(q+":nth-child("+a+")") : document.querySelectorAll(q)
		}else if (Object.prototype.toString.call(q) === '[object Array]'){
			elem = q;
		}else{
			elem[0] = q;
		}
let resulater =  {
		watchAttr:function(func){
			return resulater.run(function(elm){
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
		elem:elem,
		data:function(Key,Val = undefined){
			return resulater.attr(Key+"-data",Val);
		},
		resetStyle:function(){
			return resulater.run(function(e){
					//reset Class
					let cls = $$(e).attr("class");
					$$(e).attr("class","").attr("class",cls)
					//reset CSS Style
					let sty = $$(e).attr("style");
					$$(e).attr("style","").attr("style",cls)
			});
		},
		fadeIn:function(ms = 100,finish = function(){},start = function(){} ){
			return resulater.run(function(elem){
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
			return resulater.run(function(elem){
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
		animation:function(func = function(){},sp = 100,ms = 2500){
			let AllSec = 0;
			func((AllSec * 100) / ms)
			function apply(){
				AllSec += (ms / sp);
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
				setTimeout(apply,(ms / sp))
			}
			RunAgain(true);
			
		},
		childs:function(){
			let arr = []
			resulater.run(function(e){
				arr.push(e.children);
			})
			return arr;
		},
		parent:function(){
			if(arguments.length === 0){
				return elem[0].parentElement;
			}else if(arguments.length > 0){
				arguments[0](elem[0].parentElement,elem[0]);
				return resulater;
			}
		},
		hasChild:function(c = undefined,func = undefined){
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
				if(Object.prototype.toString.call(c) === '[object HTMLCollection]' || Object.prototype.toString.call(c) === '[object Array]'){
					apply(true);
				}else{
					apply();
				}
			}
			return resulater;
		},
		removeChild:function(child){
			return resulater.run(function(e){
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
			return resulater.run(function(e){
				if(Object.prototype.toString.call(child) === '[object HTMLCollection]' || Object.prototype.toString.call(child) === '[object Array]'){
					$$.each(child,function(r){
						try{e.appendChild(r);}catch(err){console.warn(err)}
					});
				}else{
					try{e.appendChild(child);}catch(err){console.warn(err)}
				}
			})
		},
		firstChild:function(){
			let arr = []
			resulater.run(function(e){
				try{arr.push(e.firstChild);}catch(err){}
			});
			return arr;
		},
		lastChild:function(){
			let arr = []
			resulater.run(function(e){
				try{arr.push(e.lastChild);}catch(err){}
			});
			return arr;
		},
		addFirstChild:function(child){
			return resulater.run(function(e){
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
			resulater.run(function(e){
				arr.push(e.getBoundingClientRect().x);
			})
			return arr;
		},
		posY:function(){
			let arr = []
			resulater.run(function(e){
				arr.push(e.getBoundingClientRect().y);
			})
			return arr;
		},
		posTop:function(){
			let arr = []
			resulater.run(function(e){
				arr.push(e.getBoundingClientRect().top);
			})
			return arr;
		},
		posRight:function(){
			let arr = []
			resulater.run(function(e){
				arr.push(e.getBoundingClientRect().right);
			})
			return arr;
		},
		posLeft:function(){
			let arr = []
			resulater.run(function(e){
				arr.push(e.getBoundingClientRect().left);
			})
			return arr;
		},
		posBottom:function(){
			let arr = []
			resulater.run(function(e){
				arr.push(e.getBoundingClientRect().bottom);
			})
			return arr;
		},
		width:function(){
			let arr = []
			resulater.run(function(e){
				arr.push(e.getBoundingClientRect().width);
			})
			return arr;
		},
		height:function(){
			let arr = []
			resulater.run(function(e){
				arr.push(e.getBoundingClientRect().height);
			})
			return arr;
		},
		size:function(){
			let arr = []
			resulater.run(function(e){
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
				resulater.run(function(el){
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
				resulater.run(function(el){
					el.setAttribute(key,val)
				});
			}
			return resulater;
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
					let sl = [];
					let find = false;
					if(e.className.includes(classname)){
						let j = 0;
						sl = e.className.split(" ")
						sl.forEach(function(b){
							if(b == classname){
								find  = true;
							}
							if(find){
								sl[j] = "";
							}else{
								j++;
							}
						});
					}
					if(!find){
						if(find == false){
							sl[sl.length] = classname
						}
					}
					if(sl !== []){
						e.className = sl.join(" ")
					}
					if(e.className.replace(" ","") === ''){
						e.removeAttribute("class");
					}
				}
				resulater.run(function(el){apply(el)})
				return resulater.class;
			},
		},
		css:function(key,val = undefined,important = false){
			function add_style(e){
				let MainStyle = "";
				if(e.hasAttribute("style")){
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
				e.setAttribute("style",MainStyle);
			}
			let res = resulater;
			resulater.run(function(elm){
				if(val === undefined){
					res = window.getComputedStyle(elm,null).getPropertyValue(key);
				}else{add_style(elm);}
			});
			return res;
		},
		ready:function(func){
				return resulater.run(function(e){
					let LiveAction = setInterval(function(){
						if(Object.prototype.toString.call(e) == '[object HTMLDocument]'){
							return resulater.on("DOMContentLoaded",func);
							clearInterval(LiveAction);
						}else if(Object.prototype.toString.call(e) == '[object Window]'){
							return resulater.on("load",func);
							clearInterval(LiveAction);
						}else if(e !== undefined && (e.length > 0 || e)){
							func();
							clearInterval(LiveAction);
						}
					},100);
				});
		},
		hover:function(func){
			return this.mouseMove(func)
		},
		mouseEnter:function(func){
			
			return resulater.on("mouseenter",func);
		},
		mouseMove:function(func){
			
			return resulater.on("mousemove",func);
		},
		mouseOver:function(func){
			
			return resulater.on("mouseover",func);
		},
		mouseExit:function(func){
			
			return resulater.on("mouseleave",func);
		},
		mouseDown:function(func){
			
			return resulater.on("mousedown",func);
		},
		mouseUp:function(func){
			
			return resulater.on("mouseup",func);
		},
		focus:function(func){
			
			return resulater.on("focus",func);
		},
		blur:function(func){
			
			return resulater.on("blur",func);
		},
		unload:function(func){
			
			return resulater.on("unload",func);
		},
		input:function(func){
			
			return resulater.on("input",func);
		},
		change:function(func){
			
			return resulater.on("change",func);
		},
		click:function(func = undefined){
			if(func === undefined){
				return resulater.run(function(e){
					e.click();
				})
			}else{
				return resulater.on("click",func);
			}
		},
		dblclick:function(func){
			return resulater.on("dblclick",func);
		},
		keyDown:function(func){
			return resulater.on("keydown",func);
		},
		keyUp:function(func){
			return resulater.on("keyup",func);
		},
		show:function(display = "block"){
			return resulater.run(function(el){$$(el).css("display",display).css("opacity","100%");});
		},
		hide:function(){
			return resulater.run(function(el){$$(el).css("display","none").css("opacity","0");});
		},
		off:function(eventStr,func){
			return resulater.run(function(e){e.removeEventListener(eventStr,func)});
		},
		on:function(eventStr,func){
			return resulater.run(function(e){e.addEventListener(eventStr,func)});
		},
		val:function(e=undefined){
			if(elem[0].tagName = "input" && elem[0].getAttribute("type") == "radio"){
				let res = null;
				elem.forEach(function(e){
					if(e.checked)
						res = e.value;
				});
				return res;
			}else{
				if(e===undefined){
					return elem[0].value;
				}else{
					this.run(function(elm){elm.value = e});
					return resulater;
				}
			}
			
		},
		text:function(e=undefined){
			if(e===undefined){
				return elem[0].innerText;
			}else{
				this.run(function(elm){elm.innerText = e});
				return resulater;
			}
		},
		html:function(e=undefined){
			if(e===undefined){
				return elem[0].innerHTML;
			}else{
				this.run(function(elm){elm.innerHTML = e});
				return resulater;
			}
		},
		empty:function(){
			return resulater.html(null)
		},
		self:function(eventQ,func){
			resulater.run(function(elm){
				$$(elm).on(eventQ.replace("hover","mousemove"),function(even){
					 even.stopPropagation();
					if(even.target == elm){
						func(even.target)
					}
				})
			})
			return resulater;
		},
		kill:function(func){
			return resulater.run(function(el){el.remove();})
		},
		run:function(func){
			if(a !== null){elem.forEach(function(E,i){func(E,i)});}else{func(elem[0],0);}return resulater;
		},
		runEvent:function(ev = "",data = null){
			return resulater.run(function(el){
				el.dispatchEvent(new CustomEvent(ev,data))
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
$$.popup = function(url,target,size,content = null,future = null){
	let win =  window.open(url, target, "width="+size[0]+",height="+size[1]+","+future);win.document.write(content);return win;
}
$$.close = function(e){
	e.close();
	return true;
}
$$.cssPath = function(el) {
        if (!(el instanceof Element)) 
            return;
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
	var parser = new DOMParser();
	return parser.parseFromString(str, 'text/html');
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
		$$(doc.head).html($$(doc.head).html() + script);
	}
	
}
