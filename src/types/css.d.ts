// Ambient declaration for global CSS side-effect imports (e.g. `import "./globals.css"`).
// Next.js only ships types for `*.module.css`, so TypeScript 5.9+ flags plain
// `*.css` side-effect imports (error 2882). This restores them as valid modules.
declare module "*.css";
