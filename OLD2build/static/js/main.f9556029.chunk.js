(this.webpackJsonpproject=this.webpackJsonpproject||[]).push([[0],{26:function(t,e,n){},46:function(t,e,n){"use strict";n.r(e);var c=n(1),o=n.n(c),r=n(21),i=n.n(r),a=(n(26),n(4)),u=n.n(a),l=n(2),s=n(0);var j=n(5),f=(n(11),n(6)),d="http://localhost:3001/api/notes",b={getAll:function(){return u.a.get(d).then((function(t){return t.data}))},create:function(t){return u.a.post(d,t).then((function(t){return t.data}))},update:function(t,e){return u.a.put("".concat(d,"/").concat(t),e).then((function(t){return t.data}))}},p=function(t){var e=t.message;return null===e?null:Object(s.jsx)("div",{className:"error",children:e})},O=function(){return Object(s.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[" ",Object(s.jsx)("br",{})," ",Object(s.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})," "]})},h=function(){var t=Object(c.useState)([]),e=Object(l.a)(t,2),n=e[0],o=e[1],r=Object(c.useState)({}),i=Object(l.a)(r,2),a=i[0],u=i[1],d=Object(c.useState)(!0),h=Object(l.a)(d,2),m=h[0],g=h[1],x=Object(c.useState)(null),v=Object(l.a)(x,2),S=v[0],y=v[1];Object(c.useEffect)((function(){var t=!1;return b.getAll().then((function(e){t||o(e)})).catch((function(t){console.log("kek:",t.message)})),function(){t=!0}}),[]);var k=m?n:n.filter((function(t){return t.important}));return Object(s.jsxs)("div",{children:[Object(s.jsx)(p,{message:S}),Object(s.jsx)("button",{type:"button",onClick:function(){g((function(t){return!t}))},children:m?"displaying all":"displaying important"}),Object(s.jsx)("ul",{children:k.map((function(t){return Object(s.jsxs)("li",{children:[Object(s.jsx)("button",{onClick:function(){return function(t){var e=n.find((function(e){return e.id===t})),c=Object(f.a)(Object(f.a)({},e),{},{important:!e.important});b.update(t,c).then((function(e){console.log("resdata",e),o(n.map((function(n){return n.id===t?e:n})))})).catch((function(c){y("the note ".concat(e.content," was already deleted")),setTimeout((function(){y(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)},children:t.important?"V":Object(s.jsx)(s.Fragment,{children:"\xa0"})})," ",t.content," "]},t.id)}))}),Object(s.jsx)("form",{onSubmit:function(t){t.preventDefault(),b.create(a).then((function(t){console.log(t),console.log("submitted OK"),u({content:""}),o([].concat(Object(j.a)(n),[t]))}))},name:"form",children:Object(s.jsx)("input",{type:"text",onChange:function(t){u({id:n.length+1,content:t.target.value,important:Math.random()<.5,date:(new Date).toISOString()}),console.log(t.target.value)},value:a.content,required:!0})}),Object(s.jsx)(O,{})]})};i.a.render(Object(s.jsx)(o.a.StrictMode,{children:Object(s.jsx)(h,{})}),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.f9556029.chunk.js.map