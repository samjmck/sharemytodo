const tt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const g of l.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&s(g)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerpolicy&&(l.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?l.credentials="include":i.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}};tt();function S(){}function Re(e){return e()}function Ee(){return Object.create(null)}function W(e){e.forEach(Re)}function qe(e){return typeof e=="function"}function P(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function nt(e){return Object.keys(e).length===0}function it(e,...t){if(e==null)return S;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function q(e,t,n){e.$$.on_destroy.push(it(t,n))}function J(e,t,n){return e.set(n),t}function v(e,t){e.appendChild(t)}function E(e,t,n){e.insertBefore(t,n||null)}function z(e){e.parentNode.removeChild(e)}function st(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function L(e){return document.createElement(e)}function x(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function We(e){return document.createTextNode(e)}function I(){return We(" ")}function B(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function o(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function lt(e){return Array.from(e.childNodes)}function ot(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function ye(e,t){e.value=t==null?"":t}function N(e,t,n){e.classList[n?"add":"remove"](t)}let Ie;function ae(e){Ie=e}const re=[],Y=[],pe=[],ke=[],rt=Promise.resolve();let be=!1;function ct(){be||(be=!0,rt.then(Ke))}function je(e){pe.push(e)}function Le(e){ke.push(e)}const _e=new Set;let me=0;function Ke(){const e=Ie;do{for(;me<re.length;){const t=re[me];me++,ae(t),at(t.$$)}for(ae(null),re.length=0,me=0;Y.length;)Y.pop()();for(let t=0;t<pe.length;t+=1){const n=pe[t];_e.has(n)||(_e.add(n),n())}pe.length=0}while(re.length);for(;ke.length;)ke.pop()();be=!1,_e.clear(),ae(e)}function at(e){if(e.fragment!==null){e.update(),W(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(je)}}const we=new Set;let X;function dt(){X={r:0,c:[],p:X}}function ut(){X.r||W(X.c),X=X.p}function U(e,t){e&&e.i&&(we.delete(e),e.i(t))}function D(e,t,n,s){if(e&&e.o){if(we.has(e))return;we.add(e),X.c.push(()=>{we.delete(e),s&&(n&&e.d(1),s())}),e.o(t)}}function ft(e,t){e.d(1),t.delete(e.key)}function ht(e,t,n,s,i,l,g,a,u,r,h,m){let f=e.length,c=l.length,d=f;const w={};for(;d--;)w[e[d].key]=d;const k=[],p=new Map,j=new Map;for(d=c;d--;){const C=m(i,l,d),O=n(C);let T=g.get(O);T?s&&T.p(C,t):(T=r(O,C),T.c()),p.set(O,k[d]=T),O in w&&j.set(O,Math.abs(d-w[O]))}const A=new Set,y=new Set;function le(C){U(C,1),C.m(a,h),g.set(C.key,C),h=C.first,c--}for(;f&&c;){const C=k[c-1],O=e[f-1],T=C.key,Z=O.key;C===O?(h=C.first,f--,c--):p.has(Z)?!g.has(T)||A.has(T)?le(C):y.has(Z)?f--:j.get(T)>j.get(Z)?(y.add(T),le(C)):(A.add(Z),f--):(u(O,g),f--)}for(;f--;){const C=e[f];p.has(C.key)||u(C,g)}for(;c;)le(k[c-1]);return k}function Se(e,t,n){const s=e.$$.props[t];s!==void 0&&(e.$$.bound[s]=n,n(e.$$.ctx[s]))}function V(e){e&&e.c()}function F(e,t,n,s){const{fragment:i,on_mount:l,on_destroy:g,after_update:a}=e.$$;i&&i.m(t,n),s||je(()=>{const u=l.map(Re).filter(qe);g?g.push(...u):W(u),e.$$.on_mount=[]}),a.forEach(je)}function R(e,t){const n=e.$$;n.fragment!==null&&(W(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function gt(e,t){e.$$.dirty[0]===-1&&(re.push(e),ct(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function K(e,t,n,s,i,l,g,a=[-1]){const u=Ie;ae(e);const r=e.$$={fragment:null,ctx:null,props:l,update:S,not_equal:i,bound:Ee(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(u?u.$$.context:[])),callbacks:Ee(),dirty:a,skip_bound:!1,root:t.target||u.$$.root};g&&g(r.root);let h=!1;if(r.ctx=n?n(e,t.props||{},(m,f,...c)=>{const d=c.length?c[0]:f;return r.ctx&&i(r.ctx[m],r.ctx[m]=d)&&(!r.skip_bound&&r.bound[m]&&r.bound[m](d),h&&gt(e,m)),f}):[],r.update(),h=!0,W(r.before_update),r.fragment=s?s(r.ctx):!1,t.target){if(t.hydrate){const m=lt(t.target);r.fragment&&r.fragment.l(m),m.forEach(z)}else r.fragment&&r.fragment.c();t.intro&&U(e.$$.fragment),F(e,t.target,t.anchor,t.customElement),Ke()}ae(u)}class H{$destroy(){R(this,1),this.$destroy=S}$on(t,n){const s=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return s.push(n),()=>{const i=s.indexOf(n);i!==-1&&s.splice(i,1)}}$set(t){this.$$set&&!nt(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const $=[];function ge(e,t=S){let n;const s=new Set;function i(a){if(P(e,a)&&(e=a,n)){const u=!$.length;for(const r of s)r[1](),$.push(r,e);if(u){for(let r=0;r<$.length;r+=2)$[r][0]($[r+1]);$.length=0}}}function l(a){i(a(e))}function g(a,u=S){const r=[a,u];return s.add(r),s.size===1&&(n=t(i)||S),a(e),()=>{s.delete(r),s.size===0&&(n(),n=null)}}return{set:i,update:l,subscribe:g}}const mt=ge(!1),te=ge(!1),ee=ge(!1),M=ge({uuid:"",list:{title:"",items:[{content:"",checked:!1}]}});function pt(){const{subscribe:e,set:t,update:n}=ge({});return{subscribe:e,set:t,update:n,setList:(s,i)=>{n(l=>(l[s]=i,l))},deleteList:s=>{n(i=>(delete i[s],i))}}}const G=pt();function wt(e){let t,n,s,i,l,g,a,u,r;return{c(){t=L("div"),n=L("input"),s=I(),i=x("svg"),l=x("path"),g=x("polyline"),a=x("line"),n.disabled=e[2],o(n,"spellcheck","false"),o(n,"type","text"),o(n,"placeholder",e[1]),o(n,"class","svelte-1w70rwt"),o(l,"d","M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"),o(g,"points","16 6 12 2 8 6"),o(a,"x1","12"),o(a,"y1","2"),o(a,"x2","12"),o(a,"y2","15"),o(i,"xmlns","http://www.w3.org/2000/svg"),o(i,"width","24"),o(i,"height","24"),o(i,"viewBox","0 0 24 24"),o(i,"fill","none"),o(i,"stroke","currentColor"),o(i,"stroke-width","2"),o(i,"stroke-linecap","round"),o(i,"stroke-linejoin","round"),o(i,"class","svelte-1w70rwt"),o(t,"class","selected-title-container svelte-1w70rwt")},m(h,m){E(h,t,m),v(t,n),e[11](n),ye(n,e[0]),v(t,s),v(t,i),v(i,l),v(i,g),v(i,a),u||(r=[B(n,"input",e[12]),B(n,"keydown",e[5]),B(i,"click",e[13])],u=!0)},p(h,[m]){m&4&&(n.disabled=h[2]),m&2&&o(n,"placeholder",h[1]),m&1&&n.value!==h[0]&&ye(n,h[0])},i:S,o:S,d(h){h&&z(t),e[11](null),u=!1,W(r)}}}function vt(e,t,n){let s;q(e,te,p=>n(4,s=p));let{value:i}=t,{placeholder:l}=t,{disabled:g}=t,{focused:a}=t,{onChange:u}=t,{onEnter:r}=t,{goForward:h}=t,m;function f(p){p.key==="Enter"&&!p.shiftKey?(r(),p.preventDefault()):p.key==="ArrowRight"&&m.selectionStart===m.value.length&&(h(),p.preventDefault())}let c=i;function d(p){Y[p?"unshift":"push"](()=>{m=p,n(3,m)})}function w(){i=this.value,n(0,i)}const k=()=>J(te,s=!0,s);return e.$$set=p=>{"value"in p&&n(0,i=p.value),"placeholder"in p&&n(1,l=p.placeholder),"disabled"in p&&n(2,g=p.disabled),"focused"in p&&n(6,a=p.focused),"onChange"in p&&n(7,u=p.onChange),"onEnter"in p&&n(8,r=p.onEnter),"goForward"in p&&n(9,h=p.goForward)},e.$$.update=()=>{e.$$.dirty&1153&&i!==c&&(u(),n(10,c=i)),e.$$.dirty&72&&m!==void 0&&(a?(m.focus(),m.setSelectionRange(m.value.length,m.value.length)):m.blur())},[i,l,g,m,s,f,a,u,r,h,c,d,w,k]}class yt extends H{constructor(t){super(),K(this,t,vt,wt,P,{value:0,placeholder:1,disabled:2,focused:6,onChange:7,onEnter:8,goForward:9})}}function _t(e){let t,n,s,i,l,g,a;return{c(){t=L("div"),n=L("input"),s=I(),i=L("label"),l=L("textarea"),o(n,"type","checkbox"),n.disabled=e[2],o(n,"class","svelte-fy3ip8"),l.disabled=e[2],o(l,"spellcheck","false"),o(l,"oninput","this.parentNode.dataset.value = this.value"),o(l,"placeholder",e[3]),o(l,"rows","1"),o(l,"class","svelte-fy3ip8"),o(i,"class","input-sizer stacked svelte-fy3ip8"),o(t,"class","svelte-fy3ip8")},m(u,r){E(u,t,r),v(t,n),n.checked=e[1],v(t,s),v(t,i),v(i,l),e[15](l),ye(l,e[0]),g||(a=[B(n,"change",e[14]),B(n,"input",function(){qe(e[4])&&e[4].apply(this,arguments)}),B(l,"input",e[16]),B(l,"keydown",e[6])],g=!0)},p(u,[r]){e=u,r&4&&(n.disabled=e[2]),r&2&&(n.checked=e[1]),r&4&&(l.disabled=e[2]),r&8&&o(l,"placeholder",e[3]),r&1&&ye(l,e[0])},i:S,o:S,d(u){u&&z(t),e[15](null),g=!1,W(a)}}}function kt(e,t,n){let{checked:s}=t,{content:i}=t,{disabled:l}=t,{focused:g}=t,{focusedCaretAtStart:a}=t,{placeholder:u}=t,{onChange:r}=t,{onEnter:h}=t,{onBackspace:m}=t,{goBack:f}=t,{goForward:c}=t,d;function w(y){y.key==="Enter"&&!y.shiftKey?(h(),r(),y.preventDefault()):y.key==="Backspace"&&d.value===""?(m(),r(),y.preventDefault()):y.key==="ArrowLeft"&&d.selectionStart==0?(f(),y.preventDefault()):y.key==="ArrowRight"&&d.selectionStart===d.value.length&&(c(),y.preventDefault())}let k=i;function p(){s=this.checked,n(1,s)}function j(y){Y[y?"unshift":"push"](()=>{d=y,n(5,d)})}function A(){i=this.value,n(0,i)}return e.$$set=y=>{"checked"in y&&n(1,s=y.checked),"content"in y&&n(0,i=y.content),"disabled"in y&&n(2,l=y.disabled),"focused"in y&&n(7,g=y.focused),"focusedCaretAtStart"in y&&n(8,a=y.focusedCaretAtStart),"placeholder"in y&&n(3,u=y.placeholder),"onChange"in y&&n(4,r=y.onChange),"onEnter"in y&&n(9,h=y.onEnter),"onBackspace"in y&&n(10,m=y.onBackspace),"goBack"in y&&n(11,f=y.goBack),"goForward"in y&&n(12,c=y.goForward)},e.$$.update=()=>{e.$$.dirty&8209&&i!==k&&(r(),n(13,k=i)),e.$$.dirty&416&&d!==void 0&&(g?(d.focus(),a?d.setSelectionRange(0,0):d.setSelectionRange(d.value.length,d.value.length)):d.blur())},[i,s,l,u,r,d,w,g,a,h,m,f,c,k,p,j,A]}class bt extends H{constructor(t){super(),K(this,t,kt,_t,P,{checked:1,content:0,disabled:2,focused:7,focusedCaretAtStart:8,placeholder:3,onChange:4,onEnter:9,onBackspace:10,goBack:11,goForward:12})}}let He,Ve,ze;function jt(){return He}function de(e){He=e}function ne(){return Ve}function ue(e){Ve=e}function he(){return ze}function fe(e){ze=e}function Ge(e,t){ze[e]=t}const se=`${window.location.origin}/api`;async function Lt(e){const t=new URLSearchParams;return t.set("uuid",e.uuid),t.set("writable",e.writable?"true":"false"),t.set("mac",e.mac),(await fetch(`${se}/lists?${t.toString()}`)).json()}async function St(e,t){return(await fetch(`${se}/lists?uuid=${t.uuid}`,{headers:{Authorization:`Bearer ${e}`}})).json()}async function ce(e,t){const n={"Content-Type":"application/json"};return t!==void 0&&(n.Authorization=`Bearer ${t}`),(await fetch(`${se}/lists`,{method:"POST",body:JSON.stringify(e),headers:n})).json()}async function Ae(e,t){await fetch(`${se}/lists`,{method:"PUT",body:JSON.stringify(t),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})}async function Ct(e,t){return(await(await fetch(`${se}/lists`,{method:"DELETE",body:JSON.stringify(t),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})).json()).jwt}async function Be(e,t,n){const i=await(await fetch(`${se}/share-list`,{method:"POST",body:JSON.stringify({uuid:t.uuid,writable:n}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}})).text(),l=new URLSearchParams;return l.set("w",n?"1":"0"),l.set("u",t.uuid),l.set("m",encodeURIComponent(i)),`/lists/${l.toString()}`}function Ue(){return window.localStorage.getItem("jwt")!==null}function xt(){return window.localStorage.getItem("currentListUuid")}function ve(e){window.localStorage.setItem("currentListUuid",e)}function Oe(){return window.localStorage.getItem("jwt")}function Ce(e){window.localStorage.setItem("jwt",e)}function Te(){return JSON.parse(window.localStorage.getItem("lists"))}function ie(e){window.localStorage.setItem("lists",JSON.stringify(e))}function xe(e){return e.uuid!==void 0&&e.writable!==void 0&&e.mac!==void 0}function Je(e,t,n){const s=e.slice();return s[29]=t[n],s[30]=t,s[31]=n,s}function Ne(e){let t,n,s,i;function l(){return e[18](e[29])}function g(){return e[19](e[29])}function a(){return e[20](e[29])}function u(){return e[21](e[29])}function r(f){e[22](f,e[29])}function h(f){e[23](f,e[29])}let m={disabled:!e[1],focused:e[4]===e[29],focusedCaretAtStart:e[3],onChange:e[17],onEnter:l,onBackspace:g,goBack:a,goForward:u,placeholder:e[0].items.length===1?"To-do...":""};return e[29].content!==void 0&&(m.content=e[29].content),e[29].checked!==void 0&&(m.checked=e[29].checked),t=new bt({props:m}),Y.push(()=>Se(t,"content",r)),Y.push(()=>Se(t,"checked",h)),{c(){V(t.$$.fragment)},m(f,c){F(t,f,c),i=!0},p(f,c){e=f;const d={};c[0]&2&&(d.disabled=!e[1]),c[0]&17&&(d.focused=e[4]===e[29]),c[0]&8&&(d.focusedCaretAtStart=e[3]),c[0]&1&&(d.onEnter=l),c[0]&1&&(d.onBackspace=g),c[0]&1&&(d.goBack=a),c[0]&1&&(d.goForward=u),c[0]&1&&(d.placeholder=e[0].items.length===1?"To-do...":""),!n&&c[0]&1&&(n=!0,d.content=e[29].content,Le(()=>n=!1)),!s&&c[0]&1&&(s=!0,d.checked=e[29].checked,Le(()=>s=!1)),t.$set(d)},i(f){i||(U(t.$$.fragment,f),i=!0)},o(f){D(t.$$.fragment,f),i=!1},d(f){R(t,f)}}}function It(e){let t,n,s,i,l,g;function a(f){e[16](f)}let u={disabled:!e[1],focused:e[2],onChange:e[13],onEnter:e[14],goForward:e[15],placeholder:"Write a title for your list..."};e[0].title!==void 0&&(u.value=e[0].title),n=new yt({props:u}),Y.push(()=>Se(n,"value",a));let r=e[0].items,h=[];for(let f=0;f<r.length;f+=1)h[f]=Ne(Je(e,r,f));const m=f=>D(h[f],1,1,()=>{h[f]=null});return{c(){t=L("main"),V(n.$$.fragment),i=I(),l=L("div");for(let f=0;f<h.length;f+=1)h[f].c();o(l,"class","items"),o(t,"class","svelte-n79fwo")},m(f,c){E(f,t,c),F(n,t,null),v(t,i),v(t,l);for(let d=0;d<h.length;d+=1)h[d].m(l,null);g=!0},p(f,c){const d={};if(c[0]&2&&(d.disabled=!f[1]),c[0]&4&&(d.focused=f[2]),!s&&c[0]&1&&(s=!0,d.value=f[0].title,Le(()=>s=!1)),n.$set(d),c[0]&1019){r=f[0].items;let w;for(w=0;w<r.length;w+=1){const k=Je(f,r,w);h[w]?(h[w].p(k,c),U(h[w],1)):(h[w]=Ne(k),h[w].c(),U(h[w],1),h[w].m(l,null))}for(dt(),w=r.length;w<h.length;w+=1)m(w);ut()}},i(f){if(!g){U(n.$$.fragment,f);for(let c=0;c<r.length;c+=1)U(h[c]);g=!0}},o(f){D(n.$$.fragment,f),h=h.filter(Boolean);for(let c=0;c<h.length;c+=1)D(h[c]);g=!1},d(f){f&&z(t),R(n),st(h,f)}}}function zt(e,t,n){let s;q(e,M,_=>n(12,s=_));let i=s.list,l=!0,g=-1;async function a(){xe(s)?s.writable&&(clearTimeout(g),g=setTimeout(()=>{Ae(ne(),s),ie(he())},300)):(G.setList(s.uuid,i),Ge(s.uuid,i),clearTimeout(g),g=setTimeout(()=>{Ae(ne(),s),ie(he())},300))}let u=new Map,r=i.items[0];function h(){const _=[r];let b=u.get(r);for(;b.nextLinkedItem!==void 0;)_.push(b.nextLinkedItem.item),b=b.nextLinkedItem;return _}let m=!1,f=!1,c=null;function d(_){const b={content:"",checked:!1},Q=u.get(_),oe={item:b,previousLinkedItem:Q,nextLinkedItem:Q.nextLinkedItem};Q.nextLinkedItem=oe,u.set(b,oe),n(0,i.items=h(),i)}function w(_){const b=u.get(_);b.previousLinkedItem!==void 0&&(b.previousLinkedItem.nextLinkedItem=b.nextLinkedItem),b.nextLinkedItem!==void 0&&(b.nextLinkedItem.previousLinkedItem=b.previousLinkedItem),u.delete(_),r===_&&b.nextLinkedItem.item,n(0,i.items=h(),i)}function k(_){const b=u.get(_);b.previousLinkedItem!==void 0?(n(3,f=!1),n(4,c=b.previousLinkedItem.item)):(n(4,c=null),n(2,m=!0))}function p(_){const b=u.get(_);b.nextLinkedItem!==void 0&&(n(3,f=!0),n(4,c=b.nextLinkedItem.item))}function j(_){d(_),p(_)}function A(_){i.items.length!==1&&(k(_),w(_))}function y(){n(2,m=!1),n(3,f=!0),n(4,c=r)}const le=()=>a(),C=()=>y(),O=()=>y();function T(_){e.$$.not_equal(i.title,_)&&(i.title=_,n(0,i),n(12,s))}const Z=()=>a(),Qe=_=>j(_),Xe=_=>A(_),Ye=_=>k(_),Ze=_=>p(_);function $e(_,b){e.$$.not_equal(b.content,_)&&(b.content=_,n(0,i),n(12,s))}function et(_,b){e.$$.not_equal(b.checked,_)&&(b.checked=_,n(0,i),n(12,s))}return e.$$.update=()=>{if(e.$$.dirty[0]&4096&&(xe(s)?n(1,l=s.writable):n(1,l=!0),n(0,i=s.list)),e.$$.dirty[0]&2049){n(11,u=new Map),r=i.items[0];for(let _=0;_<i.items.length;_++){const b=i.items[_],Q=u.get(i.items[_-1]),oe={item:b,previousLinkedItem:Q,nextLinkedItem:void 0};u.set(b,oe),Q!==void 0&&(Q.nextLinkedItem=oe)}}},[i,l,m,f,c,a,k,p,j,A,y,u,s,le,C,O,T,Z,Qe,Xe,Ye,Ze,$e,et]}class Et extends H{constructor(t){super(),K(this,t,zt,It,P,{},null,[-1,-1])}}function De(e){let t,n,s;return{c(){t=L("button"),t.textContent="Copy link to non-editable version",o(t,"class","copy-link svelte-1jh9dtj")},m(i,l){E(i,t,l),n||(s=B(t,"click",e[4]),n=!0)},p:S,d(i){i&&z(t),n=!1,s()}}}function Me(e){let t,n,s;return{c(){t=L("button"),t.textContent="Copy link to editable version",o(t,"class","copy-link svelte-1jh9dtj")},m(i,l){E(i,t,l),n||(s=B(t,"click",e[5]),n=!0)},p:S,d(i){i&&z(t),n=!1,s()}}}function At(e){let t,n,s,i,l,g,a,u,r,h,m,f,c=e[0]!==""&&De(e),d=e[1]!==""&&Me(e);return{c(){t=L("div"),n=L("div"),s=L("div"),i=L("span"),i.textContent="Share list",l=I(),g=L("button"),g.textContent="Close",a=I(),c&&c.c(),u=I(),d&&d.c(),r=I(),h=L("p"),h.textContent="Link copied!",o(i,"class","svelte-1jh9dtj"),o(g,"class","close svelte-1jh9dtj"),o(s,"class","dialog-header svelte-1jh9dtj"),o(h,"class","message svelte-1jh9dtj"),N(h,"hidden",e[2]),o(n,"class","dialog svelte-1jh9dtj"),o(t,"class","dialog-container svelte-1jh9dtj"),N(t,"open",e[3])},m(w,k){E(w,t,k),v(t,n),v(n,s),v(s,i),v(s,l),v(s,g),v(n,a),c&&c.m(n,null),v(n,u),d&&d.m(n,null),v(n,r),v(n,h),m||(f=B(g,"click",e[6]),m=!0)},p(w,[k]){w[0]!==""?c?c.p(w,k):(c=De(w),c.c(),c.m(n,u)):c&&(c.d(1),c=null),w[1]!==""?d?d.p(w,k):(d=Me(w),d.c(),d.m(n,r)):d&&(d.d(1),d=null),k&4&&N(h,"hidden",w[2]),k&8&&N(t,"open",w[3])},i:S,o:S,d(w){w&&z(t),c&&c.d(),d&&d.d(),m=!1,f()}}}function Bt(e,t,n){let s,i;q(e,te,f=>n(3,s=f)),q(e,M,f=>n(7,i=f));let l="",g="",a=!0;function u(){n(2,a=!1),setTimeout(()=>{n(2,a=!0)},5e3)}function r(){navigator.clipboard.writeText(l),u()}function h(){navigator.clipboard.writeText(g),u()}function m(){J(te,s=!1,s)}return e.$$.update=()=>{e.$$.dirty&128&&(xe(i)?i.writable?n(1,g=window.location.href):n(0,l=window.location.href):i.uuid&&(Be(ne(),i,!1).then(f=>n(0,l=`${window.location.origin}${f}`)),Be(ne(),i,!0).then(f=>n(1,g=`${window.location.origin}${f}`))))},[l,g,a,s,r,h,m,i]}class Ut extends H{constructor(t){super(),K(this,t,Bt,At,P,{})}}function Ot(e){let t,n,s,i;return t=new Ut({}),s=new Et({}),{c(){V(t.$$.fragment),n=I(),V(s.$$.fragment)},m(l,g){F(t,l,g),E(l,n,g),F(s,l,g),i=!0},p:S,i(l){i||(U(t.$$.fragment,l),U(s.$$.fragment,l),i=!0)},o(l){D(t.$$.fragment,l),D(s.$$.fragment,l),i=!1},d(l){R(t,l),l&&z(n),R(s,l)}}}class Tt extends H{constructor(t){super(),K(this,t,null,Ot,P,{})}}function Pe(e,t,n){const s=e.slice();return s[10]=t[n][0],s[11]=t[n][1],s[13]=n,s}function Fe(e,t){let n,s,i=t[11].title+"",l,g,a,u,r,h,m,f;function c(...d){return t[7](t[10],t[11],...d)}return{key:e,first:null,c(){n=L("li"),s=L("span"),l=We(i),g=I(),a=x("svg"),u=x("line"),r=x("line"),h=I(),o(s,"class","title select-list svelte-d1lcaj"),o(u,"x1","18"),o(u,"y1","6"),o(u,"x2","6"),o(u,"y2","18"),o(r,"x1","6"),o(r,"y1","6"),o(r,"x2","18"),o(r,"y2","18"),o(a,"class","delete-item svelte-d1lcaj"),o(a,"xmlns","http://www.w3.org/2000/svg"),o(a,"width","24"),o(a,"height","24"),o(a,"viewBox","0 0 24 24"),o(a,"fill","none"),o(a,"stroke","currentColor"),o(a,"stroke-width","1.5"),o(a,"stroke-linecap","round"),o(a,"stroke-linejoin","round"),o(n,"class","select-list svelte-d1lcaj"),N(n,"selected",t[11]===t[1].list&&(t[11].title!==""||t[13]!==0)),this.first=n},m(d,w){E(d,n,w),v(n,s),v(s,l),v(n,g),v(n,a),v(a,u),v(a,r),v(n,h),m||(f=B(n,"click",c),m=!0)},p(d,w){t=d,w&1&&i!==(i=t[11].title+"")&&ot(l,i),w&3&&N(n,"selected",t[11]===t[1].list&&(t[11].title!==""||t[13]!==0))},d(d){d&&z(n),m=!1,f()}}}function Jt(e){let t,n,s,i,l,g,a,u,r,h,m=[],f=new Map,c,d,w=e[0];const k=p=>p[10];for(let p=0;p<w.length;p+=1){let j=Pe(e,w,p),A=k(j);f.set(A,m[p]=Fe(A,j))}return{c(){t=L("div"),n=I(),s=L("div"),i=x("svg"),l=x("line"),g=x("line"),a=I(),u=L("ul"),r=L("li"),r.innerHTML='<svg class="add-list-symbol svelte-d1lcaj" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Create new list',h=I();for(let p=0;p<m.length;p+=1)m[p].c();o(t,"class","background-overlay svelte-d1lcaj"),N(t,"open",e[2]),o(l,"x1","18"),o(l,"y1","6"),o(l,"x2","6"),o(l,"y2","18"),o(g,"x1","6"),o(g,"y1","6"),o(g,"x2","18"),o(g,"y2","18"),o(i,"class","toggle-side-menu svelte-d1lcaj"),o(i,"xmlns","http://www.w3.org/2000/svg"),o(i,"width","44"),o(i,"height","44"),o(i,"viewBox","0 0 24 24"),o(i,"fill","none"),o(i,"stroke","currentColor"),o(i,"stroke-width","2"),o(i,"stroke-linecap","round"),o(i,"stroke-linejoin","round"),o(r,"class","add-list svelte-d1lcaj"),o(u,"class","svelte-d1lcaj"),o(s,"class","lists svelte-d1lcaj"),N(s,"open",e[2])},m(p,j){E(p,t,j),E(p,n,j),E(p,s,j),v(s,i),v(i,l),v(i,g),v(s,a),v(s,u),v(u,r),v(u,h);for(let A=0;A<m.length;A+=1)m[A].m(u,null);c||(d=[B(i,"click",e[6]),B(r,"click",e[3])],c=!0)},p(p,[j]){j&4&&N(t,"open",p[2]),j&19&&(w=p[0],m=ht(m,j,k,1,p,w,f,u,ft,Fe,null,Pe)),j&4&&N(s,"open",p[2])},i:S,o:S,d(p){p&&z(t),p&&z(n),p&&z(s);for(let j=0;j<m.length;j+=1)m[j].d();c=!1,W(d)}}}function Nt(e,t,n){let s,i,l;q(e,M,c=>n(1,s=c)),q(e,ee,c=>n(2,i=c)),q(e,G,c=>n(5,l=c));let g;function a(c,d){J(M,s={uuid:c,list:d},s),de(c),ve(c),J(ee,i=!i,i)}async function u(){const c={title:"",items:[{content:"",checked:!1}]},{uuid:d,jwt:w}=await ce(c,ne());G.setList(d,c);const k=he();k[d]=c,fe(k),ie(k),ue(w),Ce(w),J(M,s={uuid:d,list:c},s),de(d),ve(d),J(ee,i=!i,i)}async function r(c,d){if(confirm(`Confirm you would like to delete "${d}"`)){const w=await Ct(ne(),{uuid:c});G.deleteList(c);const k=he();delete k[c],fe(k),ie(k),ue(w),Ce(w);const p=Object.keys(k);p.length===0?await u():jt()===c&&(J(M,s={uuid:p[0],list:k[p[0]]},s),de(p[0]),ve(p[0]))}}function h(c,d,w){c.target.classList.contains("delete-item")?r(d,w.title):a(d,w)}const m=()=>J(ee,i=!i,i),f=(c,d,w)=>h(w,c,d);return e.$$.update=()=>{e.$$.dirty&32&&n(0,g=Object.entries(l))},[g,s,i,u,h,l,m,f]}class Dt extends H{constructor(t){super(),K(this,t,Nt,Jt,P,{})}}function Mt(e){let t,n,s,i,l,g,a,u,r,h,m,f;return{c(){t=L("div"),n=x("svg"),s=x("path"),i=x("polyline"),l=x("line"),g=I(),a=x("svg"),u=x("line"),r=x("line"),h=x("line"),o(s,"d","M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"),o(i,"points","16 6 12 2 8 6"),o(l,"x1","12"),o(l,"y1","2"),o(l,"x2","12"),o(l,"y2","15"),o(n,"xmlns","http://www.w3.org/2000/svg"),o(n,"width","40"),o(n,"height","40"),o(n,"viewBox","0 0 24 24"),o(n,"fill","none"),o(n,"stroke","currentColor"),o(n,"stroke-width","2"),o(n,"stroke-linecap","round"),o(n,"stroke-linejoin","round"),o(n,"class","feather feather-share svelte-5czy6d"),o(u,"x1","3"),o(u,"y1","12"),o(u,"x2","21"),o(u,"y2","12"),o(r,"x1","3"),o(r,"y1","6"),o(r,"x2","21"),o(r,"y2","6"),o(h,"x1","3"),o(h,"y1","18"),o(h,"x2","21"),o(h,"y2","18"),o(a,"xmlns","http://www.w3.org/2000/svg"),o(a,"width","44"),o(a,"height","44"),o(a,"viewBox","0 0 24 24"),o(a,"fill","none"),o(a,"stroke","currentColor"),o(a,"stroke-width","1.5"),o(a,"stroke-linecap","round"),o(a,"stroke-linejoin","round"),o(a,"class","feather feather-menu svelte-5czy6d"),o(t,"class","svelte-5czy6d")},m(c,d){E(c,t,d),v(t,n),v(n,s),v(n,i),v(n,l),v(t,g),v(t,a),v(a,u),v(a,r),v(a,h),m||(f=[B(n,"click",e[2]),B(a,"click",e[3])],m=!0)},p:S,i:S,o:S,d(c){c&&z(t),m=!1,W(f)}}}function Pt(e,t,n){let s,i;return q(e,te,a=>n(0,s=a)),q(e,ee,a=>n(1,i=a)),[s,i,()=>J(te,s=!s,s),()=>J(ee,i=!i,i)]}class Ft extends H{constructor(t){super(),K(this,t,Pt,Mt,P,{})}}function Rt(e){let t;return{c(){t=L("a"),t.textContent="samjmck.com",o(t,"href","https://samjmck.com"),o(t,"target","_blank"),o(t,"class","svelte-1bxjzzr")},m(n,s){E(n,t,s)},p:S,i:S,o:S,d(n){n&&z(t)}}}class qt extends H{constructor(t){super(),K(this,t,null,Rt,P,{})}}function Wt(e){let t,n,s,i,l,g,a,u;return t=new Dt({}),s=new Tt({}),l=new Ft({}),a=new qt({}),{c(){V(t.$$.fragment),n=I(),V(s.$$.fragment),i=I(),V(l.$$.fragment),g=I(),V(a.$$.fragment)},m(r,h){F(t,r,h),E(r,n,h),F(s,r,h),E(r,i,h),F(l,r,h),E(r,g,h),F(a,r,h),u=!0},p:S,i(r){u||(U(t.$$.fragment,r),U(s.$$.fragment,r),U(l.$$.fragment,r),U(a.$$.fragment,r),u=!0)},o(r){D(t.$$.fragment,r),D(s.$$.fragment,r),D(l.$$.fragment,r),D(a.$$.fragment,r),u=!1},d(r){R(t,r),r&&z(n),R(s,r),r&&z(i),R(l,r),r&&z(g),R(a,r)}}}class Kt extends H{constructor(t){super(),K(this,t,null,Wt,P,{})}}async function Ht(){const e=window.location.href.split("/");if(e[e.length-2]=="lists"){const t=new URLSearchParams(e[e.length-1]),n={uuid:t.get("u"),writable:t.get("w")==="1",mac:decodeURIComponent(t.get("m"))},s=await Lt(n);if(M.set({list:s,...n}),Ue()){const i=Oe(),l=Te();ue(i),fe(l),G.set(l)}}else{if(Ue()){const t=Oe(),n=Te(),s=xt();ue(t),fe(n),de(s),G.set(n),M.set({list:n[s],uuid:s});const i=await St(t,{uuid:s});JSON.stringify(i)!==JSON.stringify(n[s])&&(G.setList(s,i),M.set({list:i,uuid:s}),Ge(s,i),ie(he()))}else{const t={title:"test",items:[{content:"",checked:!1}]};let{uuid:n,jwt:s}=await ce(t),{uuid:i,jwt:l}=await ce(t,s),{uuid:g,jwt:a}=await ce(t,l),{uuid:u,jwt:r}=await ce(t,a);const h={[u]:t,[n]:JSON.parse(JSON.stringify(t)),[i]:JSON.parse(JSON.stringify(t)),[g]:JSON.parse(JSON.stringify(t))};ue(r),de(u),fe(h),Ce(r),ve(u),ie(h),G.set(h),M.set({uuid:u,list:t})}mt.set(!0)}}Ht();new Kt({target:document.getElementById("app")});
