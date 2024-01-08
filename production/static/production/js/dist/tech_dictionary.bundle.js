(()=>{"use strict";function e(e){const t=e.closest(".form-row"),o=e.closest(".dict-block__row");t.remove(),"e"!==o.dataset.id?(o.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})),o.querySelector(".id-hidden").setAttribute("form","")):o.remove()}const t={country:"Country",producer:"Producer",materialType:"MaterialType",colorScheme:"ColorScheme",color:"Color",detailName:"DetailName",detailInGoods:"DetailInGoods",mainMaterial:"MainMaterial",addMaterial:"AddMaterial",masterBatch:"MasterBatch",recipe:"Recipe",recipeDetail:"RecipeDetail",goods:"Goods",imm:"IMM",productRequest:"ProductionRequest",productReport:"ProductionReport",requestStartStop:"ProductionRequestStartStop",productionForRequest:"ProductionForRequest",qualityForRequest:"QualityForRequest",defects:"Defects",defectEvent:"DefectEvent",qualityReport:"QualityReport",qualityReportDefect:"QualityReportDefects",recipeColorScheme:"RecipeColorScheme",detailBaseWeight:"DetailBaseWeight",detailActualWeight:"DetailActualWeight",detail:"DetailInGoods",material_type:"MaterialType",main_material_type:"MaterialType",color_scheme:"ColorScheme",detail_in_goods:"DetailInGoods",detail_name:"DetailName",main_material:"MainMaterial",add_material:"AddMaterial",masterbatch:"MasterBatch",main_master:"MasterBatch",add_master:"MasterBatch",product_request:"ProductionRequest",production_request:"ProductionRequest",defect_event:"DefectEvent",production_for_request:"ProductionForRequest",production:"ProductionReport",quality_report:"QualityReport",defect:"Defects",recipe_detail:"RecipeDetail",recipe_color_scheme:"RecipeColorScheme",detail_base_weight:"DetailBaseWeight",detail_actual_weight:"DetailActualWeight"};function o(e){return t[e.id.split("-")[0]]}function c(e){return fetch(e).then((e=>e.json()))}const n='\n    <div class="dropdown report_dropdown dropdown_dict">\n        <input name="" type="text" class="dropdown__hidden"\n               value="">\n        <div class="dropdown__input-block">\n            <input type="text" class="dropdown__input dropdown__input_dict"\n                   placeholder="Поиск.." \n                   value=""\n                   data-value="">\n            <i class="fa fa-solid fa-angle-down"></i>\n        </div>\n        <ul class="dropdown__content">\n        </ul>\n    </div>\n',a='<div class="dropdown report_dropdown dropdown_dict">\n        <input name="bool" type="text" class="dropdown__hidden"\n               value="1">\n        <div class="dropdown__input-block">\n            <input type="text" class="dropdown__input dropdown__input_dict"\n                   placeholder="Поиск.."\n                   value="Да"\n                   data-value="Да" readonly>\n            <i class="fa fa-solid fa-angle-down"></i>\n        </div>\n        <ul class="dropdown__content">\n            <li data-value="1">Да</li>\n            <li data-value="0">Нет</li>\n        </ul>\n    </div>\n';async function i(e){const o=e.closest(".dropdown"),n=o.closest("form"),a=o.querySelector(".dropdown__hidden").name,i=n.querySelector(`[data-filter="${a}"]`);if(o.querySelector(".dropdown__input").value=e.textContent.trim().replace(/\s+/g," "),o.querySelector(".dropdown__input").dataset.value=e.textContent.trim().replace(/\s+/g," "),o.querySelector(".dropdown__hidden").value=e.dataset.value,e.parentElement.classList.remove("visible"),i){const o=i.closest(".report_dropdown").querySelector("ul");o.innerHTML="",i.value="";const n=i.name;o.closest(".report_dropdown").querySelector(".dropdown__input").value="",o.closest(".report_dropdown").querySelector(".dropdown__input").dataset.value="";const l=`/production/dictionary_json_filter/${t[n]}/${t[a]}/${Number.parseInt(e.dataset.value)}`,r=await c(l);d(o,JSON.parse(r))}}function d(e,t){let o;t.forEach((t=>{o=document.createElement("li"),o.onclick=async function(e){e.stopPropagation(),await i(e.target)},o.dataset.value=Object.keys(t)[0],o.textContent=Object.values(t)[0],e.appendChild(o)}))}function l(e,t){e.contains(t.target)&&e.querySelector("ul").classList.add("visible")}async function r(r,s,u){let p=0;for(const e of u)"DIV"!==e.tagName||e.hidden||(e.classList.contains("foreign-key")?await m(e):e.classList.contains("bool-field")?await f(e):await _(e)),e.hidden=!0;async function _(e){let t;t=document.createElement("input"),t.classList.add("form-input","dict-block__text","dict__form-input"),null!=e.dataset.name?t.name=e.dataset.name:(t.readOnly=!0,t.classList.add("form-input__inactive")),e.classList.contains("date-field")?(t.type="datetime-local",t.value=function(e){const t=e.split(" "),o=t[0].split("."),c=t[1];return`${"20"+o[2]}-${o[1]}-${o[0]}T${c}`}(e.textContent)):(t.type="text",t.setAttribute("value",e.textContent)),s.appendChild(t),p+=1}async function m(e){let o;const a=e.closest(".dict-block__row"),i=t[e.dataset.name];o=document.createElement("div"),o.insertAdjacentHTML("beforeend",n),o.querySelector(".dropdown__input").addEventListener("keyup",(e=>{!function(e){let t,o,c;for(t=e.value.toUpperCase(),o=e.closest(".dropdown").getElementsByTagName("li"),c=0;c<o.length;c++)(o[c].textContent||o[c].innerText).toUpperCase().indexOf(t)>-1?o[c].style.display="":o[c].style.display="none"}(e.target)})),o=o.firstElementChild,o.addEventListener("click",(e=>{!function(e){let t;e.querySelector("ul").classList.contains("visible")&&(t=e),null==t||t.contains(e)||(t.querySelector("ul").classList.remove("visible"),t.querySelector(".dropdown__input").value=t.querySelector(".dropdown__input").dataset.value)}(o)})),o.addEventListener("click",(e=>{l(o,e)})),o.querySelector(".dropdown__hidden").name=e.dataset.name;const r=t[e.dataset.filter],s=o.querySelector(".dropdown__content");let u;if(r&&"e"!==a.dataset.id){const t=a.querySelector(`[data-name = "${e.dataset.filter}"]`).dataset.id;u=`/production/dictionary_json_filter/${i}/${r}/${Number.parseInt(t)}`}else r?(o.querySelector(".dropdown__hidden").dataset.filter=e.dataset.filter,u="/production/dictionary_json_filter/default/default/0"):u=`/production/dictionary_json_filter/${i}/default/0`;const p=await c(u),_=JSON.parse(p);_||(o.querySelector(".dropdown__hidden").value=Object.keys(_[0])[0],o.querySelector(".dropdown__input_dict").value=Object.values(_[0])[0],o.querySelector(".dropdown__input_dict").dataset.value=Object.values(_[0])[0]),d(s,_),y(e,o)}async function f(e){let t;t=document.createElement("div"),t.insertAdjacentHTML("beforeend",a),t=t.firstElementChild,t.querySelectorAll("li").forEach((e=>{e.addEventListener("click",(e=>{e.stopPropagation(),i(e.target)}))})),t.querySelector(".dropdown__hidden").name=e.dataset.name,t.addEventListener("click",(e=>{l(t,e)})),y(e,t)}function y(e,t){t.querySelector(".dropdown__input").value=e.textContent.replace(/\s+/g," "),t.querySelector(".dropdown__input").dataset.value=e.textContent.replace(/\s+/g," "),t.querySelector(".dropdown__hidden").value=e.dataset.id,s.appendChild(t),p+=1}0!==p&&(r.querySelector(".id-hidden")&&r.querySelector(".id-hidden").setAttribute("form","form-dict"),s.appendChild(function(){let n;const a=document.createElement("div");return a.classList.add("dict__button-block","button-block"),n=document.createElement("button"),n.innerHTML='<i class="fa fa-solid fa-xmark" ></i>',n.classList.add("btn","btn-close","dict__btn"),n.addEventListener("click",(t=>{t.stopPropagation(),e(t.target)})),n.type="button",a.appendChild(n),n=document.createElement("button"),n.innerHTML='<i class="fa fa-solid fa-check"></i>',n.classList.add("btn","btn-save","dict__btn"),n.addEventListener("click",(e=>{e.stopPropagation(),function(e){event.preventDefault();const n=e.closest(".form-row"),a=n.parentElement.id.split("-")[0];!function(e,t){const n=e.querySelectorAll("[name]"),a=e.closest(".dict-block__row"),i=e.querySelector('[name = "quantity"]');if(!i||i.value&&"0"!==i.value){const i=new FormData(e);fetch(t,{method:"POST",body:i}).then((async()=>{if(n.forEach((e=>{e.classList.contains("dropdown__hidden")?a.querySelector(`[data-name = ${e.name}]`).textContent=e.parentElement.querySelector(".dropdown__input").value:a.querySelector(`[data-name = ${e.name}]`).textContent=e.value})),e.remove(),a.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})),a.querySelector(".id-hidden").setAttribute("form",""),"e"===a.dataset.id){const e=`/production/dictionary_last_id/${o(a)}`,t=await c(e),n=JSON.parse(t).id__max;a.dataset.id=n,a.querySelector(".id-hidden").value=n,a.id=a.id.split("-")[0]+"-"+n}})).catch((e=>{console.error(e)}))}else e.remove(),"e"!==a.dataset.id?a.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})):a.remove()}(n,"/production/dict_update/"+t[a])}(e.target)})),n.type="submit",a.appendChild(n),a}()),r.appendChild(s))}async function s(e){const t=e.childNodes,o=e.classList,c=document.createElement("form");c.classList.add("form-row"),o.forEach((function(e){"dict-block__row"!==e&&c.classList.add(e)})),c.id="form-dict",await r(e,c,t)}async function u(e,t,o){const c=o.querySelectorAll('div[data-field]:not([data-field = ""])');o.dataset.id=e.id,o.id=o.id.slice(0,-1)+e.id,o.querySelector(".id-hidden").value=e.id;const n=o.querySelector(".hex");n&&(n.style.backgroundColor=e.hex),e.date_close&&(o.classList.add("fulfilled"),o.querySelectorAll(".btn").forEach((e=>{e.setAttribute("disabled",!0),e.classList.add("form-input__inactive")})));for(const t of c){const o=t.dataset.field;t.classList.contains("bool-field")?(t.textContent=e[o]?"Да":"Нет",t.dataset.id=e[o]?"1":"0"):(t.textContent=e[o],t.classList.contains("foreign-key")&&(t.dataset.id=e[o+"_id"]))}}async function p(e,t,n,a,i){const d=e.dataset.last;let l;delete e.dataset.last;const r=t.querySelector(".dict-block__row_hidden"),s=`/production/json_dict_next_20/${o(e)}/${d}/default/${n}/${a}/${i}`,p=await c(s);let _=0;const m=[];for(const e of p)_++,l=r.cloneNode(!0),await u(e,0,l),l.classList.remove("dict-block__row_hidden"),20===_&&(l.dataset.last=Number.parseInt(d)+20),t.appendChild(l),m.push(l);return m}const _=document.getElementById("user-group");function m(e,t,o,c,n){t.open=!1,e.appendChild(t),n.nextElementSibling.classList.remove("active");let a=!0;c.querySelectorAll("input").forEach((e=>{e.checked&&(a=!1)})),a&&o.classList.remove("active")}const f=document.querySelectorAll(".btn_add"),y=document.querySelectorAll(".search_submit"),v=document.querySelectorAll(".search_clear"),h=document.getElementById("showDeleted")?1:0,q=document.querySelectorAll(".dict-block__content"),S=document.querySelectorAll(".checkbox-out"),b=document.querySelector(".dict-right"),w=document.querySelector(".dict"),k=document.querySelectorAll(".dict-block");async function E(e,t){t===e.target.closest(".dict-block__row")&&(e.target.classList.contains("btn_delete")?await async function(e,t){const c=e.dataset.id,n=`/production/dict_delete/${o(e)}/${c}`;t?e.querySelector('[data-name = "deleted"]').textContent="Да":e.remove(),await fetch(n)}(t,h):await s(e.target.closest(".dict-block__row")))}S.forEach((e=>{e.addEventListener("change",(t=>{const o=t.target.id+"-0",c=document.getElementById(o).closest(".dict-block"),n=t.target.closest(".dict-menu__details"),a=n.querySelector(".dict-menu__header");e.checked?(function(e,t,o,c){t.open=!0,e.appendChild(t),c.nextElementSibling.classList.add("active"),o.classList.contains("active")||o.classList.add("active")}(b,c,a,t.target),k.forEach((e=>{if(e!==c){const t=e.querySelector("div[id]").id.slice(0,-2),o=document.getElementById(t);if(o.checked){const t=o.closest(".dict-menu__details"),c=t.querySelector(".dict-menu__header");o.checked=!1,m(w,e,c,t,o)}}}))):m(w,c,a,n,t.target)}))})),window.onload=function(){const e=document.querySelectorAll(".dict-block__header_block-space"),t=function(e){32===e.keyCode&&e.preventDefault()};e.forEach((e=>{e.onkeyup=t}))},document.querySelectorAll(".color").forEach((e=>{_.value.includes("production")&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".detail-in-goods").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".goods").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".main-material").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".add-material").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".masterbatch").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".producer").forEach((e=>{_.value.includes("production")&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".recipe").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".imm").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".main-material").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".production-request").forEach((e=>{(_.value.includes("production")||_.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".production").forEach((e=>{_.value.includes("admin")||_.value.includes("production")||(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".in-production").forEach((e=>{_.value.includes("admin")||_.value.includes("production")||(e.onclick="",e.querySelectorAll(".btn").forEach((e=>{e.disabled=!0,e.classList.add("form-input__inactive")})))})),document.querySelectorAll(".quality-list").forEach((e=>{_.value.includes("admin")||_.value.includes("logistic")||(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),addEventListener("mousedown",(function(t){try{const o=document.querySelector("form").closest(".dict-block__row");t.target===o||o.contains(t.target)||e(document.querySelector("form").querySelector(".btn-close"))}catch(e){}})),q.forEach((e=>{e.addEventListener("mouseover",(async t=>{const o=e.querySelector('div[data-last]:not([data-last = ""])');if(t.target===o){let t=function(e){let t="";return e.closest(".dict-block").querySelector(".dict-block__form-input")&&(t=e.closest(".dict-block").querySelector(".dict-block__form-input").value),""===t&&(t="default"),t}(o);t||(t=""),await p(o,e,t,0,0)}}))})),f.forEach((e=>{e.addEventListener("click",(async t=>{t.preventDefault(),await async function(e,t){if(e.target===t){const e=function(e){const t=e.cloneNode(!0);return t.id=t.id.slice(0,-1)+"e",t.dataset.id="e",e.after(t),t.classList.remove("dict-block__row_hidden"),t}(t.closest(".dict-block").querySelector(".dict-block__row_hidden"));await s(e)}}(t,e)}))})),q.forEach((e=>{e.addEventListener("click",(async t=>{const o=e.querySelectorAll(".dict-block__row");for(const e of o)await E(t,e)}))})),y.forEach((e=>{e.addEventListener("mousedown",(async e=>{const t=function(e,t){const o=t.target.closest(".dict-block"),c=function(e){const t=e.querySelector(".form-input").value;let o;return o=""===t?"default":t.replaceAll(/  +/g," ").replaceAll(" ","_"),o}(o),n=o.querySelector(".dict-block__content"),a=n.querySelector(".dict-block__row_hidden"),i=a.cloneNode(!0);return i.setAttribute("data-last","0"),n.appendChild(i),n.innerHTML="",n.appendChild(a),[i,c,n]}(0,e);await p(t[0],t[2],t[1],h,0),t[0].remove()}))})),v.forEach((e=>{e.addEventListener("click",(t=>{e.closest(".dict-block__search").querySelector(".form-input").value=""}))}))})();