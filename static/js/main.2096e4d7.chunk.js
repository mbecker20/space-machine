(this["webpackJsonpspace-machine"]=this["webpackJsonpspace-machine"]||[]).push([[0],{22:function(e,t,n){e.exports=n(34)},27:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(17),i=n.n(r),l=(n(27),n(7)),c="#282c34",d="black",u="#00347d",s="#001b40",m="black",p="black",f="#1b1e24",w="#37538a",g="white",h="#007ab3",v="white",b="black",y="#cc0000",D="#cc0000",O="red",I={width:"21vw",toggleWidth:"1.5vmin",item:"10vmin"},x={width:"20vw"},C={iconGrid:"13vmin",gutterGrid:"7vmin",icon:"11vmin"},E={large:"calc(25px + 3vmin)",medium:"calc(20px + 2.5vmin)",small:"calc(12px + 1.5vmin)",xsmall:"calc(10px + 1.3vmin)"},N={size:"3vmin",borderRadius:"1.5vmin"},j=Object(l.a)({Bounder:{backgroundColor:c,width:"100vw",height:"100vh",display:"flex",fontSize:"calc(20px + 2vmin)",color:"white",position:"absolute",top:"0px",left:"0px",userSelect:"none",zIndex:"-1",overflow:"hidden"},ModuleViewBounder:{minWidth:"60vw",height:"100vh",display:"flex",flexDirection:"row",alignItems:"flex-start",justifyContent:"flex-start",zIndex:0,overflowX:"hidden",overflowY:"scroll","&::-webkit-scrollbar":{width:"0px"}}}),T=n(6),S=Object(l.a)({DrawerBounder:{backgroundColor:d,height:"100vh",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",color:"white",position:"absolute",top:"0px",userSelect:"none",zIndex:"10"},Drawer:{height:"100vh",width:I.width,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start"},DrawerHeader:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",width:I.width,overflowX:"scroll","&::-webkit-scrollbar":{height:"3px"},"&::-webkit-scrollbar-thumb":{backgroundColor:"white"}},DrawerHeaderItem:{fontSize:E.large,padding:"1vmin 1.5vmin",color:g,textDecoration:"none",whiteSpace:"nowrap","&:hover":{cursor:"pointer"}},ItemRouter:{display:"flex",flexFlow:"row wrap",justifyContent:"flex-start",alignItems:"flex-start",alignContent:"flex-start",width:I.width,height:"calc(100% - 60px)",overflowY:"scroll","&::-webkit-scrollbar":{width:"1px"},"&::-webkit-scrollbar-thumb":{backgroundColor:"white"}},DrawerItem:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly",borderRadius:"10px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",margin:"4vmin"},DrawerIcon:{backgroundColor:c,borderColor:c,borderStyle:"solid",width:I.item,height:I.item,borderRadius:"1.5vmin",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",marginBottom:"1.5vmin","&:hover":{cursor:"pointer",borderColor:"white"}},DrawerItemText:{fontSize:E.small},Toggle:{backgroundColor:u,width:I.toggleWidth,height:"100%",display:"flex",alignItems:"center",justifyContent:"center","&:hover":{cursor:"pointer"}},ToggleLine:{backgroundColor:s,borderRadius:"4px",width:"0.75vmin",height:"80px"}}),k=n(14);var M=function(e){var t=e.className,n=e.text,a=e.onClick,r={color:e.selectedRoute===n?h:g};return o.a.createElement("div",{className:t,onClick:a,style:r},n)},R=0;var A=function(e){var t=e.fullName,n=e.id,a=e.moduleType,r=S();return o.a.createElement("div",{className:r.DrawerItem},o.a.createElement("div",{className:r.DrawerIcon,draggable:!0,onDragStart:function(e){e.dataTransfer.setData("id","".concat(n," ").concat(R)),e.dataTransfer.setData("moduleType",a),e.dataTransfer.setData("name",n),window.setFillIsExpanded(!0),R+=1},onDragEnd:function(){window.setFillIsExpanded(!1)}}),o.a.createElement("div",{className:r.DrawerItemText},t))},L="VALUE";var F=function(){return o.a.createElement(a.Fragment,null,o.a.createElement(A,{fullName:"oscillator",id:"osc",moduleType:"OSCILLATOR"}),o.a.createElement(A,{fullName:"gain",id:"gain",moduleType:"GAIN"}),o.a.createElement(A,{fullName:"output",id:"out",moduleType:"OUTPUT"}),o.a.createElement(A,{fullName:"auto filter",id:"filter",moduleType:"AUTOFILTER"}),o.a.createElement(A,{fullName:"kompressor",id:"komp",moduleType:"KOMPRESSOR"}),o.a.createElement(A,{fullName:"stereo panner",id:"str pan",moduleType:"STEREO_PANNER"}),o.a.createElement(A,{fullName:"signal delay",id:"sig dly",moduleType:"SIGNAL_DELAY"}),o.a.createElement(A,{fullName:"constant",id:"const",moduleType:"CONSTANT"}),o.a.createElement(A,{fullName:"container",id:"cntnr",moduleType:"CONTAINER"}))};var B=function(){var e=S(),t=Object(a.useState)(!0),n=Object(T.a)(t,2),r=n[0],i=n[1],l="-"+I.width,c=Object(k.b)({right:r?"0vw":l,config:{tension:220,clamp:!0}}),d=Object(a.useState)("base modules"),u=Object(T.a)(d,2),s=u[0],m=u[1];return o.a.createElement(k.a.div,{className:e.DrawerBounder,style:c},o.a.createElement("div",{className:e.Toggle,onClick:function(){i(!r)}},o.a.createElement("div",{className:e.ToggleLine,onClick:function(){i(!r)}})),o.a.createElement("div",{className:e.Drawer},o.a.createElement(oe,{className:e.DrawerHeader},o.a.createElement(M,{className:e.DrawerHeaderItem,text:"base modules",onClick:function(){m("base modules")},selectedRoute:s}),o.a.createElement(M,{className:e.DrawerHeaderItem,text:"higher order",onClick:function(){m("higher order")},selectedRoute:s}),o.a.createElement(M,{className:e.DrawerHeaderItem,text:"settings",onClick:function(){m("settings")},selectedRoute:s})),o.a.createElement("div",{className:e.ItemRouter},"base modules"===s?o.a.createElement(F,null):"higher order"===s||"settings"===s?o.a.createElement("div",null):null)))},z=Object(l.a)({LeftDrawer:{backgroundColor:m,height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",fontSize:"calc(20px + 2vmin)",color:"white",userSelect:"none",overflow:"hidden",whiteSpace:"nowrap",zIndex:"20"},TopItems:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",width:"100%",maxHeight:"50%",overflowX:"hidden",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-thumb":{backgroundColor:"white"}},HeaderScrollBounder:{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",borderColor:"white",borderStyle:"none none solid none","&::-webkit-scrollbar":{height:"4px"},"&::-webkit-scrollbar-thumb":{backgroundColor:"white"}},DrawerHeader:{width:"100%",height:"1em",whiteSpace:"nowrap",backgroundColor:"transparent",color:"white",fontSize:E.large,padding:"1vmin 0vmin",borderWidth:"1px",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",justifyText:"center",resize:"none",overflow:"hidden","&:hover":{cursor:"pointer"}},MenuHeader:{fontSize:E.medium,borderStyle:"none none solid none",margin:"1vmin",width:"90%"},Connection:{fontSize:E.small,backgroundColor:f,margin:".5vmin 3vmin",borderRadius:"1vmin",borderColor:"transparent",borderStyle:"solid",minWidth:"30%",padding:"1vmin",display:"flex",justifyContent:"center",alignItems:"center","&:hover":{cursor:"pointer",borderColor:y},boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"},ControlMenu:{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"},ControlBounder:{display:"flex",width:"100%",justifyContent:"space-around",alignItems:"center",padding:"1vmin",fontSize:E.small},ControlInput:{minWidth:"9vmin",maxWidth:"5em",margin:"1vmin",fontSize:E.small},ControlTypeSelect:{minWidth:"9vmin",maxWidth:"5em",margin:"1vmin",fontSize:E.small},BottomItems:{display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",width:"100%",maxHeight:"50%",overflowX:"hidden",overflowY:"scroll","&::-webkit-scrollbar":{width:"4px"},"&::-webkit-scrollbar-thumb":{backgroundColor:"white"}},CMInputBounder:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"},CenterMenuInput:{backgroundColor:c,color:"white",height:"2vmin",padding:"1vmin",margin:"1.5vmin .75vmin 1.5vmin 1.5vmin",borderStyle:"none",borderRadius:"1vmin",fontSize:E.small,width:"23vmin","&:hover":{cursor:"text"}},InputSubmit:{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:c,height:"2vmin",padding:"1vmin",margin:"1.5vmin 1.5vmin 1.5vmin 0.75vmin",borderRadius:"1vmin","&:hover":{cursor:"pointer"},fontSize:E.small},Error:{backgroundColor:D,width:"90%",color:"white",fontSize:E.small,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"1vmin",padding:"1vmin 0vmin",marginBottom:"1vmin"}}),H=n(5),P=function(e,t,n){return{type:"MOVE_MODULE",id:e,newRow:t,newCol:n}},U=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return{type:"ADD_CONNECTION",fromID:e,toID:t,param:n}},_=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return{type:"REMOVE_CONNECTION",fromID:e,toID:t,param:n}};var W=function(e){var t=e.setRMOpen,n=z(),r=Object(a.useRef)(null),i=Object(H.c)((function(e){return e.modules})),l=Object(H.b)(),c=Object(a.useState)(!1),d=Object(T.a)(c,2),u=d[0],s=d[1];function m(){if(r&&r.current){var e=r.current.value;0===e.length?s(!0):(l(function(e,t){return{type:"RENAME_MODULE",id:e,newName:t}}(window.highlightedID,e)),window.reRenderLeftDrawer(),t(!1))}}return o.a.createElement(ie,{header:"rename",onClose:function(){t(!1)}},o.a.createElement("div",{className:n.CMInputBounder},o.a.createElement("input",{className:n.CenterMenuInput,placeholder:i[window.highlightedID].name,onKeyUp:function(e){13===e.keyCode?m():27===e.keyCode&&t(!1)},ref:r,autoFocus:!0}),o.a.createElement("div",{className:n.InputSubmit,onClick:function(){m()}},"enter")),u?o.a.createElement("div",{className:n.Error},"please enter a name"):null)};function q(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";0===n.length?(e.audioNode.connect(t.audioNode),console.log("connected ".concat(e.audioNode," to ").concat(t.audioNode))):t.audioNode[n]?e.audioNode.connect(t.audioNode[n]):alert("param does not exist")}function G(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";0===n.length?e.audioNode.disconnect(t.audioNode):t.audioNode[n]?e.audioNode.disconnect(t.audioNode[n]):alert("param does not exist")}var V=function(){var e=z(),t=Object(a.useState)(!1),n=Object(T.a)(t,2),r=n[0],i=n[1];window.setLeftDrawerOpen=i;var l=Object(k.b)({width:r?x.width:"0vw",config:{tension:300,velocity:10,clamp:!0}}),c=Object(H.b)(),d=Object(a.useState)(!1),u=Object(T.a)(d,2),s=u[0],m=u[1],p=Object(H.c)((function(e){return e.modules})),f=p[window.highlightedID],w=window.audioModules,g=w[window.highlightedID],h=Object(a.useState)(!1),v=Object(T.a)(h,2),b=v[0],D=v[1];return window.reRenderLeftDrawer=function(){D(!b)},o.a.createElement(o.a.Fragment,null,o.a.createElement(k.a.div,{className:e.LeftDrawer,style:l},o.a.createElement("div",{className:e.TopItems},o.a.createElement(oe,{className:e.HeaderScrollBounder},o.a.createElement("div",{className:e.DrawerHeader,onClick:function(){m(!0)}},f?f.name:null)),f?0===f.inputs.length?null:o.a.createElement("div",{className:e.MenuHeader},"inputs"):null,f?f.inputs.map((function(t,n){var a=p[t[0]].name;return o.a.createElement("div",{className:e.Connection,key:t[0]+n,onClick:function(){c(_(t[0],f.id,t[1])),G(w[t[0]],w[f.id],t[1])}},0===t[1].length?a:"".concat(a," - ").concat(t[1]))})):null,f?0===f.outputs.length?null:o.a.createElement("div",{className:e.MenuHeader},"outputs"):null,f?f.outputs.map((function(t,n){var a=p[t[0]].name;return o.a.createElement("div",{className:e.Connection,key:t[0]+n,onClick:function(){c(_(f.id,t[0],t[1])),G(w[f.id],w[t[0]],t[1])}},0===t[1].length?a:"".concat(a," - ").concat(t[1]))})):null),o.a.createElement("div",{className:e.ControlMenu},o.a.createElement("div",{className:e.MenuHeader},"controls"),g?Object.keys(g.controlData).map((function(t,n){var r=g.controlData[t],i=r.controlType,l=r.paramID,c=r.value,d=r.range,u=g.controlSetFuncs[t],s=g.audioNode;return o.a.createElement("div",{className:e.ControlBounder,key:f.id+n},i===L?o.a.createElement(a.Fragment,null,o.a.createElement("div",null,t),o.a.createElement("input",{className:e.ControlInput,type:"number",value:"number"===typeof c?c:s[l].value,min:d?d[0]:void 0,max:d?d[1]:void 0,step:d&&d[2]?d[2]:void 0,onChange:function(e){u(e.target.value),window.reRenderLeftDrawer()}})):"BUTTON"===i?o.a.createElement(ce,{style:{borderColor:y,width:"50%"},onClick:function(){u("")}},t):"TYPE"===i?o.a.createElement(a.Fragment,null,o.a.createElement("label",{htmlFor:"type"},"choose type"),o.a.createElement("select",{className:e.ControlTypeSelect,name:"type",id:"type",onChange:function(e){u(e.target.value),window.reRenderLeftDrawer()},value:c||s.type},g.typeTypes.map((function(e){return o.a.createElement("option",{value:e,key:f.id+e},e)})))):null)})):null),o.a.createElement("div",{className:e.BottomItems},o.a.createElement(ce,{style:{borderColor:y,width:"50%",fontSize:E.small},onClick:function(){f.inputs.forEach((function(e){G(w[e[0]],g,e[1]),c(_(e[0],f.id,e[1]))})),f.outputs.forEach((function(e){G(g,w[e[0]],e[1]),c(_(f.id,e[0],e[1]))})),c({type:"REMOVE_MODULE",id:window.highlightedID}),window.setLeftDrawerOpen(!1),window.highlightedID=""}},"delete"))),s?o.a.createElement(W,{setRMOpen:m}):null)},Y=Object(l.a)({FillBounder:{backgroundColor:f,display:"flex",flexDirection:"column",margin:"10vmin",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderRadius:"2vmin"},FillHeader:{borderColor:"white",borderStyle:"none none solid none",padding:"1vmin",marginLeft:"2vmin","&:hover":{cursor:"pointer"}},Fill:{display:"grid",minWidth:C.iconGrid,minHeight:C.iconGrid,alignItems:"center",justifyItems:"center",padding:"2vmin",zIndex:1},ArcherContainer:{width:"100%",height:"100%",zIndex:0,display:"grid"},Icon:{backgroundColor:w,width:C.icon,height:C.icon,borderRadius:"1.5vmin",borderStyle:"none",borderColor:"white",whiteSpace:"wrap",fontSize:E.medium,padding:"1vmin",display:"flex",flexFlow:"column nowrap",alignItems:"flex-end",justifyContent:"space-between",overflow:"hidden",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)","&:hover":{cursor:"pointer",borderStyle:"solid"},zIndex:2},IconName:{fontSize:E.small},IconConnector:{backgroundColor:O,width:N.size,height:N.size,borderRadius:N.borderRadius,boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",borderStyle:"none",borderColor:"white","&:hover":{cursor:"pointer",borderStyle:"solid"}},DropSquare:{width:C.iconGrid,height:C.iconGrid,borderStyle:"none",borderColor:v,borderRadius:"10px",zIndex:1}}),Q={};var X=function(e){var t=e.fromID,n=e.toID,r=e.toType,i=e.onClose,l=Object(a.useState)(0),c=Object(T.a)(l,2),d=c[0],u=c[1],s=window.audioModules,m=Object(H.b)();return o.a.createElement(a.Fragment,null,0===d?o.a.createElement(ie,{header:"connect ".concat(t," to ").concat(n),onClose:function(){u(0),i()}},"OSCILLATOR"===r||"CONSTANT"===r?null:o.a.createElement(ce,{style:Q,onClick:function(){q(s[t],s[n]),m(U(t,n)),u(0),i()}},"module"),0===s[n].connectingParamIDs.length?null:o.a.createElement(ce,{style:Q,onClick:function(e){e.stopPropagation(),u(1)}},"params")):o.a.createElement(ie,{header:"props",onClose:function(){u(0),i()}},s[n].connectingParamIDs.map((function(e,a){return o.a.createElement(ce,{key:t+n+a,onClick:function(){q(s[t],s[n],e),m(U(t,n,e)),u(0),i()}},e)}))))};window.currSetHighlighted=function(e){};var K=function(e){var t=e.mod,n=e.gridCol,r=e.gridRow,i=Y(),l=Object(a.useState)(t.id===window.highlightedID),c=Object(T.a)(l,2),d=c[0],u=c[1];t.id===window.highlightedID&&(window.currSetHighlighted=u);var s={gridColumn:"".concat(n," / span 1"),gridRow:"".concat(r," / span 1"),borderStyle:d?"solid":"none"},m=Object(H.c)((function(e){return e.modules})),p=Object(H.b)(),f=Object(a.useState)({isOpen:!1,fromID:""}),w=Object(T.a)(f,2),g=w[0],h=w[1];return o.a.createElement(a.Fragment,null,o.a.createElement("div",{className:i.Icon,style:s,onDragOver:function(e){e.preventDefault()},onDragEnter:function(){u(!0)},onDragLeave:function(){u(!1)},onDrop:function(e){var n=e.dataTransfer.getData("id");if(n){if(m[n]){var a=e.dataTransfer.getData("fromRow"),o=e.dataTransfer.getData("fromCol");window.setFillIsExpanded(!1),p(P(n,t.row,t.col)),p(P(t.id,Number(a),Number(o))),window.setTimeout(window.refreshArcherContainer,500)}}else{var r=e.dataTransfer.getData("fromID");r&&h({isOpen:!0,fromID:r})}u(!1)},draggable:!0,onDragStart:function(e){e.dataTransfer.setData("id",t.id),e.dataTransfer.setData("fromRow","".concat(t.row)),e.dataTransfer.setData("fromCol","".concat(t.col)),window.setFillIsExpanded(!0)},onDragEnd:function(){window.setFillIsExpanded(!1)},onClick:function(e){e.stopPropagation&&e.stopPropagation(),0===window.linkToOutputID.length?t.id===window.highlightedID?(window.setLeftDrawerOpen(!1),u(!1),window.highlightedID="",window.currSetHighlighted=function(e){}):(window.setLeftDrawerOpen(!0),window.reRenderLeftDrawer(),u(!0),window.highlightedID=t.id,window.currSetHighlighted(!1),window.currSetHighlighted=u):h({isOpen:!0,fromID:window.linkToOutputID})}},"OUTPUT"!==t.moduleType?o.a.createElement("div",{className:i.IconConnector,draggable:!0,onDragStart:function(e){e.stopPropagation(),e.dataTransfer.setData("fromID",t.id)}}):o.a.createElement("div",{style:{width:"1vmin",height:"1vmin"}}),o.a.createElement("div",{className:i.IconName},t.name)),g.isOpen?o.a.createElement(X,{fromID:g.fromID,toID:t.id,toType:t.moduleType,onClose:function(){h({isOpen:!1,fromID:""}),window.linkToOutputID=""}}):null)};function J(e,t){for(var n=[],a=e;a<t;a++)n.push(a);return n}var $=function(e){var t=e.row,n=e.col,r=Y(),i=Object(H.b)(),l=Object(H.c)((function(e){return{modules:e.modules}})).modules,c=Object(a.useState)(!1),d=Object(T.a)(c,2),u=d[0],s=d[1],m={gridColumn:"".concat(2*n+1," / span 1"),gridRow:"".concat(2*t+1," / span 1"),borderStyle:u?"solid":"none"};return o.a.createElement("div",{className:r.DropSquare,style:m,onDragOver:function(e){e.preventDefault()},onDragEnter:function(){s(!0)},onDragLeave:function(){s(!1)},onDrop:function(e){var a=e.dataTransfer.getData("id"),o=l[window.fillContainerID],r=o.childModules.concat(o.childModules),c=l[a],d=function(e,t,n,a){for(var o=0;o<n.length;o++){var r=a[n[o]];if(r.row===e&&r.col===t)return r.id}return!1}(t,n,r,l);if(c)if(d){var u=e.dataTransfer.getData("fromRow"),m=e.dataTransfer.getData("fromCol");s(!1),window.setFillIsExpanded(!1),i(P(a,t,n)),i(P(d,Number(u),Number(m))),window.setTimeout(window.refreshArcherContainer,1)}else s(!1),window.setFillIsExpanded(!1),i(P(a,t,n)),window.setTimeout(window.refreshArcherContainer,1);else if(!d){var p=e.dataTransfer.getData("moduleType"),f=e.dataTransfer.getData("name");s(!1),i(function(e,t,n,a,o,r){return{type:"ADD_MODULE",moduleType:n,id:e,name:t,row:o,col:r,parentID:a}}(a,f,p,window.fillContainerID,t,n)),window.addModule(a,p),window.setFillIsExpanded(!1)}}})},Z=n(16),ee=C.iconGrid,te=C.gutterGrid;var ne=function(e){var t=e.containerModule,n=Y(),r=Object(a.useState)(!1),i=Object(T.a)(r,2),l=i[0],c=i[1];window.setFillIsExpanded=c;var d,u=Object(H.c)((function(e){return{modules:e.modules}})).modules,s=function(e,t){var n=0,a=0;return e.forEach((function(e){var o=t[e];o.row>n&&(n=o.row),o.col>a&&(a=o.col)})),{maxRow:n,maxCol:a}}(t.childModules,u),m=s.maxRow,p=s.maxCol,f=0===t.childModules.length;d=f?{gridTemplateRows:"repeat(".concat(1,", ",ee," ").concat(te,")"),gridTemplateColumns:"repeat(".concat(1,", ",ee," ").concat(te,")")}:{gridTemplateRows:"repeat(".concat(l?m+2:m+1,", ").concat(ee," ").concat(te,")"),gridTemplateColumns:"repeat(".concat(l?p+2:p+1,", ").concat(ee," ").concat(te,")")};var w=Object(a.useRef)(null);return window.refreshArcherContainer=function(){var e;null===(e=w.current)||void 0===e||e.refreshScreen()},o.a.createElement("div",{className:n.FillBounder},o.a.createElement("div",{className:n.FillHeader,style:{width:"".concat(t.name.length/2,"em")},onClick:function(e){e.stopPropagation(),window.highlightedID=t.id,window.setLeftDrawerOpen(!0)}},t.name),o.a.createElement("div",{className:n.Fill,style:d,onClick:function(){window.highlightedID="",window.currSetHighlighted(!1),window.currSetHighlighted=function(e){},window.setLeftDrawerOpen(!1)}},l?f?o.a.createElement($,{row:0,col:0}):J(0,l?m+2:m+1).map((function(e){return J(0,l?p+2:p+1).map((function(t){return o.a.createElement($,{key:"".concat(e," ").concat(t),row:e,col:t})}))})).flat():null,t.childModules.map((function(e){var t=u[e];return o.a.createElement(K,{key:t.id,mod:t,gridRow:2*t.row+1,gridCol:2*t.col+1})})),o.a.createElement(Z.ArcherContainer,{className:n.ArcherContainer,style:{gridRow:"1 / span ".concat(2*m+2),gridColumn:"1 / span ".concat(2*p+2)},arrowLength:0,ref:w},o.a.createElement("div",{style:{display:"grid",gridTemplateRows:"repeat(".concat(m+1,", ").concat(ee," ").concat(te,")"),gridTemplateColumns:"repeat(".concat(p+1,", ").concat(ee," ").concat(te,")")}},t.childModules.map((function(e,t){var n=u[e];return o.a.createElement(a.Fragment,{key:n.id+t},o.a.createElement("div",{style:{gridColumn:"".concat(2*n.col+1," / span 1"),gridRow:"".concat(2*n.row+1," / span 1"),placeSelf:"start start",position:"relative",top:"10px",left:"5px"}},o.a.createElement(Z.ArcherElement,{id:n.id+" input"},o.a.createElement("div",{style:{width:"10px",height:"10px",backgroundColor:"blue"}}))),o.a.createElement("div",{style:{gridColumn:"".concat(2*n.col+1," / span 1"),gridRow:"".concat(2*n.row+1," / span 1"),placeSelf:"end start",position:"relative",bottom:"10px",left:"5px"}},o.a.createElement(Z.ArcherElement,{id:n.id+" controls"},o.a.createElement("div",{style:{width:"10px",height:"10px",backgroundColor:"yellow"}}))),o.a.createElement("div",{style:{gridColumn:"".concat(2*n.col+1," / span 1"),gridRow:"".concat(2*n.row+1," / span 1"),placeSelf:"start end",position:"relative",top:"10px",right:"5px"}},o.a.createElement(Z.ArcherElement,{id:n.id+" output",relations:n.outputs.map((function(e){return{targetId:""===e[1]?e[0]+" input":e[0]+" controls",targetAnchor:"left",sourceAnchor:"right",style:{strokeColor:""===e[1]?"red":"blue",strokeWidth:(e[1],1)}}}))},o.a.createElement("div",{style:{width:"10px",height:"10px",backgroundColor:"red"}}))))}))))))},ae={overflowY:"hidden",overflowX:"scroll",display:"flex"};var oe=function(e){var t=e.children,n=e.className,r=e.style,i=Object(a.useRef)(null),l=Object.assign({},ae);return o.a.createElement("div",{ref:i,className:n,style:Object.assign(l,r),onWheel:function(e){i&&i.current&&(i.current.scrollLeft+=e.deltaY)}},t)},re=Object(l.a)({CenterMenuBounder:{backgroundColor:"rgba(0,0,0,0.7)",position:"absolute",top:0,left:0,width:"100vw",height:"100vh",zIndex:100},CenterMenu:{backgroundColor:p,position:"absolute",top:"50vh",left:"50vw",transform:"translate(-50%, calc(-50% - 50px))",display:"flex",flexDirection:"column",alignItems:"center",borderRadius:"2vmin",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",minWidth:"15vw",padding:"1vmin 2vmin 2vmin 2vmin",border:"1px solid white",zIndex:101},Header:{padding:"1vmin 2vmin",margin:"0vmin 0vmin 2vmin 0vmin",borderColor:"white",borderStyle:"none none solid none",fontSize:E.large}});var ie=function(e){var t=e.children,n=e.header,a=e.onClose,r=re();return o.a.createElement("div",{className:r.CenterMenuBounder,onClick:function(e){e.stopPropagation(),a()}},o.a.createElement("div",{className:r.CenterMenu,onClick:function(e){e.stopPropagation()}},o.a.createElement("div",{className:r.Header},n),t))};Object(l.a)({TestingArea:{backgroundColor:"black",position:"absolute",top:"45vh",left:"25vw",width:"45vw",height:"50vh",display:"flex",flexDirection:"column",zIndex:150},ButtonDiv:{display:"flex",flexFlow:"row wrap"},Button:{margin:"2vmin",padding:"1vmin",display:"flex",alignItems:"center",justifyContent:"center","&:hover":{cursor:"pointer"}}});var le=Object(l.a)({Button:{backgroundColor:b,borderColor:"transparent",borderRadius:"1vmin",borderStyle:"solid","&:active":{borderColor:"transparent"},"&:hover":{cursor:"pointer",borderColor:"white"},display:"flex",alignItems:"center",justifyContent:"center",padding:"1vmin",margin:"1vmin",textAlign:"center"}});var ce=function(e){var t=e.onClick,n=e.children,a=e.style,r=le();return o.a.createElement("div",{className:r.Button,onClick:t,style:a},n)},de=n(3),ue=n(2),se=new(0,window.AudioContext),me=["sine","square","triangle","sawtooth"];var pe=function(){var e=se.createOscillator(),t={"set frequency":{controlType:L,paramID:"frequency"},"set detune":{controlType:L,paramID:"detune"}},n={"set frequency":function(t){e.frequency.value=Number(t)},"set detune":function(t){e.detune.value=Number(t)},kill:function(){e.stop()}};return e.start(),{audioNode:e,typeTypes:me,connectingParamIDs:["frequency","detune"],controlData:t,controlSetFuncs:n}};var fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=se.createGain();t.gain.value=e;var n=["gain"],a={"set gain":{controlType:L,paramID:"gain",value:0,range:[-1e4,1e4,1]},"set fine gain":{controlType:L,paramID:"gain",value:0,range:[-1,1,.01]}};function o(){t.gain.value=a["set gain"].value+a["set fine gain"].value}var r={"set gain":function(e){a["set gain"].value=Number(e),o()},"set fine gain":function(e){a["set fine gain"].value=Number(e),o()}};return{audioNode:t,connectingParamIDs:n,controlData:a,controlSetFuncs:r}};var we=function(){var e={resume:{controlType:"BUTTON",paramID:"n/a"},suspend:{controlType:"BUTTON",paramID:"n/a"}},t={resume:function(e){se.resume()},suspend:function(e){se.suspend()}};return se.resume(),{audioNode:se.destination,connectingParamIDs:[],controlData:e,controlSetFuncs:t}},ge=["lowpass","lowshelf","highpass","highshelf","allpass","bandpass","notch","peaking"];var he=function(){var e=se.createBiquadFilter(),t={"set frequency":function(t){e.frequency.value=Number(t)},"set detune":function(t){e.detune.value=Number(t)},"set Q":function(t){e.Q.value=Number(t)},"set gain":function(t){e.gain.value=Number(t)}};return{audioNode:e,typeTypes:ge,connectingParamIDs:["frequency","detune","Q","gain"],controlData:{"set frequency":{controlType:L,paramID:"frequency"},"set detune":{controlType:L,paramID:"detune"},"set Q":{controlType:L,paramID:"Q"},"set gain":{controlType:L,paramID:"gain"}},controlSetFuncs:t}};var ve=function(){var e=se.createDynamicsCompressor(),t={"set threshold":function(t){e.threshold.value=Number(t)},"set knee":function(t){e.knee.value=Number(t)},"set ratio":function(t){e.ratio.value=Number(t)},"set attack":function(t){e.attack.value=Number(t)},"set release":function(t){e.release.value=Number(t)}};return{audioNode:e,connectingParamIDs:["threshold","knee","ratio","attack","release"],controlData:{"set threshold":{controlType:L,paramID:"threshold"},"set knee":{controlType:L,paramID:"knee"},"set ratio":{controlType:L,paramID:"ratio"},"set attack":{controlType:L,paramID:"attack"},"set release":{controlType:L,paramID:"release"}},controlSetFuncs:t}};var be=function(){var e=se.createStereoPanner(),t={"set pan":function(t){e.pan.value=Number(t)}};return{audioNode:e,connectingParamIDs:["pan"],controlData:{"set pan":{controlType:L,paramID:"frequency"}},controlSetFuncs:t}};var ye=function(){var e=se.createDelay(),t={"set delay time":function(t){e.delayTime.value=Number(t)}};return{audioNode:e,connectingParamIDs:["delayTime"],controlData:{"set delay time":{controlType:L,paramID:"delayTime"}},controlSetFuncs:t}},De=["no ramp","linear","exponential"];var Oe=function(){var e=se.createConstantSource();e.offset.value=0;var t={"set value":{controlType:L,paramID:"offset",value:0},"set ramp":{controlType:"TYPE",paramID:"n/a",value:"no ramp"},"set ramp length":{controlType:L,paramID:"n/a",value:1,range:[0,1e4,.01]},start:{controlType:"BUTTON",paramID:"n/a"},stop:{controlType:"BUTTON",paramID:"n/a"}},n={"no ramp":function(n){t["set value"].value=Number(n),e.offset.value=Number(n)},linear:function(n){t["set value"].value=Number(n),e.offset.linearRampToValueAtTime(Number(n),se.currentTime+t["set ramp length"].value)},exponential:function(n){t["set value"].value=Number(n),e.offset.exponentialRampToValueAtTime(Number(n),se.currentTime+t["set ramp length"].value)}},a={"set value":function(e){n[t["set ramp"].value](e)},"set ramp":function(e){t["set ramp"].value=e},"set ramp length":function(e){t["set ramp length"].value=Number(e)},start:function(){e.start()},stop:function(){e.stop()}};return e.start(),{audioNode:e,connectingParamIDs:["offset"],controlData:t,controlSetFuncs:a,typeTypes:De}};var Ie=function(){return function(e,t){switch(t){case"OSCILLATOR":window.audioModules=Object(ue.a)(Object(ue.a)({},window.audioModules),{},Object(de.a)({},e,pe()));break;case"GAIN":window.audioModules=Object(ue.a)(Object(ue.a)({},window.audioModules),{},Object(de.a)({},e,fe()));break;case"OUTPUT":window.audioModules=Object(ue.a)(Object(ue.a)({},window.audioModules),{},Object(de.a)({},e,we()));break;case"AUTOFILTER":window.audioModules=Object(ue.a)(Object(ue.a)({},window.audioModules),{},Object(de.a)({},e,he()));break;case"KOMPRESSOR":window.audioModules=Object(ue.a)(Object(ue.a)({},window.audioModules),{},Object(de.a)({},e,ve()));break;case"STEREO_PANNER":window.audioModules=Object(ue.a)(Object(ue.a)({},window.audioModules),{},Object(de.a)({},e,be()));break;case"SIGNAL_DELAY":window.audioModules=Object(ue.a)(Object(ue.a)({},window.audioModules),{},Object(de.a)({},e,ye()));break;case"CONSTANT":window.audioModules=Object(ue.a)(Object(ue.a)({},window.audioModules),{},Object(de.a)({},e,Oe()))}}};window.highlightedID="project",window.fillContainerID="project",window.linkToOutputID="",window.audioModules={},window.addModule=Ie();var xe=function(){var e=j(),t=Object(H.c)((function(e){return e.modules}));return o.a.createElement("div",{className:e.Bounder},o.a.createElement(V,null),o.a.createElement("div",{className:e.ModuleViewBounder},o.a.createElement(ne,{containerModule:t[window.fillContainerID]})),o.a.createElement(B,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ce=n(10),Ee=n(21),Ne=n(9),je=function(e,t){var n,a,o=t.id,r=t.name,i=t.moduleType,l=t.row,c=t.col,d=t.parentID;switch(i){case"CONTAINER":return Object.assign({},e,(n={},Object(de.a)(n,o,{id:o,name:r,row:l,col:c,parentID:d,moduleType:i,inputs:[],outputs:[],childModules:[],isBaseContainer:!1}),Object(de.a)(n,d,Object(ue.a)(Object(ue.a)({},e[d]),{},{childModules:[].concat(Object(Ne.a)(e[d].childModules),[o])})),n));default:return Object.assign({},e,(a={},Object(de.a)(a,o,{id:o,name:r,row:l,col:c,parentID:d,moduleType:i,inputs:[],outputs:[]}),Object(de.a)(a,d,Object(ue.a)(Object(ue.a)({},e[d]),{},{childModules:[].concat(Object(Ne.a)(e[d].childModules),[o])})),a))}},Te=function(e,t){var n=t.id,a=e[n].parentID,o=Object.fromEntries(Object.entries(e).filter((function(e){return e[0]!==n})));return Object.assign({},o,Object.fromEntries(Object.entries(o).map((function(e){return[e[0],Object(ue.a)(Object(ue.a)({},e[1]),{},{inputs:e[1].inputs.filter((function(e){return e[0]!==n})),outputs:e[1].outputs.filter((function(e){return e[0]!==n}))})]}))),Object(de.a)({},a,Object(ue.a)(Object(ue.a)({},e[a]),{},{childModules:e[a].childModules.filter((function(e){return e!==n}))})))},Se=function(e,t){var n=t.id,a=t.newRow,o=t.newCol;return Object.assign({},e,Object(de.a)({},n,Object(ue.a)(Object(ue.a)({},e[n]),{},{row:a,col:o})))},ke=function(e,t){var n=t.id,a=t.newName;return Object.assign({},e,Object(de.a)({},n,Object(ue.a)(Object(ue.a)({},e[n]),{},{name:a})))},Me=function(e,t){var n,a=t.fromID,o=t.toID,r=t.param;return Object.assign({},e,(n={},Object(de.a)(n,o,Object(ue.a)(Object(ue.a)({},e[o]),{},{inputs:[].concat(Object(Ne.a)(e[o].inputs),[[a,r]])})),Object(de.a)(n,a,Object(ue.a)(Object(ue.a)({},e[a]),{},{outputs:[].concat(Object(Ne.a)(e[a].outputs),[[o,r]])})),n))},Re=function(e,t){var n,a=t.fromID,o=t.toID,r=t.param;return Object.assign({},e,(n={},Object(de.a)(n,o,Object(ue.a)(Object(ue.a)({},e[o]),{},{inputs:e[o].inputs.filter((function(e){return e[0]!==a||e[1]!==r}))})),Object(de.a)(n,a,Object(ue.a)(Object(ue.a)({},e[a]),{},{outputs:e[a].outputs.filter((function(e){return e[0]!==o||e[1]!==r}))})),n))},Ae={project:{id:"project",name:"project",row:0,col:0,moduleType:"CONTAINER",inputs:[],outputs:[],parentID:null,childModules:[],isBaseContainer:!0}},Le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_MODULE":return je(e,t);case"REMOVE_MODULE":return Te(e,t);case"MOVE_MODULE":return Se(e,t);case"RENAME_MODULE":return ke(e,t);case"ADD_CONNECTION":return Me(e,t);case"REMOVE_CONNECTION":return Re(e,t);default:return e}},Fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"project",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"DOWN_1_BASE":case"CHANGE_BASE":return t.newID;default:return e}},Be=Object(Ce.combineReducers)({modules:Le,baseContainerID:Fe}),ze=Object(Ce.createStore)(Be,Object(Ee.composeWithDevTools)());i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(H.a,{store:ze},o.a.createElement(xe,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.2096e4d7.chunk.js.map