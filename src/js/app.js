import scroll from "./scroll";
import EffectShell from "./EffectShell";
import ImageHover from "./ImageHover";
import ImageScroll from "./ImageScroll";

const effectShell = new EffectShell();

new ImageHover(document.querySelectorAll("h1 span"), effectShell.scene);

document.querySelectorAll(".img img").forEach((element) => {
    new ImageScroll(element, effectShell.scene);
});
