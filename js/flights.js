document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "Vijayawada";
  const to = params.get("to") || "New Delhi";
  const date = params.get("departure") || "";
  const count = Number(params.get("passengers") || 1);
  const title = document.querySelector("#route-title");
  if(title) title.textContent = `${from} → ${to}`;
  const subtitle = document.querySelector("#route-subtitle");
  if(subtitle) subtitle.textContent = `${date || "Choose your travel date"} · ${count} passenger${count===1?"":"s"} · Demo sample fares`;
  const base = [
    {airline:"SkyAir",code:"SA 204",depart:"06:15",arrive:"08:40",duration:145,stops:0,price:4590},
    {airline:"BlueJet",code:"BJ 718",depart:"09:30",arrive:"12:20",duration:170,stops:0,price:5120},
    {airline:"AeroConnect",code:"AC 402",depart:"13:10",arrive:"16:55",duration:225,stops:1,price:3980},
    {airline:"CloudWings",code:"CW 119",depart:"18:25",arrive:"21:05",duration:160,stops:0,price:5790}
  ];
  const list = document.querySelector("#flight-list");
  if(!list) return;
  const render = items => {
    list.innerHTML = items.length ? items.map((f,i)=>`<article class="flight-card">
      <div class="flight-top"><div class="airline"><div class="airline-logo">${f.airline.slice(0,2).toUpperCase()}</div><div><strong>${f.airline}</strong><div class="muted">${f.code} · ${f.stops===0?"Non-stop":"1 stop"}</div></div></div><div><div class="price">₹${(f.price*count).toLocaleString("en-IN")}</div><div class="muted">total for ${count}</div></div></div>
      <div class="flight-times"><div class="time"><strong>${f.depart}</strong><span>${escapeHtml(from)}</span></div><div class="flight-line"><span>${Math.floor(f.duration/60)}h ${f.duration%60}m</span></div><div class="time"><strong>${f.arrive}</strong><span>${escapeHtml(to)}</span></div></div>
      <div class="flight-bottom"><span class="muted">Cabin baggage · Fare rules vary</span><a class="btn btn-primary" href="flight-details.html?flight=${i}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}&passengers=${count}">Select flight</a></div>
    </article>`).join("") : `<div class="empty-state">No demo flights match these filters.</div>`;
  };
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function filtered(){
    let items = [...base];
    const max = Number(document.querySelector("#max-price")?.value || 10000);
    if(document.querySelector("#nonstop")?.checked) items=items.filter(f=>f.stops===0);
    items=items.filter(f=>f.price<=max);
    const sort=document.querySelector("#sort")?.value||"recommended";
    if(sort==="cheapest") items.sort((a,b)=>a.price-b.price);
    if(sort==="fastest") items.sort((a,b)=>a.duration-b.duration);
    if(sort==="earliest") items.sort((a,b)=>a.depart.localeCompare(b.depart));
    render(items);
  }
  document.querySelector("#max-price")?.addEventListener("input", e=>{document.querySelector("#price-value").textContent=`₹${Number(e.target.value).toLocaleString("en-IN")}`;filtered();});
  document.querySelector("#nonstop")?.addEventListener("change",filtered);
  document.querySelector("#sort")?.addEventListener("change",filtered);
  filtered();
});
