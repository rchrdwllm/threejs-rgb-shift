import LocomotiveScroll from "locomotive-scroll";

const imagesLoaded = require("imagesloaded");

const scroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
});

imagesLoaded(document.querySelectorAll("img"), () => scroll.update());

export default scroll;
