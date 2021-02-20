(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{100:function(e,t,n){},105:function(e,t,n){"use strict";n.r(t);var o=n(0),s=n(1),i=n(18),r=n.n(i),a=n(47),c=n.n(a),l=n(22),d=n(49),j=n.n(d),h=n(21),b=n(3),p=n(15),u=n(50),m=n.n(u),f=n(108),O=n(106),y=n(107),x=n(29),v=function(e){var t=e.passDataUpstream,n=e.isMobile,i=Object(s.useRef)(null),r=Object(s.useRef)(null),a=Object(s.useState)(!0),c=Object(p.a)(a,2),l=c[0],d=c[1],j=x.makePopup("https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc",{mode:"popup",autoClose:3,onSubmit:function(e){var n=e.response_id;t({responseId:n})},onClose:function(e){var n=e.response_id;t({responseId:n})}});return Object(s.useEffect)((function(){!n&&x.makeWidget(i.current,"https://z8ivgb8lhnl.typeform.com/to/YbkRDwtc",{hideScrollbars:!0,opacity:0,onSubmit:function(e){var n=e.response_id;t({responseId:n}),setTimeout((function(){d(!1)}),3e3)}})}),[i,t,n]),Object(o.jsxs)("div",{children:[Object(o.jsxs)("div",{className:"call-to-action text-center",children:[Object(o.jsxs)("button",{ref:r,onClick:function(e){e.preventDefault(),n?j.open():i.current.scrollIntoView({behavior:"smooth",block:"end"})},className:"btn btn-primary btn-lg main-cta",children:["Fill out the survey to email your MP"," "]}),Object(o.jsxs)("p",{className:"explanation",children:[Object(o.jsx)("strong",{children:"We will draft an email"})," based on your survey responses,"," ",Object(o.jsx)("strong",{children:"written to have the maximum impact on your MP."})," With your help we can safeguard the support so many need."]})]}),Object(o.jsx)("div",{ref:i,className:"typeform-widget ".concat(l?"":"closed"),id:"typeform"})]})},g=n(51),w=n(52),k=(n(98),function(e){var t=e.emailBody,n=e.passDataUpstream;return Object(o.jsx)("div",{children:Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{className:"secondary-header",children:"Edit your email"}),Object(o.jsx)(g.a,{viewContainerClassName:"emailBox",type:"textarea",inputProps:{placeholder:"your email will appear here",rows:10},saveButtonContent:"Apply",cancelButtonContent:Object(o.jsx)("strong",{children:"Cancel"}),editButtonContent:"Edit Your Email",value:t,onSave:function(e){n({emailWithGreeting:e})}}),Object(o.jsx)(w.a,{trigger:function(e){return Object(o.jsx)("button",{className:"btn btn-outline-primary copy-button",children:"Copy"})},closeOnDocumentClick:!0,onOpen:function(){var e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),e.setSelectionRange(0,99999),document.execCommand("copy"),document.body.removeChild(e),n({copied:!0})},className:"copy-popup",children:Object(o.jsx)("span",{children:" Copied to clipboard "})})]})})}),C=n(30),N=n.n(C),P=n(53),E=function(e){var t=e.passDataUpstream,n=Object(s.useState)({dropDownOpen:!1,postcodeError:""}),i=Object(p.a)(n,2),r=i[0],a=i[1],c=r.dropDownOpen,l=r.postcodeError,d=Object(s.useRef)();Object(s.useEffect)((function(){var e=d.current;e&&e.scrollIntoView({behavior:"smooth",block:"end"}),window.scrollBy(0,100)}),[c]);var j=function(){var e=Object(P.a)(N.a.mark((function e(n){var o;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/postcode/".concat(n),{method:"GET",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.error?a(Object(b.a)(Object(b.a)({},r),{},{postcodeError:e.error})):(t({mpData:e}),a(Object(b.a)(Object(b.a)({},r),{},{postcodeError:""})))}));case 2:return o=e.sent,e.abrupt("return",o);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=function(e){e.preventDefault();var t=e.target.value;t&&t.length>5&&(/([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/.test(t.toUpperCase())?j(t):a(Object(b.a)(Object(b.a)({},r),{},{postcodeError:"Invalid postcode"})))};return Object(o.jsxs)("div",{children:[Object(o.jsxs)("div",{className:"button-container",id:"postcodeDropdown",children:[Object(o.jsx)("button",{className:"btn btn-lg cta btn-outline-primary left-button",type:"submit",onClick:function(e){e.preventDefault(),a(Object(b.a)(Object(b.a)({},r),{},{dropDownOpen:!0}))},children:"Don't see your MP?"}),Object(o.jsx)("button",{className:"btn btn-lg cta btn-primary right-button ",type:"submit",onClick:function(e){e.preventDefault(),a(Object(b.a)(Object(b.a)({},r),{},{dropDownOpen:!1})),t({emailVisible:!0})},children:"Yes, continue with this MP"})]}),c&&Object(o.jsxs)("form",{className:"get-MP-form",id:"postcodeDropdown",ref:d,onChange:h,onSubmit:h,children:[Object(o.jsx)("label",{htmlFor:"postcode",children:"Postcode:"}),Object(o.jsx)("input",{type:"text",name:"postcode"}),Object(o.jsx)("div",{className:"error postcode-error",children:l||""})]})]})},D=function(e){var t=e.mpData,n=t.constituency,s=t.full_name,i=t.party,r=t.name,a=t.error,c=t.mpEmailAddress;return Object(o.jsxs)("div",{className:"displayMP",id:"displayMP",children:[Object(o.jsx)("h2",{className:"secondary-header",children:"Find Your MP"}),Object(o.jsxs)("div",{className:"mpCard text-center",children:[Object(o.jsx)("div",{className:"error",children:a}),Object(o.jsx)("div",{children:n}),Object(o.jsx)("div",{children:r}),Object(o.jsx)("div",{children:s}),Object(o.jsx)("div",{children:i}),Object(o.jsx)("div",{className:"mpEmailAddress",children:c})]})]})},I=function(e){var t=e.subject,n=e.body,s=e.mpEmailAddress,i=e.passDataUpstream;return Object(o.jsxs)("div",{className:"send-email",children:[Object(o.jsx)("h2",{className:"secondary-header",children:"Send your email"}),Object(o.jsx)("p",{className:"explanation",children:"This will open your email service in a different window"}),Object(o.jsx)("a",{href:"mailto:"+s+"?Subject="+encodeURIComponent(t)+"&Body="+encodeURIComponent(n),className:"btn btn-primary btn-lg cta send-button",target:"_blank",rel:"noreferrer",onClick:function(){i({emailSent:!0})},children:"SEND EMAIL"})]})},T=function(){return Object(o.jsxs)("div",{className:"intro-content",children:[Object(o.jsx)("h1",{className:"title",children:"The 0.7% Commitment"}),Object(o.jsxs)("p",{className:"intro-para",children:["The 2019 Conservative Manifesto declared Britain would"," ",Object(o.jsx)("strong",{children:'"proudly maintain our commitment to spend 0.7 per cent of GNI on development"'}),". But just one year later, the government intends to cut foreign aid.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{})," At a time of unprecedented international crisis, with millions at risk of extreme poverty,"," ",Object(o.jsx)("strong",{children:"Britain must show leadership - not break its commitments."})]})]})},S=function(){return Object(o.jsx)("div",{id:"Footer",children:Object(o.jsx)(O.a,{children:Object(o.jsxs)(y.a,{xs:12,children:[Object(o.jsx)(l.a,{to:"privacy-policy",children:"Privacy Policy"}),"\xa9 2021 Red Scarf Services Ltd",Object(o.jsx)("br",{}),"Company No. 12407870",Object(o.jsx)("br",{}),"48 Queen Edith's Way, Cambridge, England, CB1 8PW",Object(o.jsx)("br",{})]})})})},_=function(){return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{className:"secondary-header",children:"Thankyou!"}),Object(o.jsx)("p",{className:"explanation",children:"Please share this campaign"}),Object(o.jsxs)("div",{className:"a2a_kit a2a_kit_size_50 a2a_default_style","data-a2a-url":"https://www.point7percent.org/","data-a2a-title":"The 0.7% Commitment",children:[Object(o.jsx)("a",{className:"a2a_dd",href:"https://www.addtoany.com/share"}),Object(o.jsx)("a",{className:"a2a_button_facebook"}),Object(o.jsx)("a",{className:"a2a_button_twitter"}),Object(o.jsx)("a",{className:"a2a_button_email"}),Object(o.jsx)("a",{className:"a2a_button_whatsapp"})]})]})};n(100);n(101).config({path:"../.env"});var W=m()(),R=function(){var e=Object(s.useState)({width:window.innerWidth,responseId:"",mpData:{error:"Could not find MP",name:"",full_name:""},generatedEmailBody:"Your email will appear here",emailSubject:"",positiveTypeFormResponseReturned:!0,greeting:"",emailWithGreeting:"",emailVisible:!1,emailSent:!1}),t=Object(p.a)(e,2),n=t[0],i=t[1],r=n.responseId,a=n.mpData,c=n.generatedEmailBody,l=n.emailSubject,d=n.greeting,j=n.emailWithGreeting,u=n.positiveTypeFormResponseReturned,m=n.width,x=n.emailVisible,g=n.emailSent,w=Object(s.useRef)(null),C=Object(s.useRef)(null);Object(s.useEffect)((function(){W.on("typeform-incoming",(function(e){var t=e.formToken,o=e.generatedEmail;t===r&&i(Object(b.a)(Object(b.a)({},n),{},{generatedEmailBody:o.body,emailSubject:o.subject,mpData:o.mpData,greeting:o.greeting,emailWithGreeting:o.greeting+o.body,positiveTypeFormResponseReturned:o.supportsAid}))}))}),[r]),Object(s.useEffect)((function(){if(a){var e=a.full_name;e&&i(Object(b.a)(Object(b.a)({},n),{},{greeting:"Dear ".concat(e,",\n")}))}}),[a.name,a.full_name]),Object(s.useEffect)((function(){i(Object(b.a)(Object(b.a)({},n),{},{emailWithGreeting:d+c}))}),[c,d]),Object(s.useEffect)((function(){var e=document.createElement("script");e.async=!0,e.src="https://static.addtoany.com/menu/page.js",document.body.appendChild(e)}),[g]);var N=m&&m<=768;Object(s.useEffect)((function(){setTimeout((function(){var e=w.current;e&&N&&u&&e.scrollIntoView({behavior:"smooth",block:"start"})}),3e3)}),[w,u]),Object(s.useEffect)((function(){var e=C.current;e&&e.scrollIntoView({behavior:"smooth",block:"end"})}),[x,C]);var P=function(e){Object.keys(e).forEach((function(t){i(Object(b.a)(Object(b.a)({},n),{},Object(h.a)({},t,e[t])))}))};return Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{className:"main",children:Object(o.jsxs)(f.a,{children:[Object(o.jsx)(O.a,{children:Object(o.jsx)(y.a,{children:Object(o.jsx)(T,{})})}),Object(o.jsx)(O.a,{children:Object(o.jsx)(y.a,{children:Object(o.jsx)("div",{className:"typeform",children:Object(o.jsx)(v,{passDataUpstream:P,isMobile:N})})})}),u&&Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(O.a,{children:Object(o.jsx)(y.a,{children:Object(o.jsx)("div",{ref:w,children:Object(o.jsx)(D,{mpData:a})})})}),Object(o.jsx)(O.a,{children:Object(o.jsx)(y.a,{children:Object(o.jsx)("div",{id:"mpForm",className:"",children:Object(o.jsx)(E,{passDataUpstream:P})})})}),x&&Object(o.jsxs)("div",{children:[Object(o.jsx)(O.a,{children:Object(o.jsx)(y.a,{children:Object(o.jsx)("div",{ref:C,children:Object(o.jsx)(k,{passDataUpstream:P,emailBody:j,subject:l})})})}),Object(o.jsx)(O.a,{children:Object(o.jsx)(y.a,{children:Object(o.jsx)("div",{className:"",children:Object(o.jsx)(I,{mpEmailAddress:a.mpEmailAddress,body:j,subject:l,passDataUpstream:P})})})}),g&&Object(o.jsx)(O.a,{children:Object(o.jsx)(y.a,{children:Object(o.jsx)(_,{})})})]})]})]})}),Object(o.jsx)("div",{className:"footer",children:Object(o.jsx)(f.a,{children:Object(o.jsx)(S,{})})})]})},A=function(){return Object(o.jsx)("div",{className:"privacy-policy",children:Object(o.jsx)(f.a,{children:Object(o.jsx)(O.a,{children:Object(o.jsxs)(y.a,{children:[Object(o.jsx)("h1",{children:"Privacy Policy for The 0.7% Commitment Website"}),Object(o.jsx)("p",{children:"Our Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in https://www.point7percent.org. This policy is not applicable to any information collected offline or via channels other than this website."}),Object(o.jsx)("h2",{children:"General Data Protection Regulation (GDPR)"}),Object(o.jsxs)("p",{children:["We are a Data Controller of your information.",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"We collect and process your personal data in order to fulfil various purposes:",Object(o.jsxs)("ul",{children:[Object(o.jsxs)("li",{children:["Data collected via first and third party tracking scripts and cookies is used to:",Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{children:"Improve our website and survey through aggregated data analysis"}),Object(o.jsx)("li",{children:"Understand the usefulness of advertising the survey and improve advertising targeting."})]})]}),Object(o.jsxs)("li",{children:["Personal details collected during the process of the survey are used to:",Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{children:"Personalise the results of the survey."}),Object(o.jsx)("li",{children:"Contact you to support your engagement with your MP based on your choices in the survey."})]})]}),Object(o.jsx)("li",{children:"Process your personal information according to The 0.7% Commitment campaign\u2019s legitimate interests, where we have ensured that your interests and rights have not been infringed."}),Object(o.jsx)("li",{children:"Process or disclose personal information in order to comply with the law."})]})]}),Object(o.jsx)("p",{children:"The 0.7% Commitment will retain your personal information only for as long as isnecessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies"}),Object(o.jsx)("p",{children:"If you are a resident of the European Economic Area (EEA), you have certain dataprotection rights. If you wish to be informed what Personal Information we hold about you or if you want it to be removed from our systems, please contact us using the email address the0.7percent@gmail.com"}),Object(o.jsx)("h2",{children:"Log Files"}),Object(o.jsx)("p",{children:"https://www.point7percent.org follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analysing trends, administering the site, tracking users' movement on the website, and gathering demographic information."}),Object(o.jsx)("h2",{children:"Cookies"}),Object(o.jsx)("p",{children:"CookiesLike any other website, https://www.point7percent.org uses 'cookies'. These cookies are used to store information about the pages on the website that the visitor accesses or interacts with, and to control basic functions of the website. You can accept or reject the use of cookies on https://www.point7percent.org through the OneTrust cookie consent window, which can be accessed by selecting the icon in the bottom-right of the screen."}),Object(o.jsx)("h2",{children:"Third Party Cookies"}),Object(o.jsx)("p",{children:"When consent is provided by the user, https://www.point7percent.org uses a Facebook tracking script and cookies to advertise our website and track website usage for the purpose of improving the relevance of our advert targeting. We advise you to consult the Facebook Privacy Policy for more detailed information about how Facebook processes this data."}),Object(o.jsx)("p",{children:"When consent is provided by the user, https://www.point7percent.org uses a Google Analytics tracking script and cookies to track website usage for the purpose of improving the site and survey through aggregated data analysis. This data is siloed and we do not share it with Google."}),Object(o.jsx)("h2",{children:"Children's Information"}),Object(o.jsx)("p",{children:"https://www.point7percent.org does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately using the email address the0.7percent@gmail.com and we will promptly remove any such personal data"}),Object(o.jsx)("h2",{children:"Contact Us"}),"For any other questions or comments about this policy please email our Data Protection Officer at the0.7percent@gmail.com. ",Object(o.jsx)("br",{}),Object(o.jsx)("br",{}),"We are regulated by the Information Commissioner\u2019s Office, who you can also contact for advice and support: https://ico.org.uk/make-a-complaint/"]})})})})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,109)).then((function(t){var n=t.getCLS,o=t.getFID,s=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),o(e),s(e),i(e),r(e)}))};n(104);c.a.initialize({gtmId:"GTM-MWBT83W"}),r.a.render(Object(o.jsx)(j.a,{children:Object(o.jsxs)(l.b,{children:[Object(o.jsx)(R,{path:"/"}),Object(o.jsx)(A,{path:"/privacy-policy"})]})}),document.getElementById("root")),B()}},[[105,1,2]]]);
//# sourceMappingURL=main.1d9ee26b.chunk.js.map