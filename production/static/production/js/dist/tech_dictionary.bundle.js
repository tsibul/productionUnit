(()=>{"use strict";function e(e){const t=e.closest(".form-row"),o=e.closest(".dict-block__row");t.remove(),"e"!==o.dataset.id?(o.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})),o.querySelector(".id-hidden").setAttribute("form","")):o.remove()}const t={country:"Country",producer:"Producer",materialType:"MaterialType",colorScheme:"ColorScheme",color:"Color",detailName:"DetailName",detailInGoods:"DetailInGoods",mainMaterial:"MainMaterial",addMaterial:"AddMaterial",masterBatch:"MasterBatch",recipe:"Recipe",goods:"Goods",imm:"IMM",productRequest:"ProductionRequest",productReport:"ProductionReport",requestStartStop:"ProductionRequestStartStop",productionForRequest:"ProductionForRequest",qualityForRequest:"QualityForRequest",defects:"Defects",defectEvent:"DefectEvent",qualityReport:"QualityReport",qualityReportDefect:"QualityReportDefects",detail:"DetailInGoods",material_type:"MaterialType",main_material_type:"MaterialType",color_scheme:"ColorScheme",detail_in_goods:"DetailInGoods",detail_name:"DetailName",main_material:"MainMaterial",add_material:"AddMaterial",masterbatch:"MasterBatch",main_master:"MasterBatch",add_master:"MasterBatch",product_request:"ProductionRequest",production_request:"ProductionRequest",defect_event:"DefectEvent",production_for_request:"ProductionForRequest",production:"ProductionReport",quality_report:"QualityReport",defect:"Defects"};function o(e){return t[e.id.split("-")[0]]}function n(e){return fetch(e).then((e=>e.json()))}const c='\n    <div class="dropdown report_dropdown dropdown_dict">\n        <input name="" type="text" class="dropdown__hidden"\n               value="">\n        <div class="dropdown__input-block">\n            <input type="text" class="dropdown__input dropdown__input_dict"\n                   placeholder="Поиск.." \n                   value=""\n                   data-value="">\n            <i class="fa fa-solid fa-angle-down"></i>\n        </div>\n        <ul class="dropdown__content">\n        </ul>\n    </div>\n',a='<div class="dropdown report_dropdown dropdown_dict">\n        <input name="bool" type="text" class="dropdown__hidden"\n               value="1">\n        <div class="dropdown__input-block">\n            <input type="text" class="dropdown__input dropdown__input_dict"\n                   placeholder="Поиск.."\n                   value="Да"\n                   data-value="Да" readonly>\n            <i class="fa fa-solid fa-angle-down"></i>\n        </div>\n        <ul class="dropdown__content">\n            <li data-value="1">Да</li>\n            <li data-value="0">Нет</li>\n        </ul>\n    </div>\n';async function d(e){const o=e.closest(".dropdown"),c=o.closest("form"),a=o.querySelector(".dropdown__hidden").name,d=c.querySelector(`[data-filter="${a}"]`);if(o.querySelector(".dropdown__input").value=e.textContent.trim().replace(/\s+/g," "),o.querySelector(".dropdown__input").dataset.value=e.textContent.trim().replace(/\s+/g," "),o.querySelector(".dropdown__hidden").value=e.dataset.value,e.parentElement.classList.remove("visible"),d){const o=d.closest(".report_dropdown").querySelector("ul");o.innerHTML="",d.value="";const c=d.name;o.closest(".report_dropdown").querySelector(".dropdown__input").value="",o.closest(".report_dropdown").querySelector(".dropdown__input").dataset.value="";const i=`/production/dictionary_json_filter/${t[c]}/${t[a]}/${Number.parseInt(e.dataset.value)}`,r=await n(i);l(o,JSON.parse(r))}}function l(e,t){let o;t.forEach((t=>{o=document.createElement("li"),o.onclick=async function(e){e.stopPropagation(),await d(e.target)},o.dataset.value=Object.keys(t)[0],o.textContent=Object.values(t)[0],e.appendChild(o)}))}function i(e,t){e.contains(t.target)&&e.querySelector("ul").classList.add("visible")}async function r(r,s,u){let p=0;for(const e of u)"DIV"!==e.tagName||e.hidden||(e.classList.contains("foreign-key")?await f(e):e.classList.contains("bool-field")?await m(e):await _(e)),e.hidden=!0;async function _(e){let t;t=document.createElement("input"),t.classList.add("form-input","dict-block__text","dict__form-input"),null!=e.dataset.name?t.name=e.dataset.name:(t.readOnly=!0,t.classList.add("form-input__inactive")),e.classList.contains("date-field")?(t.type="datetime-local",t.value=function(e){const t=e.split(" "),o=t[0].split("."),n=t[1];return`${"20"+o[2]}-${o[1]}-${o[0]}T${n}`}(e.textContent)):(t.type="text",t.setAttribute("value",e.textContent)),s.appendChild(t),p+=1}async function f(e){let o;const a=e.closest(".dict-block__row"),d=t[e.dataset.name];o=document.createElement("div"),o.insertAdjacentHTML("beforeend",c),o.querySelector(".dropdown__input").addEventListener("keyup",(e=>{!function(e){let t,o,n;for(t=e.value.toUpperCase(),o=e.closest(".dropdown").getElementsByTagName("li"),n=0;n<o.length;n++)(o[n].textContent||o[n].innerText).toUpperCase().indexOf(t)>-1?o[n].style.display="":o[n].style.display="none"}(e.target)})),o=o.firstElementChild,o.addEventListener("click",(e=>{!function(e){let t;e.querySelector("ul").classList.contains("visible")&&(t=e),null==t||t.contains(e)||(t.querySelector("ul").classList.remove("visible"),t.querySelector(".dropdown__input").value=t.querySelector(".dropdown__input").dataset.value)}(o)})),o.addEventListener("click",(e=>{i(o,e)})),o.querySelector(".dropdown__hidden").name=e.dataset.name;const r=t[e.dataset.filter],s=o.querySelector(".dropdown__content");let u;if(r&&"e"!==a.dataset.id){const t=a.querySelector(`[data-name = "${e.dataset.filter}"]`).dataset.id;u=`/production/dictionary_json_filter/${d}/${r}/${Number.parseInt(t)}`}else r?(o.querySelector(".dropdown__hidden").dataset.filter=e.dataset.filter,u="/production/dictionary_json_filter/default/default/0"):u=`/production/dictionary_json_filter/${d}/default/0`;const p=await n(u),_=JSON.parse(p);_||(o.querySelector(".dropdown__hidden").value=Object.keys(_[0])[0],o.querySelector(".dropdown__input_dict").value=Object.values(_[0])[0],o.querySelector(".dropdown__input_dict").dataset.value=Object.values(_[0])[0]),l(s,_),y(e,o)}async function m(e){let t;t=document.createElement("div"),t.insertAdjacentHTML("beforeend",a),t=t.firstElementChild,t.querySelectorAll("li").forEach((e=>{e.addEventListener("click",(e=>{e.stopPropagation(),d(e.target)}))})),t.querySelector(".dropdown__hidden").name=e.dataset.name,t.addEventListener("click",(e=>{i(t,e)})),y(e,t)}function y(e,t){t.querySelector(".dropdown__input").value=e.textContent.replace(/\s+/g," "),t.querySelector(".dropdown__input").dataset.value=e.textContent.replace(/\s+/g," "),t.querySelector(".dropdown__hidden").value=e.dataset.id,s.appendChild(t),p+=1}0!==p&&(r.querySelector(".id-hidden")&&r.querySelector(".id-hidden").setAttribute("form","form-dict"),s.appendChild(function(){let c;const a=document.createElement("div");return a.classList.add("dict__button-block","button-block"),c=document.createElement("button"),c.innerHTML='<i class="fa fa-solid fa-xmark" ></i>',c.classList.add("btn","btn-close","dict__btn"),c.addEventListener("click",(t=>{t.stopPropagation(),e(t.target)})),c.type="button",a.appendChild(c),c=document.createElement("button"),c.innerHTML='<i class="fa fa-solid fa-check"></i>',c.classList.add("btn","btn-save","dict__btn"),c.addEventListener("click",(e=>{e.stopPropagation(),function(e){event.preventDefault();const c=e.closest(".form-row"),a=c.parentElement.id.split("-")[0];!function(e,t){const c=e.querySelectorAll("[name]"),a=e.closest(".dict-block__row"),d=e.querySelector('[name = "quantity"]');if(!d||d.value&&"0"!==d.value){const d=new FormData(e);fetch(t,{method:"POST",body:d}).then((async()=>{if(c.forEach((e=>{e.classList.contains("dropdown__hidden")?a.querySelector(`[data-name = ${e.name}]`).textContent=e.parentElement.querySelector(".dropdown__input").value:a.querySelector(`[data-name = ${e.name}]`).textContent=e.value})),e.remove(),a.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})),a.querySelector(".id-hidden").setAttribute("form",""),"e"===a.dataset.id){const e=`/production/dictionary_last_id/${o(a)}`,t=await n(e),c=JSON.parse(t).id__max;a.dataset.id=c,a.querySelector(".id-hidden").value=c,a.id=a.id.split("-")[0]+"-"+c}})).catch((e=>{console.error(e)}))}else e.remove(),"e"!==a.dataset.id?a.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})):a.remove()}(c,"/production/dict_update/"+t[a])}(e.target)})),c.type="submit",a.appendChild(c),a}()),r.appendChild(s))}async function s(e){const t=e.childNodes,o=e.classList,n=document.createElement("form");n.classList.add("form-row"),o.forEach((function(e){"dict-block__row"!==e&&n.classList.add(e)})),n.id="form-dict",await r(e,n,t)}async function u(e,t,o){const n=o.querySelectorAll('div[data-field]:not([data-field = ""])');o.dataset.id=e.id,o.id=o.id.slice(0,-1)+e.id,o.querySelector(".id-hidden").value=e.id;const c=o.querySelector(".hex");c&&(c.style.backgroundColor=e.hex),e.date_close&&(o.classList.add("fulfilled"),o.querySelectorAll(".btn").forEach((e=>{e.setAttribute("disabled",!0),e.classList.add("form-input__inactive")})));for(const t of n){const o=t.dataset.field;t.classList.contains("bool-field")?(t.textContent=e[o]?"Да":"Нет",t.dataset.id=e[o]?"1":"0"):(t.textContent=e[o],t.classList.contains("foreign-key")&&(t.dataset.id=e[o+"_id"]))}}async function p(e,t,c,a,d){const l=e.dataset.last;let i;delete e.dataset.last;const r=t.querySelector(".dict-block__row_hidden"),s=`/production/json_dict_next_20/${o(e)}/${l}/default/${c}/${a}/${d}`,p=await n(s);let _=0;const f=[];for(const e of p)_++,i=r.cloneNode(!0),await u(e,0,i),i.classList.remove("dict-block__row_hidden"),20===_&&(i.dataset.last=Number.parseInt(l)+20),t.appendChild(i),f.push(i);return f}const _=document.getElementById("user-group");function f(e,t,o,n,c){t.open=!1,e.appendChild(t),c.nextElementSibling.classList.remove("active");let a=!0;n.querySelectorAll("input").forEach((e=>{e.checked&&(a=!1)})),a&&o.classList.remove("active")}const m=document.querySelectorAll(".btn_add"),y=document.querySelectorAll(".search_submit"),v=document.querySelectorAll(".search_clear"),q=document.getElementById("showDeleted")?1:0,S=document.querySelectorAll(".dict-block__content"),b=document.querySelectorAll(".checkbox-out"),h=document.querySelector(".dict-right"),w=document.querySelector(".dict"),k=document.querySelectorAll(".dict-block");async function E(e,t){t===e.target.closest(".dict-block__row")&&(e.target.classList.contains("btn_delete")?await async function(e,t){const n=e.dataset.id,c=`/production/dict_delete/${o(e)}/${n}`;t?e.querySelector('[data-name = "deleted"]').textContent="Да":e.remove(),await fetch(c)}(t,q):await s(e.target.closest(".dict-block__row")))}b.forEach((e=>{e.addEventListener("change",(t=>{const o=t.target.id+"-0",n=document.getElementById(o).closest(".dict-block"),c=t.target.closest(".dict-menu__details"),a=c.querySelector(".dict-menu__header");e.checked?(function(e,t,o,n){t.open=!0,e.appendChild(t),n.nextElementSibling.classList.add("active"),o.classList.contains("active")||o.classList.add("active")}(h,n,a,t.target),k.forEach((e=>{if(e!==n){const t=e.querySelector("div[id]").id.slice(0,-2),o=document.getElementById(t);if(o.checked){const t=o.closest(".dict-menu__details"),n=t.querySelector(".dict-menu__header");o.checked=!1,f(w,e,n,t,o)}}}))):f(w,n,a,c,t.target)}))})),window.onload=function(){const e=document.querySelectorAll(".dict-block__header_block-space"),t=function(e){32===e.keyCode&&e.preventDefault()};e.forEach((e=>{e.onkeyup=t}))},document.querySelectorAll(".color").forEach((e=>{_.value.includes("production")&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".detail-in-goods").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".goods").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".main-material").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".add-material").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".masterbatch").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".producer").forEach((e=>{_.value.includes("production")&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".recipe").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".imm").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".main-material").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".production-request").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".production").forEach((e=>{_.value.includes("admin")||_.value.includes("production")||(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".in-production").forEach((e=>{_.value.includes("admin")||_.value.includes("production")||(e.onclick="",e.querySelectorAll(".btn").forEach((e=>{e.disabled=!0,e.classList.add("form-input__inactive")})))})),document.querySelectorAll(".quality-list").forEach((e=>{_.value.includes("admin")||_.value.includes("logistic")||(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),addEventListener("mousedown",(function(t){try{const o=document.querySelector("form").closest(".dict-block__row");t.target===o||o.contains(t.target)||e(document.querySelector("form").querySelector(".btn-close"))}catch(e){}})),S.forEach((e=>{e.addEventListener("mouseover",(async t=>{const o=e.querySelector('div[data-last]:not([data-last = ""])');if(t.target===o){let t=function(e){let t="";return e.closest(".dict-block").querySelector(".dict-block__form-input")&&(t=e.closest(".dict-block").querySelector(".dict-block__form-input").value),""===t&&(t="default"),t}(o);t||(t=""),await p(o,e,t,0,0)}}))})),m.forEach((e=>{e.addEventListener("click",(async t=>{t.preventDefault(),await async function(e,t){if(e.target===t){const e=function(e){const t=e.cloneNode(!0);return t.id=t.id.slice(0,-1)+"e",t.dataset.id="e",e.after(t),t.classList.remove("dict-block__row_hidden"),t}(t.closest(".dict-block").querySelector(".dict-block__row_hidden"));await s(e)}}(t,e)}))})),S.forEach((e=>{e.addEventListener("click",(async t=>{const o=e.querySelectorAll(".dict-block__row");for(const e of o)await E(t,e)}))})),y.forEach((e=>{e.addEventListener("mousedown",(async e=>{const t=function(e,t){const o=t.target.closest(".dict-block"),n=function(e){const t=e.querySelector(".form-input").value;let o;return o=""===t?"default":t.replaceAll(/  +/g," ").replaceAll(" ","_"),o}(o),c=o.querySelector(".dict-block__content"),a=c.querySelector(".dict-block__row_hidden"),d=a.cloneNode(!0);return d.setAttribute("data-last","0"),c.appendChild(d),c.innerHTML="",c.appendChild(a),[d,n,c]}(0,e);await p(t[0],t[2],t[1],q,0),t[0].remove()}))})),v.forEach((e=>{e.addEventListener("click",(t=>{e.closest(".dict-block__search").querySelector(".form-input").value=""}))}))})();