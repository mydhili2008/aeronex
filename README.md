# SkyJourney — Flight Booking Website

A responsive multi-page flight-booking frontend starter built with HTML, CSS, and vanilla JavaScript. Includes animated aviation hero, search, demo flight results, fare details, passenger form, seat map, payment demo, confirmation, bookings, check-in, offers, destinations, and login/register UI.

## Run locally
1. Extract the ZIP.
2. Open `skyjourney-flight-booking/` in VS Code.
3. Start a local server (recommended): install the VS Code **Live Server** extension, then right-click `index.html` → **Open with Live Server**.
4. Or run `python -m http.server 8000` from this directory and visit `http://localhost:8000`.

## Demo limitations
- Flights and prices are sample data, not live inventory.
- Demo booking data is stored in browser `localStorage`.
- Payment page is a UI demo only. It does not process payments or issue tickets.
- Production use requires a backend, flight supplier/airline API, secure payment provider, authentication, database, and server-side booking verification.
- Never place API secrets or payment credentials in frontend JavaScript.

## Pages
`index.html`, `flights.html`, `flight-details.html`, `passengers.html`, `seats.html`, `payment.html`, `confirmation.html`, `my-bookings.html`, `check-in.html`, `offers.html`, `destinations.html`, `login.html`.

## Optional 3D
The hero has CSS airplane/cloud motion out of the box. For a real 3D model, add a licensed `.glb`/`.gltf` aircraft to `assets/models/` and integrate Three.js. See `assets/models/README.md`.
