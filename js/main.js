(() => {
  const navItems = [
    ["Home","index.html"],["Flights","flights.html"],["Destinations","destinations.html"],
    ["Offers","offers.html"],["My Bookings","my-bookings.html"]
  ];
  const path = location.pathname.split("/").pop() || "index.html";
  const header = document.querySelector("[data-site-header]");
  const footer = document.querySelector("[data-site-footer]");
  if (header) {
    header.innerHTML = `<a class="logo" href="index.html"><span class="logo-mark">✈</span>SkyJourney</a>
      <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰ Menu</button>
      <nav class="site-nav">${navItems.map(([name,url])=>`<a class="${path===url?'active':''}" href="${url}">${name}</a>`).join("")}</nav>
      <div class="header-actions"><a href="login.html">Sign in</a></div>`;
    const toggle = header.querySelector(".menu-toggle");
    toggle?.addEventListener("click", () => {
      const nav = header.querySelector(".site-nav");
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
  if (footer) footer.innerHTML = `<div class="footer-grid">
    <div><a class="logo" href="index.html">✈ SkyJourney</a><p>Thoughtful journeys start here. This is a demonstration booking website.</p></div>
    <div><h3>Explore</h3><a href="flights.html">Search flights</a><a href="destinations.html">Destinations</a><a href="offers.html">Offers</a></div>
    <div><h3>Support</h3><a href="my-bookings.html">Manage booking</a><a href="check-in.html">Check-in</a><a href="login.html">Account</a></div>
  </div><p>© 2026 SkyJourney · Demo only · No live ticketing or payment processing</p>`;
  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
})();
