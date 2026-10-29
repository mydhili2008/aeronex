document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#flight-search");
  if (!form) return;
  const $ = id => document.getElementById(id);
  const departure = $("departure"), ret = $("return-date");
  const today = new Date();
  const localToday = [today.getFullYear(),String(today.getMonth()+1).padStart(2,"0"),String(today.getDate()).padStart(2,"0")].join("-");
  if (departure) departure.min = localToday;
  if (ret) ret.min = localToday;
  departure?.addEventListener("change", () => {
    ret.min = departure.value || localToday;
    if (ret.value && ret.value < departure.value) ret.value = "";
  });
  $("swap")?.addEventListener("click", () => {
    const from = $("origin"), to = $("destination"), value = from.value;
    from.value = to.value; to.value = value;
  });
  document.querySelectorAll("[data-trip]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-trip]").forEach(b=>b.classList.toggle("active",b===button));
    if (ret) { ret.disabled = button.dataset.trip === "oneway"; if(ret.disabled) ret.value = ""; }
  }));
  form.addEventListener("submit", event => {
    event.preventDefault();
    const from = $("origin").value.trim(), to = $("destination").value.trim();
    const message = $("search-message");
    if (from.toLowerCase() === to.toLowerCase()) { message.textContent = "Choose different departure and arrival cities."; message.className = "notice error"; return; }
    if (ret?.value && ret.value < departure.value) { message.textContent = "Return date must be on or after departure."; message.className = "notice error"; return; }
    const params = new URLSearchParams({from,to,departure:departure.value,return:ret?.value||"",passengers:$("passengers").value,cabin:$("cabin")?.value||"Economy"});
    location.href = `flights.html?${params}`;
  });
});
