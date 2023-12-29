(()=>{"use strict";var e={d:(t,s)=>{for(var n in s)e.o(s,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:s[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(){const e=document.getElementsByClassName("battleship-app")[0],t=document.createElement("div");t.className="game-setup";const s=document.createElement("button");s.className="rotate",s.dataset.axis="x-axis",s.textContent="Rotate";const n=document.createElement("div");n.className="rotate-info",n.dataset.axis="x-axis",n.textContent="Click button to rotate ship";let a=function(){const e=document.createElement("div");e.className="gameboard";const t=document.createElement("div");t.id="grid",t.className="grid-container";for(let e=1;e<=100;e++){const s=document.createElement("div");s.className="cell",s.dataset.index=e,t.append(s)}let s=function(){const e=document.createElement("div");e.className="ships";const t=document.createElement("card");t.className="card active",t.dataset.shiplength="2",t.dataset.shiptype="millfalc";const s=document.createElement("img");s.src="./images/ships/millfalc.png";const n=document.createElement("div");n.textContent="Millenium Falcon (2)",t.append(s,n);const a=document.createElement("card");a.className="card",a.dataset.shiplength="3",a.dataset.shiptype="tiefighter";const i=document.createElement("img");i.src="./images/ships/tiefighter.png";const l=document.createElement("div");l.textContent="Tie Fighter (3)",a.append(i,l);const c=document.createElement("card");c.className="card",c.dataset.shiplength="3",c.dataset.shiptype="landspeeder";const o=document.createElement("img");o.src="./images/ships/landspeeder.png";const m=document.createElement("div");m.textContent="X-34 (3)",c.append(o,m);const r=document.createElement("card");r.className="card",r.dataset.shiplength="2",r.dataset.shiptype="xwing";const d=document.createElement("img");d.src="./images/ships/x-wing.png";const g=document.createElement("div");g.textContent="X-Wing (2)",r.append(d,g);const p=document.createElement("card");p.className="card",p.dataset.shiplength="2",p.dataset.shiptype="ywing";const u=document.createElement("img");u.src="./images/ships/y-wing.png";const f=document.createElement("div");return f.textContent="Y-Wing (2)",p.append(u,f),e.append(t,a,c,r,p),e}();const n=document.createElement("button");n.id="reset",n.className="reset",n.textContent="Reset";const a=document.createElement("button");return a.id="submit",a.className="submit",a.textContent="Submit",e.append(t,s,n,a),e}();t.append(s,n,a),e.append(t)}e.d({},{Bh:()=>b,hL:()=>t,kX:()=>q,Wi:()=>E,iK:()=>A,lb:()=>w});const s=(()=>{let e=[],t=0;for(let t=0;t<100;t++)e.push("");return{getBoard:()=>e,getField:t=>e[t],setField:(t,s)=>{""==e[t]&&(e[t]=s)},getScore:()=>t,updateScore:()=>{t++},hit:e=>{i[e].hit++},isSunk:e=>i[e].hit==i[e].length,reset:()=>{for(let t=0;t<100;t++)e[t]="";t=0,i.ships=[],["mf","tf","ls","xw","yw"].forEach((e=>{i[e].hit=0}))}}})(),n=(()=>{let e=[],t=0;for(let t=0;t<100;t++)e.push("");return{getBoard:()=>e,getField:t=>e[t],setField:(t,s)=>{""==e[t]&&(e[t]=s)},getScore:()=>t,updateScore:()=>{t++},reset:()=>{for(let t=0;t<100;t++)e[t]="";t=0,a.ships=[]}}})();let a={mf:{className:"",top:"",left:""},tf:{className:"",top:"",left:""},ls:{className:"",top:"",left:""},xw:{className:"",top:"",left:""},yw:{className:"",top:"",left:""},ships:[],playerGrid:"",boardPieces:0},i={mf:{className:"",top:"",left:"",spots:[],length:2,hit:0,isSunk:!1},tf:{className:"",top:"",left:"",spots:[],length:3,hit:0,isSunk:!1},ls:{className:"",top:"",left:"",spots:[],length:3,hit:0,isSunk:!1},xw:{className:"",top:"",left:"",spots:[],length:2,hit:0,isSunk:!1},yw:{className:"",top:"",left:"",spots:[],length:2,hit:0,isSunk:!1},ships:[]};function l(){s.reset(),n.reset(),document.getElementsByClassName("battleship-app")[0].textContent="",function(){const e=document.getElementsByClassName("battleship-app")[0],s=document.createElement("div");s.className="pregame-section";const n=document.createElement("h1");n.className="title",n.textContent="Battleship";const a=document.createElement("div");a.className="name-form";const i=document.createElement("input");i.type="text",i.className="name-input",i.id="name-input",i.placeholder="Player name",i.maxLength="15",i.name="name-input";const l=document.createElement("span");l.className="input-border";const c=document.createElement("button");c.className="enter-game",c.textContent="Enter Game",function(e){e.addEventListener("click",(()=>{console.log("enters"),document.getElementsByClassName("battleship-app")[0].textContent="",t(),w(),b(),E(),q(),A()}))}(c),a.append(i,l),s.append(n,a,c),e.append(s)}()}function c(){document.getElementById("restart").addEventListener("click",o,!1)}function o(){l()}function m(){let e=s.getScore(),t=n.getScore();return 12==e||12==t}function r(){if(m())return s.getScore()>n.getScore()?"empire":"rebels"}function d(e){let t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("width","14"),t.setAttribute("height","14");let s=document.createElementNS("http://www.w3.org/2000/svg","circle");return s.setAttribute("cx","7"),s.setAttribute("cy","7"),s.setAttribute("r","7"),s.setAttribute("fill",e),t.append(s),t}async function g(e){if(e.target.classList.contains("cell")&&!e.target.classList.contains("disabled")&&!e.target.disabled){p(),document.getElementById("enemy-grid").style.cursor="wait",document.body.style.cursor="wait",e.target.classList.add("disabled");let t=Number(e.target.dataset.index),a=s.getField(t-1);if(a){let t=d("#e61e1e");e.target.append(t),s.hit(a),function(e){if(s.isSunk(e)){let t=document.getElementById("enemy-grid"),s=i[e].className;t.querySelector("."+s).style.display="block"}}(a),s.updateScore()}else{let t=d("#19a6db");e.target.append(t)}if(m())return y(r()),f(),void c();try{await(500,new Promise((e=>setTimeout(e,500)))),await new Promise((e=>{let t=function(){let e=Math.floor(100*Math.random())+1,t=document.getElementById("grid"),s=t.querySelector("[data-index='"+e+"']");for(;s.classList.contains("hit");)e=Math.floor(100*Math.random())+1,s=t.querySelector("[data-index='"+e+"']");return s.classList.add("hit"),{cell:s,hit:e}}();!function(e,t){if(n.getField(t)){let t=d("#e61e1e");n.updateScore(),e.append(t),m()&&(p(),y(r()),f(),c())}else{let t=d("#19a6db");e.append(t)}}(t.cell,t.hit),setTimeout((()=>{e()}),100)})),m()||u(),f()}catch(e){console.error("Error while waiting for the other player:",e),u(),f()}}}function p(){for(var e=document.getElementById("enemy-grid").getElementsByTagName("*"),t=0;t<e.length;t++)e[t].disabled=!0}function u(){for(var e=document.getElementById("enemy-grid").getElementsByTagName("*"),t=0;t<e.length;t++)e[t].disabled=!1}function f(){document.getElementById("enemy-grid").style.cursor="pointer",document.body.style.cursor="auto"}function y(e){const t=document.getElementsByClassName("battleship-app")[0];let s=document.createElement("div");s.id="modal",s.className="modal-popup";let n=document.createElement("div");n.className="modal-container";let a=document.createElement("h3");a.className="winner";let i=document.createElement("div");i.className="logo";let l=document.createElement("img");"empire"==e?(a.textContent="You win this round",l.src="./images/logo/empire.png",l.className="empire-logo"):(a.textContent="You lose this round",l.src="./images/logo/rebel.png",l.className="rebel-logo"),i.append(l);let c=document.createElement("button");c.className="restart",c.textContent="Restart",c.id="restart",n.append(a,i,c),s.append(n),t.append(s)}function h(e,t,s){let n=10*(Math.ceil(e/10)-1),a=(e-1)%10*10,l=document.getElementById("enemy-grid"),c="enemy";"x-axis"==s?"mf"==t?(M("img-enemy-mf",l,"./images/ships/millfalc.png",n,a,c),i.mf.className="img-enemy-mf",i.mf.top=n+"%",i.mf.left=a+"%"):"tf"==t?(M("img-enemy-tf",l,"./images/ships/tiefighter.png",n,a,c),i.tf.className="img-enemy-tf",i.tf.top=n+"%",i.tf.left=a+"%"):"ls"==t?(M("img-enemy-ls",l,"./images/ships/landspeeder.png",n,a,c),i.ls.className="img-enemy-ls",i.ls.top=n+"%",i.ls.left=a+"%"):"xw"==t?(M("img-enemy-xw",l,"./images/ships/x-wing.png",n,a,c),i.xw.className="img-enemy-xw",i.xw.top=n+"%",i.xw.left=a+"%"):"yw"==t&&(M("img-enemy-yw",l,"./images/ships/y-wing.png",n,a,c),i.yw.className="img-enemy-yw",i.yw.top=n+"%",i.yw.left=a+"%"):"y-axis"==s&&("mf"==t?(M("img-enemy-mf-y",l,"./images/ships/millfalc-y.png",n,a,c),i.mf.className="img-enemy-mf-y",i.mf.top=n+"%",i.mf.left=a+"%"):"tf"==t?(M("img-enemy-tf-y",l,"./images/ships/tiefighter-y.png",n,a,c),i.tf.className="img-enemy-tf-y",i.tf.top=n+"%",i.tf.left=a+"%"):"ls"==t?(M("img-enemy-ls-y",l,"./images/ships/landspeeder-y.png",n,a,c),i.ls.className="img-enemy-ls-y",i.ls.top=n+"%",i.ls.left=a+"%"):"xw"==t?(M("img-enemy-xw-y",l,"./images/ships/x-wing-y.png",n,a,c),i.xw.className="img-enemy-xw-y",i.xw.top=n+"%",i.xw.left=a+"%"):"yw"==t&&(M("img-enemy-yw-y",l,"./images/ships/y-wing-y.png",n,a,c),i.yw.className="img-enemy-yw-y",i.yw.top=n+"%",i.yw.left=a+"%"))}function x(){let e=document.querySelector(".ships > .card.active");return e?Number(e.dataset.shiplength):0}function w(){document.querySelectorAll(".ships > *").forEach((e=>{e.addEventListener("click",(t=>{document.querySelector(".ships> .active").classList.remove("active"),e.classList.add("active")}))}))}function b(){document.getElementById("grid").addEventListener("mousemove",v,!1),document.getElementById("grid").addEventListener("mouseout",S,!1),document.getElementById("grid").addEventListener("click",C,!1)}function E(){document.querySelector(".rotate").addEventListener("click",(e=>{let t=e.target.dataset.axis;t="x-axis"==t?"y-axis":"x-axis",e.target.dataset.axis=t,N()}))}function N(){let e=document.querySelector(".rotate");if(e)return e.dataset.axis}function v(e){let t=N(),s=x();if(e.target.classList.contains("cell")&&!e.target.classList.contains("disabled"))if(document.body.style.cursor="grab","x-axis"==t){let t=Number(e.target.dataset.index),n=t-1+s;B(t,s)?document.querySelectorAll(".grid-container div:nth-child(n+"+t+"):nth-child(-n+"+n+")").forEach((e=>{e.setAttribute("style","background-color:#e3ddcd")})):(e.target.setAttribute("style","background-color:#D22B2B"),document.body.style.cursor="not-allowed")}else{let t=Number(e.target.dataset.index),n=t+10*(s-1);if(n<=100)for(;t<=n;)document.querySelector(".grid-container div:nth-child(n+"+t+")").setAttribute("style","background-color:#e3ddcd"),t+=10;else e.target.setAttribute("style","background-color:#D22B2B;"),document.body.style.cursor="not-allowed";P()}P()}function S(e){document.body.style.cursor="auto";let t=x(),s=N();if(e.target.classList.contains("cell"))if("x-axis"==s){let s=function(e,t){let s=Number(e.target.dataset.index),n=e.target.dataset.index-1+t;return document.querySelectorAll(".grid-container div:nth-child(n+"+s+"):nth-child(-n+"+n+")")}(e,t);s.forEach((e=>{e.setAttribute("style","background-color:rgba(255, 255, 255, 0.2);")})),P()}else{let s=Number(e.target.dataset.index),n=s+10*(t-1);for(;s<=n;){let e=document.querySelector(".grid-container div:nth-child(n+"+s+")");e&&e.setAttribute("style","background-color:rgba(255, 255, 255, 0.2);"),P(),s+=10}}}function L(e,t,s,n){if("x-axis"==n){for(let n=e;n<=t;n++)if(s.includes(n))return!1}else for(let n=e;n<=t;n+=10)if(s.includes(n))return!1;return!0}function B(e,t){let s;return s=e%10>0?10-e%10:0,s>=t-1}function C(e){let t=x(),s=N(),i=document.querySelector(".ships > .card.active").dataset.shiptype;if(e.target.classList.contains("cell")&&!e.target.classList.contains("disabled"))if("x-axis"==s){let l=Number(e.target.dataset.index),c=l-1+t;if(L(l,c,a.ships,s)&&B(l,t)){for(;l<=c;){a.ships.push(l);let e=document.querySelector(".grid-container div:nth-child(n+"+l+")");e.setAttribute("style","background-color:rgba(255, 255, 255, 0.2);"),e.classList.add("disabled"),n.setField(l,i),l++}k(Number(e.target.dataset.index),i,s)}}else{let l=Number(e.target.dataset.index),c=l+10*(t-1);if(L(l,c,a.ships,s)&&c<=100){for(;l<=c;){a.ships.push(l);let e=document.querySelector(".grid-container div:nth-child(n+"+l+")");e.setAttribute("style","background-color:rgba(255, 255, 255, 0.2);"),e.classList.add("disabled"),n.setField(l,i),l+=10}l=Number(e.target.dataset.index),k(l,i,s)}}}function k(e,t,s){let n=10*(Math.ceil(e/10)-1),i=(e-1)%10*10,l=document.getElementById("grid");"x-axis"==s?"millfalc"==t?(M("img-mf",l,"./images/ships/millfalc.png",n,i),a.mf.className="img-mf",a.mf.top=n+"%",a.mf.left=i+"%"):"tiefighter"==t?(M("img-tf",l,"./images/ships/tiefighter.png",n,i),a.tf.className="img-tf",a.tf.top=n+"%",a.tf.left=i+"%"):"landspeeder"==t?(M("img-ls",l,"./images/ships/landspeeder.png",n,i),a.ls.className="img-ls",a.ls.top=n+"%",a.ls.left=i+"%"):"xwing"==t?(M("img-xw",l,"./images/ships/x-wing.png",n,i),a.xw.className="img-xw",a.xw.top=n+"%",a.xw.left=i+"%"):"ywing"==t&&(M("img-yw",l,"./images/ships/y-wing.png",n,i),a.yw.className="img-yw",a.yw.top=n+"%",a.yw.left=i+"%"):"y-axis"==s&&("millfalc"==t?(M("img-mf-y",l,"./images/ships/millfalc-y.png",n,i),a.mf.className="img-mf-y",a.mf.top=n+"%",a.mf.left=i+"%"):"tiefighter"==t?(M("img-tf-y",l,"./images/ships/tiefighter-y.png",n,i),a.tf.className="img-tf-y",a.tf.top=n+"%",a.tf.left=i+"%"):"landspeeder"==t?(M("img-ls-y",l,"./images/ships/landspeeder-y.png",n,i),a.ls.className="img-ls-y",a.ls.top=n+"%",a.ls.left=i+"%"):"xwing"==t?(M("img-xw-y",l,"./images/ships/x-wing-y.png",n,i),a.xw.className="img-xw-y",a.xw.top=n+"%",a.xw.left=i+"%"):"ywing"==t&&(M("img-yw-y",l,"./images/ships/y-wing-y.png",n,i),a.yw.className="img-yw-y",a.yw.top=n+"%",a.yw.left=i+"%")),a.boardPieces+=1;let c=document.querySelector(".ships> .active");c.classList.remove("active"),c.classList.add("disable"),c.style.display="none";let o=document.querySelectorAll(".ships > .card:not(.disable)")[0];o&&o.classList.add("active")}function q(){document.getElementById("reset").addEventListener("click",(()=>{document.querySelectorAll(".ships > .card").forEach((e=>{e.classList.remove("disable"),e.classList.remove("active"),e.style.display="flex"})),document.querySelector(".ships > :first-child").classList.add("active"),document.querySelectorAll(".grid-container > .cell.disabled").forEach((e=>{e.classList.remove("disabled")})),F("img-mf"),F("img-mf-y"),F("img-tf"),F("img-tf-y"),F("img-ls"),F("img-ls-y"),F("img-xw"),F("img-xw-y"),F("img-yw"),F("img-yw-y"),a.ships=[],a.boardPieces=0}),!1)}function A(){document.getElementById("submit").addEventListener("click",(e=>{if(a.boardPieces<5)e.target.style.border="1px solid #ff0000",setTimeout((function(){e.target.style.border="1px solid #ffffff33"}),300),e.preventDefault();else{let e=document.getElementById("grid");a.playerGrid=e,document.getElementsByClassName("battleship-app")[0].textContent="",function(){const e=document.getElementsByClassName("battleship-app")[0],t=document.createElement("div");t.className="game-play";const s=function(){const e=document.createElement("div");e.className="empire";const t=document.createElement("h1");t.className="empire-header",t.textContent="EMPIRE";const s=document.createElement("div");s.className="empire-grid";let n=a.playerGrid;return n.classList.add("em"),s.append(n),e.append(t,s),e}(),n=function(){const e=document.createElement("div");e.className="rebels";const t=document.createElement("h1");t.className="rebels-header",t.textContent="REBELS";const s=document.createElement("div");s.className="rebel-grid";let n=document.createElement("div");n.className="rb grid-container",n.id="enemy-grid";for(let e=1;e<=100;e++){const t=document.createElement("div");t.className="cell",t.dataset.index=e,n.append(t)}return s.append(n),e.append(t,s),e}();t.append(s,n),e.append(t)}(),function(){let e,t=["x-axis","y-axis"],n=[["mf",2],["tf",3],["ls",3],["xw",2],["yw",2]];i.ships=[];for(var a=n.length-1;a>=0;a--){let a=Math.floor(Math.random()*n.length),c=Math.floor(100*Math.random())+1;e=n[a],n.splice(a,1);let o=(l=t)[Math.floor(Math.random()*l.length)];if("x-axis"==o){let t=c,n=t-1+Number(e[1]);for(;!L(t,n,i.ships,o)||!B(t,e[1]);)t=Math.floor(100*Math.random())+1,n=t-1+Number(e[1]);for(c=t;t<=n;)i.ships.push(t),s.setField(t-1,e[0]),i[e[0]].spots.push(t),t++;h(c,e[0],o)}else{let t=c,n=c+10*(Number(e[1])-1);for(;!L(t,n,i.ships,o)||n>100;)t=Math.floor(100*Math.random())+1,n=t+10*(Number(e[1])-1);for(c=t;t<=n;)i.ships.push(t),i[e[0]].spots.push(t),s.setField(t-1,e[0]),t+=10;h(c,e[0],o)}}var l}(),document.getElementById("enemy-grid").addEventListener("click",g,!1),f()}}))}function M(e,t,s,n,a,i="default"){const l=document.createElement("div");l.className=e,l.style.top=n+"%",l.style.left=a+"%","enemy"==i&&(l.style.display="none");const c=document.createElement("img");c.src=s,l.appendChild(c),t.append(l)}function I(e,t,s){const n=document.querySelector("."+e);n&&(n.style.top=t,n.style.left=s)}function F(e){const t=document.querySelector("."+e);t&&t.remove()}function P(){I("img-mf",a.mf.top,a.mf.left),I("img-mf-y",a.mf.top,a.mf.left),I("img-tf",a.tf.top,a.tf.left),I("img-tf-y",a.tf.top,a.tf.left),I("img-ls",a.ls.top,a.ls.left),I("img-ls-y",a.ls.top,a.ls.left),I("img-xw",a.xw.top,a.xw.left),I("img-xw-y",a.xw.top,a.xw.left),I("img-yw",a.yw.top,a.yw.left),I("img-yw-y",a.yw.top,a.yw.left)}l()})();