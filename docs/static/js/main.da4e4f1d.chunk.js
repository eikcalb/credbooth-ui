(this["webpackJsonpcredbooth-billpayment-ui"]=this["webpackJsonpcredbooth-billpayment-ui"]||[]).push([[0],{22:function(e,t,a){},24:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(17),s=a.n(c),o=(a(22),a(2)),i=a(5),u=a.n(i),l=a(6),d=a(4),p=(a(24),a(7)),j=a.n(p),b=a(0),m="https://credbillpayment-j5ncn.ondigitalocean.app/";var h=function(){var e=Object(n.useState)(localStorage.getItem("bearerToken")||""),t=Object(d.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)("category"),s=Object(d.a)(c,2),i=s[0],p=s[1],h=Object(n.useState)(),f=Object(d.a)(h,2),v=f[0],O=f[1],x=Object(n.useState)(),g=Object(d.a)(x,2),y=g[0],w=g[1],N=Object(n.useState)(),k=Object(d.a)(N,2),S=k[0],E=k[1],C=Object(n.useState)(),I=Object(d.a)(C,2),P=I[0],T=I[1],F=Object(n.useState)(""),B=Object(d.a)(F,2),q=B[0],A=B[1],D=Object(n.useState)([]),z=Object(d.a)(D,2),L=z[0],R=z[1],J=Object(n.useState)([]),M=Object(d.a)(J,2),U=M[0],V=M[1],Y=Object(n.useState)(!1),_=Object(d.a)(Y,2),G=_[0],H=_[1],K=Object(n.useState)({customerid:"",amount:""}),Q=Object(d.a)(K,2),W=Q[0],X=Q[1],Z=Object(n.useRef)(),$=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.get("".concat(m,"billpayment/categories/").concat(t),{headers:{Authorization:"Bearer ".concat(a)}});case 3:if(n=e.sent,n.status,2!==(r=n.data).status){e.next=8;break}throw new Error(r.message&&"string"!==typeof r.message?r.message.join(". "):null===r||void 0===r?void 0:r.message);case 8:return e.abrupt("return",r.data);case 11:e.prev=11,e.t0=e.catch(0),alert("\u26a0 "+e.t0.message||!1),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),ee=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.get("".concat(m,"billpayment/providers/").concat(t,"/products"),{headers:{Authorization:"Bearer ".concat(a)}});case 3:if(n=e.sent,n.status,2!==(r=n.data).status){e.next=8;break}throw new Error(r.message&&"string"!==typeof r.message?r.message.join(". "):null===r||void 0===r?void 0:r.message);case 8:return e.abrupt("return",r.data);case 11:e.prev=11,e.t0=e.catch(0),alert("\u26a0 "+e.t0.message||!1),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),te=function(){var e=Object(l.a)(u.a.mark((function e(t){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.a.post("".concat(m,"billpayment/validate"),t,{headers:{Authorization:"Bearer ".concat(a)}});case 3:if(n=e.sent,n.status,2!==(r=n.data).status){e.next=8;break}throw new Error(r.message&&"string"!==typeof r.message?r.message.join(". "):null===r||void 0===r?void 0:r.message);case 8:return e.abrupt("return",r.data);case 11:throw e.prev=11,e.t0=e.catch(0),alert("\u26a0 "+e.t0.message||!1),console.error(e.t0),e.t0;case 16:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),ae=function(){var e=Object(l.a)(u.a.mark((function e(t,n){var r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,P&&n){e.next=3;break}throw new Error("Required info was omitted");case 3:return e.next=5,j.a.post("".concat(m,"billpayment/confirm"),{requestID:t,cardID:n},{headers:{Authorization:"Bearer ".concat(a)}});case 5:if(r=e.sent,r.status,2!==(c=r.data).status){e.next=10;break}throw new Error(c.message&&"string"!==typeof c.message?c.message.join(". "):null===c||void 0===c?void 0:c.message);case 10:if(c.data){e.next=12;break}throw new Error("Failed to process request");case 12:return e.abrupt("return",c.data);case 15:throw e.prev=15,e.t0=e.catch(0),alert("\u26a0 "+e.t0.message||!1),console.error(e.t0),e.t0;case 20:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(t,a){return e.apply(this,arguments)}}(),ne=function(){var e=Object(l.a)(u.a.mark((function e(t,n,r){var c,s,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n&&r){e.next=3;break}throw new Error("Required info was omitted");case 3:e.t0=t,e.next="card"===e.t0?6:"token"===e.t0?8:"wallet"===e.t0?10:12;break;case 6:return c="payment/paywithcard",e.abrupt("break",12);case 8:return c="payment/paywithtoken",e.abrupt("break",12);case 10:return c="payment/paywithwallet",e.abrupt("break",12);case 12:return e.next=14,j.a.post("".concat(m).concat(c),{transactionreference:n,servicename:"BILL_PAYMENT",cardid:r},{headers:{Authorization:"Bearer ".concat(a)}});case 14:if(s=e.sent,2!==(o=s.data).status){e.next=18;break}throw new Error(o.message&&"string"!==typeof o.message?o.message.join(". "):null===o||void 0===o?void 0:o.message);case 18:return alert("\u2705 Purchase successful"),e.abrupt("return",o.data);case 22:throw e.prev=22,e.t1=e.catch(0),alert("\u26a0 "+e.t1.message||!1),console.error(e.t1),e.t1;case 27:case"end":return e.stop()}}),e,null,[[0,22]])})));return function(t,a,n){return e.apply(this,arguments)}}();return Object(b.jsx)("div",{className:"container is-vcentered pt-6",children:Object(b.jsx)("div",{className:"card",children:Object(b.jsx)("div",{className:"card-content",children:Object(b.jsxs)("div",{className:"section",children:[Object(b.jsxs)("div",{className:"field",children:[Object(b.jsx)("label",{className:"label is-uppercase is-size-5",children:"Bearer Token"}),Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("input",{autoFocus:!0,className:"input",type:"password",value:a,placeholder:"Enter Bearer token",onChange:function(e){r(e.target.value),localStorage.setItem("bearerToken",e.target.value),clearTimeout(Z.current),Z.current=setTimeout((function(){return alert("\u2705 Auth Token Updated!")}),800)}})})]}),G?Object(b.jsx)("progress",{className:"progress is-small is-danger",max:"100"}):Object(b.jsxs)(b.Fragment,{children:["category"===i&&Object(b.jsx)("div",{className:"select",children:Object(b.jsxs)("select",{value:v,onChange:function(e){e.target.value&&(H(!0),O(e.target.value),$(e.target.value).then((function(e){R(e),p("product")})).finally((function(){return H(!1)})))},children:[Object(b.jsx)("option",{children:"Select Service"}),Object(b.jsx)("option",{value:"airtime",children:"Airtime"}),Object(b.jsx)("option",{value:"data",children:"Data"}),Object(b.jsx)("option",{value:"tv-subscription",children:"TV Subscription"}),Object(b.jsx)("option",{value:"electricity-bill",children:"Electricity Bill"})]})}),"product"===i&&(null===L||void 0===L?void 0:L.length)>0&&Object(b.jsx)("div",{className:"select",children:Object(b.jsxs)("select",{value:y,onChange:function(e){e.target.value&&(H(!0),w(e.target.value),ee(parseInt(e.target.value)).then((function(e){V(e),p("purchase")})).finally((function(){return H(!1)})))},children:[Object(b.jsx)("option",{children:"Select Provider"}),L.map((function(e){return Object(b.jsx)("option",{value:e.id,children:e.name})}))]})}),"purchase"===i&&(null===U||void 0===U?void 0:U.length)>0&&Object(b.jsxs)(b.Fragment,{children:[!S&&Object(b.jsx)("div",{className:"select",children:Object(b.jsxs)("select",{value:S,onChange:function(e){if(e.target.value){H(!0);var t=parseInt(e.target.value),a=U.find((function(e){return e.id===t}));a?(X(Object(o.a)(Object(o.a)({},W),{},{amount:a.amount})),E(a),H(!1)):H(!1)}},children:[Object(b.jsx)("option",{children:"Select Product"}),U.map((function(e){return Object(b.jsx)("option",{value:e.id,children:e.name},e.id)}))]})}),"airtime"===v&&S&&Object(b.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),e.stopPropagation(),H(!0),!L.find((function(e){return e.id===parseInt(y)})))return alert("\u26a0 Failed to process request"),console.log("Cannot find provider",L,y,L.find((function(e){return e.id===y}))),void H(!1);te(Object(o.a)(Object(o.a)({},W),{},{amount:parseFloat(W.amount),type:v,productID:S.id})).then((function(e){var t=e.id;T(t),p("confirm")})).finally((function(){return H(!1)}))},className:"section",children:[Object(b.jsx)("div",{className:"field",children:Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("input",{required:!0,className:"input",type:"tel",value:W.customerid,onChange:function(e){return X(Object(o.a)(Object(o.a)({},W),{},{customerid:e.target.value}))},placeholder:"Phone number to recharge"})})}),Object(b.jsxs)("div",{className:"field has-addons",children:[Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("a",{className:"button is-static",children:"\u20a6"})}),Object(b.jsx)("p",{className:"control is-expanded",children:Object(b.jsx)("input",{required:!0,className:"input",type:"number",value:W.amount,onChange:function(e){return X(Object(o.a)(Object(o.a)({},W),{},{amount:e.target.value}))},placeholder:"Amount to recharge"})})]}),Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("button",{type:"submit",className:"button is-primary",children:"Submit"})})]}),"airtime"!==v&&S&&Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),e.stopPropagation(),H(!0),te(Object(o.a)(Object(o.a)({},W),{},{amount:parseFloat(W.amount),type:v,productID:S.id})).then((function(e){var t=e.id;e.customerName;T(t),p("confirm")})).finally((function(){return H(!1)}))},className:"section",children:[Object(b.jsx)("div",{className:"field",children:Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("input",{required:!0,className:"input",type:"text",value:W.customerid,onChange:function(e){return X(Object(o.a)(Object(o.a)({},W),{},{customerid:e.target.value}))},placeholder:"Enter customer details"})})}),Object(b.jsxs)("div",{className:"field has-addons",children:[Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("a",{className:"button is-static",children:"\u20a6"})}),Object(b.jsx)("p",{className:"control is-expanded",children:Object(b.jsx)("input",{required:!0,className:"input",type:"number",value:W.amount,readOnly:parseInt((null===S||void 0===S?void 0:S.amount)||"0")>0,onChange:function(e){return X(Object(o.a)(Object(o.a)({},W),{},{amount:e.target.value}))},placeholder:"Amount to pay"})})]}),Object(b.jsx)("p",{className:"control",children:Object(b.jsx)("button",{type:"submit",className:"button is-primary",children:"Submit"})})]})]}),"confirm"===i&&P&&Object(b.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),e.stopPropagation(),!q)throw new Error("Token must be provided");H(!0),ae(P,q).then((function(e){var t=e.reference;return ne("token",t,parseInt(q))})).then((function(){window.confirm("Process another transaction?")&&window.location.reload()})).catch((function(e){return console.error(e)})).finally((function(){return H(!1)}))},className:"section has-text-centered",children:[Object(b.jsxs)("div",{className:"field",children:[Object(b.jsx)("label",{children:"Enter Card Token For Payment"}),Object(b.jsx)("p",{className:"control is-expanded",children:Object(b.jsx)("input",{required:!0,className:"input",type:"number",value:"".concat(q),onChange:function(e){return A(parseInt(e.target.value))},placeholder:"Enter Card Token"})})]}),Object(b.jsx)("p",{className:"control is-expanded",children:Object(b.jsx)("button",{type:"submit",className:"button is-primary",children:"Pay"})})]})]})]})})})})},f=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,45)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),c(e),s(e)}))};s.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(h,{})}),document.getElementById("root")),f()}},[[44,1,2]]]);
//# sourceMappingURL=main.da4e4f1d.chunk.js.map