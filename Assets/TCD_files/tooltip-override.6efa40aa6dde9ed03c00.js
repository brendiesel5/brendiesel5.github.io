(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{385:function(t,i,o){"use strict";XF.CaliforniaTooltipTrigger=XF.create({options:{delayIn:200,delayInLoading:800,delayOut:200,trigger:"hover focus touchhold",maintain:!1,clickHide:null,onShow:null,onHide:null},$target:null,tooltip:null,delayTimeout:null,delayTimeoutType:null,stopFocusBefore:null,clickTriggered:!1,$covers:null,__construct:function(t,i,o){this.options=$.extend(!0,{},this.options,o),this.$target=t,this.tooltip=i,"auto"==this.options.trigger&&(this.options.trigger="hover focus"+(t.is("span")?" touchclick":"")),i.setPositioner(t),i.addSetupCallback(XF.proxy(this,"onTooltipSetup")),t.xfUniqueId(),XF.TooltipTrigger.cache[t.attr("id")]=this},init:function(){var t=this.$target,i=!1,o=!1,e=this,n=XF.supportsPointerEvents(),s=n?"pointerenter":"mouseenter",l=n?"pointerleave":"mouseleave";null===this.options.clickHide&&(this.options.clickHide=t.is("a"));for(var r=this.options.trigger.split(" "),h=0;h<r.length;h++)switch(r[h]){case"hover":t.on(s+".tooltip",XF.proxy(this,"mouseEnter")).on(l+".tooltip",XF.proxy(this,"leave"));break;case"focus":t.on({"focusin.tooltip":XF.proxy(this,"focusEnter"),"focusout.tooltip":XF.proxy(this,"leave")});break;case"click":i=!0,t.onPointer("click.tooltip",XF.proxy(this,"click")),t.onPointer("auxclick.tooltip contextmenu.tooltip",(function(){e.cancelShow(),e.stopFocusBefore=Date.now()+2e3}));break;case"touchclick":o=!0,t.onPointer("click.tooltip",(function(t){XF.isEventTouchTriggered(t)&&e.click(t)}));break;case"touchhold":o=!0,t.data("threshold",this.options.delayIn),t.onPointer({"touchstart.tooltip":function(i){t.data("tooltip:touching",!0)},"touchend.tooltip":function(i){setTimeout((function(){t.removeData("tooltip:touching")}),50)},"taphold.tooltip":function(i){t.data("tooltip:taphold",!0),XF.isEventTouchTriggered(i)&&e.click(i)},"contextmenu.tooltip":function(i){t.data("tooltip:touching")&&i.preventDefault()}})}i&&o&&console.error("Cannot have touchclick and click triggers"),!i&&this.options.clickHide&&t.onPointer("click.tooltip auxclick.tooltip contextmenu.tooltip",(function(t){o&&XF.isEventTouchTriggered(t)||(e.hide(),e.stopFocusBefore=Date.now()+2e3)})),t.on({"tooltip:show":XF.proxy(this,"show"),"tooltip:hide":XF.proxy(this,"hide"),"tooltip:reposition":XF.proxy(this,"reposition")})},reposition:function(){this.tooltip.reposition()},click:function(t){if(t.button>0||t.ctrlKey||t.shiftKey||t.metaKey||t.altKey)this.cancelShow();else if(this.tooltip.isShown()){if(window.innerWidth>900)return void(window.location=this.$target.attr("href"));if(!this.tooltip.isShownFully())return t.preventDefault(),void this.clickShow(t);this.hide()}else window.innerWidth<=900?(t.preventDefault(),this.clickShow(t)):window.location=this.$target.attr("href")},clickShow:function(t){this.clickTriggered=!0;var i=this;setTimeout((function(){var o=i.addCovers();XF.isEventTouchTriggered(t)?o.addClass("is-active"):$(document).on("click.tooltip-"+i.$target.xfUniqueId(),XF.proxy(i,"docClick"))}),0),this.show()},addCovers:function(){this.$covers&&this.$covers.remove();var t=this.$target.dimensions(!0),i=[];i.push({top:0,height:t.top,left:0,right:0}),i.push({top:t.top,height:t.height,left:0,width:t.left}),i.push({top:t.top,height:t.height,left:t.right,right:0}),i.push({top:t.bottom,height:$("html").height()-t.bottom,left:0,right:0});for(var o,e=$(),n=0;n<i.length;n++)o=$('<div class="tooltipCover" />').css(i[n]),e=e.add(o);return e.on("click",XF.proxy(this,"hide")),this.tooltip.getTooltip().before(e),this.$covers=e,XF.setRelativeZIndex(e,this.$target),e},docClick:function(t){var i,o=this.$covers,e=t.pageX,n=t.pageY,s=$(window);if(o){if(0==t.screenX&&0==t.screenY){var l=$(t.target).dimensions();e=l.left,n=l.top}o.addClass("is-active"),i=$(document.elementFromPoint(e-s.scrollLeft(),n-s.scrollTop())),o.removeClass("is-active"),i.is(o)&&this.hide()}},mouseEnter:function(t){XF.isEventTouchTriggered(t)||this.enter()},focusEnter:function(t){Date.now()-XF.pageDisplayTime<100||XF.isEventTouchTriggered(t)||(!this.stopFocusBefore||Date.now()>=this.stopFocusBefore)&&this.enter()},enter:function(){if(!this.isShown()||!this.clickTriggered){this.clickTriggered=!1;var t=this.tooltip.requiresLoad()?this.options.delayInLoading:this.options.delayIn;if(t){if("enter"!==this.delayTimeoutType&&this.resetDelayTimer(),!this.delayTimeoutType&&!this.isShown()){this.delayTimeoutType="enter";var i=this;this.delayTimeout=setTimeout((function(){i.delayTimeoutType=null,i.show()}),t)}}else this.show()}},leave:function(){if(!this.clickTriggered){var t=this.options.delayOut;if(t){if("leave"!==this.delayTimeoutType&&this.resetDelayTimer(),!this.delayTimeoutType&&this.isShown()){this.delayTimeoutType="leave";var i=this;this.delayTimeout=setTimeout((function(){i.delayTimeoutType=null,i.hide()}),t)}}else this.hide()}},show:function(){var t=this;($(window).off("focus.tooltip-"+this.$target.xfUniqueId()).on("focus.tooltip-"+this.$target.xfUniqueId(),(function(i){t.stopFocusBefore=Date.now()+250})),XF.setRelativeZIndex(this.tooltip.getTooltip(),this.$target),this.options.onShow)&&(0,this.options.onShow)(this,this.tooltip);this.tooltip.show()},cancelShow:function(){"enter"===this.delayTimeoutType?this.resetDelayTimer():this.tooltip.isShownFully()||this.hide()},hide:function(){(this.tooltip.hide(),this.resetDelayTimer(),this.clickTriggered=!1,this.$covers&&(this.$covers.remove(),this.$covers=null),$(document).off("click.tooltip-"+this.$target.xfUniqueId()),this.options.onHide)&&(0,this.options.onHide)(this,this.tooltip)},toggle:function(){this.isShown()?this.hide():this.show()},isShown:function(){return this.tooltip.isShown()},wasClickTriggered:function(){return this.clickTriggered},resetDelayTimer:function(){this.delayTimeoutType&&(clearTimeout(this.delayTimeout),this.delayTimeoutType=null)},addMaintainElement:function(t){if(!t.data("tooltip-maintain")){for(var i=this.options.trigger.split(" "),o=0;o<i.length;o++)switch(i[o]){case"hover":t.on("mouseenter.tooltip",XF.proxy(this,"enter")),t.on("mouseleave.tooltip",XF.proxy(this,"leave"));break;case"focus":t.on("focusin.tooltip",XF.proxy(this,"enter")),t.on("focusout.tooltip",XF.proxy(this,"leave"))}t.data("tooltip-maintain",!0)}},removeMaintainElement:function(t){t.off(".tooltip"),t.data("tooltip-maintain",!1)},onTooltipSetup:function(t){if(this.options.maintain){this.addMaintainElement(t);var i=this;t.on("menu:opened",(function(t,o){i.addMaintainElement(o)})),t.on("menu:closed",(function(t,o){i.removeMaintainElement(o)}))}}}),XF.CaliforniaTooltipElement=XF.create({options:{baseClass:"tooltip",extraClass:"tooltip--basic",html:!1,inViewport:!0,loadRequired:!1,loadParams:null,placement:"top",verticalPositionOffset:0},content:null,$tooltip:null,shown:!1,shownFully:!1,placement:null,positioner:null,loadRequired:!1,loading:!1,contentApplied:!1,setupCallbacks:null,__construct:function(t,i,o){this.setupCallbacks=[],this.options=$.extend(!0,{},this.options,i),this.content=t,this.loadRequired=this.options.loadRequired,o&&this.setPositioner(o)},setPositioner:function(t){this.positioner=t},setLoadRequired:function(t){this.loadRequired=t},addSetupCallback:function(t){this.$tooltip?t(this.$tooltip):this.setupCallbacks.push(t)},show:function(){if(!this.shown)if(this.shown=!0,this.loadRequired)this.loadContent();else{var t=this.getTooltip(),i=this;this.reposition(),$(window).on("resize.tooltip-"+t.xfUniqueId(),XF.proxy(this,"reposition")),t.trigger("tooltip:shown").stop().css({visibility:"",display:"none"}).fadeIn("fast",(function(){i.shownFully=!0}))}},hide:function(){if(this.shown){this.shown=!1,this.shownFully=!1;var t=this.$tooltip;t&&(t.stop().fadeOut("fast").trigger("tooltip:hidden"),$(window).off("resize.tooltip-"+t.xfUniqueId()))}},toggle:function(){this.shown?this.hide():this.show()},destroy:function(){this.$tooltip&&this.$tooltip.remove()},isShown:function(){return this.shown},isShownFully:function(){return this.shown&&this.shownFully},requiresLoad:function(){return this.loadRequired},getPlacement:function(){return XF.rtlFlipKeyword(this.options.placement)},reposition:function(){var t=this.positioner;if(t){if(!this.loadRequired){var i,o=this.options.inViewport;t instanceof $?(i=t.dimensions(!0),t.closest(".overlay").length&&(o=!0)):void 0!==t[0]&&void 0!==t[1]?i={top:t[1],right:t[0],bottom:t[1],left:t[0]}:void 0!==t.right&&void 0!==t.bottom?i=t:console.error("Positioner is not in correct format",t),i.width=i.right-i.left,i.height=i.bottom-i.top;var e,n=this.getTooltip(),s=this.getPlacement(),l=this.options.baseClass,r=s;if(o){var h,a=$(window),p=a.height(),c=a.width(),d=a.scrollTop(),u=a.scrollLeft();(h=XF.Element.getHandlers("sticky-header"))&&h[0].$target.hasClass(h[0].options.stickyClass)&&(d+=h[0].$target.outerHeight()),e={top:d,left:u,right:u+c,bottom:d+p,width:c,height:p}}else e=$("body").dimensions();this.placement&&n.removeClass(l+"--"+this.placement),n.addClass(l+"--"+s).css({visibility:"hidden",display:"block",top:"",bottom:"",left:"",right:"","padding-left":"","padding-right":"","padding-top":"","padding-bottom":""});var f=n.outerWidth(),g=n.outerHeight();"top"==s&&i.top-g<e.top?s="bottom":"bottom"==s&&i.bottom+g>e.bottom?i.top-g>=e.top&&(s="top"):"left"==s&&i.left-f<e.left?s=i.right+f>e.right?i.top-g<e.top?"bottom":"top":"right":"right"==s&&i.right+f>e.right&&(s=i.left-f<e.left?i.top-g<e.top?"bottom":"top":"left"),s!=r&&n.removeClass(l+"--"+r).addClass(l+"--"+s);var m={top:"",right:"",bottom:"",left:""};switch(s){case"top":m.bottom=$(window).height()-i.top+this.options.verticalPositionOffset,m.left=i.left+i.width/2-f/2;break;case"bottom":m.top=i.bottom+this.options.verticalPositionOffset,m.left=i.left+i.width/2-f/2;break;case"left":m.top=i.top+i.height/2-g/2,m.right=$(window).width()-i.left;break;case"right":default:m.top=i.top+i.height/2-g/2,m.left=i.right}n.css(m);var v=n.dimensions(!0),w={top:0,left:0},T=n.find("."+l+"-arrow");if("left"==s||"right"==s)v.top<e.top?(w.top=e.top-v.top,"down"):v.bottom>e.bottom&&(w.top=e.bottom-v.bottom,"up"),T.css({left:"",top:50-100*w.top/v.top+"%"});else{v.left<e.left?(w.left=e.left-v.left,"left"):v.left+f>e.right&&(w.left=e.right-(v.left+f),"right");var y,F=parseInt(f/100*(50-100*w.left/f),0),b=F+parseInt(T.css("margin-left")),C=b+T.outerWidth(),X=parseInt(n.css("padding-left"),10),k=parseInt(n.css("padding-right"),10);b<X?(y=X-b,n.css({"padding-left":Math.max(0,X-y),"padding-right":k+y})):C>f-k&&(y=C-(f-k),n.css({"padding-left":k+y,"padding-right":Math.max(0,k-y)})),T.css({top:"",left:F})}w.left?n.css("left",m.left+w.left):w.top&&n.css("top",m.top+w.top),this.placement=s,this.shown&&!this.loadRequired&&n.css("visibility","")}}else console.error("No tooltip positioner")},attach:function(){this.getTooltip()},getTooltip:function(){if(!this.$tooltip){var t=this.getTemplate();t.appendTo("body"),this.$tooltip=t,this.loadRequired||this.applyTooltipContent()}return this.$tooltip},applyTooltipContent:function(){if(this.contentApplied||this.loadRequired)return!1;var t=this.getTooltip(),i=t.find("."+this.options.baseClass+"-content"),o=this.content;$.isFunction(o)&&(o=o()),this.options.html?(i.html(o),i.find("img").on("load",XF.proxy(this,"reposition"))):i.text(o);for(var e=this.setupCallbacks,n=0;n<e.length;n++)e[n](t);return XF.activate(t),this.contentApplied=!0,!0},loadContent:function(){if(this.loadRequired&&!this.loading){var t=this.content,i=this,o=function(t){i.content=t,i.loadRequired=!1,i.loading=!1,i.applyTooltipContent(),i.shown&&(i.shown=!1,i.show())};$.isFunction(t)?(this.loading=!0,t(o,this.options.loadParams)):o("")}},getTemplate:function(){var t=this.options.extraClass?" "+this.options.extraClass:"",i=this.options.baseClass;return $($.parseHTML('<div class="'+i+t+'" role="tooltip"><div class="'+i+'-arrow"></div><div class="'+i+'-content"></div></div>'))}}),XF.CaliforniaTooltipOptions={base:{baseClass:"tooltip",extraClass:"tooltip--basic",html:!1,inViewport:!0,placement:"top",verticalPositionOffset:0,clickHide:null,delayIn:200,delayOut:200,maintain:!1,trigger:"hover focus"},tooltip:["baseClass","extraClass","html","placement","verticalPositionOffset"],trigger:["clickHide","delayIn","delayOut","maintain","trigger"],extract:function(t,i){for(var o={},e=0;e<t.length;e++)o[t[e]]=i[t[e]];return o},extractTooltip:function(t){return this.extract(this.tooltip,t)},extractTrigger:function(t){return this.extract(this.trigger,t)}},XF.Element.extend("member-tooltip",{options:{delay:250},init:function(){this.userId=this.$target.data("user-id"),this.tooltip=new XF.TooltipElement(XF.proxy(this,"getContent"),{extraClass:"tooltip--member",html:!0,loadRequired:!0}),this.trigger=new XF.CaliforniaTooltipTrigger(this.$target,this.tooltip,{maintain:!0,delayInLoading:this.options.delay,delayIn:this.options.delay,trigger:"hover focus click",onShow:XF.proxy(this,"onShow"),onHide:XF.proxy(this,"onHide")}),this.trigger.init()}}),XF.CaliforniaTooltip=XF.Element.newHandler({options:$.extend(!0,{},XF.CaliforniaTooltipOptions.base,{content:null}),trigger:null,tooltip:null,init:function(){var t=this.getContent(),i=XF.CaliforniaTooltipOptions.extractTooltip(this.options),o=XF.CaliforniaTooltipOptions.extractTrigger(this.options);this.tooltip=new XF.CaliforniaTooltipElement(t,i),this.trigger=new XF.TooltipTrigger(this.$target,this.tooltip,o),this.trigger.init()},getContent:function(){if(this.options.content)return this.options.content;var t=this.$target,i=t.attr("data-original-title")||t.attr("title")||"";return t.attr("data-original-title",i).removeAttr("title"),i}}),XF.CaliforniaElementTooltip=XF.extend(XF.CaliforniaTooltip,{__backup:{getContent:"_getContent",init:"_init"},options:$.extend({},XF.CaliforniaTooltip.prototype.options,{element:null,showError:!0,noTouch:!0,shortcut:null}),$element:null,init:function(){if(this.options.shortcut&&this.setupShortcut(this.options.shortcut),!this.options.noTouch||!XF.Feature.has("touchevents")){var t=this.options.element,i=this.options.showError;if(t){var o=XF.findRelativeIf(t,this.$target);o.length?(this.$element=o,this.$target.removeAttr("title"),this.options.html=!0,this._init()):i&&console.error("Element tooltip could not find "+t)}else i&&console.error("No element specified for the element tooltip")}},setupShortcut:function(t){"node-description"==t&&(this.options.element||(this.options.element="< .js-nodeMain | .js-nodeDescTooltip"),this.options.showError=!1,this.options.maintain=!0,this.options.placement="right",this.options.extraClass="tooltip--basic tooltip--description")},getContent:function(){return this.$element.clone().contents()}}),XF.Element.register("element-tooltip","XF.CaliforniaElementTooltip")}},[[385,0]]]);