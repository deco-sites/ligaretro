import { defineConfig } from "$fresh/server.ts";
import { plugins } from "deco/plugins/deco.ts";
import partytownPlugin from "partytown/mod.ts";
import decoManifest from "./manifest.gen.ts";

export default defineConfig({
  plugins: [
    ...plugins({
      manifest: decoManifest,
      // deno-lint-ignore no-explicit-any
      
    }),
    partytownPlugin(),
  ],
});
