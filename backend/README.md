# Optional production backend
Suggested production architecture:
- `server.js`: API server entry point
- `routes/`: search, booking, authentication, payment webhook endpoints
- `services/`: flight supplier and payment provider adapters
- `database/`: migrations/schema for users, bookings, passengers, payment status

Do not accept client-side booking/payment success as authoritative. Verify supplier and payment state server-side.
