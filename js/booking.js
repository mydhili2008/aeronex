document.addEventListener("DOMContentLoaded", () => {
  const passengerForm = document.querySelector("#passenger-form");
  if (passengerForm) passengerForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(passengerForm).entries());
    const existing = SkyStore.get("skyjourney.booking", {});
    SkyStore.set("skyjourney.booking", {...existing, passenger:data});
    location.href = "seats.html";
  });
  const paymentForm = document.querySelector("#payment-form");
  if (paymentForm) paymentForm.addEventListener("submit", e => {
    e.preventDefault();
    const booking = SkyStore.get("skyjourney.booking", {});
    const ref = SkyStore.makeReference();
    const confirmed = {...booking, reference:ref, demoStatus:"DEMO ONLY — NOT A REAL TICKET", createdAt:new Date().toISOString()};
    const all = SkyStore.get("skyjourney.bookings", []);
    all.unshift(confirmed);
    SkyStore.set("skyjourney.bookings", all);
    SkyStore.set("skyjourney.booking", confirmed);
    location.href = "confirmation.html";
  });
  const confirmation = document.querySelector("#confirmation-content");
  if (confirmation) {
    const b=SkyStore.get("skyjourney.booking", {});
    confirmation.innerHTML = `<div class="notice success">Demo flow complete. No payment was taken and no ticket was issued.</div>
      <h2>Booking reference: ${b.reference || "SJ-DEMO"}</h2>
      <p><strong>Status:</strong> ${b.demoStatus || "DEMO PREVIEW"}</p>
      <p><strong>Passenger:</strong> ${escapeHtml([b.passenger?.firstName,b.passenger?.lastName].filter(Boolean).join(" ") || "Demo passenger")}</p>
      <p><strong>Route:</strong> ${escapeHtml(b.from || "Vijayawada")} → ${escapeHtml(b.to || "New Delhi")}</p>
      <a class="btn btn-primary" href="my-bookings.html">View my bookings</a>`;
  }
  const bookings = document.querySelector("#bookings-list");
  if(bookings) {
    const all=SkyStore.get("skyjourney.bookings",[]);
    bookings.innerHTML=all.length?all.map(b=>`<article class="card"><div class="pill">${escapeHtml(b.reference||"Demo")}</div><h3>${escapeHtml(b.from||"Vijayawada")} → ${escapeHtml(b.to||"New Delhi")}</h3><p>${escapeHtml(b.passenger?.firstName||"Passenger")} · ${escapeHtml(b.demoStatus||"Demo booking")}</p><p class="muted">${b.createdAt?new Date(b.createdAt).toLocaleString():""}</p></article>`).join(""):`<div class="empty-state"><h2>No saved demo bookings yet</h2><p>Complete the sample booking flow to see it here.</p><a class="btn btn-primary" href="index.html">Search flights</a></div>`;
  }
  const seatMap = document.querySelector("#seat-map");
  if(seatMap) {
    const chosen = new Set(SkyStore.get("skyjourney.seats", []));
    const occupied = new Set(["1A","1F","2C","3D","4A","5F","6B","7E"]);
    const letters=["A","B","C","D","E","F"];
    for(let row=1;row<=8;row++) for(const letter of letters) {
      const id=`${row}${letter}`, btn=document.createElement("button");
      btn.type="button"; btn.className="seat"; btn.textContent=id;
      btn.setAttribute("aria-label",`Seat ${id}`);
      if(occupied.has(id)){btn.classList.add("occupied");btn.disabled=true;}
      if(chosen.has(id))btn.classList.add("selected");
      btn.addEventListener("click",()=>{
        if(chosen.has(id))chosen.delete(id);else if(chosen.size<4)chosen.add(id);
        seatMap.querySelectorAll(".seat").forEach(s=>s.classList.toggle("selected",chosen.has(s.textContent)));
        SkyStore.set("skyjourney.seats",[...chosen]);
        const label=document.querySelector("#selected-seats");
        if(label)label.textContent=chosen.size?[...chosen].join(", "):"No seats selected";
      });
      seatMap.append(btn);
    }
    const label=document.querySelector("#selected-seats");
    if(label)label.textContent=chosen.size?[...chosen].join(", "):"No seats selected";
    document.querySelector("#continue-seats")?.addEventListener("click",()=>{
      const b=SkyStore.get("skyjourney.booking",{});
      SkyStore.set("skyjourney.booking",{...b,seats:[...chosen]});
      location.href="payment.html";
    });
  }
  const loginForm=document.querySelector("#login-form");
  loginForm?.addEventListener("submit",e=>{
    e.preventDefault();
    const msg=document.querySelector("#login-message");
    msg.textContent="Demo only: authentication is not connected. Add a secure backend for real accounts.";
    msg.className="notice";
  });
  const checkin=document.querySelector("#checkin-form");
  checkin?.addEventListener("submit",e=>{
    e.preventDefault();
    const msg=document.querySelector("#checkin-message");
    msg.textContent="Demo only: check-in requires a real airline booking and supplier integration.";
    msg.className="notice";
  });
});
