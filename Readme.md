
# TypoDO

TypoDO is a lightweight, TypeScript-first todo web app prototype that demonstrates a clean separation between types and app logic, compiled to plain JavaScript for browser use.

**Technologies**
- HTML: [index.html](index.html)
- CSS: [css/style.css](css/style.css)
- JavaScript (build output): [js/main.js](js/main.js)
- TypeScript (source): [ts/main.ts](ts/main.ts), [ts/types.ts](ts/types.ts)
- Build tooling: `npm` + TypeScript (`tsc`) ([package.json](package.json))

**Key Features**
- TypeScript-based code organization with separate `types` and `main` modules.
- Simple, dependency-light build process using `tsc`.
- Static client-side app — no backend required.
- Ready-to-open `index.html` for manual testing or serving with a static server.

**Getting Started**

1. Clone the repository:

	git clone <repository-url>
	cd TypoDO

2. Install development dependencies:

	npm install

3. Build the TypeScript sources into JavaScript:

	npm run build

4. Open the app:

- Open [index.html](index.html) directly in your browser, or
- Serve the folder with a static server (recommended for full feature parity):

  npx serve .

**Development**
- Edit source files in the `ts/` directory.
- Re-run `npm run build` to compile changes to the `js/` folder.
- Use your editor's Live Server extension or `npx serve` to auto-refresh while developing.

**Project Structure (Highlights)**
- [index.html](index.html) — main entry page
- [css/style.css](css/style.css) — styles
- [js/main.js](js/main.js) — compiled script (output)
- [ts/main.ts](ts/main.ts) — TypeScript application logic
- [ts/types.ts](ts/types.ts) — TypeScript types
- [package.json](package.json) — build script and devDependencies

**Contributing**
- Open issues for bugs or feature requests.
- Feel free to submit pull requests with clear descriptions and tests where appropriate.

**License & Author**
- License: ISC (see [package.json](package.json))
- Author: Your Name Here
