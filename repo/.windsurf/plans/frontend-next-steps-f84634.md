# Frontend UI + Auth (next step)

Build the first usable React UI for the system by adding routing, a login flow backed by the existing `/auth/login` API, and role-based navigation/pages (ADMIN/VENDEDOR/REPOSITOR) without changing backend behavior beyond what’s already implemented.

## Current state (what I observed)
- Backend already has JWT auth + roles + RBAC by endpoint.
- Frontend is a default Vite+React scaffold (`App.jsx` is the template) and has no router/UI structure yet.

## Proposed plan (UI)
1) Add routing + layout skeleton
- Add `react-router-dom`.
- Create a minimal app layout with:
  - Public route: `/login`
  - Private routes: `/` (dashboard), `/ventas`, `/stock`, `/clientes`, `/productos`, `/sucursales`, `/usuarios`

2) Add an API client with token handling
- Create a small `apiClient` wrapper around `fetch`.
- Store the JWT access token in memory + `localStorage` (simple for TP; easy to reason about).
- Automatically attach `Authorization: Bearer <token>` to API calls.

3) Auth state + route guards
- Create an `AuthProvider` (React context) exposing:
  - `login(email,password)`
  - `logout()`
  - `user` (decoded from token or fetched from `/auth/me`)
- Add `RequireAuth` route guard.

4) Role-based navigation + pages (minimum viable)
- `ADMIN`
  - Users page: list users (`GET /auth/users`) + create user (`POST /auth/users`)
  - CRUD pages (can be basic tables + forms): clientes/productos/sucursales
- `VENDEDOR`
  - Ventas page: list + create venta (`POST /ventas/registrar`)
- `REPOSITOR`
  - Stock page: list + reponer (`POST /stocks/reponer`)

5) UX basics
- Error handling: show API errors (401/403/400) clearly.
- Loading states.
- Simple role badge and “current user” display.

## Decisions / questions to confirm before coding
- Should the frontend run at `http://localhost:5173` and backend at `http://localhost:3000` (default)?
- Do you want to keep UI text in Spanish (recommended for the course) or English?

## Deferred (explicitly)
- Automated tests: deferred for now as requested; we’ll revisit later to meet Aprobación Directa.
