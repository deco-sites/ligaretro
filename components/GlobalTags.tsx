import { asset, Head } from "$fresh/runtime.ts";
const icon = "/LigaRetro.svg";


function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />
      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <link rel="icon" type="image/png" href={icon}/>
    </Head>
  );
}

export default GlobalTags;
