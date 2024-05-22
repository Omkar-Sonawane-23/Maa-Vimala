gsap.from(" #logoName", {
    duration: 1,
    y: -300,
    ease: "power1.inOut"
});
gsap.from(".nav-links li ", {
    duration: 1,
    y: -100,
    ease: "power1.inOut",
    stagger: 0.2
});
gsap.from("#link ", {
    duration: 1,
    y: -25,
    ease: "power1.inOut",
    repeat: -1,
            yoyo: true,
});
const dots = document.getElementById("dots");
let dotText = "";
let dotCount = 0;

function typingEffect() {
    if (dotCount < 4) {
        dotText += ".";
        dotCount++;
    } else {
        dotText = "";
        dotCount = 0;
    }
    dots.textContent = dotText;
}

setInterval(typingEffect, 500);