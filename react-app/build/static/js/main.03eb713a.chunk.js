(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{100:function(e,t,n){},105:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(0),a=n(18),i=n.n(a),s=n(47),o=n.n(s),l=n(22),d=n(49),j=n.n(d),b=n(21),u=n(3),p=n(15),m=n(50),h=n.n(m),O=n(108),f=n(106),x=n(107),v=n(29),y=function(e){var t=e.passDataUpstream,n=e.isMobile,a=Object(r.useRef)(null),i=Object(r.useRef)(null),s=Object(r.useState)(!0),o=Object(p.a)(s,2),l=o[0],d=o[1],j=v.makePopup("https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc",{mode:"popup",autoClose:2,onSubmit:function(e){var n=e.response_id;t({responseId:n})},onClose:function(e){var n=e.response_id;t({responseId:n})}});return Object(r.useEffect)((function(){!n&&v.makeWidget(a.current,"https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc",{hideScrollbars:!0,opacity:0,onSubmit:function(e){var n=e.response_id;t({responseId:n}),setTimeout((function(){d(!1)}),3e3)}})}),[a,t,n]),Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"call-to-action text-center",children:[Object(c.jsxs)("button",{ref:i,onClick:function(e){e.preventDefault(),n?j.open():a.current.scrollIntoView({behavior:"smooth",block:"end"})},className:"btn btn-primary btn-lg main-cta",children:["Fill out the survey to email your MP"," "]}),Object(c.jsxs)("p",{className:"explanation",children:[Object(c.jsx)("strong",{children:"We will draft an email"})," based on your survey responses,"," ",Object(c.jsx)("strong",{children:"written to have the maximum impact on your MP."})," With your help we can safeguard the support so many need."]})]}),Object(c.jsx)("div",{ref:a,className:"typeform-widget ".concat(l?"":"closed"),id:"typeform"})]})},g=n(51),w=n(52),E=(n(98),function(e){var t=e.emailBody,n=e.passDataUpstream;return Object(c.jsx)("div",{children:Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{className:"secondary-header",children:"Edit your email"}),Object(c.jsx)(g.a,{viewContainerClassName:"emailBox",type:"textarea",inputProps:{placeholder:"your email will appear here",rows:10},saveButtonContent:"Apply",cancelButtonContent:Object(c.jsx)("strong",{children:"Cancel"}),editButtonContent:"Edit Your Email",value:t,onSave:function(e){n({generatedEmail:e})}}),Object(c.jsx)(w.a,{trigger:function(e){return Object(c.jsx)("button",{className:"btn btn-outline-primary copy-button",children:"Copy"})},closeOnDocumentClick:!0,onOpen:function(){var e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),document.body.removeChild(e),n({copied:!0})},className:"copy-popup",children:Object(c.jsx)("span",{children:" Copied to clipboard "})})]})})}),N=n(30),D=n.n(N),C=n(53),k=function(e){var t=e.passDataUpstream,n=Object(r.useState)({dropDownOpen:!1,postcodeError:""}),a=Object(p.a)(n,2),i=a[0],s=a[1],o=i.dropDownOpen,l=i.postcodeError,d=Object(r.useRef)();Object(r.useEffect)((function(){var e=d.current;e&&e.scrollIntoView({behavior:"smooth",block:"end"}),window.scrollBy(0,100)}),[o]);var j=function(){var e=Object(C.a)(D.a.mark((function e(n){var c;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/postcode/".concat(n),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.error?s(Object(u.a)(Object(u.a)({},i),{},{postcodeError:e.error})):(t({mpData:e}),s(Object(u.a)(Object(u.a)({},i),{},{postcodeError:""})))}));case 2:return c=e.sent,e.abrupt("return",c);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(e){e.preventDefault();var t=e.target.value;t&&t.length>5&&(/([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/.test(t.toUpperCase())?j(t):s(Object(u.a)(Object(u.a)({},i),{},{postcodeError:"Invalid postcode"})))};return Object(c.jsxs)("div",{children:[Object(c.jsxs)("div",{className:"button-container",id:"postcodeDropdown",children:[Object(c.jsx)("button",{className:"btn btn-lg cta btn-outline-primary left-button",type:"submit",onClick:function(e){e.preventDefault(),s(Object(u.a)(Object(u.a)({},i),{},{dropDownOpen:!0}))},children:"Don't see your MP?"}),Object(c.jsx)("button",{className:"btn btn-lg cta btn-primary right-button ",type:"submit",onClick:function(e){e.preventDefault(),s(Object(u.a)(Object(u.a)({},i),{},{dropDownOpen:!1})),t({emailVisible:!0})},children:"Yes, continue with this MP"})]}),o&&Object(c.jsxs)("form",{className:"get-MP-form",id:"postcodeDropdown",ref:d,onChange:b,onSubmit:b,children:[Object(c.jsx)("label",{htmlFor:"postcode",children:"Postcode:"}),Object(c.jsx)("input",{type:"text",name:"postcode"}),Object(c.jsx)("div",{className:"error postcode-error",children:l||""})]})]})},I=function(e){var t=e.mpData,n=t.constituency,r=t.full_name,a=t.party,i=t.name,s=t.error,o=t.mpEmailAddress;return Object(c.jsxs)("div",{className:"displayMP",id:"displayMP",children:[Object(c.jsx)("h2",{className:"secondary-header",children:"Find Your MP"}),Object(c.jsxs)("div",{className:"mpCard text-center",children:[Object(c.jsx)("div",{className:"error",children:s}),Object(c.jsx)("div",{children:n}),Object(c.jsx)("div",{children:i}),Object(c.jsx)("div",{children:r}),Object(c.jsx)("div",{children:a}),Object(c.jsx)("div",{className:"mpEmailAddress",children:o})]})]})},B=function(e){var t=e.subject,n=e.body,r=e.mpEmailAddress;return Object(c.jsxs)("div",{className:"send-email",children:[Object(c.jsx)("h2",{className:"secondary-header",children:"Send your email"}),Object(c.jsx)("p",{className:"explanation",children:"This will open your email service in a different window"}),Object(c.jsx)("a",{href:"mailto:"+r+"?Subject="+encodeURIComponent(t)+"&Body="+encodeURIComponent(n),className:"btn btn-primary btn-lg cta send-button",target:"_blank",rel:"noreferrer",children:"SEND EMAIL"})]})},R=function(){return Object(c.jsxs)("div",{className:"intro-content",children:[Object(c.jsx)("h1",{className:"title",children:"The 0.7% Campaign"}),Object(c.jsxs)("p",{className:"intro-para",children:["The 2019 Conservative Manifesto declared Britain would"," ",Object(c.jsx)("strong",{children:'"proudly maintain our commitment to spend 0.7 per cent of GNI on development"'}),". But just one year later, the government intends to cut foreign aid indefinitely.",Object(c.jsx)("br",{}),Object(c.jsx)("br",{})," At a time of unprecedented international crisis, with millions at risk of extreme poverty,"," ",Object(c.jsx)("strong",{children:"Britain must show leadership - not break its commitments."})]})]})};n(100);n(101).config({path:"../.env"});var S=h()(),M=function(){var e=Object(r.useState)({width:window.innerWidth,responseId:"",mpData:{error:"Could not find MP",name:"",full_name:""},generatedEmailBody:"Your email will appear here",emailSubject:"",positiveTypeFormResponseReturned:!1,greeting:"",emailWithGreeting:"",emailVisible:!1}),t=Object(p.a)(e,2),n=t[0],a=t[1],i=n.responseId,s=n.mpData,o=n.generatedEmailBody,l=n.emailSubject,d=n.greeting,j=n.emailWithGreeting,m=n.positiveTypeFormResponseReturned,h=n.width,v=n.emailVisible,g=Object(r.useRef)(null),w=Object(r.useRef)(null);Object(r.useEffect)((function(){S.on("typeform-incoming",(function(e){var t=e.formToken,c=e.generatedEmail;t===i&&a(Object(u.a)(Object(u.a)({},n),{},{generatedEmailBody:c.body,emailSubject:c.subject,mpData:c.mpData,greeting:c.greeting,emailWithGreeting:c.greeting+c.body,positiveTypeFormResponseReturned:c.supportsAid}))}))}),[i]),Object(r.useEffect)((function(){if(s){var e=s.full_name;e&&a(Object(u.a)(Object(u.a)({},n),{},{greeting:"Dear ".concat(e,",\n")}))}}),[s.name,s.full_name]),Object(r.useEffect)((function(){a(Object(u.a)(Object(u.a)({},n),{},{emailWithGreeting:d+o}))}),[o,d]);var N=h&&h<=768;Object(r.useEffect)((function(){setTimeout((function(){var e=g.current;e&&N&&m&&e.scrollIntoView({behavior:"smooth",block:"start"})}),2e3)}),[g,m]),Object(r.useEffect)((function(){var e=w.current;e&&e.scrollIntoView({behavior:"smooth",block:"end"})}),[v,w]);var D=function(e){Object.keys(e).forEach((function(t){a(Object(u.a)(Object(u.a)({},n),{},Object(b.a)({},t,e[t])))}))};return Object(c.jsx)("div",{children:Object(c.jsx)("div",{className:"main",children:Object(c.jsxs)(O.a,{children:[Object(c.jsx)(f.a,{children:Object(c.jsx)(x.a,{children:Object(c.jsx)(R,{})})}),Object(c.jsx)(f.a,{children:Object(c.jsx)(x.a,{children:Object(c.jsx)("div",{className:"typeform",children:Object(c.jsx)(y,{passDataUpstream:D,isMobile:N})})})}),m&&Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(f.a,{children:Object(c.jsx)(x.a,{children:Object(c.jsx)("div",{ref:g,children:Object(c.jsx)(I,{mpData:s})})})}),Object(c.jsx)(f.a,{children:Object(c.jsx)(x.a,{children:Object(c.jsx)("div",{id:"mpForm",className:"",children:Object(c.jsx)(k,{passDataUpstream:D})})})}),Object(c.jsxs)("div",{children:[Object(c.jsx)(f.a,{children:Object(c.jsx)(x.a,{children:Object(c.jsx)("div",{ref:w,children:Object(c.jsx)(E,{passDataUpstream:D,emailBody:j,subject:l})})})}),Object(c.jsx)(f.a,{children:Object(c.jsx)(x.a,{children:Object(c.jsx)("div",{className:"",children:Object(c.jsx)(B,{mpEmailAddress:s.mpEmailAddress,body:j,subject:l})})})})]})]})]})})})},T=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,109)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};n(104);o.a.initialize({gtmId:"GTM-MWBT83W"}),i.a.render(Object(c.jsx)(j.a,{children:Object(c.jsx)(l.b,{children:Object(c.jsx)(M,{path:"/"})})}),document.getElementById("root")),T()}},[[105,1,2]]]);
//# sourceMappingURL=main.03eb713a.chunk.js.map