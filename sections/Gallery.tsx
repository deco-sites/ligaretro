import { type Section } from "@deco/deco/blocks";
interface Props {
    children: Section;
}
function Gallery({ children: { Component, props } }: Props) {
    return (
    // <section class="mt-[43px]">
    <section>
      <Component {...props}/>
    </section>);
}
export default Gallery;
