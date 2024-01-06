(()=>{"use strict";var e,t,o,n,a={996:(e,t,o)=>{o.d(t,{d:()=>n});const n={country:"Country",producer:"Producer",materialType:"MaterialType",colorScheme:"ColorScheme",color:"Color",detailName:"DetailName",detailInGoods:"DetailInGoods",mainMaterial:"MainMaterial",addMaterial:"AddMaterial",masterBatch:"MasterBatch",recipe:"Recipe",goods:"Goods",imm:"IMM",productRequest:"ProductionRequest",productReport:"ProductionReport",requestStartStop:"ProductionRequestStartStop",productionForRequest:"ProductionForRequest",qualityForRequest:"QualityForRequest",defects:"Defects",defectEvent:"DefectEvent",qualityReport:"QualityReport",qualityReportDefect:"QualityReportDefects",detail:"DetailInGoods",material_type:"MaterialType",main_material_type:"MaterialType",color_scheme:"ColorScheme",detail_in_goods:"DetailInGoods",detail_name:"DetailName",main_material:"MainMaterial",add_material:"AddMaterial",masterbatch:"MasterBatch",main_master:"MasterBatch",add_master:"MasterBatch",product_request:"ProductionRequest",production_request:"ProductionRequest",defect_event:"DefectEvent",production_for_request:"ProductionForRequest",production:"ProductionReport",quality_report:"QualityReport",defect:"Defects"}},557:(e,t,o)=>{o.d(t,{T:()=>r});var n=o(631),a=o(816),d=o(930);async function r(e,t,o,r,i){const c=e.dataset.last;let l;delete e.dataset.last;const s=t.querySelector(".dict-block__row_hidden"),u=`/production/json_dict_next_20/${(0,n.Y)(e)}/${c}/default/${o}/${r}/${i}`,p=await(0,a.K)(u),_=JSON.parse(p);let f=0;const m=[];for(const e of _)f++,l=s.cloneNode(!0),await(0,d.e)(e,f,l),l.classList.remove("dict-block__row_hidden"),20===f&&(l.dataset.last=Number.parseInt(c)+20),t.appendChild(l),m.push(l);return m}},440:(e,t,o)=>{function n(e){const t=e.closest(".form-row"),o=e.closest(".dict-block__row");t.remove(),"e"!==o.dataset.id?(o.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})),o.querySelector(".id-hidden").setAttribute("form","")):o.remove()}o.d(t,{T:()=>n})},873:(e,t,o)=>{function n(e){e.closest(".dict-block__search").querySelector(".form-input").value=""}o.d(t,{A:()=>n})},161:(e,t,o)=>{function n(e){const t=e.cloneNode(!0);return t.id=t.id.slice(0,-1)+"e",t.dataset.id="e",e.after(t),t.classList.remove("dict-block__row_hidden"),t}o.d(t,{o:()=>n})},228:(e,t,o)=>{o.d(t,{O:()=>d});var n=o(440),a=o(271);function d(){let e;const t=document.createElement("div");return t.classList.add("dict__button-block","button-block"),e=document.createElement("button"),e.innerHTML='<i class="fa fa-solid fa-xmark" ></i>',e.classList.add("btn","btn-close","dict__btn"),e.addEventListener("click",(e=>{e.stopPropagation(),(0,n.T)(e.target)})),e.type="button",t.appendChild(e),e=document.createElement("button"),e.innerHTML='<i class="fa fa-solid fa-check"></i>',e.classList.add("btn","btn-save","dict__btn"),e.addEventListener("click",(e=>{e.stopPropagation(),(0,a.T)(e.target)})),e.type="submit",t.appendChild(e),t}},476:(e,t,o)=>{o.d(t,{_:()=>a});var n=o(624);async function a(e){const t=e.childNodes,o=e.classList,a=document.createElement("form");a.classList.add("form-row"),o.forEach((function(e){"dict-block__row"!==e&&a.classList.add(e)})),a.id="form-dict",await(0,n.Q)(e,a,t)}},674:(e,t,o)=>{o.d(t,{A:()=>n});const n='<div class="dropdown report_dropdown dropdown_dict">\n        <input name="bool" type="text" class="dropdown__hidden"\n               value="1">\n        <div class="dropdown__input-block">\n            <input type="text" class="dropdown__input dropdown__input_dict"\n                   placeholder="Поиск.."\n                   value="Да"\n                   data-value="Да" readonly>\n            <i class="fa fa-solid fa-angle-down"></i>\n        </div>\n        <ul class="dropdown__content">\n            <li data-value="1">Да</li>\n            <li data-value="0">Нет</li>\n        </ul>\n    </div>\n'},586:(e,t,o)=>{function n(e,t){e.contains(t.target)&&e.querySelector("ul").classList.add("visible")}o.d(t,{n:()=>n})},891:(e,t,o)=>{o.d(t,{c:()=>n});const n='\n    <div class="dropdown report_dropdown dropdown_dict">\n        <input name="" type="text" class="dropdown__hidden"\n               value="">\n        <div class="dropdown__input-block">\n            <input type="text" class="dropdown__input dropdown__input_dict"\n                   placeholder="Поиск.." \n                   value=""\n                   data-value="">\n            <i class="fa fa-solid fa-angle-down"></i>\n        </div>\n        <ul class="dropdown__content">\n        </ul>\n    </div>\n'},338:(e,t,o)=>{function n(e){let t;e.querySelector("ul").classList.contains("visible")&&(t=e),null==t||t.contains(e)||(t.querySelector("ul").classList.remove("visible"),t.querySelector(".dropdown__input").value=t.querySelector(".dropdown__input").dataset.value)}o.d(t,{d:()=>n})},207:(e,t,o)=>{o.d(t,{S:()=>a});var n=o(170);function a(e,t){let o;t.forEach((t=>{o=document.createElement("li"),o.onclick=async function(e){e.stopPropagation(),await(0,n.Y)(e.target)},o.dataset.value=Object.keys(t)[0],o.textContent=Object.values(t)[0],e.appendChild(o)}))}},858:(e,t,o)=>{function n(e){let t,o,n;for(t=e.value.toUpperCase(),o=e.closest(".dropdown").getElementsByTagName("li"),n=0;n<o.length;n++)(o[n].textContent||o[n].innerText).toUpperCase().indexOf(t)>-1?o[n].style.display="":o[n].style.display="none"}o.d(t,{g:()=>n})},170:(e,t,o)=>{o.d(t,{Y:()=>r});var n=o(207),a=o(996),d=o(816);async function r(e){const t=e.closest(".dropdown"),o=t.closest("form"),r=t.querySelector(".dropdown__hidden").name,i=o.querySelector(`[data-filter="${r}"]`);if(t.querySelector(".dropdown__input").value=e.textContent.trim().replace(/\s+/g," "),t.querySelector(".dropdown__input").dataset.value=e.textContent.trim().replace(/\s+/g," "),t.querySelector(".dropdown__hidden").value=e.dataset.value,e.parentElement.classList.remove("visible"),i){const t=i.closest(".report_dropdown").querySelector("ul");t.innerHTML="",i.value="";const o=i.name;t.closest(".report_dropdown").querySelector(".dropdown__input").value="",t.closest(".report_dropdown").querySelector(".dropdown__input").dataset.value="";const c=`/production/dictionary_json_filter/${a.d[o]}/${a.d[r]}/${Number.parseInt(e.dataset.value)}`,l=await(0,d.K)(c),s=JSON.parse(l);(0,n.S)(t,s)}}},816:(e,t,o)=>{function n(e){return fetch(e).then((e=>e.json()))}o.d(t,{K:()=>n})},624:(e,t,o)=>{o.d(t,{Q:()=>f});var n=o(228),a=o(996),d=o(891),r=o(674),i=o(816),c=o(207),l=o(858),s=o(738),u=o(170),p=o(338),_=o(586);async function f(e,t,o){let f=0;for(const e of o)"DIV"!==e.tagName||e.hidden||(e.classList.contains("foreign-key")?await y(e):e.classList.contains("bool-field")?await v(e):await m(e)),e.hidden=!0;async function m(e){let o;o=document.createElement("input"),o.classList.add("form-input","dict-block__text","dict__form-input"),null!=e.dataset.name?o.name=e.dataset.name:(o.readOnly=!0,o.classList.add("form-input__inactive")),e.classList.contains("date-field")?(o.type="datetime-local",o.value=(0,s.g)(e.textContent)):(o.type="text",o.setAttribute("value",e.textContent)),t.appendChild(o),f+=1}async function y(e){let t;const o=e.closest(".dict-block__row"),n=a.d[e.dataset.name];t=document.createElement("div"),t.insertAdjacentHTML("beforeend",d.c),t.querySelector(".dropdown__input").addEventListener("keyup",(e=>{(0,l.g)(e.target)})),t=t.firstElementChild,t.addEventListener("click",(e=>{(0,p.d)(t,e)})),t.addEventListener("click",(e=>{(0,_.n)(t,e)})),t.querySelector(".dropdown__hidden").name=e.dataset.name;const r=a.d[e.dataset.filter],s=t.querySelector(".dropdown__content");let u;if(r&&"e"!==o.dataset.id){const t=o.querySelector(`[data-name = "${e.dataset.filter}"]`).dataset.id;u=`/production/dictionary_json_filter/${n}/${r}/${Number.parseInt(t)}`}else r?(t.querySelector(".dropdown__hidden").dataset.filter=e.dataset.filter,u="/production/dictionary_json_filter/default/default/0"):u=`/production/dictionary_json_filter/${n}/default/0`;const f=await(0,i.K)(u),m=JSON.parse(f);m||(t.querySelector(".dropdown__hidden").value=Object.keys(m[0])[0],t.querySelector(".dropdown__input_dict").value=Object.values(m[0])[0],t.querySelector(".dropdown__input_dict").dataset.value=Object.values(m[0])[0]),(0,c.S)(s,m),h(e,t)}async function v(e){let t;t=document.createElement("div"),t.insertAdjacentHTML("beforeend",r.A),t=t.firstElementChild,t.querySelectorAll("li").forEach((e=>{e.addEventListener("click",(e=>{e.stopPropagation(),(0,u.Y)(e.target)}))})),t.querySelector(".dropdown__hidden").name=e.dataset.name,t.addEventListener("click",(e=>{(0,_.n)(t,e)})),h(e,t)}function h(e,o){o.querySelector(".dropdown__input").value=e.textContent.replace(/\s+/g," "),o.querySelector(".dropdown__input").dataset.value=e.textContent.replace(/\s+/g," "),o.querySelector(".dropdown__hidden").value=e.dataset.id,t.appendChild(o),f+=1}0!==f&&(e.querySelector(".id-hidden")&&e.querySelector(".id-hidden").setAttribute("form","form-dict"),t.appendChild((0,n.O)()),e.appendChild(t))}},930:(e,t,o)=>{o.d(t,{e:()=>d});var n=o(816),a=o(996);async function d(e,t,o){const d=o.querySelectorAll('div[data-field]:not([data-field = ""])');o.dataset.id=e.id,o.id=o.id.slice(0,-1)+e.id,o.querySelector(".id-hidden").value=e.id;const r=o.querySelector(".hex");r&&(r.style.backgroundColor=e.hex);for(const t of d){let d=t.dataset.field;if(t.classList.contains("foreign-key")){let o;t.dataset.id=e[d+"_id"],o=document.getElementById(d),t.textContent=await(0,n.K)(`/production/dict_name/${a.d[d]}/${e[d+"_id"]}`)}else t.classList.contains("bool-field")?(t.textContent=e[d]?"Да":"Нет",t.dataset.id=e[d]?"1":"0"):d.includes("user")?e[`${d}_id`]&&(t.textContent=await(0,n.K)(`/production/user_name/${e[`${d}_id`]}`)):(t.textContent=e[d],"date_close"===t.dataset.field&&e[d]&&(o.classList.add("fulfilled"),o.querySelectorAll(".btn").forEach((e=>{e.setAttribute("disabled",!0),e.classList.add("form-input__inactive")}))))}}},178:(e,t,o)=>{function n(e){let t="";return e.closest(".dict-block").querySelector(".dict-block__form-input")&&(t=e.closest(".dict-block").querySelector(".dict-block__form-input").value),""===t&&(t="default"),t}o.d(t,{v:()=>n})},800:(e,t,o)=>{function n(e){const t=e.querySelector(".form-input").value;let o;return o=""===t?"default":t.replaceAll(/  +/g," ").replaceAll(" ","_"),o}o.d(t,{$:()=>n})},271:(e,t,o)=>{o.d(t,{T:()=>d});var n=o(655),a=o(996);function d(e){event.preventDefault();const t=e.closest(".form-row"),o=t.parentElement.id.split("-")[0],d="/production/dict_update/"+a.d[o];(0,n.K)(t,d)}},655:(e,t,o)=>{o.d(t,{K:()=>d});var n=o(631),a=o(816);function d(e,t){const o=e.querySelectorAll("[name]"),d=e.closest(".dict-block__row"),r=e.querySelector('[name = "quantity"]');if(!r||r.value&&"0"!==r.value){const r=new FormData(e);fetch(t,{method:"POST",body:r}).then((async()=>{if(o.forEach((e=>{e.classList.contains("dropdown__hidden")?d.querySelector(`[data-name = ${e.name}]`).textContent=e.parentElement.querySelector(".dropdown__input").value:d.querySelector(`[data-name = ${e.name}]`).textContent=e.value})),e.remove(),d.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})),d.querySelector(".id-hidden").setAttribute("form",""),"e"===d.dataset.id){const e=`/production/dictionary_last_id/${(0,n.Y)(d)}`,t=await(0,a.K)(e),o=JSON.parse(t).id__max;d.dataset.id=o,d.querySelector(".id-hidden").value=o,d.id=d.id.split("-")[0]+"-"+o}})).catch((e=>{console.error(e)}))}else e.remove(),"e"!==d.dataset.id?d.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})):d.remove()}},738:(e,t,o)=>{function n(e){const t=e.split(" "),o=t[0].split("."),n=t[1];return`${"20"+o[2]}-${o[1]}-${o[0]}T${n}`}o.d(t,{g:()=>n})},631:(e,t,o)=>{o.d(t,{Y:()=>a});var n=o(996);function a(e){return n.d[e.id.split("-")[0]]}},383:(e,t,o)=>{o.a(e,(async(e,t)=>{try{var n=o(161),a=o(178),d=o(800),r=o(557),i=o(440),c=o(476),l=o(873);const s=document.querySelector(".dict-block__content"),u=s.querySelector(".dict-block__row_hidden"),p=document.querySelector(".btn_add"),_=document.querySelector(".search_submit"),f=document.querySelector(".search_clear"),m=document.getElementById("showDeleted")?1:0,y=document.getElementById("unclosed");async function v(e){const t=`/production/dict_delete/ProductionRequest/${e.dataset.id}`,o=e.querySelector('[data-name = "quantity"]'),n=o.nextElementSibling;o.textContent===n.textContent&&(m?e.querySelector('[data-name = "deleted"]').textContent="Да":e.remove(),await fetch(t))}async function h(e){const t=e.dataset.id;await fetch(`/production/production_request_close/${t}`),e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"),e.classList.add("fulfilled")}async function w(e){const t=u.cloneNode(!0);t.setAttribute("data-last","0"),s.appendChild(t),s.innerHTML="",s.appendChild(u),await(0,r.T)(t,s,"default",0,e),t.remove()}await w(1),y.addEventListener("change",(async e=>{s.innerHTML="";const t=e.target.checked?1:0;(0,l.A)(e.target),await w(t)})),p.addEventListener("click",(async()=>{const e=s.querySelector(".dict-block__row_hidden"),t=(0,n.o)(e);await(0,c._)(t)})),f.addEventListener("click",(e=>{(0,l.A)(e.target)})),_.addEventListener("mousedown",(async()=>{const e=s.closest(".dict-block"),t=(0,d.$)(e),o=u.cloneNode(!0);o.setAttribute("data-last","0"),s.appendChild(o),s.innerHTML="",s.appendChild(u);const n=y.checked?1:0;await(0,r.T)(o,s,t,0,n),o.remove()})),s.addEventListener("mouseover",(async e=>{const t=s.querySelector('div[data-last]:not([data-last = ""])');if(e.target===t){const t=(0,a.v)(e.target),o=y.checked?1:0;await(0,r.T)(e.target,s,t,0,o)}})),document.addEventListener("click",(e=>{s.querySelector(".form-row")&&!e.target.closest(".form-row")&&(0,i.T)(s.querySelector(".form-row").firstElementChild)})),s.addEventListener("click",(async e=>{if(e.target.classList.contains("btn_delete"))await v(e.target.closest(".dict-block__row"));else if(e.target.classList.contains("btn_reduce"))await h(e.target.closest(".dict-block__row"));else if(e.target.closest(".dict-block__row")){const t=e.target.closest(".dict-block__row");t.classList.contains("fulfilled")||await(0,c._)(t)}})),t()}catch(b){t(b)}}),1)}},d={};function r(e){var t=d[e];if(void 0!==t)return t.exports;var o=d[e]={exports:{}};return a[e](o,o.exports,r),o.exports}e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",o="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},r.a=(a,d,r)=>{var i;r&&((i=[]).d=-1);var c,l,s,u=new Set,p=a.exports,_=new Promise(((e,t)=>{s=t,l=e}));_[t]=p,_[e]=e=>(i&&e(i),u.forEach(e),_.catch((e=>{}))),a.exports=_,d((a=>{var d;c=(a=>a.map((a=>{if(null!==a&&"object"==typeof a){if(a[e])return a;if(a.then){var d=[];d.d=0,a.then((e=>{r[t]=e,n(d)}),(e=>{r[o]=e,n(d)}));var r={};return r[e]=e=>e(d),r}}var i={};return i[e]=e=>{},i[t]=a,i})))(a);var r=()=>c.map((e=>{if(e[o])throw e[o];return e[t]})),l=new Promise((t=>{(d=()=>t(r)).r=0;var o=e=>e!==i&&!u.has(e)&&(u.add(e),e&&!e.d&&(d.r++,e.push(d)));c.map((t=>t[e](o)))}));return d.r?l:r()}),(e=>(e?s(_[o]=e):l(p),n(i)))),i&&i.d<0&&(i.d=0)},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r(383)})();