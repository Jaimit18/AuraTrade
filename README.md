# AuraTrade

A modern, high-performance web application built with React, TypeScript, and Vite, configured with optimized compilation and Oxlint rules for superior code quality and speed.
Live Demo: aura-trade-pj6.vercel.app

🚀 Features

• Lightning-Fast HMR: Powered by Vite for near-instantaneous development feedback cycles.
• Strict Type Safety: Fully integrated with TypeScript to catch errors at compile time.
• Ultra-Fast Linting: Configured with Oxlint to lint code up to 50–100x faster than traditional linters.
• Production Optimized: Configured for highly optimized asset distribution and bundle splitting.

🛠️ Tech Stack

• Frontend Library: React
• Build Tool: Vite
• Language: TypeScript
• Linting: Oxlint
• Hosting: Vercel

💻 Getting Started


Prerequisites

Ensure you have Node.js installed on your machine.

Installation

1. Clone the repository:bash
    git clone https://github.com
    cd AuraTrade
    Use code with caution.
2. Install dependencies:bash
    npm install
    Use code with caution.
3. Start the local development server:bash
    npm run dev
    Use code with caution.
4. Build the application for production:bash
    npm run build
    Use code with caution.
5. Preview the production build locally:bash
    npm run preview
    Use code with caution.

# 🔧 Code Quality & Linting

This project uses Oxlint to maintain codebase integrity. To adjust or expand the linting behavior, modify the .oxlintrc.json configuration file:
json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
