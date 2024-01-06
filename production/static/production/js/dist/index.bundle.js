(()=>{"use strict";var e,t,o,r,a={996:(e,t,o)=>{o.d(t,{d:()=>r});const r={country:"Country",producer:"Producer",materialType:"MaterialType",colorScheme:"ColorScheme",color:"Color",detailName:"DetailName",detailInGoods:"DetailInGoods",mainMaterial:"MainMaterial",addMaterial:"AddMaterial",masterBatch:"MasterBatch",recipe:"Recipe",goods:"Goods",imm:"IMM",productRequest:"ProductionRequest",productReport:"ProductionReport",requestStartStop:"ProductionRequestStartStop",productionForRequest:"ProductionForRequest",qualityForRequest:"QualityForRequest",defects:"Defects",defectEvent:"DefectEvent",qualityReport:"QualityReport",qualityReportDefect:"QualityReportDefects",detail:"DetailInGoods",material_type:"MaterialType",main_material_type:"MaterialType",color_scheme:"ColorScheme",detail_in_goods:"DetailInGoods",detail_name:"DetailName",main_material:"MainMaterial",add_material:"AddMaterial",masterbatch:"MasterBatch",main_master:"MasterBatch",add_master:"MasterBatch",product_request:"ProductionRequest",production_request:"ProductionRequest",defect_event:"DefectEvent",production_for_request:"ProductionForRequest",production:"ProductionReport",quality_report:"QualityReport",defect:"Defects"}},586:(e,t,o)=>{function r(e,t){e.contains(t.target)&&e.querySelector("ul").classList.add("visible")}o.d(t,{n:()=>r})},207:(e,t,o)=>{o.d(t,{S:()=>a});var r=o(170);function a(e,t){let o;t.forEach((t=>{o=document.createElement("li"),o.onclick=async function(e){e.stopPropagation(),await(0,r.Y)(e.target)},o.dataset.value=Object.keys(t)[0],o.textContent=Object.values(t)[0],e.appendChild(o)}))}},170:(e,t,o)=>{o.d(t,{Y:()=>c});var r=o(207),a=o(996),n=o(816);async function c(e){const t=e.closest(".dropdown"),o=t.closest("form"),c=t.querySelector(".dropdown__hidden").name,l=o.querySelector(`[data-filter="${c}"]`);if(t.querySelector(".dropdown__input").value=e.textContent.trim().replace(/\s+/g," "),t.querySelector(".dropdown__input").dataset.value=e.textContent.trim().replace(/\s+/g," "),t.querySelector(".dropdown__hidden").value=e.dataset.value,e.parentElement.classList.remove("visible"),l){const t=l.closest(".report_dropdown").querySelector("ul");t.innerHTML="",l.value="";const o=l.name;t.closest(".report_dropdown").querySelector(".dropdown__input").value="",t.closest(".report_dropdown").querySelector(".dropdown__input").dataset.value="";const d=`/production/dictionary_json_filter/${a.d[o]}/${a.d[c]}/${Number.parseInt(e.dataset.value)}`,i=await(0,n.K)(d),s=JSON.parse(i);(0,r.S)(t,s)}}},816:(e,t,o)=>{function r(e){return fetch(e).then((e=>e.json()))}o.d(t,{K:()=>r})},273:(e,t,o)=>{function r(e){e.style.display="block"}o.d(t,{h:()=>r})},32:(e,t,o)=>{function r(e,t,o){const r=e.querySelector(".hex");r&&(r.style.backgroundColor=t.hex);for(const r of Object.keys(t)){let a="."+o+r,n=e.querySelector(a);n&&("number"==typeof t[r]?n.textContent=t[r].toString().replace(/\B(?=(\d{3})+(?!\d))/g," "):n.textContent=t[r])}}o.d(t,{d:()=>r})},367:(e,t,o)=>{o.a(e,(async(e,t)=>{try{var r=o(32),a=o(273),n=o(170),c=o(586);const l=document.querySelector(".in-production").closest("section"),d=document.querySelector(".production").closest("section").querySelector(".dict-block__content"),i=l.querySelector(".dict-block__content"),s=document.querySelector("#technical-data").querySelector(".production"),u=document.getElementById("startModal"),p=document.getElementById("stopModal"),y=l.querySelectorAll(".btn-close"),m=document.getElementById("productionModal"),_=m.querySelector(".btn-save"),q=l.querySelectorAll(".btn-save"),f=JSON.parse(document.getElementById("in-work").textContent),S=JSON.parse(document.getElementById("on-request").textContent),v=u.querySelectorAll("li"),b=w();async function h(){let e;S.forEach((t=>{e=s.cloneNode(!0),E(e,t,"req__"),d.appendChild(e)}))}async function w(){const e={};return f.forEach((t=>{let o=i.querySelector('[data-id="'+t.imm_id+'"]');e[t.detail.split(" ")[0]]=o.querySelector(".work__imm").textContent,E(o,t,"work__"),[...o.querySelectorAll(".btn")].forEach((e=>{e.disabled=!1,e.classList.remove("form-input__inactive")}))})),e}async function E(e,t,o){if(e.querySelector(".req__queue")){let o=t.detail.split(" ")[0];const r=await b;[...Object.keys(r)].includes(o)&&(e.querySelector(".req__queue").textContent=r[o])}(0,r.d)(e,t,o),e.dataset.detail=t.detail_id,e.dataset.color=t.color_id;const a=e.querySelector(".req__left");a&&"0"===a.textContent&&(e.querySelector(".btn").classList.add("form-input__inactive"),e.querySelector(".btn").disabled=!0)}function k(e){const t=e.closest(".dict-block__row");p.querySelector('[name="imm"]').value=t.dataset.id}function g(e){const t=e.closest(".dict-block__row");u.querySelector('[name="detail"]').value=t.dataset.detail,u.querySelector('[name="color"]').value=t.dataset.color}function M(e){const t=e.closest(".dict-block__row");m.querySelector('[name="imm"]').value=t.dataset.id,m.querySelector('[name="detail"]').value=t.dataset.detail,m.querySelector('[name="color"]').value=t.dataset.color}await h(),[...q].forEach((e=>{e.addEventListener("click",(()=>{M(e),(0,a.h)(m)}))})),[...y].forEach((e=>{e.addEventListener("click",(()=>{k(e),(0,a.h)(p)}))})),d.addEventListener("click",(e=>{d.querySelectorAll(".btn-close").forEach((t=>{t===e.target&&(g(t),(0,a.h)(u))}))})),u.querySelector(".dropdown").addEventListener("click",(e=>{(0,c.n)(u.querySelector(".dropdown"),e)})),v.forEach((e=>{e.addEventListener("click",(async e=>{e.stopPropagation(),await(0,n.Y)(e.target)}))})),_.addEventListener("mousedown",(e=>{document.querySelectorAll(".btn").forEach((t=>{t.disabled=!0,t.classList.add("form-input__inactive");const o=e.target.closest("form");e.target.closest(".login").style.display="none",o.submit()}))})),t()}catch(x){t(x)}}),1)}},n={};function c(e){var t=n[e];if(void 0!==t)return t.exports;var o=n[e]={exports:{}};return a[e](o,o.exports,c),o.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",o="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",r=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},c.a=(a,n,c)=>{var l;c&&((l=[]).d=-1);var d,i,s,u=new Set,p=a.exports,y=new Promise(((e,t)=>{s=t,i=e}));y[t]=p,y[e]=e=>(l&&e(l),u.forEach(e),y.catch((e=>{}))),a.exports=y,n((a=>{var n;d=(a=>a.map((a=>{if(null!==a&&"object"==typeof a){if(a[e])return a;if(a.then){var n=[];n.d=0,a.then((e=>{c[t]=e,r(n)}),(e=>{c[o]=e,r(n)}));var c={};return c[e]=e=>e(n),c}}var l={};return l[e]=e=>{},l[t]=a,l})))(a);var c=()=>d.map((e=>{if(e[o])throw e[o];return e[t]})),i=new Promise((t=>{(n=()=>t(c)).r=0;var o=e=>e!==l&&!u.has(e)&&(u.add(e),e&&!e.d&&(n.r++,e.push(n)));d.map((t=>t[e](o)))}));return n.r?i:c()}),(e=>(e?s(y[o]=e):i(p),r(l)))),l&&l.d<0&&(l.d=0)},c.d=(e,t)=>{for(var o in t)c.o(t,o)&&!c.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),c(367)})();