(this.webpackJsonptspproject=this.webpackJsonptspproject||[]).push([[0],{102:function(t,e,n){},103:function(t,e,n){},104:function(t,e,n){},106:function(t,e,n){},178:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),r=n(18),l=n.n(r),s=(n(102),n(103),n(64)),c=n(21),o=n(182),u=n(181),h=n(184),d=n(69),v=n.n(d),j=n(97),f=function(t,e,n,a){var i=(n-t)*Math.PI/180,r=(e-a)*Math.PI/180,l=Math.sin(i/2)*Math.sin(i/2)+Math.cos(t*Math.PI/180)*Math.cos(n*Math.PI/180)*Math.sin(r/2)*Math.sin(r/2),s=6378137*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)));return Math.round(s)},p=function(t,e){for(var n=0,a=0;a<e.path.length-1;a++){var i,r,l,s;if(t[e.path[a]]&&t[e.path[a+1]])n+=f(null===(i=t[e.path[a]])||void 0===i?void 0:i.lat,null===(r=t[e.path[a]])||void 0===r?void 0:r.lng,null===(l=t[e.path[a+1]])||void 0===l?void 0:l.lat,null===(s=t[e.path[a+1]])||void 0===s?void 0:s.lng)}return n};function b(t){for(var e=t.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),a=t[e];t[e]=t[n],t[n]=a}return t}var O=function(t,e,n){for(var a=[],i=0;i<t;i++){var r={path:b(Array.from({length:e-1},(function(t,e){return e+1}))),fitness:0};r.path.unshift(0),r.path.push(0),r.fitness=p(n,r),a.push(Object(j.a)({},r))}return a},g=function(t,e){for(var n=[],a=(t=b(t)).length,i=0;i<a/2;i++){var r=t[i],l=t[a-i-1],s=r.path.length,c=new Array(r.path.length).fill(-1),o=b(Array.from({length:s-2},(function(t,e){return e+1})));(o=o.slice(o.length/2)).sort();for(var u=Array(s).fill(!1),h=1;h<o.length;h++)c[o[h]]=r.path[o[h]],u[r.path[o[h]]]=!0;for(var d=0,v=0;v<s-1;)-1===c[v]?(u[l.path[d]]||(c[v]=l.path[d],v++),d++):v++;c[s-1]=0;var j={path:c,fitness:0};j.fitness=p(e,j),n.push(j)}return n},m=function(t,e){for(var n=[],a=t.length,i=0;i<a;i++)n.push({path:Object(s.a)(t[i].path),fitness:0});for(var r=0;r<a;r++){var l=n[r].path.length,c=Math.floor(Math.random()*(l-3))+1,o=Math.floor(Math.random()*(l-3))+1,u=n[r].path[c];n[r].path[c]=n[r].path[o],n[r].path[o]=u,n[r].fitness=p(e,n[r])}return n},x=v.a.mark((function t(e,n,a,i){var r,l,s,c;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=O(i,e,n),l=0;case 2:if(!(l<a)){t.next=13;break}return s=g(r,n),c=m(s,n),(r=r.concat(c)).sort((function(t,e){return t.fitness<e.fitness?-1:t.fitness>e.fitness?1:0})),r=r.splice(0,i),t.next=10,{result:r[0],size:r.length,gen:l};case 10:l++,t.next=2;break;case 13:case"end":return t.stop()}}),t)})),M=(n(104),n(8));var y=function(t){var e=t.index;return Object(M.jsx)("div",{className:"location-map_marker",children:Object(M.jsx)("div",{className:"location-map_marker_index",children:e})})},I=(n(106),n(96)),S=o.a.Option;var P=function(){var t,e,n,i,r,l=Object(a.useState)(null),d=Object(c.a)(l,2),v=d[0],j=d[1],f=Object(a.useState)("Paused"),p=Object(c.a)(f,2),b=p[0],O=p[1],g=Object(a.useState)(300),m=Object(c.a)(g,2),P=m[0],C=m[1],N=Object(a.useState)(20),k=Object(c.a)(N,2),w=k[0],A=k[1],D=Object(a.useState)(10),_=Object(c.a)(D,2),R=_[0],F=_[1],G=Object(a.useState)(null),L=Object(c.a)(G,2),V=L[0],W=L[1],z=Object(a.useState)(),B=Object(c.a)(z,2),E=B[0],K=B[1],T=Object(a.useState)(),q=Object(c.a)(T,2),J=q[0],U=q[1],Z=Object(a.useState)(),H=Object(c.a)(Z,2),Q=H[0],X=H[1],Y=Object(a.useState)(),$=Object(c.a)(Y,2),tt=$[0],et=$[1],nt=Object(a.useState)("DRIVING"),at=Object(c.a)(nt,2),it=at[0],rt=at[1],lt=Object(a.useState)([]),st=Object(c.a)(lt,2),ct=st[0],ot=st[1];return Object(a.useEffect)((function(){j(x(ct.length,ct,w,R))}),[w,R,ct]),Object(a.useEffect)((function(){if(null!=v&&0===b.localeCompare("Playing")){var t=setInterval((function(){var t=v.next();if(t.done)return O("Paused"),void j(x(ct.length,ct,w,R));var e=t.value;W(e)}),P);return function(){clearInterval(t)}}}),[v,ct,b,P,R,w]),Object(M.jsxs)("div",{className:"main-container",children:[Object(M.jsxs)("div",{className:"main-container_params",children:[Object(M.jsx)("h3",{children:"\u0420\u0435\u0448\u0435\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u043a\u043e\u043c\u043c\u0438\u0432\u043e\u044f\u0436\u0435\u0440\u0430 \u0433\u0435\u043d\u0435\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u043c \u0430\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u043e\u043c"}),Object(M.jsxs)("div",{className:"main-container_slider",children:[Object(M.jsxs)("div",{children:["\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u043f\u043e\u043a\u043e\u043b\u0435\u043d\u0438\u0439: ",w]}),Object(M.jsx)(u.a,{min:1,max:100,onChange:function(t){A(t)},value:w})]}),Object(M.jsxs)("div",{className:"main-container_slider",children:[Object(M.jsxs)("div",{children:["\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u0430\u044f \u043f\u043e\u043f\u0443\u043b\u044f\u0446\u0438\u044f: ",R]}),Object(M.jsx)(u.a,{min:1,max:100,onChange:function(t){F(t)},value:R})]}),Object(M.jsxs)("div",{className:"main-container_slider",children:[Object(M.jsxs)("div",{children:["\u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c: ",P]}),Object(M.jsx)(u.a,{min:100,max:2e3,value:P,onChange:function(t){C(t)}})]}),Object(M.jsx)("div",{children:"\u0421\u043f\u043e\u0441\u043e\u0431 \u043f\u0435\u0440\u0435\u0434\u0432\u0438\u0436\u0435\u043d\u0438\u044f"}),Object(M.jsxs)(o.a,{defaultValue:"DRIVING",onChange:function(t){rt(t)},children:[Object(M.jsx)(S,{value:"DRIVING",children:"\u041d\u0430 \u043c\u0430\u0448\u0438\u043d\u0435"}),Object(M.jsx)(S,{value:"WALKING",children:"\u041f\u0435\u0448\u043a\u043e\u043c"})]}),Object(M.jsxs)("h4",{children:["\u0420\u0430\u0441\u0441\u0442\u043e\u044f\u043d\u0438\u0435, \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u043d\u043d\u043e\u0435 \u043f\u043e \u0433\u0435\u043d\u0435\u0442\u0438\u0447\u0435\u0441\u043a\u043e\u043c\u0443 \u0430\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u0443: ",null===V||void 0===V||null===(t=V.result)||void 0===t?void 0:t.fitness," \u043c"]}),Object(M.jsxs)("h4",{children:["\u0412\u0440\u0435\u043c\u044f \u0432 \u043f\u0443\u0442\u0438: ",Q," \u043c\u0438\u043d"]}),Object(M.jsxs)("h4",{children:["\u0420\u0430\u0441\u0441\u0442\u043e\u044f\u043d\u0438\u0435 \u043f\u043e \u043a\u0430\u0440\u0442\u0435: ",tt," \u043c"]}),Object(M.jsxs)("h4",{children:["\u041d\u0430\u0439\u0434\u0435\u043d\u043d\u0430\u044f \u043f\u043e\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c \u0442\u043e\u0447\u0435\u043a: ",null===V||void 0===V||null===(e=V.result)||void 0===e?void 0:e.path]}),Object(M.jsx)(h.a,{type:"primary",disabled:0===b.localeCompare("Playing"),onClick:function(t){t.preventDefault(),0===b.localeCompare("Playing")?O("Paused"):O("Playing")},children:"\u041d\u0430\u0447\u0430\u0442\u044c"})]}),Object(M.jsx)("div",{className:"main-container_map",style:{height:"100vh",width:"100%"},children:Object(M.jsxs)(I.a,{bootstrapURLKeys:{key:"AIzaSyBl5r9VydIWWN5z_QmiZXxgj4S14hNFhbU"},center:{lat:54.3399097,lng:48.3826817},defaultZoom:15,onClick:function(t){return e=t,ot([].concat(Object(s.a)(ct),[{id:ct.length,lat:e.lat,lng:e.lng}])),void(ct.length>8&&(alert("\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u043e \u043c\u043e\u0436\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0442\u043e\u043b\u044c\u043a\u043e 9 \u0442\u043e\u0447\u0435\u043a"),window.location.reload()));var e},onGoogleApiLoaded:function(t){return function(t,e){K(t),U(e)}(t.map,t.maps)},children:[function(){if(ct&&ct.length<=9)return ct.map((function(t,e){return Object(M.jsx)(y,{index:e,lat:t.lat,lng:t.lng},e)}))}(),(null===V||void 0===V||null===(n=V.result)||void 0===n?void 0:n.path)&&0===b.localeCompare("Paused")?function(t,e){if(ct)for(var n=e?e.length:0,a=0;a<n-1;a++){var i,r,l,s,c=[{lat:null===(i=t[e[a]])||void 0===i?void 0:i.lat,lng:null===(r=t[e[a]])||void 0===r?void 0:r.lng},{lat:null===(l=t[e[a+1]])||void 0===l?void 0:l.lat,lng:null===(s=t[e[a+1]])||void 0===s?void 0:s.lng}];new J.Polyline({path:c,geodesic:!1,strokeColor:"#430284",strokeOpacity:.7,strokeWeight:3}).setMap(E)}}(ct,V.result.path):null,(null===V||void 0===V||null===(i=V.result)||void 0===i?void 0:i.path)&&0===b.localeCompare("Paused")?function(t,e){var n=new J.DirectionsService,a=new J.DirectionsRenderer;a.setOptions({suppressMarkers:!0});for(var i=[],r=t?t.length:0,l=0;l<r-1;l++)i.push({location:e[t[l]],stopover:!0});var s={origin:e[t[0]],destination:e[t[0]],waypoints:i,travelMode:it,avoidHighways:!1,avoidTolls:!1,optimizeWaypoints:!1,provideRouteAlternatives:!0},c=0,o=0;n.route(s,(function(t,e){e===J.DirectionsStatus.OK&&(a.setDirections(t),t.routes[0].legs.map((function(t){c+=parseInt(t.duration.value),o+=parseInt(t.distance.value)}))),X(Math.ceil(c/60)),et(o)})),a.setMap(E)}(null===V||void 0===V||null===(r=V.result)||void 0===r?void 0:r.path,ct):null]})})]})};n(177);var C=function(){return Object(M.jsx)("div",{className:"App",children:Object(M.jsx)(P,{})})},N=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,185)).then((function(e){var n=e.getCLS,a=e.getFID,i=e.getFCP,r=e.getLCP,l=e.getTTFB;n(t),a(t),i(t),r(t),l(t)}))};l.a.render(Object(M.jsx)(i.a.StrictMode,{children:Object(M.jsx)(C,{})}),document.getElementById("root")),N()}},[[178,1,2]]]);
//# sourceMappingURL=main.1060bfeb.chunk.js.map