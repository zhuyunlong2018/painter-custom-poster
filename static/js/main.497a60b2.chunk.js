(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{136:function(t,e,a){t.exports=a(291)},141:function(t,e,a){},147:function(t,e){},148:function(t,e){},149:function(t,e){},235:function(t,e,a){},236:function(t,e){!function(){var e={isGradient:function(t){return!(!t||!t.startsWith("linear")&&!t.startsWith("radial"))},doGradient:function(t,e,n){return t.startsWith("linear")?function(t,e,n,r){for(var o=function(t,e,a){var n,r=t.match(/([-]?\d{1,3})deg/);switch(r&&r[1]?parseFloat(r[1]):0){case 0:n=[0,-a/2,0,a/2];break;case 90:n=[e/2,0,-e/2,0];break;case-90:n=[-e/2,0,e/2,0];break;case 180:n=[0,a/2,0,-a/2];break;case-180:n=[0,-a/2,0,a/2];break;default:var o=0,i=0,c=0,s=0;r[1]>0&&r[1]<90?(o=e/2-(e/2*Math.tan((90-r[1])*Math.PI*2/360)-a/2)*Math.sin(2*(90-r[1])*Math.PI*2/360)/2,s=Math.tan((90-r[1])*Math.PI*2/360)*o,c=-o,i=-s):r[1]>-180&&r[1]<-90?(o=-e/2+(e/2*Math.tan((90-r[1])*Math.PI*2/360)-a/2)*Math.sin(2*(90-r[1])*Math.PI*2/360)/2,s=Math.tan((90-r[1])*Math.PI*2/360)*o,c=-o,i=-s):r[1]>90&&r[1]<180?(o=e/2+(-e/2*Math.tan((90-r[1])*Math.PI*2/360)-a/2)*Math.sin(2*(90-r[1])*Math.PI*2/360)/2,s=Math.tan((90-r[1])*Math.PI*2/360)*o,c=-o,i=-s):(o=-e/2-(-e/2*Math.tan((90-r[1])*Math.PI*2/360)-a/2)*Math.sin(2*(90-r[1])*Math.PI*2/360)/2,s=Math.tan((90-r[1])*Math.PI*2/360)*o,c=-o,i=-s),n=[o,i,c,s]}return n}(n,t,e),i=n.match(/linear-gradient\((.+)\)/)[1],c=a(i.substring(i.indexOf(",")+1)),s={},l=0;l<c.colors.length;l++)s[c.percents[l]]=c.colors[l];return{type:"linear",x1:o[0]+t/2,y1:o[1]+e/2,x2:o[2]+t/2,y2:o[3]+e/2,colorStops:s}}(e,n,t):t.startsWith("radial")?function(t,e,n,r){for(var o=a(n.match(/radial-gradient\((.+)\)/)[1]),i={},c=0;c<o.colors.length;c++)i[o.percents[c]]=o.colors[c];return{type:"radial",x1:0+t/2,y1:0+e/2,r1:0,x2:0+t/2,y2:0+e/2,r2:t<e?e/2:t/2,colorStops:i}}(e,n,t):void 0}};function a(t){var e=t.substring(0,t.length-1).split("%,"),a=[],n=[],r=!0,o=!1,i=void 0;try{for(var c,s=e[Symbol.iterator]();!(r=(c=s.next()).done);r=!0){var l=c.value;a.push(l.substring(0,l.lastIndexOf(" ")).trim()),n.push(l.substring(l.lastIndexOf(" "),l.length)/100)}}catch(d){o=!0,i=d}finally{try{r||null==s.return||s.return()}finally{if(o)throw i}}return{colors:a,percents:n}}t.exports={api:e}}()},291:function(t,e,a){"use strict";a.r(e);var n=a(1),r=a.n(n),o=a(4),i=a.n(o);a(141),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=a(17),s=a(16),l=a(21),d=a.n(l),h=a(43),u=a(122),p=a(123),f=a(133),g=a(124),b=a(20),m=a(134),v=a(125),k=a(126),x=a.n(k),y=a(24),w=a.n(y),S=a(127),O=a.n(S),j=a(293),C=a(294),Y=a(298),W=a(32),X=a(296),R=a(297),A=a(295),E=a(95),I=a.n(E),M=a(99),L=a(128),B=a.n(L),D=a(129),F=a.n(D),T=[{type:"canvas",name:"\u753b\u5e03",css:{width:"654",height:"1000",backgroundColor:"#f8f8f8"}},{type:"text",name:"\u6587\u5b57",css:{text:"\u522b\u8ddf\u6211\u8c08\u611f\u60c5\uff0c\u8c08\u611f\u60c5\u4f24\u94b1\u3002",width:200,lineHeight:1.5,color:"red",top:0,left:0,background:"rgba(0,0,0,0)",fontSize:30,fontWeight:["normal","bold"],maxLines:2,textStyle:["fill","stroke"],textAlign:["left","center","right"],textDecoration:["none","overline","underline","linethrough"],borderRadius:1,borderWidth:1,borderColor:"#000000",padding:0,rotate:0,shadow:"10 10 5 #888888",fontFamily:""}},{type:"rect",name:"\u77e9\u5f62",css:{background:"#fff",top:0,left:0,width:200,height:100,rotate:0,borderRadius:25,borderWidth:2,borderColor:"#000000",shadow:"10 10 5 #888888"}},{type:"image",name:"\u56fe\u7247",css:{url:"https://operate.maiyariji.com/20190709%2F3da002983292a6950a71ca7392a21827.jpg",mode:["scaleToFill","aspectFill","auto"],top:0,left:0,width:100,height:100,rotate:0,borderRadius:50,borderWidth:2,borderColor:"#000000",shadow:""}},{type:"qrcode",name:"\u4e8c\u7ef4\u7801",css:{url:"\u54c8\u54c8\u54c8",color:"#000000",background:"#ffffff",top:10,left:300,width:200,rotate:0,borderRadius:10}}],N=w.a.cloneDeep(T);N[1].css.textStyle=N[1].css.textStyle[0],N[1].css.textAlign=N[1].css.textAlign[0],N[1].css.fontWeight=N[1].css.fontWeight[0],N[1].css.textDecoration=N[1].css.textDecoration[0],N[3].css.mode=N[3].css.mode[0];a(235);var _,G,z=[{src:"",json:{version:"3.4.0",objects:[{type:"group",version:"3.4.0",originX:"center",originY:"center",left:131,top:325.32,width:204,height:94.65,fill:"rgb(0,0,0)",stroke:null,strokeWidth:0,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeMiterLimit:4,scaleX:1,scaleY:1,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:null,visible:!0,clipTo:null,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",transformMatrix:null,skewX:0,skewY:0,objects:[{type:"rect",version:"3.4.0",originX:"left",originY:"top",left:-102.5,top:-47.82,width:204,height:94.65,fill:"rgba(0,0,0,0)",stroke:"#000000",strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeMiterLimit:4,scaleX:1,scaleY:1,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:{color:"#888888",blur:5,offsetX:10,offsetY:10,affectStroke:!1,nonScaling:!1},visible:!0,clipTo:null,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",transformMatrix:null,skewX:0,skewY:0,rx:1,ry:1},{type:"textbox",version:"3.4.0",originX:"left",originY:"top",left:-102.5,top:-47.82,width:202,height:80.98,fill:"red",stroke:null,strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeMiterLimit:4,scaleX:1,scaleY:1,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:{color:"#888888",blur:5,offsetX:10,offsetY:10,affectStroke:!1,nonScaling:!1},visible:!0,clipTo:null,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",transformMatrix:null,skewX:0,skewY:0,text:"\u522b\u8ddf\u6211\u8c08\u611f\u60c5\uff0c\u8c08\u611f\u60c5\u4f24\u94b1...",fontSize:30,fontWeight:"normal",fontFamily:"webfont",fontStyle:"normal",lineHeight:1.3888888888888888,underline:!1,overline:!1,linethrough:!1,textAlign:"left",textBackgroundColor:"",charSpacing:0,minWidth:20,splitByGrapheme:!0,styles:{},maxLines:2,textDecoration:"none",textStyle:"fill"}],mytype:"textGroup",oldText:"\u522b\u8ddf\u6211\u8c08\u611f\u60c5\uff0c\u8c08\u611f\u60c5\u4f24\u94b1\u3002"},{type:"group",version:"3.4.0",originX:"center",originY:"center",left:552,top:344.32,width:204,height:94.65,fill:"rgb(0,0,0)",stroke:null,strokeWidth:0,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeMiterLimit:4,scaleX:1,scaleY:1,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:null,visible:!0,clipTo:null,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",transformMatrix:null,skewX:0,skewY:0,objects:[{type:"rect",version:"3.4.0",originX:"left",originY:"top",left:-102.5,top:-47.82,width:204,height:94.65,fill:"rgba(0,0,0,0)",stroke:"#000000",strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeMiterLimit:4,scaleX:1,scaleY:1,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:{color:"#888888",blur:5,offsetX:10,offsetY:10,affectStroke:!1,nonScaling:!1},visible:!0,clipTo:null,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",transformMatrix:null,skewX:0,skewY:0,rx:1,ry:1},{type:"textbox",version:"3.4.0",originX:"left",originY:"top",left:-102.5,top:-47.82,width:202,height:80.98,fill:"red",stroke:null,strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeMiterLimit:4,scaleX:1,scaleY:1,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:{color:"#888888",blur:5,offsetX:10,offsetY:10,affectStroke:!1,nonScaling:!1},visible:!0,clipTo:null,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",transformMatrix:null,skewX:0,skewY:0,text:"\u522b\u8ddf\u6211\u8c08\u611f\u60c5\uff0c\u8c08\u611f\u60c5\u4f24\u94b1...",fontSize:30,fontWeight:"normal",fontFamily:"webfont",fontStyle:"normal",lineHeight:1.3888888888888888,underline:!1,overline:!1,linethrough:!1,textAlign:"left",textBackgroundColor:"",charSpacing:0,minWidth:20,splitByGrapheme:!0,styles:{},maxLines:2,textDecoration:"none",textStyle:"fill"}],mytype:"textGroup",oldText:"\u522b\u8ddf\u6211\u8c08\u611f\u60c5\uff0c\u8c08\u611f\u60c5\u4f24\u94b1\u3002"},{type:"group",version:"3.4.0",originX:"center",originY:"center",left:323,top:151.32,width:204,height:94.65,fill:"rgb(0,0,0)",stroke:null,strokeWidth:0,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeMiterLimit:4,scaleX:1,scaleY:1,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:null,visible:!0,clipTo:null,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",transformMatrix:null,skewX:0,skewY:0,objects:[{type:"rect",version:"3.4.0",originX:"left",originY:"top",left:-102.5,top:-47.82,width:204,height:94.65,fill:"rgba(0,0,0,0)",stroke:"#000000",strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeMiterLimit:4,scaleX:1,scaleY:1,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:{color:"#888888",blur:5,offsetX:10,offsetY:10,affectStroke:!1,nonScaling:!1},visible:!0,clipTo:null,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",transformMatrix:null,skewX:0,skewY:0,rx:1,ry:1},{type:"textbox",version:"3.4.0",originX:"left",originY:"top",left:-102.5,top:-47.82,width:202,height:80.98,fill:"red",stroke:null,strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeDashOffset:0,strokeLineJoin:"miter",strokeMiterLimit:4,scaleX:1,scaleY:1,angle:0,flipX:!1,flipY:!1,opacity:1,shadow:{color:"#888888",blur:5,offsetX:10,offsetY:10,affectStroke:!1,nonScaling:!1},visible:!0,clipTo:null,backgroundColor:"",fillRule:"nonzero",paintFirst:"fill",globalCompositeOperation:"source-over",transformMatrix:null,skewX:0,skewY:0,text:"\u522b\u8ddf\u6211\u8c08\u611f\u60c5\uff0c\u8c08\u611f\u60c5\u4f24\u94b1...",fontSize:30,fontWeight:"normal",fontFamily:"webfont",fontStyle:"normal",lineHeight:1.3888888888888888,underline:!1,overline:!1,linethrough:!1,textAlign:"left",textBackgroundColor:"",charSpacing:0,minWidth:20,splitByGrapheme:!0,styles:{},maxLines:2,textDecoration:"none",textStyle:"fill"}],mytype:"textGroup",oldText:"\u522b\u8ddf\u6211\u8c08\u611f\u60c5\uff0c\u8c08\u611f\u60c5\u4f24\u94b1\u3002"}],background:"#f8f8f8"}}],J=a(236),P=j.a.Option,H=C.a.TextArea;fabric=x.a.fabric,Y.a.config({maxCount:1});var U=2,V={canvasState:[],currentStateIndex:-1,undoStatus:!1,redoStatus:!1,undoFinishedStatus:1,redoFinishedStatus:1},q=(_=Object(M.b)(M.a),G=function(t){function e(t){var a;return Object(u.a)(this,e),(a=Object(f.a)(this,Object(g.a)(e).call(this,t))).onClose=function(){a.setState({visible:!1})},a.addShape=a.addShape.bind(Object(b.a)(a)),a.generateCode=a.generateCode.bind(Object(b.a)(a)),a.copyCode=a.copyCode.bind(Object(b.a)(a)),a.viewCode=a.viewCode.bind(Object(b.a)(a)),a.exportCode=a.exportCode.bind(Object(b.a)(a)),a.importCode=a.importCode.bind(Object(b.a)(a)),a.handerUndo=a.handerUndo.bind(Object(b.a)(a)),a.handerRedo=a.handerRedo.bind(Object(b.a)(a)),a.changeActiveObjectValue=a.changeActiveObjectValue.bind(Object(b.a)(a)),a.confirmImportCode=a.confirmImportCode.bind(Object(b.a)(a)),a.state={redoButtonStatus:"",undoButtonStatus:"",currentOptionArr:N,currentObjectType:"text",importCodeJson:""},a.currentOptionArr=N,a.views=[],a.canvas_sprite="",a.height=300,a.width=0,a.activeObject={},a.importCodeJson="",a}return Object(m.a)(e,t),Object(p.a)(e,[{key:"componentDidMount",value:function(){this.canvas_sprite=new fabric.Canvas("merge",this.state.currentOptionArr[0].css),this.addEventListener(),this.addShape(1)}},{key:"addEventListener",value:function(){var t=this,e=w.a.throttle(t.changeActiveObjectValue,100);this.canvas_sprite.on("object:moving",function(t){var a=t.target;a.currentHeight>a.canvas.height||a.currentWidth>a.canvas.width||(a.setCoords(),(a.getBoundingRect().top<0||a.getBoundingRect().left<0)&&(a.top=Math.max(a.top,a.top-a.getBoundingRect().top),a.left=Math.max(a.left,a.left-a.getBoundingRect().left)),(a.getBoundingRect().top+a.getBoundingRect().height>a.canvas.height||a.getBoundingRect().left+a.getBoundingRect().width>a.canvas.width)&&(a.top=Math.min(a.top,a.canvas.height-a.getBoundingRect().height+a.top-a.getBoundingRect().top),a.left=Math.min(a.left,a.canvas.width-a.getBoundingRect().width+a.left-a.getBoundingRect().left)),e())}),this.canvas_sprite.on("object:scaling",function(t){var a=t.target;a.currentHeight>a.canvas.height||a.currentWidth>a.canvas.width||(a.setCoords(),(a.getBoundingRect().top<0||a.getBoundingRect().left<0)&&(a.top=Math.max(a.top,a.top-a.getBoundingRect().top),a.left=Math.max(a.left,a.left-a.getBoundingRect().left)),(a.getBoundingRect().top+a.getBoundingRect().height>a.canvas.height||a.getBoundingRect().left+a.getBoundingRect().width>a.canvas.width)&&(a.top=Math.min(a.top,a.canvas.height-a.getBoundingRect().height+a.top-a.getBoundingRect().top),a.left=Math.min(a.left,a.canvas.width-a.getBoundingRect().width+a.left-a.getBoundingRect().left)),e())}),this.canvas_sprite.on("mouse:down",function(e){e.target&&(t.activeObject=e.target,t.changeActiveObjectValue())}),this.canvas_sprite.on("object:scaled",function(e){e.target&&(t.activeObject=e.target,t.updateObject())}),this.canvas_sprite.on("object:modified",function(){t.updateCanvasState()}),this.canvas_sprite.on("object:added",function(){t.updateCanvasState()})}},{key:"beginEdit",value:function(t){this.activeObject&&(37===t.which?(t.preventDefault(),this.activeObject.set({left:this.activeObject.left-1})):39===t.which?(t.preventDefault(),this.activeObject.set({left:this.activeObject.left+1})):40===t.which?(t.preventDefault(),this.activeObject.set({top:this.activeObject.top+1})):38===t.which?(t.preventDefault(),this.activeObject.set({top:this.activeObject.top-1})):90===t.which?(t.preventDefault(),this.handerUndo()):89===t.which?(t.preventDefault(),this.handerRedo()):46===t.which&&(t.preventDefault(),this.canvas_sprite.remove(this.activeObject)),this.canvas_sprite.renderAll())}},{key:"addShape",value:function(){var t=Object(h.a)(d.a.mark(function t(e,a){var n,r,o;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n=this.state.currentOptionArr,r=n[e].type,t.t0=r,t.next="text"===t.t0?5:"rect"===t.t0?9:"image"===t.t0?13:"qrcode"===t.t0?17:21;break;case 5:return t.next=7,this.addTextObject(e,a);case 7:return o=t.sent,t.abrupt("break",22);case 9:return t.next=11,this.addRectObject(e,a);case 11:return o=t.sent,t.abrupt("break",22);case 13:return t.next=15,this.addImageObject(e,a);case 15:return o=t.sent,t.abrupt("break",22);case 17:return t.next=19,this.addQrcodeObject(e,a);case 19:return o=t.sent,t.abrupt("break",22);case 21:return t.abrupt("break",22);case 22:this.canvas_sprite.setActiveObject(o),this.activeObject=o,this.canvas_sprite.add(o);case 25:case"end":return t.stop()}},t,this)}));return function(e,a){return t.apply(this,arguments)}}()},{key:"addTextObject",value:function(){var t=Object(h.a)(d.a.mark(function t(e,a){var n,r,o,i,l,h,u,p,f,g,b,m,v,k,x,y,w,S,O,j,C,Y,W,X,R,A,E,I,M,L,B,D,F,T,N,_;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r=this,o="update"===a?this.state.currentOptionArr:this.currentOptionArr,i=o[e].css,l=i.width,h=i.text,u=i.color,p=i.fontSize,f=i.left,g=i.top,b=i.fontWeight,m=i.fontFamily,v=i.padding,k=i.textDecoration,x=i.borderRadius,y=i.borderWidth,w=i.borderColor,S=i.rotate,O=i.shadow,j=i.lineHeight,C=i.textAlign,Y=i.maxLines,W=i.textStyle,X=i.background,x/=1,y/=1,S/=1,Y/=1,j/=1.08,n={width:l/=1,fill:u,fontWeight:b,left:f/=1,top:g/=1,fontSize:p/=1,fontFamily:m,padding:v/=1},Object(s.a)(n,k,!0),Object(s.a)(n,"textAlign",C),Object(s.a)(n,"textStyle",W),Object(s.a)(n,"shadow",O),Object(s.a)(n,"splitByGrapheme",!0),Object(s.a)(n,"zIndex",2),Object(s.a)(n,"lineHeight",j),Object(s.a)(n,"editable",!0),Object(s.a)(n,"maxLines",Y),Object(s.a)(n,"textDecoration",k),Object(s.a)(n,"lockScalingY",!0),A=n,"stroke"===W&&(A=Object(c.a)({},A,{stroke:u,fill:"rgba(0,0,0)"})),(E=new fabric.Textbox(h,A)).toObject=function(t){return function(){return fabric.util.object.extend(t.call(this),{maxLines:Y,textDecoration:k,textStyle:W})}}(E.toObject),E.textLines.length>Y){for(I="",M=0;M<Y;M++)L=E.textLines[M],M===Y-1?I=I+L+"...":I+=L;if(E.set({text:I}),E.textLines.length>Y){for(B="",D=0;D<Y;D++)F=E.textLines[D],D===Y-1?B=B+F.substring(0,F.length-3)+"...":B+=F;E.set({text:B})}}return T=E.height/1+(E.lineHeight/1-1)*E.fontSize+2*v+2*y,l=E.width+2*v+2*y,f=E.left-v,g=i.top-v,N=new fabric.Rect({width:l,height:T,left:f,top:g,padding:v,rx:x,strokeWidth:y/1,stroke:w,fill:X,shadow:O,selectable:!1}),_="",J.api.isGradient(X)&&(_=J.api.doGradient(X,l,T)),_&&N.setGradient("fill",_),(R=new fabric.Group([N,E],{width:l,height:T,left:f+l/2,top:g+T/2,angle:S,mytype:"textGroup",lockScalingY:!0,oldText:h,originX:"center",originY:"center",centeredRotation:!0})).toObject=function(t){return function(){return fabric.util.object.extend(t.call(this),{mytype:"textGroup",oldText:h})}}(R.toObject),R.on("scaling",function(t){var e=this.width,a=this.height,n=this.width*this.scaleX,o=this.height*this.scaleY,i=this.oldText;if(N.set({left:-(n-e/2),top:-(o-a/2),height:o,width:n,rx:x,strokeWidth:y}),E.set({left:-(n-e/2),top:-(o-a/2),width:e,height:a,fontSize:p,scaleX:1,scaleY:1,text:i}),E.textLines.length>Y){for(var c="",s=0;s<Y;s++){var l=E.textLines[s];s===Y-1?c=c+l+"...":c+=l}if(E.set({text:c}),E.textLines.length>Y){for(var d="",h=0;h<Y;h++){var u=E.textLines[h];h===Y-1?d=d+u.substring(0,u.length-3)+"...":d+=u}E.set({text:d})}}this.set({height:o,width:n,scaleX:1,scaleY:1,originX:"center"}),r.canvas_sprite.renderAll()}),t.abrupt("return",R);case 31:case"end":return t.stop()}},t,this)}));return function(e,a){return t.apply(this,arguments)}}()},{key:"addRectObject",value:function(){var t=Object(h.a)(d.a.mark(function t(e,a){var n,r,o,i,c,s,l,h,u,p,f,g,b,m,v;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n="update"===a?this.state.currentOptionArr:this.currentOptionArr,r=n[e].css,o=r.width,i=r.height,c=r.left,s=r.top,l=r.borderRadius,h=r.borderWidth,u=r.borderColor,p=r.background,f=r.rotate,g=r.shadow,o/=1,i/=1,c/=1,s/=1,l/=1,h/=1,f/=1,b=new fabric.Group([],{left:c+o/2+h,top:s+i/2+h,width:o+h,height:i+h,rx:l/1,strokeWidth:h/1,stroke:u,fill:p,originX:"center",originY:"center",angle:f,myshadow:g,mytype:"rect",lockUniScaling:!0}),m="",J.api.isGradient(p)&&(m=J.api.doGradient(p,o,i)),v=new fabric.Rect({width:o,height:i,left:0,top:0,rx:l,fill:p,originX:"center",originY:"center"}),m&&v.setGradient("fill",m),b.add(v),b.add(new fabric.Rect({width:o+h,height:i+h,left:0,top:0,originX:"center",originY:"center",rx:l+h/2,strokeWidth:h/1,stroke:u,fill:"rgba(0,0,0,0)",shadow:g,selectable:!1})),b.toObject=function(t){return function(){return fabric.util.object.extend(t.call(this),{mytype:"rect",rx:l+h/2,myshadow:g})}}(b.toObject),t.abrupt("return",b);case 19:case"end":return t.stop()}},t,this)}));return function(e,a){return t.apply(this,arguments)}}()},{key:"addImageObject",value:function(){var t=Object(h.a)(d.a.mark(function t(e,a){var n,r,o,i,c,s,l,h,u,p,f,g,b,m,v,k,x,y;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n="update"===a?this.state.currentOptionArr:this.currentOptionArr,r=n[e].css,o=r.width,i=r.height,c=r.left,s=r.top,l=r.borderRadius,h=r.borderWidth,u=r.borderColor,p=r.background,f=r.rotate,g=r.shadow,b=r.mode,m=r.url,o/=1,i/=1,c/=1,s/=1,l/=1,h/=1,f/=1,t.next=12,this.loadImageUrl(m);case 12:return v=t.sent,k=v.width,x=v.height,v.set({url:m,mode:b,shadow:g,originX:"center",originY:"center"}),"scaleToFill"===b?(v.set({width:k,height:x,scaleX:o/k,scaleY:i/x,oldScaleX:o/k,oldScaleY:i/x}),v.clipPath=new fabric.Rect({width:o,height:i,originX:"center",originY:"center",rx:l,scaleX:k/o,scaleY:x/i})):"auto"===b?(v.set({width:k,height:x,scaleX:o/k,scaleY:o/k,oldScaleX:o/k,oldScaleY:i/x}),v.clipPath=new fabric.Rect({width:o,height:i,originX:"center",originY:"center",rx:l,scaleX:k/o,scaleY:x/i})):"aspectFill"===b&&(v.clipPath=new fabric.Rect({width:o/1,height:i/1,originX:"center",originY:"center",rx:l/1}),v.set({width:o,height:i})),(y=new fabric.Group([v],{left:c+o/2+h,top:s+i/2+h,width:o+h,height:i+h,rx:l/1,strokeWidth:h/1,stroke:u,fill:p,angle:f,shadow:g,originX:"center",originY:"center",mytype:"image",mode:b,url:m,lockUniScaling:!0})).add(new fabric.Rect({width:o+h,height:i+h,left:0,top:0,originX:"center",originY:"center",rx:l+h/2,strokeWidth:h/1,stroke:u,fill:"rgba(0,0,0,0)",shadow:g,selectable:!1})),y.toObject=function(t){return function(){return fabric.util.object.extend(t.call(this),{mytype:"image",mode:b,url:m,rx:l+h/2,oldScaleX:o/k,oldScaleY:i/x})}}(y.toObject),t.abrupt("return",y);case 21:case"end":return t.stop()}},t,this)}));return function(e,a){return t.apply(this,arguments)}}()},{key:"addQrcodeObject",value:function(){var t=Object(h.a)(d.a.mark(function t(e,a){var n,r,o,i,c,s,l,h,u,p,f,g;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n="update"===a?this.state.currentOptionArr:this.currentOptionArr,r=n[e].css,o=r.width,i=r.left,c=r.top,s=r.color,l=r.borderRadius,h=r.background,u=r.rotate,p=r.url,i=i/1+(o/=1)/2,c=c/1+o/2,u/=1,f=O.a.getQrBase64(p,{padding:0,width:o/1,height:o/1,correctLevel:U,reverse:!1,background:h,foreground:s}),t.next=10,this.loadImageUrl(f);case 10:return(g=t.sent).set({url:p,width:o/1,height:o/1,left:i,top:c,color:s,background:h,rx:l/1,angle:u/1,lockUniScaling:!0,originX:"center",originY:"center",mytype:"qrcode"}),g.clipPath=new fabric.Rect({width:o,height:o/1,originX:"center",originY:"center",rx:l,angle:u/1}),g.toObject=function(t){return function(){return fabric.util.object.extend(t.call(this),{mytype:"qrcode",url:p,color:s,background:h,rx:l/1})}}(g.toObject),t.abrupt("return",g);case 15:case"end":return t.stop()}},t,this)}));return function(e,a){return t.apply(this,arguments)}}()},{key:"loadImageUrl",value:function(t){return new Promise(function(e){fabric.Image.fromURL(t,function(t){e(t)})})}},{key:"updateObject",value:function(){var t=this.activeObject.mytype;switch(this.canvas_sprite.remove(this.activeObject),t){case"textGroup":this.addShape(1,"update");break;case"rect":this.addShape(2,"update");break;case"image":this.addShape(3,"update");break;case"qrcode":this.addShape(4,"update")}this.canvas_sprite.renderAll()}},{key:"changeActiveObjectValue",value:function(){this.setState({visible:!0});var t=this.activeObject.mytype,e=this.activeObject,a="".concat((e.width-e.strokeWidth)*e.scaleX),n="".concat((e.height-e.strokeWidth)*e.scaleY),r={color:"".concat(e.color),background:"".concat(e.fill),width:a,height:n,top:"".concat((e.top/e.scaleY-(e.height-e.strokeWidth)/2-e.strokeWidth).toFixed(2)),left:"".concat((e.left/e.scaleY-(e.width-e.strokeWidth)/2-e.strokeWidth).toFixed(2)),rotate:"".concat(e.angle),borderRadius:"".concat(e.rx*e.scaleY),borderWidth:"".concat(e.strokeWidth*e.scaleY),borderColor:"".concat(e.stroke),shadow:"".concat(e.shadow)},o="";switch(t){case"textGroup":o=1,e._objects.forEach(function(t){"rect"===t.type?(delete r.height,r=Object(c.a)({},r,{width:"".concat(e.width*e.scaleX-2*t.strokeWidth),height:"".concat(e.height*e.scaleY-2*t.strokeWidth),background:"".concat(t.fill),borderRadius:"".concat(t.rx),borderWidth:"".concat(t.strokeWidth),borderColor:"".concat(t.stroke)})):(delete r.height,r=Object(c.a)({text:"".concat(e.oldText),maxLines:"".concat(t.maxLines)},r,{color:t.fill,padding:"".concat(t.padding),fontSize:"".concat(t.fontSize),fontWeight:"".concat(t.fontWeight),lineHeight:"".concat(1.08*t.lineHeight),textStyle:"".concat(t.textStyle),textDecoration:"".concat("linethrough"===t.textDecoration?"line-through":t.textDecoration),fontFamily:"".concat(t.fontFamily),textAlign:"".concat(t.textAlign),shadow:"".concat(t.shadow)}))});break;case"rect":o=2,delete r.color,r=Object(c.a)({},r,{shadow:"".concat(e.myshadow)});break;case"image":o=3,delete r.color,delete r.background,r=Object(c.a)({url:e.url},r,{mode:"".concat(e.mode)});break;case"qrcode":o=4,delete r.height,delete r.borderWidth,delete r.borderColor,delete r.shadow,r=Object(c.a)({url:e.url},r,{color:e.color,background:e.background})}var i=w.a.cloneDeep(this.state.currentOptionArr);i[o].css=r,this.setState({currentOptionArr:i})}},{key:"generateCode",value:function(){var t=this,e=this.canvas_sprite;this.views=[],e.getObjects().forEach(function(e,a){var n={},r=e.width*e.scaleX,o=e.height*e.scaleY,i={color:"".concat(e.color),background:"".concat(e.fill),width:"".concat(r,"px"),height:"".concat(o,"px"),top:"".concat(e.top-o/2+e.strokeWidth/2,"px"),left:"".concat(e.left-r/2+e.strokeWidth/2,"px"),rotate:"".concat(e.angle),borderRadius:"".concat(e.rx*e.scaleY,"px"),borderWidth:"".concat(e.strokeWidth?e.strokeWidth*e.scaleY+"px":""),borderColor:"".concat(e.stroke),shadow:"".concat(e.shadow)},s=e.mytype;"image"===s?(delete i.color,delete i.background,n={type:s,url:"".concat(e.url),css:Object(c.a)({},i,{mode:"".concat(e.mode),width:"".concat((e.width-e.strokeWidth)*e.scaleX,"px"),height:"".concat((e.height-e.strokeWidth)*e.scaleY,"px")})}):"qrcode"===s?(delete i.borderWidth,delete i.borderColor,delete i.shadow,n={type:s,content:"".concat(e.url),css:Object(c.a)({},i,{background:e.background})}):"textGroup"===s?e._objects.forEach(function(t){n="rect"===t.type?Object(c.a)({},n,{type:"text",css:Object(c.a)({},i,n.css,{left:"".concat(e.left-r/2+t.padding+t.strokeWidth,"px"),top:"".concat(e.top-o/2+t.padding+t.strokeWidth,"px"),background:"".concat(t.fill),borderRadius:"".concat(t.rx,"px"),borderWidth:"".concat(t.strokeWidth?t.strokeWidth+"px":""),borderColor:"".concat(t.stroke)})}):Object(c.a)({},n,{type:"text",text:"".concat(e.oldText),css:Object(c.a)({},i,n.css,{width:"".concat(t.width,"px"),height:"".concat(t.height,"px"),color:t.fill,padding:"".concat(t.padding,"px"),fontSize:"".concat(t.fontSize,"px"),fontWeight:"".concat(t.fontWeight),maxLines:"".concat(t.maxLines),lineHeight:"".concat(1.08*t.lineHeight*t.fontSize,"px"),textStyle:"".concat(t.textStyle),textDecoration:"".concat("linethrough"===t.textDecoration?"line-through":t.textDecoration),fontFamily:"".concat(t.fontFamily),textAlign:"".concat(t.textAlign),shadow:"".concat(t.shadow)})})}):"rect"===s&&(delete i.color,0===e.strokeWidth&&(delete i.borderWidth,delete i.borderColor),n={type:s,css:Object(c.a)({},i,{color:e.fill,width:"".concat((e.width-e.strokeWidth)*e.scaleX,"px"),height:"".concat((e.height-e.strokeWidth)*e.scaleY,"px"),shadow:"".concat(e.myshadow)})}),t.views.push(n)}),this.finallObj={width:"".concat(e.width,"px"),height:"".concat(e.height,"px"),background:e.backgroundColor,views:this.views},this.miniCode="\n    export default class LastMayday {\n      palette() {\n        return (\n".concat(F.a.plain(this.finallObj).replace(/px/g,"px"),"\n        );\n      }\n    }\n    ")}},{key:"clearCanvas",value:function(){this.rects.forEach(function(t,e){t.remove()}),this.texts.forEach(function(t,e){t.remove()})}},{key:"copyCode",value:function(){this.generateCode(),I()(this.miniCode)?Y.a.success("\u590d\u5236\u6210\u529f,\u8bf7\u8d76\u5feb\u53bbpainter\u7c98\u8d34\u4ee3\u7801\u67e5\u770b\u6548\u679c",2):Y.a.error("\u590d\u5236\u5931\u8d25,\u8bf7\u91cd\u8bd5\u6216\u8005\u53bb\u8c37\u6b4c\u6d4f\u89c8\u5668\u5c1d\u8bd5",2)}},{key:"viewCode",value:function(){this.generateCode(),this.setState({visibleCode:!0})}},{key:"exportCode",value:function(){I()(V.canvasState[V.canvasState.length-1])}},{key:"importCode",value:function(){this.setState({visibleImportCode:!0})}},{key:"confirmImportCode",value:function(){var t=this,e=this.canvas_sprite,a=function(e){return new Promise(function(a){clearTimeout(t.delayT),t.delayT=setTimeout(a,e)})};e.loadFromJSON(this.state.importCodeJson,Object(h.a)(d.a.mark(function n(){var r,o,i;return d.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:t.setState({visibleImportCode:!1}),r=e.getObjects(),o=0;case 3:if(!(o<r.length)){n.next=15;break}return i=r[o],t.activeObject=i,t.changeActiveObjectValue(),n.next=9,a(10);case 9:return t.updateObject(),n.next=12,a(10);case 12:o++,n.next=3;break;case 15:t.setState({importCodeJson:""}),Y.a.success("\u753b\u9762\u52a0\u8f7d\u6210\u529f",2);case 17:case"end":return n.stop()}},n)})))}},{key:"updateCanvasState",value:function(){var t=this.canvas_sprite;if(!1===V.undoStatus&&!1===V.redoStatus){var e=t.toJSON(),a=JSON.stringify(e);if(V.currentStateIndex<V.canvasState.length-1){var n=V.currentStateIndex+1;V.canvasState[n]=a;var r=n+1;V.canvasState=V.canvasState.splice(0,r)}else V.canvasState.push(a);V.currentStateIndex=V.canvasState.length-1,V.currentStateIndex===V.canvasState.length-1&&-1!==V.currentStateIndex&&this.setState({redoButtonStatus:"disabled"})}}},{key:"handerUndo",value:function(){var t=this,e=this.canvas_sprite;V.undoFinishedStatus&&(-1===V.currentStateIndex?V.undoStatus=!1:V.canvasState.length>=1&&(V.undoFinishedStatus=0,0!==V.currentStateIndex?(V.undoStatus=!0,e.loadFromJSON(V.canvasState[V.currentStateIndex-1],function(){e.renderAll(),V.undoStatus=!1,V.currentStateIndex-=1,t.setState({undoButtonStatus:""}),V.currentStateIndex!==V.canvasState.length-1&&t.setState({redoButtonStatus:""}),V.undoFinishedStatus=1})):0===V.currentStateIndex&&(e.clear(),V.undoFinishedStatus=1,t.setState({redoButtonStatus:"",undoButtonStatus:"disabled"}),V.currentStateIndex-=1)))}},{key:"handerRedo",value:function(){var t=this,e=this.canvas_sprite;V.redoFinishedStatus&&(V.currentStateIndex===V.canvasState.length-1&&-1!==V.currentStateIndex?t.setState({redoButtonStatus:"disabled"}):V.canvasState.length>V.currentStateIndex&&0!==V.canvasState.length&&(V.redoFinishedStatus=0,V.redoStatus=!0,e.loadFromJSON(V.canvasState[V.currentStateIndex+1],function(){e.renderAll(),V.redoStatus=!1,V.currentStateIndex+=1,-1!==V.currentStateIndex&&t.setState({undoButtonStatus:""}),V.redoFinishedStatus=1,V.currentStateIndex===V.canvasState.length-1&&-1!==V.currentStateIndex&&t.setState({redoButtonStatus:"disabled"})})))}},{key:"render",value:function(){var t=this,e=this.state,a=e.visible,n=e.visibleCode,o=e.visibleImportCode,i=e.currentOptionArr,c=e.currentObjectType;return r.a.createElement("div",{id:"main"},r.a.createElement("div",{className:"slide"},r.a.createElement("canvas",{id:"merge",width:"700",height:"1000"})),r.a.createElement("div",{className:"main-container"},r.a.createElement("div",{className:"box"},r.a.createElement("div",{className:"btns"},r.a.createElement("div",{className:"btn"},r.a.createElement(W.a,{type:"primary",onClick:this.copyCode},"\u590d\u5236\u4ee3\u7801")),r.a.createElement("div",{className:"btn"},r.a.createElement(W.a,{type:"primary",onClick:this.exportCode},"\u5bfc\u51fajson")),r.a.createElement("div",{className:"btn"},r.a.createElement(W.a,{type:"primary",onClick:this.importCode},"\u5bfc\u5165json"))),r.a.createElement("div",{className:"code"})),r.a.createElement("div",{className:"option"},r.a.createElement("div",{className:"box"},r.a.createElement("div",{className:"btns"},r.a.createElement(X.a.Group,{value:c,onChange:function(e){t.setState({currentObjectType:e.target.value})}},T.map(function(t,e){return r.a.createElement(X.a.Button,{value:t.type,key:e},t.name)})))),T.map(function(e,a){if(e.type===c)return r.a.createElement("div",{key:a,className:"option-li"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"h3"},e.name," "),"canvas"!==e.type&&r.a.createElement("div",{className:"btn"},r.a.createElement(W.a,{type:"primary",onClick:t.addShape.bind(t,a)},"\u6dfb\u52a0"))),Object.keys(e.css).map(function(n,o){return r.a.createElement("div",{className:"row",key:o},r.a.createElement("div",{className:"h3"},n," "),!w.a.isArray(e.css[n])&&r.a.createElement(C.a,{defaultValue:e.css[n],onChange:function(r){t.currentOptionArr[a].css[n]=r.target.value,"canvas"===e.type&&("width"===n?t.canvas_sprite.setWidth(r.target.value):"height"===n?t.canvas_sprite.setHeight(r.target.value):"backgroundColor"===n&&(t.canvas_sprite.setBackgroundColor(r.target.value),t.canvas_sprite.renderAll()))}}),w.a.isArray(e.css[n])&&r.a.createElement(j.a,{defaultValue:e.css[n][0],style:{width:120},onChange:function(e){t.currentOptionArr[a].css[n]=e}},e.css[n].map(function(t,e){return r.a.createElement(P,{value:t,key:e},t)})))}))}))),r.a.createElement("div",{className:"example"},z.map(function(e,a){return r.a.createElement("div",{className:"li",key:a,onClick:function(){t.setState({importCodeJson:e.json},t.confirmImportCode)}},r.a.createElement("img",{src:e.src,alt:""}))})),r.a.createElement(R.a,{title:"\u7f16\u8f91\u5bf9\u8c61",width:400,onClose:this.onClose,visible:a,mask:!1,placement:"left"},i.map(function(e,a){var n=t.activeObject.mytype;if("textGroup"===n&&(n="text"),e.type===n)return r.a.createElement("div",{key:a,className:"option-li"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"h3"},e.name," ")),Object.keys(e.css).map(function(n,o){return r.a.createElement("div",{className:"row",key:o},r.a.createElement("div",{className:"h3"},n," "),!w.a.isArray(T[a].css[n])&&r.a.createElement(C.a,{defaultValue:e.css[n],value:e.css[n],onChange:function(e){var r=w.a.cloneDeep(t.state.currentOptionArr);r[a].css[n]=e.target.value,t.setState({currentOptionArr:r},function(){t.updateObject()})}}),w.a.isArray(T[a].css[n])&&r.a.createElement(j.a,{defaultValue:e.css[n],value:e.css[n],style:{width:120},onChange:function(e){var r=w.a.cloneDeep(t.state.currentOptionArr);r[a].css[n]=e,t.setState({currentOptionArr:r},function(){t.updateObject()})}},T[a].css[n].map(function(t,e){return r.a.createElement(P,{value:t,key:e},t)})))}))})),r.a.createElement(A.a,{title:"view code",visible:n,onCancel:function(){t.setState({visibleCode:!1})},footer:[r.a.createElement(W.a,{key:"submit",type:"primary",onClick:this.copyCode},"\u590d\u5236\u4ee3\u7801")]},r.a.createElement(B.a,{source:"```\n".concat(this.miniCode,"\n          ")})),r.a.createElement(A.a,{title:"\u5bfc\u5165\u4ee3\u7801",visible:o,onCancel:function(){t.setState({visibleImportCode:!1})},footer:[r.a.createElement(W.a,{key:"submit",type:"primary",onClick:this.confirmImportCode},"\u786e\u5b9a")]},r.a.createElement(H,{placeholder:"\u8bf7\u5c06\u4ee3\u7801\u590d\u5236\u8fdb\u6765",value:this.state.importCodeJson,autosize:{minRows:10,maxRows:6},onChange:function(e){t.setState({importCodeJson:e.target.value})}})))}}]),e}(r.a.Component),Object(v.a)(G.prototype,"beginEdit",[_],Object.getOwnPropertyDescriptor(G.prototype,"beginEdit"),G.prototype),G);i.a.render(r.a.createElement("div",null,r.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[136,1,2]]]);
//# sourceMappingURL=main.497a60b2.chunk.js.map