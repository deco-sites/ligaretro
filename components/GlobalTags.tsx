import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />
      <style>{`@font-face {
          font-family: 'Jersey';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url(/live/invoke/website/loaders/asset.ts?src=https://ligaretro.deco.site/jersey.woff2) format('truetype');
        }`}</style>

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
    </Head>
  );
}

export default GlobalTags;
