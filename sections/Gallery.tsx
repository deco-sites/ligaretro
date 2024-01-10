import { Section } from "deco/blocks/section.ts";

interface Props {
  children: Section;
}

function Gallery({ children: { Component, props } }: Props) {
  return (
    <section class="mt-[43px]">
      <Component {...props} />
    </section>
  );
}

export default Gallery;
