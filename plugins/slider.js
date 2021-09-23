/*

	JBezz - Slider V1.0

	Khaled Developer
	https://github.com/khaled-dev-loper/jbezz-library

*/
$$.slider = { 
	slideShow: function(q,a = undefined,func = function(){},ms = 500,posProp = "left",opacity = true,showScrollX = true,noScroll = false){
		let firstRun = false;
		let MaxH = $$("body").width()[0] + 100;
		if(showScrollX){
			$$("body").css("overflow-x","hidden")
		}
		function whenScroll(elm){
			if($$(elm).posY()[0] < $$(elm).height()[0]){
				$$(elm).animation(function(p){
						$$(elm).attr("jb-slider-anim","progress")
						if(posProp == "left" || posProp == "right"){
							if(eval($$(elm).css(posProp).replace("auto","0").replace("px","")) > 0 ){
								pL = (100 - p)
								if(opacity){
									$$(elm).css("opacity",p.toString()+"%",true);
								}
								console.log(p +"|" + (p>=99) +"|" + $$(elm).attr("jb-slider-anim"));
								if(firstRun == false &&( p >= 100)){
									func(elm,p);
									$$(elm).attr("jb-slider-anim","on")
									firstRun = true;
								}
								let left = eval("("+MaxH+" * "+pL+") / 100")
								$$(elm).css(posProp,left+"px");
								setTimeout(function(){
									if(eval($$(elm).css(posProp).replace("auto","0").replace("px","")) < 0 ){
										$$(elm).css(posProp,"0px");
									}
								});
								//console.log("B:"+left);
							}
						}
					},(6 / 100) * ms,ms);
				}
		}
		$$(q,a).run(function(elm,i){
			if(opacity){
				$$(elm).css("opacity","0")
			}
			$$(elm).css("position","relative").css(posProp,MaxH.toString() + "px");
			if(noScroll == false){
				window.addEventListener("scroll",function(){
					if(($$(elm).attr("jb-slider-anim") == null || $$(elm).attr("jb-slider-anim") !== "on") && $$(elm).attr("jb-slider-anim") !== "progress"){
						whenScroll(elm);
					}
					window.scrollTo(0,window.scrollY)
				});
			}
			window.addEventListener("load",function(){
				if($$(elm).attr("jb-slider-anim") == null)
					whenScroll(elm);
			});
		});
	},
	slideHide: function(q,a = undefined,func = function(){},ms = 500,posProp = "left",opacity = true,showScrollX = true,noScroll = false){
		let firstRun = false;
		let MaxH = $$("body").width()[0] + 100;
		if(showScrollX){
			$$("body").css("overflow-x","hidden")
		}
		function whenScroll(elm){
			if(($$(elm).posY()[0] < 0) ||  ($$(elm).posY()[0]  - $$(elm).height()[0]) > 0){
				$$(elm).animation(function(pM){
						$$(elm).attr("jb-slider-anim","progress");
						if(posProp == "left" || posProp == "right"){
							if(eval($$(elm).css(posProp).replace("auto","0").replace("px","")) >= 0 ){
								let pL = (100 - pM)
								if(opacity){
									$$(elm).css("opacity",pL.toString()+"%",true);
								}
								if(firstRun == false && pM >= 100){
									func(elm,pM);
									$$(elm).attr("jb-slider-anim","off");
									firstRun = true;
								}
								let left = eval("("+MaxH+" * "+pM+") / 100")
								$$(elm).css(posProp,left+"px");
								setTimeout(function(){
									if(eval($$(elm).css(posProp).replace("auto","0").replace("px","")) < 0 ){
										$$(elm).css(posProp,"0px");
									}
								});
								//console.log("B:"+left);
							}
						}
					},(6 / 100) * ms,ms);
				}
		}
		$$(q,a).run(function(elm,i){
			if(opacity){
				$$(elm).css("opacity","100%")
			}
			$$(elm).css("position","relative").css(posProp,"0px");
			if(noScroll == false){
				window.addEventListener("scroll",function(){
					if(($$(elm).attr("jb-slider-anim") == null || $$(elm).attr("jb-slider-anim") !== "off") && $$(elm).attr("jb-slider-anim") !== "progress"){
						whenScroll(elm);
					}
					window.scrollTo(0,window.scrollY)
				});
			}
			window.addEventListener("load",function(){
				if($$(elm).attr("jb-slider-anim") == null)
					whenScroll(elm);
			});
		});
	},
	slideOn:function(q,a = undefined,func = function(){},msShow = 500,posProp = "toggle",opacity = true,showScrollX = true){
		let pr = posProp;
		let last = "left"
		if(posProp == "toggle"){
			last = "left";
		}else if (posProp == "!toggle"){
			last = "right";
		}
		$$(q,a).run(function(e){
			if(posProp == "toggle" || posProp == "!toggle"){
				if(last == "left"){
					last = "right";
				}else {
					last = "left";
				}
				pr = last;
			}
			$$.slider.slideShow(e,undefined,func,msShow,pr,opacity,showScrollX,false);
		})
	}
}