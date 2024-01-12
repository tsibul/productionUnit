(()=>{"use strict";var e,t,r,a,o={996:(e,t,r)=>{r.d(t,{d:()=>a});const a={country:"Country",producer:"Producer",materialType:"MaterialType",colorScheme:"ColorScheme",color:"Color",detailName:"DetailName",detailInGoods:"DetailInGoods",mainMaterial:"MainMaterial",addMaterial:"AddMaterial",masterBatch:"MasterBatch",recipe:"Recipe",recipeDetail:"RecipeDetail",goods:"Goods",imm:"IMM",productRequest:"ProductionRequest",productReport:"ProductionReport",requestStartStop:"ProductionRequestStartStop",productionForRequest:"ProductionForRequest",qualityForRequest:"QualityForRequest",defects:"Defects",defectEvent:"DefectEvent",qualityReport:"QualityReport",qualityReportDefect:"QualityReportDefects",recipeColorScheme:"RecipeColorScheme",detailBaseData:"DetailBaseData",detailActualData:"DetailActualData",detail:"DetailInGoods",material_type:"MaterialType",main_material_type:"MaterialType",color_scheme:"ColorScheme",detail_in_goods:"DetailInGoods",detail_name:"DetailName",main_material:"MainMaterial",add_material:"AddMaterial",masterbatch:"MasterBatch",main_master:"MasterBatch",add_master:"MasterBatch",product_request:"ProductionRequest",production_request:"ProductionRequest",defect_event:"DefectEvent",production_for_request:"ProductionForRequest",production:"ProductionReport",quality_report:"QualityReport",defect:"Defects",recipe_detail:"RecipeDetail",recipe_color_scheme:"RecipeColorScheme",detail_base_data:"DetailBaseData",detail_actual_data:"DetailActualData"}},873:(e,t,r)=>{function a(e){e.closest(".dict-block__search").querySelector(".form-input").value=""}r.d(t,{A:()=>a})},766:(e,t,r)=>{function a(e){const t=e.closest(".login"),r=t.querySelectorAll("input"),a=t.querySelectorAll("textarea");[...r].forEach((e=>{e.value=null})),[...a].forEach((e=>{e.textContent=""})),t.style.display="none"}r.d(t,{M:()=>a})},586:(e,t,r)=>{function a(e,t){e.contains(t.target)&&e.querySelector("ul").classList.add("visible")}r.d(t,{n:()=>a})},207:(e,t,r)=>{r.d(t,{S:()=>o});var a=r(170);function o(e,t){let r;t.forEach((t=>{r=document.createElement("li"),r.onclick=async function(e){e.stopPropagation(),await(0,a.Y)(e.target)},r.dataset.value=Object.keys(t)[0],r.textContent=Object.values(t)[0],e.appendChild(r)}))}},170:(e,t,r)=>{r.d(t,{Y:()=>n});var a=r(207),o=r(996),c=r(816);async function n(e){const t=e.closest(".dropdown"),r=t.closest("form"),n=t.querySelector(".dropdown__hidden").name,l=r.querySelector(`[data-filter="${n}"]`);if(t.querySelector(".dropdown__input").value=e.textContent.trim().replace(/\s+/g," "),t.querySelector(".dropdown__input").dataset.value=e.textContent.trim().replace(/\s+/g," "),t.querySelector(".dropdown__hidden").value=e.dataset.value,e.parentElement.classList.remove("visible"),l){const t=l.closest(".report_dropdown").querySelector("ul");t.innerHTML="",l.value="";const r=l.name;t.closest(".report_dropdown").querySelector(".dropdown__input").value="",t.closest(".report_dropdown").querySelector(".dropdown__input").dataset.value="";const u=`/production/dictionary_json_filter/${o.d[r]}/${o.d[n]}/${Number.parseInt(e.dataset.value)}`,d=await(0,c.K)(u),i=JSON.parse(d);(0,a.S)(t,i)}}},816:(e,t,r)=>{function a(e){return fetch(e).then((e=>e.json()))}r.d(t,{K:()=>a})},800:(e,t,r)=>{function a(e){const t=e.querySelector(".form-input").value;let r;return r=""===t?"default":t.replaceAll(/  +/g," ").replaceAll(" ","_"),r}r.d(t,{$:()=>a})},273:(e,t,r)=>{function a(e){e.style.display="block"}r.d(t,{h:()=>a})},32:(e,t,r)=>{function a(e,t,r){const a=e.querySelector(".hex");a&&(a.style.backgroundColor=t.hex);for(const a of Object.keys(t)){let o="."+r+a,c=e.querySelector(o);c&&("number"==typeof t[a]?c.textContent=t[a].toString().replace(/\B(?=(\d{3})+(?!\d))/g," "):c.textContent=t[a])}}r.d(t,{d:()=>a})},324:(e,t,r)=>{r.a(e,(async(e,t)=>{try{var a=r(32),o=r(766),c=r(273),n=r(873),l=r(800),u=r(586),d=r(816),i=r(170);const s=document.querySelector(".production-list").closest("section").querySelector(".dict-block__content"),p=document.querySelector("#technical-data").querySelector(".production-list"),y=document.getElementById("qualityModal"),_=y.querySelectorAll("li"),q=y.querySelector(".btn-close"),m=y.querySelector("#quantity_approved"),S=y.querySelector("#quantity_checked"),v=y.querySelector("#quantity_approved_defect"),f=document.getElementById("unclosed"),h=document.querySelector(".search_submit"),b=document.querySelector(".search_clear"),x=document.querySelector(".dict-block__search");function w(e){const t=e.closest(".dict-block__row");y.querySelector('[name = "production"]').value=t.dataset.id,y.querySelector("#detail").value=t.querySelector(".req__detail").textContent,y.querySelector("#color").value=t.querySelector(".req__color").textContent,y.querySelector("#imm").value=t.querySelector(".req__imm").textContent;const r=Number.parseInt(t.querySelector(".req__quantity").textContent.replace(" ","")),a=Number.parseInt(t.querySelector(".req__quantity_checked").textContent.replace(" ",""));y.querySelector("#to_check").value=r-a,y.querySelector("#quantity_checked").max=r-a,y.querySelector("#quantity_approved").max=r-a,y.querySelector("#user").value=t.querySelector(".req__produce_user").textContent,y.querySelector("#date").value=t.querySelector(".req__production_date").textContent}async function k(e,t,r,o){const n=await(0,d.K)(`/production/production_list/${e}/${t}/${r}/${o}`),l=JSON.parse(n);let u;if(l.forEach((e=>{u=p.cloneNode(!0),async function(e,t,r){(0,a.d)(e,t,"req__");const o=Number.parseInt(e.querySelector(".req__quantity").textContent.replace(" ","")),n=Number.parseInt(e.querySelector(".req__quantity_checked").textContent.replace(" ","")),l=e.querySelector(".btn");o===n?(l.disabled=!0,l.classList.add("form-input__inactive")):l.addEventListener("click",(()=>{w(l),(0,c.h)(y)})),e.dataset.id=t.production_id}(u,e),s.appendChild(u)})),l.length>=20){const t=s.lastElementChild;t.dataset.last=e+20,t.addEventListener("mouseover",(async e=>{const a=parseInt(t.dataset.last);delete t.dataset.last,await k(a,"default",r,o)}),{once:!0})}}await k(0,"default",1,"default"),h.addEventListener("click",(async e=>{const t=(0,l.$)(x),r=!0===f.checked?1:0;s.innerHTML="",await k(0,"default",r,t)})),b.addEventListener("click",(e=>{(0,n.A)(e.target)})),f.addEventListener("change",(async e=>{s.innerHTML="";const t=!0===f.checked?1:0;(0,n.A)(e.target),await k(0,"default",t,"default")})),y.querySelector(".dropdown").addEventListener("click",(e=>{(0,u.n)(y.querySelector(".dropdown"),e)})),S.addEventListener("change",(()=>{Number.parseInt(S.value)>Number.parseInt(S.max)&&(S.value=S.max),m.max=S.value})),m.addEventListener("change",(()=>{Number.parseInt(m.value)>Number.parseInt(m.max)&&(m.value=m.max)})),v.addEventListener("change",(()=>{Number.parseInt(v.value)>Number.parseInt(m.value)&&(v.value=m.value)})),q.addEventListener("click",(()=>{(0,o.M)(q)})),_.forEach((e=>{e.addEventListener("click",(async t=>{t.stopPropagation(),await(0,i.Y)(e)}))})),t()}catch(E){t(E)}}),1)}},c={};function n(e){var t=c[e];if(void 0!==t)return t.exports;var r=c[e]={exports:{}};return o[e](r,r.exports,n),r.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",r="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",a=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},n.a=(o,c,n)=>{var l;n&&((l=[]).d=-1);var u,d,i,s=new Set,p=o.exports,y=new Promise(((e,t)=>{i=t,d=e}));y[t]=p,y[e]=e=>(l&&e(l),s.forEach(e),y.catch((e=>{}))),o.exports=y,c((o=>{var c;u=(o=>o.map((o=>{if(null!==o&&"object"==typeof o){if(o[e])return o;if(o.then){var c=[];c.d=0,o.then((e=>{n[t]=e,a(c)}),(e=>{n[r]=e,a(c)}));var n={};return n[e]=e=>e(c),n}}var l={};return l[e]=e=>{},l[t]=o,l})))(o);var n=()=>u.map((e=>{if(e[r])throw e[r];return e[t]})),d=new Promise((t=>{(c=()=>t(n)).r=0;var r=e=>e!==l&&!s.has(e)&&(s.add(e),e&&!e.d&&(c.r++,e.push(c)));u.map((t=>t[e](r)))}));return c.r?d:n()}),(e=>(e?i(y[r]=e):d(p),a(l)))),l&&l.d<0&&(l.d=0)},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(324)})();