# Lendsqr Frontend Test — My Implementation

This repository contains my solution for the Lendsqr frontend assessment. I used a modern React + TypeScript stack, integrating a local mock API (json-server) to streamline UI development, routing, and data management.

## Features Implemented
- **Responsive Login Page:** SCSS, with a split layout (logo/illustration left, login form right).
- **Mock Authentication:** On login, a token is stored in localStorage and the user is redirected to the dashboard.
- **Dashboard Placeholder:** Simple landing page post-login.
- **Users Page:** Fetches and displays a list of users from a local mock API, with navigation to user detail pages.
- **User Details Page:** Loads user data by ID, supports editing and persists changes to localStorage.
- **Basic Testing:** Includes a test for the login page using Vitest and React Testing Library.

## Tech Stack
- **Vite:** Fast development/build tool for React + TypeScript.
- **React 18:** Modern component-based UI library.
- **TypeScript:** Type safety for maintainable code.
- **React Router v6:** Declarative client-side routing.
- **React Query:** Data fetching, caching, and synchronization.
- **SCSS:** Custom styling alongside MUI.
- **Axios:** Typed HTTP client for API requests.
- **json-server:** Local REST API for rapid prototyping.
- **Faker:** Generates realistic mock user data.
- **Jest:** Wrote comprehensive unit tests for positive and negative outcomes
- **Testing Library:** Along with Jest, fast, modern unit testing setup.
- **concurrently:** Runs dev and mock API servers together.

## Project Structure
```
src/
  App.tsx                 # App routes
  main.tsx                # Entry point, BrowserRouter, global styles
  styles/main.scss        # Global styles
  pages/
    Login.tsx             # Login page
    Dashboard.tsx         # Dashboard
    Users.tsx             # User list
    UserDetails.tsx       # User details/edit
  components/
    LoginForm/            # Login form UI/logic
    icons/                # SVG icons
  theme/                  # MUI theme config
  __tests__/              # Tests
  setupTests.ts           # Test setup
scripts/
  generate-mock.js        # Mock data generator
mock/
  db.json                 # Generated mock data
```

## Implementation Highlights
- **Login & Theming:** Custom MUI theme applied via ThemeProvider; login logic stores a token and redirects.
- **Routing:** Defined in `App.tsx` for `/login`, `/dashboard`, `/users`, `/users/:id`.
- **Data Handling:** Uses Axios and React Query to fetch from json-server; edits persist to localStorage.
- **Testing:** Vitest with jsdom and Testing Library for component tests.

## Getting Started
1. **Install dependencies**
   ```
   npm install
   ```
2. **Generate mock data**
   ```
   npm run generate:mock
   ```
3. **Start dev and mock API servers**
   ```
   npm run start:all
   ```
   - Dev: http://localhost:5173
   - API: http://localhost:4000/users

   Or run separately:
   ```
   npm run mock:server
   npm run dev
   ```
4. **Run tests**
   ```
   npm test
   ```
5. **Build and preview**
   ```
   npm run build
   npm run preview
   ```

## API Shape
Example user object:
```
{
  id: number,
  fullName: string,
  email: string,
  phone: string
}
```
Endpoints: `/users`, `/users/:id`

## Troubleshooting
- **Missing jsdom:** `npm i -D jsdom`
- **TypeScript test globals:** Add `"types": ["vitest/globals", "vite/client"]` to `tsconfig.json`
- **Port conflicts:** Change ports in `package.json` or stop conflicting processes.

## Next Steps
- UI polish and Figma parity
- Table features: pagination, sorting, filtering
- Improved form validation and UX
- Route guards/auth context
- Accessibility improvements
- More tests (unit/e2e)
- Deployment (Vercel/Netlify)

## Scripts Reference
- `dev` — Start Vite dev server
- `build` — Production build
- `preview` — Preview build
- `generate:mock` — Generate mock data
- `mock:server` — Run json-server
- `start:all` — Run dev and API servers
- `test` — Run tests

---

I focused on clean structure, rapid iteration, and a realistic workflow: local API mocking, component-driven UI, and TypeScript for safety.

## Deployment

You can deploy this app to Vercel or Netlify. The `public/mock/db.json` is included for static hosting.

**Vercel:**
1. Import your GitHub repo.
2. Use defaults: Framework = Vite, Build = `npm run build`, Output = `dist`.
3. Deploy and access your site at the provided URL.

**Netlify:** Drag-and-drop `dist` or connect your repo, set build command and publish directory as above.
