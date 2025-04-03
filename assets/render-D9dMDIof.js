var q=Object.defineProperty;var W=(e,t,r)=>t in e?q(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var E=(e,t,r)=>W(e,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=r(a);fetch(a.href,i)}})();const V=()=>{const e=new Set;return{subscribe:s=>e.add(s),notify:()=>e.forEach(s=>s())}},z=(e,t,r)=>{const{subscribe:s,notify:a}=V();let i={...e};const o=d=>{i={...i,...d},a()},c=()=>({...i}),u=Object.fromEntries(Object.entries(t).map(([d,N])=>[d,(...S)=>o(N(c(),...S))])),T=Object.fromEntries(Object.entries(r).map(([d,N])=>[d,(...S)=>N(c(),...S)]));return{getState:c,setState:o,subscribe:s,actions:u,getters:T}},B=(e,t=window.localStorage)=>({get:()=>JSON.parse(t.getItem(e)),set:i=>t.setItem(e,JSON.stringify(i)),reset:()=>t.removeItem(e)}),b=e=>!(e===null||e===void 0||e===!1||e===!0);function n(e,t,...r){return{type:e,props:t,children:r.flat(2).filter(b)}}const f=new Map,L=new WeakMap;function G(e){L.has(e)||L.set(e,new Set);const t=L.get(e);$(t).forEach(s=>{e.addEventListener(s,a=>{const i=f.get(a.target);if(!i)return;const o=i.get(s);o&&o.forEach(c=>c(a))}),t.add(s)})}function j(e,t,r){f.has(e)||f.set(e,new Map);const s=f.get(e);s.has(t)||s.set(t,new Set),s.get(t).add(r)}function H(e,t,r){if(!f.has(e))return;const s=f.get(e);if(!s.has(t))return;const a=s.get(t);a.delete(r),a.size===0&&s.delete(t),s.size===0&&f.delete(e)}const $=e=>{const t=new Set;return f.forEach(r=>{r.forEach((s,a)=>{e.has(a)||t.add(a)})}),t},J=1e3,v=J*60,I=v*60,K=I*24,R=e=>{const t=Date.now()-e;return t<v?"방금 전":t<I?`${Math.floor(t/v)}분 전`:t<K?`${Math.floor(t/I)}시간 전`:new Date(e).toLocaleString()};function y(e){if(!b(e))return"";if(typeof e=="string")return e;if(typeof e=="number")return e.toString();if(typeof e.type=="function")return y(e.type({...e.props,children:e.children}));if(typeof e.type=="string")return{type:e.type,props:e.props,children:e.children.map(y).filter(b)}}function p(e){if(!b(e))return document.createTextNode("");if(typeof e=="string")return document.createTextNode(e);if(typeof e=="number")return document.createTextNode(e.toString());if(Array.isArray(e)){const s=document.createDocumentFragment();return e.forEach(a=>{s.appendChild(p(a))}),s}if(e.type&&typeof e.type=="function")throw new Error("컴포넌트입니다.");const t=y(e),r=document.createElement(t.type);return Y(r,t.props),r.appendChild(p(t.children)),r}function Y(e,t){!t||typeof t!="object"||Object.entries(t).forEach(([r,s])=>{if(r==="className")e.className=s;else if(r==="style")typeof s=="string"?e.style.cssText=s:Object.assign(e.style,s);else if(r.startsWith("on")){const a=r.slice(2).toLowerCase();j(e,a,s)}else["disabled","checked","hidden"].includes(r)?e[r]=s:r.startsWith("data-")?e.dataset[r.replace("data-","")]=s:e.setAttribute(r,s)})}function Q(e,t={},r={}){for(const s in r)if(s.startsWith("on")){const a=s.slice(2).toLowerCase();H(e,a,r[s])}else s in t||(s==="className"?e.className="":e.removeAttribute(s));for(const s in t)if(s.startsWith("on")){const a=s.slice(2).toLowerCase();j(e,a,t[s])}else r[s]!==t[s]&&(s==="className"?e.className=t[s]:s==="style"?typeof t[s]=="string"?e.style.cssText=t[s]:Object.assign(e.style,t[s]):e.setAttribute(s,t[s]))}function C(e,t,r,s=0){if(!t&&r){e.removeChild(e.childNodes[s]);return}if(t&&!r){const a=p(t);e.childNodes[s]?e.insertBefore(a,e.childNodes[s]):e.appendChild(a);return}if(typeof t=="string"&&typeof r=="string"){e.childNodes[s].nodeValue=t;return}if(t.type!==r.type){const a=p(t);e.childNodes[s]?e.replaceChild(a,e.childNodes[s]):e.appendChild(a);return}if(r.type===t.type){const a=e.childNodes[s];if(!a)return;Q(a,t.props,r==null?void 0:r.props);const i=t.children||[],o=(r==null?void 0:r.children)||[],c=Math.max(i.length,o.length);for(let u=0;u<c;u++)C(a,i[u],o[u],u)}}const O=new WeakMap;function X(e,t){const r=y(e),s=O.get(t);if(s)C(t,r,s);else{const a=p(r);t.appendChild(a)}O.set(t,r),G(t)}const Z=({author:e,time:t,content:r,likeUsers:s,toggleLike:a,isLiked:i=!1})=>n("div",{className:"bg-white rounded-lg shadow p-4 mb-4"},n("div",{className:"flex items-center mb-2"},n("div",null,n("div",{className:"font-bold"},e),n("div",{className:"text-gray-500 text-sm"},R(t)))),n("p",null,r),n("div",{className:"mt-2 flex justify-between text-gray-500"},n("span",{className:`like-button cursor-pointer${i?" text-blue-500":""}`,onClick:a},"좋아요 ",s.length),n("span",null,"댓글"),n("span",null,"공유"))),g=B("user"),_=1e3,m=_*60,ee=m*60,l=z({currentUser:g.get(),loggedIn:!!g.get(),posts:[{id:1,author:"홍길동",time:Date.now()-5*m,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",likeUsers:[]},{id:2,author:"김철수",time:Date.now()-15*m,content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",likeUsers:[]},{id:3,author:"이영희",time:Date.now()-30*m,content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",likeUsers:[]},{id:4,author:"박민수",time:Date.now()-30*m,content:"주말에 등산 가실 분 계신가요? 함께 가요!",likeUsers:[]},{id:5,author:"정수연",time:Date.now()-2*ee,content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",likeUsers:[]}],error:null},{logout(e){return g.reset(),{...e,currentUser:null,loggedIn:!1}},toggleLike(e,t){if(!e.loggedIn)return alert("로그인 후 이용해주세요"),e;const r=e.posts.map(s=>{if(s.id===t){const{username:a}=e.currentUser;return s.likeUsers.includes(a)?{...s,likeUsers:s.likeUsers.filter(o=>o!==a)}:{...s,likeUsers:[...s.likeUsers,a]}}return s});return{...e,posts:r}},addPost(e,t){if(!e.loggedIn||!e.currentUser)return alert("로그인 후 이용해주세요"),e;const r={id:Date.now(),author:e.currentUser.username,time:Date.now(),content:t,likeUsers:[]};return{...e,posts:[r,...e.posts]}}},{getIsLiked(e,t){if(!e.loggedIn||!e.currentUser)return!1;const r=e.posts.find(s=>s.id===t);return r?r.likeUsers.includes(e.currentUser.username):!1}}),te=()=>{const{addPost:e}=l.actions;return n("div",{className:"mb-4 bg-white rounded-lg shadow p-4"},n("textarea",{id:"post-content",placeholder:"무슨 생각을 하고 계신가요?",className:"w-full p-2 border rounded"}),n("button",{id:"post-submit",className:"mt-2 bg-blue-600 text-white px-4 py-2 rounded",onClick:()=>{var a;const r=document.getElementById("post-content"),s=(a=r==null?void 0:r.value)==null?void 0:a.trim();s&&(e(s),r&&(r.value=""))}},"게시"))},A=()=>n("header",{className:"bg-blue-600 text-white p-4 sticky top-0"},n("h1",{className:"text-2xl font-bold"},"항해플러스")),P=()=>n("footer",{className:"bg-gray-200 p-4 text-center"},n("p",null,"© $",new Date().getFullYear()," 항해플러스. All rights reserved.")),h={value:null,get(){return this.value},set(e){this.value=e}},U=e=>window.location.pathname===e?"text-blue-600 font-bold":"text-gray-600";function k({onClick:e,children:t,...r}){return n("a",{onClick:a=>{a.preventDefault(),e==null||e(),h.get().push(a.target.href.replace(window.location.origin,""))},...r},t)}const F=()=>{const{loggedIn:e}=l.getState(),{logout:t}=l.actions;return n("nav",{className:"bg-white shadow-md p-2 sticky top-14"},n("ul",{className:"flex justify-around"},n("li",null,n(k,{href:"/",className:U("/")},"홈")),!e&&n("li",null,n(k,{href:"/login",className:U("/login")},"로그인")),e&&n("li",null,n(k,{href:"/profile",className:U("/profile")},"프로필")),e&&n("li",null,n("a",{href:"#",id:"logout",className:"text-gray-600",onClick:r=>{r.preventDefault(),t()}},"로그아웃"))))},ie=()=>{const{posts:e,loggedIn:t}=l.getState(),{toggleLike:r}=l.actions,{getIsLiked:s}=l.getters;return n("div",{className:"bg-gray-100 min-h-screen flex justify-center"},n("div",{className:"max-w-md w-full"},n(A,null),n(F,null),n("main",{className:"p-4"},t&&n(te,null),n("div",{id:"posts-container",className:"space-y-4"},[...e].sort((a,i)=>i.time-a.time).map(a=>n(Z,{key:a.id,...a,toggleLike:()=>r(a.id),isLiked:s(a.id)})))),n(P,null)))};function se(e){const t={username:e,email:"",bio:""};l.setState({currentUser:t,loggedIn:!0}),g.set(t)}const oe=()=>n("div",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},n("div",{className:"bg-white p-8 rounded-lg shadow-md w-full max-w-md"},n("h1",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"항해플러스"),n("form",{id:"login-form",onSubmit:t=>{t.preventDefault();const r=document.getElementById("username").value;se(r)}},n("input",{type:"text",id:"username",placeholder:"사용자 이름",className:"w-full p-2 mb-4 border rounded",required:!0}),n("input",{type:"password",placeholder:"비밀번호",className:"w-full p-2 mb-6 border rounded",required:!0}),n("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded"},"로그인")),n("div",{className:"mt-4 text-center"},n("a",{href:"#",className:"text-blue-600 text-sm"},"비밀번호를 잊으셨나요?")),n("hr",{className:"my-6"}),n("div",{className:"text-center"},n("button",{className:"bg-green-500 text-white px-4 py-2 rounded"},"새 계정 만들기")))),re=()=>n("main",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},n("div",{className:"bg-white p-8 rounded-lg shadow-md w-full text-center",style:"max-width: 480px"},n("h1",{className:"text-2xl font-bold text-blue-600 mb-4"},"항해플러스"),n("p",{className:"text-4xl font-bold text-gray-800 mb-4"},"404"),n("p",{className:"text-xl text-gray-600 mb-8"},"페이지를 찾을 수 없습니다"),n("p",{className:"text-gray-600 mb-8"},"요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."),n("a",{href:"/","data-link":"",className:"bg-blue-600 text-white px-4 py-2 rounded font-bold"},"홈으로 돌아가기")));function ne(e){const t={...l.getState().currentUser,...e};l.setState({currentUser:t}),g.set(t),alert("프로필이 업데이트되었습니다.")}const le=()=>{const{loggedIn:e,currentUser:t}=l.getState(),{username:r="",email:s="",bio:a=""}=t??{};return n("div",{className:"bg-gray-100 min-h-screen flex justify-center"},n("div",{className:"max-w-md w-full"},n(A,null),n(F,{loggedIn:e}),n("main",{className:"p-4"},n("div",{className:"bg-white p-8 rounded-lg shadow-md"},n("h2",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"내 프로필"),n("form",{id:"profile-form",onSubmit:o=>{o.preventDefault();const c=new FormData(o.target),u=Object.fromEntries(c);ne(u)}},n("div",{className:"mb-4"},n("label",{for:"username",className:"block text-gray-700 text-sm font-bold mb-2"},"사용자 이름"),n("input",{type:"text",id:"username",name:"username",className:"w-full p-2 border rounded",value:r,required:!0})),n("div",{className:"mb-4"},n("label",{for:"email",className:"block text-gray-700 text-sm font-bold mb-2"},"이메일"),n("input",{type:"email",id:"email",name:"email",className:"w-full p-2 border rounded",value:s,required:!0})),n("div",{className:"mb-6"},n("label",{for:"bio",className:"block text-gray-700 text-sm font-bold mb-2"},"자기소개"),n("textarea",{id:"bio",name:"bio",rows:"4",className:"w-full p-2 border rounded"},a)),n("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded font-bold"},"프로필 업데이트")))),n(P,null)))},x=class x extends Error{constructor(){super(x.MESSAGE)}};E(x,"MESSAGE","ForbiddenError");let M=x;const w=class w extends Error{constructor(){super(w.MESSAGE)}};E(w,"MESSAGE","UnauthorizedError");let D=w;function ce(){const e=h.get().getTarget()??re,t=document.querySelector("#root");try{X(n(e,null),t)}catch(r){if(r instanceof M){h.get().push("/");return}if(r instanceof D){h.get().push("/login");return}console.error(r)}}export{M as F,ie as H,oe as L,le as P,D as U,ce as a,n as b,V as c,l as g,h as r};
