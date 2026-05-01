javascript: (() => {
    /*
     * continuously scroll to bottom of any page, stepping gradually so
     * lazy-load triggers (spinners, sentinel elements) are passed through
     * rather than jumped over
     */
    const STEP = window.innerHeight;
    let active = true;
    const tick = () => {
        if (!active) return;
        const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;
        if (!atBottom) window.scrollBy(0, STEP);
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    window.addEventListener("wheel", () => { active = false; });
})();
