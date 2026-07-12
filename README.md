# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Project Setup (BusLagbe)

This workspace contains a React frontend (`/src`) and a minimal Express + MongoDB backend under `/server`.

Backend quick start:

```bash
cd server
cp .env.example .env
# edit server/.env and set MONGODB_URI and PORT
npm install
npm run dev
```

Frontend quick start:

```bash
cd ..
npm install
npm run dev
```

By default the frontend uses `VITE_API_BASE=http://localhost:4000`. Change this in the project root `.env` if your server runs elsewhere.

Security note: Never commit real credentials. Use `server/.env.example` as a template and keep `server/.env` out of source control.
