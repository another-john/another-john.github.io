var _PegaAuth_instances,_PegaAuth_updateConfig,_PegaAuth_buildAuthorizeUrl,_PegaAuth_sha256Hash,_PegaAuth_encode64,_PegaAuth_base64UrlSafeEncode,_PegaAuth_getCodeChallenge,__classPrivateFieldGet=this&&this.__classPrivateFieldGet||function(e,t,n,i){if("a"===n&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!i:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?i:"a"===n?i.call(e):i?i.value:t.get(e)};class PegaAuth{constructor(e){_PegaAuth_instances.add(this),this.ssKeyConfig=e,this.bEncodeSI=!1,this.reloadConfig()}reloadConfig(){const e=window.sessionStorage.getItem(this.ssKeyConfig);let t={};if(e)try{t=JSON.parse(e)}catch(n){try{t=JSON.parse(window.atob(e))}catch(e){t={}}}this.config=e?t:null}async login(){const e=(()=>{const e=this.config.redirectUri,t=e.indexOf("//"),n=-1!==t?e.indexOf("/",t+2):-1;return-1!==n?e.substring(0,n):e})(),t=window.btoa(location.origin);return new Promise(((n,i)=>{__classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_buildAuthorizeUrl).call(this,t).then((t=>{let o=null,s=null,a=null;const r=void 0!==this.config.silentTimeout?this.config.silentTimeout:5e3;let c=r>0&&(!!this.config.userIdentifier&&!!this.config.password||this.config.iframeLoginUI||"pega"!==this.config.authService),l=null,d=null;const h=()=>{try{c?(s.contentWindow.postMessage({type:"PegaAuth"},e),console.log("authjs(login): loaded a page in iFrame")):o.postMessage({type:"PegaAuth"},e)}catch(e){console.log("authjs(login): Exception trying to postMessage on load")}},g=()=>{if(o=window.open(t,"_blank","width=700,height=500,left=200,top=100"),!o)return i("blocked");d=setInterval((()=>{o.closed&&(clearInterval(d),i("closed"))}),500);try{o.addEventListener("load",h,!0)}catch(e){console.log("authjs(login): Exception trying to add onload handler to opened window;")}},u=()=>{s.parentNode.removeChild(s),a.parentNode.removeChild(a),s=a=null,c=!1},_=()=>{u(),i("closed")};if(c){const e=99999;s=document.createElement("iframe"),s.id="pe"+this.config.clientId;const n=500,i=700,o=s.style;o.position="absolute",o.display="none",o.zIndex=e,o.top=`${Math.round(Math.max(window.innerHeight-i,0)/2)}px`,o.left=`${Math.round(Math.max(window.innerWidth-n,0)/2)}px`,o.width="500px",o.height="700px",document.body.insertBefore(s,document.body.firstChild),document.getElementsByTagName("body")[0].appendChild(s),s.addEventListener("load",h,!0),s.setAttribute("sandbox","allow-scripts allow-forms allow-same-origin"),s.setAttribute("src",t);const c='<?xml version="1.0" encoding="UTF-8"?>\n                  <svg width="34px" height="34px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                    <title>Dismiss - Black</title>\n                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                      <g transform="translate(1.000000, 1.000000)">\n                        <circle fill="#252C32" cx="16" cy="16" r="16"></circle>\n                        <g transform="translate(9.109375, 9.214844)" fill="#FFFFFF" fill-rule="nonzero">\n                          <path d="M12.7265625,0 L0,12.6210938 L1.0546875,13.5703125 L13.78125,1.0546875 L12.7265625,0 Z M13.7460938,12.5507812 L1.01953125,0 L0,1.01953125 L12.7617188,13.6054688 L13.7460938,12.5507812 Z"></path>\n                        </g>\n                      </g>\n                    </g>\n                  </svg>',d=!1;a=document.createElement("img"),a.onclick=_,a.src="data:image/svg+xml;base64,"+window.btoa(c);const p=a.style;p.cursor="pointer",p.position="absolute",p.display="none",p.zIndex=e+1;const f=d?5:-10,w=d?-34:-20;p.top=`${Math.round(Math.max(window.innerHeight-i,0)/2)+f}px`,p.left=`${Math.round(Math.max(window.innerWidth-n,0)/2)+n+w}px`,document.body.insertBefore(a,document.body.firstChild),l=setTimeout((()=>{clearTimeout(l),this.config.password&&(delete this.config.password,__classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_updateConfig).call(this)),this.config.iframeLoginUI?(s.style.display="block",a.style.display="block"):(u(),g())}),r)}else g();let p=null;const f=e=>{window.removeEventListener("message",p,!1),this.getToken(e).then((e=>{c?(clearTimeout(l),u()):(clearInterval(d),o.close()),n(e)})).catch((e=>{i(e)}))};p=t=>{if(t.origin!==e)return;if(!t.data||!t.data.type||"PegaAuth"!==t.data.type)return;console.log("authjs(login): postMessage received with code");const n=t.data.code.toString();f(n)},window.addEventListener("message",p,!1),window.authCodeCallback=e=>{console.log("authjs(login): authCodeCallback used with code"),f(e)}}))}))}loginRedirect(){const e=btoa(location.origin);__classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_buildAuthorizeUrl).call(this,e).then((e=>{location.href=e}))}getToken(e){this.reloadConfig();const{clientId:t,clientSecret:n,redirectUri:i,tokenUri:o,codeVerifier:s}=this.config,a=location.search,r=new URLSearchParams(a),c=e||r.get("code"),l=new URLSearchParams;return l.append("client_id",t),n&&l.append("client_secret",n),l.append("grant_type","authorization_code"),l.append("code",c),l.append("redirect_uri",i),l.append("code_verifier",s),fetch(o,{method:"POST",headers:new Headers({"content-type":"application/x-www-form-urlencoded"}),body:l.toString()}).then((e=>e.json())).then((e=>(e.eA=Date.now()+1e3*e.expires_in,this.config.codeVerifier&&delete this.config.codeVerifier,e.session_index&&(this.config.sessionIndex=e.session_index),this.config.sessionIndex&&(this.config.sessionIndexAttempts=0),__classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_updateConfig).call(this),e))).catch((e=>{console.log(e)}))}async refreshToken(e){const{clientId:t,clientSecret:n,tokenUri:i}=this.config,o=new URLSearchParams;return o.append("client_id",t),n&&o.append("client_secret",n),o.append("grant_type","refresh_token"),o.append("refresh_token",e),fetch(i,{method:"POST",headers:new Headers({"content-type":"application/x-www-form-urlencoded"}),body:o.toString()}).then((e=>e.ok||401!==e.status?e.json():null)).then((e=>(e&&(e.eA=Date.now()+1e3*e.expires_in),e))).catch((e=>{console.log(e)}))}async revokeTokens(e,t=null){if(!this.config||!this.config.revokeUri)return;const{clientId:n,clientSecret:i,revokeUri:o}=this.config,s={"content-type":"application/x-www-form-urlencoded"};if(i){const e=`${n}:${i}`;s.authorization=`Basic ${window.btoa(e)}`}const a=["access_token"];t&&a.push("refresh_token"),a.forEach((a=>{const r=new URLSearchParams;i||r.append("client_id",n),r.append("token","access_token"===a?e:t),r.append("token_type_hint",a),fetch(o,{method:"POST",headers:new Headers(s),body:r.toString()}).then((e=>{e.ok||console.log(`Error revoking ${a}:${e.status}`)})).catch((e=>{console.log(e)}))})),this.config.sessionIndex&&(delete this.config.sessionIndex,__classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_updateConfig).call(this))}async getUserinfo(e){if(!this.config||!this.config.userinfoUri)return{};const t={authorization:`bearer ${e}`,"content-type":"application/json;charset=UTF-8"};return fetch(this.config.userinfoUri,{method:"GET",headers:new Headers(t)}).then((e=>{if(e.ok)return e.json();console.log(`Error invoking userinfo: ${e.status}`)})).then((e=>e)).catch((e=>{console.log(e)}))}}_PegaAuth_instances=new WeakSet,_PegaAuth_updateConfig=function(){const e=JSON.stringify(this.config);window.sessionStorage.setItem(this.ssKeyConfig,this.bEncodeSI?window.btoa(e):e)},_PegaAuth_buildAuthorizeUrl=async function(e){const{clientId:t,redirectUri:n,authorizeUri:i,authService:o,sessionIndex:s,appAlias:a,useLocking:r,userIdentifier:c,password:l}=this.config;let d=new Uint8Array(64);window.crypto.getRandomValues(d),this.config.codeVerifier=__classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_base64UrlSafeEncode).call(this,d),s&&(this.config.sessionIndexAttempts+=1),__classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_updateConfig).call(this),e||(d=new Uint8Array(32),window.crypto.getRandomValues(d),e=__classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_base64UrlSafeEncode).call(this,d));const h=a?`+app.alias.${a.replace(/^app\//,"")}`:"",g=(o?`&authentication_service=${encodeURIComponent(o)}`:"")+(s&&this.config.sessionIndexAttempts<3?`&session_index=${s}`:"")+(r?"&enable_psyncId=true":"")+(c?`&UserIdentifier=${encodeURIComponent(c)}`:"")+(c&&l?`&Password=${encodeURIComponent(window.atob(l))}`:"");return __classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_getCodeChallenge).call(this,this.config.codeVerifier).then((o=>`${i}?client_id=${t}&response_type=code&redirect_uri=${n}&scope=openid+email+profile${h}&state=${e}&code_challenge=${o}&code_challenge_method=S256${g}`))},_PegaAuth_sha256Hash=function(e){return window.crypto.subtle.digest("SHA-256",(new TextEncoder).encode(e))},_PegaAuth_encode64=function(e){return window.btoa(new Uint8Array(e).reduce(((e,t)=>e+String.fromCharCode(t)),""))},_PegaAuth_base64UrlSafeEncode=function(e){return __classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_encode64).call(this,e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")},_PegaAuth_getCodeChallenge=function(e){return __classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_sha256Hash).call(this,e).then((e=>__classPrivateFieldGet(this,_PegaAuth_instances,"m",_PegaAuth_base64UrlSafeEncode).call(this,e))).catch((e=>{console.log(e)})).finally((()=>null))};export default PegaAuth;