const esbuild = require("esbuild");

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

async function main() {
  const extensionCtx = await esbuild.context({
    entryPoints: ["src/extension/extension.ts"],
    bundle: true,
    format: "cjs",
    platform: "node",
    outfile: "dist/extension.js",
    sourcemap: !production,
    minify: production,
    external: ["vscode"],
  });

  const testCtx = await esbuild.context({
    entryPoints: ["src/tests/index.ts"],
    bundle: true,
    format: "cjs",
    platform: "node",
    outfile: "dist/tests.js",
    sourcemap: false,
    minify: false,
  });

  if (watch) {
    await extensionCtx.watch();
    await testCtx.watch();
  } else {
    await extensionCtx.rebuild();
    await testCtx.rebuild();

    await extensionCtx.dispose();
    await testCtx.dispose();
  }
}

main().catch(() => process.exit(1));
