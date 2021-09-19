var $$ = function(q,a = null){
		let elem = []
		if(typeof q === 'string'){
			elem = (a !== null) ? document.querySelectorAll(q+":nth-child("+a+")") : document.querySelectorAll(q)
		}else{
			elem[0] = q;
		}
	let resulater =  {
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
		css:function(key,val,important = false){
			function add_style(e){
				let MainStyle = "";
				if(e.hasAttribute("style")){
					let notFound = true;
					let styles = e.getAttribute("style").replace('\n',"").replace("\n","").split(";")
					styles.forEach(function(el){
						if(el.includes(key)){
							let keys = el.split(":");
							if(keys.includes(key)){
								keys[1] = val
							}
							notFound = false;
							MainStyle += keys.join(":")+(important ? " !important" : "" )+";\n"
						}else if(el !== ''){
							
							MainStyle += el.replace(" !important","")+(important ? " !important" : "" )+";\n"
						}
					})
					if(notFound){
						MainStyle += key+":"+val.replace(" !important","")+(important ? " !important" : "" )+";\n";
					}
				}else{
					MainStyle += key+":"+val.replace(" !important","")+(important ? " !important" : "" )+";\n";
				}
				e.setAttribute("style",MainStyle);
			}
			this.run(function(e){add_style(e)})
			return resulater;
		},
		ready:function(func){
			resulater.on("load",func)
			return resulater;
		},
		hover:function(func){
			return this.mouseMove(func)
		},
		mouseEnter:function(func){
			resulater.on("mouseenter",func)
			return resulater;
		},
		mouseMove:function(func){
			resulater.on("mousemove",func)
			return resulater;
		},
		mouseOver:function(func){
			resulater.on("mouseover",func)
			return resulater;
		},
		mouseExit:function(func){
			resulater.on("mouseleave",func)
			return resulater;
			
		},
		onRemove:function(eventStr,func){
			function resetEvent(e){
				e.removeEventListener("click",func)
			}
			resulater.run(function(e){resetEvent(e)});
			return resulater;
		},
		on:function(eventStr,func){
			resulater.run(function(e){e.addEventListener(eventStr,func)});
			return resulater;
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
		run:function(func){
			if(a !== null){elem.forEach(function(E){func(E)});}else{func(elem[0]);}
		}
	}
	return resulater;
}
$$['$save'] = function(){return null;}
$$['makeHttpObject'] = function () {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}
  throw new Error("Could not create HTTP request object.");
}
$$['get'] = function(data){
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
$$['api'] = function(data){
	let type = (data.type ? data.type : "GET")
	let DataS = data.data;
	let url = data.url;
	let func = (data.success ? data.success : function(){})
	let funcE =(data.error ? data.error : function(){})
	let a_syne = (data.asyne ? data.asyne : false);	
	let u = null;
	try{u = new URLSearchParams(DataS).toString();}catch(e){u = Object.keys(DataS).map(function(k) {return encodeURIComponent(k) + '=' + encodeURIComponent(DataS[k])}).join('&')}
	if(type == "GET"){url +="?"+u}
	const xhttp =  $$.makeHttpObject();
	xhttp.onload = function(){func(this.responseText)}
	xmlHttp.onreadystatechange = function() {if (xmlHttp.readyState == 4){if(xmlHttp.status !== 200){funcE(xmlHttp.statusText)}}}
	xhttp.open(type,url,a_syne);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(u);
}
$$['toHtml'] = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc;
}