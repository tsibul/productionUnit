(()=>{"use strict";function e(e){const t=e.closest(".form-row"),n=e.closest(".dict-block__row");t.remove(),"e"!==n.dataset.id?(n.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})),n.querySelector(".id-hidden").setAttribute("form","")):n.remove()}const t={country:"Country",producer:"Producer",materialType:"MaterialType",colorScheme:"ColorScheme",color:"Color",detailName:"DetailName",detailInGoods:"DetailInGoods",mainMaterial:"MainMaterial",addMaterial:"AddMaterial",masterBatch:"MasterBatch",recipe:"Recipe",goods:"Goods",imm:"IMM",productRequest:"ProductionRequest",productReport:"ProductionReport",requestStartStop:"ProductionRequestStartStop",productionForRequest:"ProductionForRequest",qualityForRequest:"QualityForRequest",defects:"Defects",defectEvent:"DefectEvent",qualityReport:"QualityReport",qualityReportDefect:"QualityReportDefects",detail:"DetailInGoods",material_type:"MaterialType",main_material_type:"MaterialType",color_scheme:"ColorScheme",detail_in_goods:"DetailInGoods",detail_name:"DetailName",main_material:"MainMaterial",add_material:"AddMaterial",masterbatch:"MasterBatch",main_master:"MasterBatch",add_master:"MasterBatch",product_request:"ProductionRequest",production_request:"ProductionRequest",defect_event:"DefectEvent",production_for_request:"ProductionForRequest",production:"ProductionReport",quality_report:"QualityReport",defect:"Defects"};function n(e){return t[e.id.split("-")[0]]}function o(e){return fetch(e).then((e=>e.json()))}const c='\n    <div class="dropdown report_dropdown dropdown_dict">\n        <input name="" type="text" class="dropdown__hidden"\n               value="">\n        <div class="dropdown__input-block">\n            <input type="text" class="dropdown__input dropdown__input_dict"\n                   placeholder="Поиск.." \n                   value=""\n                   data-value="">\n            <i class="fa fa-solid fa-angle-down"></i>\n        </div>\n        <ul class="dropdown__content">\n        </ul>\n    </div>\n',a='<div class="dropdown report_dropdown dropdown_dict">\n        <input name="bool" type="text" class="dropdown__hidden"\n               value="1">\n        <div class="dropdown__input-block">\n            <input type="text" class="dropdown__input dropdown__input_dict"\n                   placeholder="Поиск.."\n                   value="Да"\n                   data-value="Да" readonly>\n            <i class="fa fa-solid fa-angle-down"></i>\n        </div>\n        <ul class="dropdown__content">\n            <li data-value="1">Да</li>\n            <li data-value="0">Нет</li>\n        </ul>\n    </div>\n';async function r(e){const n=e.closest(".dropdown"),c=n.closest("form"),a=n.querySelector(".dropdown__hidden").name,r=c.querySelector(`[data-filter="${a}"]`);if(n.querySelector(".dropdown__input").value=e.textContent.trim().replace(/\s+/g," "),n.querySelector(".dropdown__input").dataset.value=e.textContent.trim().replace(/\s+/g," "),n.querySelector(".dropdown__hidden").value=e.dataset.value,e.parentElement.classList.remove("visible"),r){const n=r.closest(".report_dropdown").querySelector("ul");n.innerHTML="",r.value="";const c=r.name;n.closest(".report_dropdown").querySelector(".dropdown__input").value="",n.closest(".report_dropdown").querySelector(".dropdown__input").dataset.value="";const i=`/production/dictionary_json_filter/${t[c]}/${t[a]}/${Number.parseInt(e.dataset.value)}`,l=await o(i);d(n,JSON.parse(l))}}function d(e,t){let n;t.forEach((t=>{n=document.createElement("li"),n.onclick=async function(e){e.stopPropagation(),await r(e.target)},n.dataset.value=Object.keys(t)[0],n.textContent=Object.values(t)[0],e.appendChild(n)}))}function i(e,t){e.contains(t.target)&&e.querySelector("ul").classList.add("visible")}async function l(l,s,u){let p=0;for(const e of u)"DIV"!==e.tagName||e.hidden||(e.classList.contains("foreign-key")?await f(e):e.classList.contains("bool-field")?await y(e):await _(e)),e.hidden=!0;async function _(e){let t;t=document.createElement("input"),t.classList.add("form-input","dict-block__text","dict__form-input"),null!=e.dataset.name?t.name=e.dataset.name:(t.readOnly=!0,t.classList.add("form-input__inactive")),e.classList.contains("date-field")?(t.type="datetime-local",t.value=function(e){const t=e.split(" "),n=t[0].split("."),o=t[1];return`${"20"+n[2]}-${n[1]}-${n[0]}T${o}`}(e.textContent)):(t.type="text",t.setAttribute("value",e.textContent)),s.appendChild(t),p+=1}async function f(e){let n;const a=e.closest(".dict-block__row"),r=t[e.dataset.name];n=document.createElement("div"),n.insertAdjacentHTML("beforeend",c),n.querySelector(".dropdown__input").addEventListener("keyup",(e=>{!function(e){let t,n,o;for(t=e.value.toUpperCase(),n=e.closest(".dropdown").getElementsByTagName("li"),o=0;o<n.length;o++)(n[o].textContent||n[o].innerText).toUpperCase().indexOf(t)>-1?n[o].style.display="":n[o].style.display="none"}(e.target)})),n=n.firstElementChild,n.addEventListener("click",(e=>{!function(e){let t;e.querySelector("ul").classList.contains("visible")&&(t=e),null==t||t.contains(e)||(t.querySelector("ul").classList.remove("visible"),t.querySelector(".dropdown__input").value=t.querySelector(".dropdown__input").dataset.value)}(n)})),n.addEventListener("click",(e=>{i(n,e)})),n.querySelector(".dropdown__hidden").name=e.dataset.name;const l=t[e.dataset.filter],s=n.querySelector(".dropdown__content");let u;if(l&&"e"!==a.dataset.id){const t=a.querySelector(`[data-name = "${e.dataset.filter}"]`).dataset.id;u=`/production/dictionary_json_filter/${r}/${l}/${Number.parseInt(t)}`}else l?(n.querySelector(".dropdown__hidden").dataset.filter=e.dataset.filter,u="/production/dictionary_json_filter/default/default/0"):u=`/production/dictionary_json_filter/${r}/default/0`;const p=await o(u),_=JSON.parse(p);_||(n.querySelector(".dropdown__hidden").value=Object.keys(_[0])[0],n.querySelector(".dropdown__input_dict").value=Object.values(_[0])[0],n.querySelector(".dropdown__input_dict").dataset.value=Object.values(_[0])[0]),d(s,_),m(e,n)}async function y(e){let t;t=document.createElement("div"),t.insertAdjacentHTML("beforeend",a),t=t.firstElementChild,t.querySelectorAll("li").forEach((e=>{e.addEventListener("click",(e=>{e.stopPropagation(),r(e.target)}))})),t.querySelector(".dropdown__hidden").name=e.dataset.name,t.addEventListener("click",(e=>{i(t,e)})),m(e,t)}function m(e,t){t.querySelector(".dropdown__input").value=e.textContent.replace(/\s+/g," "),t.querySelector(".dropdown__input").dataset.value=e.textContent.replace(/\s+/g," "),t.querySelector(".dropdown__hidden").value=e.dataset.id,s.appendChild(t),p+=1}0!==p&&(l.querySelector(".id-hidden")&&l.querySelector(".id-hidden").setAttribute("form","form-dict"),s.appendChild(function(){let c;const a=document.createElement("div");return a.classList.add("dict__button-block","button-block"),c=document.createElement("button"),c.innerHTML='<i class="fa fa-solid fa-xmark" ></i>',c.classList.add("btn","btn-close","dict__btn"),c.addEventListener("click",(t=>{t.stopPropagation(),e(t.target)})),c.type="button",a.appendChild(c),c=document.createElement("button"),c.innerHTML='<i class="fa fa-solid fa-check"></i>',c.classList.add("btn","btn-save","dict__btn"),c.addEventListener("click",(e=>{e.stopPropagation(),function(e){event.preventDefault();const c=e.closest(".form-row"),a=c.parentElement.id.split("-")[0];!function(e,t){const c=e.querySelectorAll("[name]"),a=e.closest(".dict-block__row"),r=e.querySelector('[name = "quantity"]');if(!r||r.value&&"0"!==r.value){const r=new FormData(e);fetch(t,{method:"POST",body:r}).then((async()=>{if(c.forEach((e=>{e.classList.contains("dropdown__hidden")?a.querySelector(`[data-name = ${e.name}]`).textContent=e.parentElement.querySelector(".dropdown__input").value:a.querySelector(`[data-name = ${e.name}]`).textContent=e.value})),e.remove(),a.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})),a.querySelector(".id-hidden").setAttribute("form",""),"e"===a.dataset.id){const e=`/production/dictionary_last_id/${n(a)}`,t=await o(e),c=JSON.parse(t).id__max;a.dataset.id=c,a.querySelector(".id-hidden").value=c,a.id=a.id.split("-")[0]+"-"+c}})).catch((e=>{console.error(e)}))}else e.remove(),"e"!==a.dataset.id?a.childNodes.forEach((function(e){e.hidden&&(e.hidden=!1)})):a.remove()}(c,"/production/dict_update/"+t[a])}(e.target)})),c.type="submit",a.appendChild(c),a}()),l.appendChild(s))}async function s(e){const t=e.childNodes,n=e.classList,o=document.createElement("form");o.classList.add("form-row"),n.forEach((function(e){"dict-block__row"!==e&&o.classList.add(e)})),o.id="form-dict",await l(e,o,t)}function u(e){let t="";return e.closest(".dict-block").querySelector(".dict-block__form-input")&&(t=e.closest(".dict-block").querySelector(".dict-block__form-input").value),""===t&&(t="default"),t}async function p(e,t,n){const o=n.querySelectorAll('div[data-field]:not([data-field = ""])');n.dataset.id=e.id,n.id=n.id.slice(0,-1)+e.id,n.querySelector(".id-hidden").value=e.id;const c=n.querySelector(".hex");c&&(c.style.backgroundColor=e.hex),e.date_close&&(n.classList.add("fulfilled"),n.querySelectorAll(".btn").forEach((e=>{e.setAttribute("disabled",!0),e.classList.add("form-input__inactive")})));for(const t of o){const n=t.dataset.field;t.classList.contains("bool-field")?(t.textContent=e[n]?"Да":"Нет",t.dataset.id=e[n]?"1":"0"):(t.textContent=e[n],t.classList.contains("foreign-key")&&(t.dataset.id=e[n+"_id"]))}}async function _(e,t,c,a,r){const d=e.dataset.last;let i;delete e.dataset.last;const l=t.querySelector(".dict-block__row_hidden"),s=`/production/json_dict_next_20/${n(e)}/${d}/default/${c}/${a}/${r}`,u=await o(s);let _=0;const f=[];for(const e of u)_++,i=l.cloneNode(!0),await p(e,0,i),i.classList.remove("dict-block__row_hidden"),20===_&&(i.dataset.last=Number.parseInt(d)+20),t.appendChild(i),f.push(i);return f}const f=document.getElementById("user-group");function y(e){e.closest(".dict-block__search").querySelector(".form-input").value=""}function m(e){e.preventDefault()}function v(e){const t=e.target.closest(".dict-block__header");t&&t.classList.add("over")}function q(e){const t=e.target.closest(".dict-block__header");t&&t.classList.remove("over")}const h=document.querySelectorAll(".btn_add"),S=document.querySelectorAll(".search_submit"),b=document.querySelectorAll(".search_clear"),w=document.getElementById("showDeleted")?1:0,E=document.querySelectorAll(".dict-block__content"),L=document.querySelectorAll(".dict-block"),k=document.querySelectorAll(".checkbox-out"),g=document.querySelector(".dict-right"),A=document.querySelector(".dict");let C=null;async function x(e,t){t===e.target.closest(".dict-block__row")&&(e.target.classList.contains("btn_delete")?await async function(e,t){const o=e.dataset.id,c=`/production/dict_delete/${n(e)}/${o}`;t?e.querySelector('[data-name = "deleted"]').textContent="Да":e.remove(),await fetch(c)}(t,w):await s(e.target.closest(".dict-block__row")))}function M(e,t){const n=t.target.closest(".dict-block"),o=function(e){const t=e.querySelector(".form-input").value;let n;return n=""===t?"default":t.replaceAll(/  +/g," ").replaceAll(" ","_"),n}(n),c=n.querySelector(".dict-block__content"),a=c.querySelector(".dict-block__row_hidden"),r=a.cloneNode(!0);return r.setAttribute("data-last","0"),c.appendChild(r),c.innerHTML="",c.appendChild(a),[r,o,c]}async function $(e,t){if(e.target===t){const e=function(e){const t=e.cloneNode(!0);return t.id=t.id.slice(0,-1)+"e",t.dataset.id="e",e.after(t),t.classList.remove("dict-block__row_hidden"),t}(t.closest(".dict-block").querySelector(".dict-block__row_hidden"));await s(e)}}function N(e){C=this,e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/html",this.innerHTML)}function D(e){if(C!==this){const t=C.className;C.className=this.className,this.className=t,C.innerHTML=this.innerHTML,this.innerHTML=e.dataTransfer.getData("text/html");const n=this.querySelector(".search_submit"),o=this.querySelector(".dict-block__content");o.querySelectorAll("div").forEach((e=>{e.addEventListener("click",(async t=>{await x(t,e)}))})),this.querySelector(".btn_add").addEventListener("click",(async e=>{await $(e,this.querySelector(".btn_add"))})),n&&(n.addEventListener("click",(async e=>{const t=M(0,e);await _(t[0],t[2],t[1],w,0),t[0].remove()})),n.nextElementSibling.addEventListener("click",(e=>{y(e.target)}))),o.addEventListener("mouseover",(async e=>{const t=o.querySelector('div[data-last]:not([data-last = ""])');if(e.target===t){let e=u(t);e||(e="");const n=await _(t,o,e,0,0);for(let e=0;e<n.length;e++)n[e].addEventListener("click",(t=>{x(t,n[e])}))}}));const c=C.querySelector(".search_submit"),a=C.querySelector(".dict-block__content");a.querySelectorAll("div").forEach((e=>{e.addEventListener("click",(async t=>{await x(t,e)}))})),C.querySelector(".btn_add").addEventListener("click",(async e=>{await $(e,C.querySelector(".btn_add"))})),c&&(c.addEventListener("click",(async e=>{const t=M(0,e);await _(t[0],t[2],t[1],w,0),t[0].remove()})),c.nextElementSibling.addEventListener("click",(e=>{y(e.target)}))),a.addEventListener("mouseover",(async e=>{const t=a.querySelector('div[data-last]:not([data-last = ""])');if(e.target===t){e.preventDefault();let n=u(t);n||(n="");const o=await _(t,a,n,0,0);for(let e=0;e<o.length;e++)o[e].addEventListener("click",(t=>{x(t,o[e])}))}}))}return!1}function T(e){L.forEach((e=>{e.querySelector(".dict-block__header").classList.remove("over")}))}k.forEach((e=>{e.addEventListener("change",(t=>{const n=t.target.id+"-0",o=document.getElementById(n).closest(".dict-block"),c=t.target.closest(".dict-menu__details"),a=c.querySelector(".dict-menu__header");e.checked?function(e,t,n,o){t.open=!0,e.appendChild(t),o.nextElementSibling.classList.add("active"),n.classList.contains("active")||n.classList.add("active")}(g,o,a,t.target):function(e,t,n,o,c){t.open=!1,e.appendChild(t),c.nextElementSibling.classList.remove("active");let a=!0;o.querySelectorAll("input").forEach((e=>{e.checked&&(a=!1)})),a&&n.classList.remove("active")}(A,o,a,c,t.target)}))})),window.onload=function(){const e=document.querySelectorAll(".dict-block__header_block-space"),t=function(e){32===e.keyCode&&e.preventDefault()};e.forEach((e=>{e.onkeyup=t}))},document.querySelectorAll(".color").forEach((e=>{f.value.includes("production")&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".detail-in-goods").forEach((e=>{(f.value.includes("production")||f.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".goods").forEach((e=>{(f.value.includes("production")||f.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".main-material").forEach((e=>{(f.value.includes("production")||f.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".add-material").forEach((e=>{(f.value.includes("production")||f.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".masterbatch").forEach((e=>{(f.value.includes("production")||f.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".producer").forEach((e=>{f.value.includes("production")&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".recipe").forEach((e=>{(f.value.includes("production")||f.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".imm").forEach((e=>{(f.value.includes("production")||f.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".main-material").forEach((e=>{(f.value.includes("production")||f.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".production-request").forEach((e=>{(f.value.includes("production")||f.value.includes("accounts"))&&(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".production").forEach((e=>{f.value.includes("admin")||f.value.includes("production")||(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),document.querySelectorAll(".in-production").forEach((e=>{f.value.includes("admin")||f.value.includes("production")||(e.onclick="",e.querySelectorAll(".btn").forEach((e=>{e.disabled=!0,e.classList.add("form-input__inactive")})))})),document.querySelectorAll(".quality-list").forEach((e=>{f.value.includes("admin")||f.value.includes("logistic")||(e.onclick="",e.querySelector(".btn").disabled=!0,e.querySelector(".btn").classList.add("form-input__inactive"))})),L.forEach((e=>{e.addEventListener("dragstart",N,!1),e.addEventListener("dragover",m,!1),e.addEventListener("dragenter",v),e.addEventListener("dragleave",q),e.addEventListener("drop",D,!1),e.addEventListener("dragend",T)})),addEventListener("mousedown",(function(t){try{const n=document.querySelector("form").closest(".dict-block__row");t.target===n||n.contains(t.target)||e(document.querySelector("form").querySelector(".btn-close"))}catch(e){}})),E.forEach((e=>{e.addEventListener("mouseover",(async t=>{const n=e.querySelector('div[data-last]:not([data-last = ""])');if(t.target===n){let t=u(n);t||(t=""),await _(n,e,t,0,0)}}))})),h.forEach((e=>{e.addEventListener("click",(async t=>{t.preventDefault(),await $(t,e)}))})),E.forEach((e=>{e.addEventListener("click",(async t=>{const n=e.querySelectorAll(".dict-block__row");for(const e of n)await x(t,e)}))})),S.forEach((e=>{e.addEventListener("mousedown",(async e=>{const t=M(0,e);await _(t[0],t[2],t[1],w,0),t[0].remove()}))})),b.forEach((e=>{e.addEventListener("click",(t=>{y(e)}))}))})();