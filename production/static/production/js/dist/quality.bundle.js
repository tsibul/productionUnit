(()=>{"use strict";function e(e){const t=e.closest(".login"),o=t.querySelectorAll("input"),n=t.querySelectorAll("textarea");[...o].forEach((e=>{e.value=null})),[...n].forEach((e=>{e.textContent=""})),t.style.display="none"}const t=document.querySelector(".quality-list").closest("section"),o=t.querySelector(".dict-block__content"),n=document.querySelector("#technical-data").querySelector(".quality-list"),r=document.querySelector("#technical-data").querySelector(".qual__row"),c=t.querySelector(".dict-block__search").querySelector(".btn"),l=document.getElementById("date-start"),u=document.getElementById("date-end"),a=document.getElementById("qualityModal"),d=a.querySelector(".btn-close"),i=a.querySelector(".btn-save");c.addEventListener("click",(e=>{e.preventDefault(),o.innerHTML="",async function(e,t){const c=await fetch(`/production/quality_list/${e}/${t}`).then((e=>e.json()));let l;async function u(e,t,o){!function(e,t,o){const n=e.querySelector(".hex");n&&(n.style.backgroundColor=t.hex);for(const n of Object.keys(t)){let r="."+o+n,c=e.querySelector(r);c&&("number"==typeof t[n]?c.textContent=t[n].toString().replace(/\B(?=(\d{3})+(?!\d))/g," "):c.textContent=t[n])}}(e,t,o),e.dataset.id=t.production_id}JSON.parse(c).forEach((e=>{let t;l=n.cloneNode(!0),u(l,e,"req__"),e.quality_reports.forEach((e=>{t=r.cloneNode(!0),u(t,e,"qual__"),l.querySelector(".quality-content").appendChild(t)})),o.appendChild(l)}))}(l.value,u.value).then((e=>{t.querySelectorAll(".qual__row").forEach((e=>{e.addEventListener("click",(e=>{e.target.classList.contains("btn")&&(async function(e){const t=e.closest("details").querySelector("summary"),o=e.closest(".dict-block__row");a.querySelector('[name = "production"]').value=o.dataset.id,a.querySelector("#detail").textContent=t.querySelector(".req__detail").textContent,a.querySelector("#color").textContent=t.querySelector(".req__color").textContent,a.querySelector("#quantity").textContent=t.querySelector(".req__quantity").textContent+" шт",a.querySelector("#user").textContent=t.querySelector(".req__produce_user").textContent,a.querySelector("#date").textContent=t.querySelector(".req__production_date").textContent,a.querySelector("#quantity_checked").textContent=o.querySelector(".qual__quantity_checked").textContent,a.querySelector("#quantity_approved").textContent=o.querySelector(".qual__quantity_approved").textContent,a.querySelector("#quantity_approved_defect").textContent=o.querySelector(".qual__quantity_approved_defect").textContent,a.querySelector("#defect_event").textContent=o.querySelector(".qual__defect_event").textContent,a.querySelector("#comment").textContent=o.querySelector(".qual__comment").textContent;const n=a.querySelector(".modal__block");n.innerHTML="";const r=await fetch(`/production/defects_left/${o.dataset.id}`).then((e=>e.json()));JSON.parse(r).forEach((e=>{n.insertAdjacentHTML("afterbegin",`<div class="modal__check">\n                  <input type="checkbox" name="${e.id}" id="chck-${e.id}">\n                  <label for="chck-${e.id}">${e.name}</label>\n                  </div>`)}))}(e.target),a.style.display="block")}))}))}))})),i.addEventListener("click",(t=>{t.preventDefault();const o=a.querySelector('[name = "production"]').value,n=document.querySelector(`[data-id = "${o}"]`);n.querySelector(".qual__comment").textContent=a.querySelector("#comment").value;const r=a.querySelector(".modal__block").querySelectorAll("input"),c=n.querySelector(".qual__defects"),l=Array.from(r).filter((e=>e.checked)).map((e=>document.querySelector(`label[for="${e.id}"]`).textContent)).join(", ");c.textContent?c.textContent=c.textContent+", "+l:c.textContent=l;const u=a.querySelector("#production-form"),i=new FormData(u);fetch("/production/quality_report_update/",{method:"POST",body:i}).then((t=>e(d)))})),d.addEventListener("click",(()=>{e(d)}))})();