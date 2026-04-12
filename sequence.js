javascript: (() => {
    simulateClick = (element) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const eventOptions = {
            bubbles: true,
            cancelable: true,
            view: window,
            detail: 1,
            clientX: centerX,
            clientY: centerY,
            screenX: centerX,
            screenY: centerY,
            button: 0,
            buttons: 1,
            isTrusted: false,
        };
        const mouseDownEvent = new MouseEvent("mousedown", eventOptions);
        element.dispatchEvent(mouseDownEvent);
        const clickEvent = new MouseEvent("click", eventOptions);
        element.dispatchEvent(clickEvent);
        element.classList.add("active");
    };
    const simulateLift = (element) => {
        if (!element) return;
        element.classList.remove("active");
    };
    let cachedKToS = {};
    const keyToSquare = (key) => {
        const cached = cachedKToS[key];
        if (!cached || cached.getBoundingClientRect().width === 0) {
            const squares = document.getElementsByClassName("square");
            const numpadInOrder = [7, 8, 9, 4, 5, 6, 1, 2, 3];
            cachedKToS = Object.fromEntries(
                numpadInOrder.map((num, idx) => [`Numpad${num}`, squares[idx]]),
            );
            numpadInOrder.forEach((num, idx) => {
                const square = squares[idx];
                if (!square) return;
                square.innerHTML = `${num}`;
                square.style.lineHeight = `calc(${square.style.height} - 2 * ${square.style.borderWidth})`;
                square.style.fontSize = `calc(0.5 * (${square.style.height} - 2 * ${square.style.borderWidth}))`;
                square.style.color = "orange";
            });
        }
        return cachedKToS[key];
    };
    window.addEventListener("keydown", (e) => {
        if (e.code === "Numpad0") {
            simulateClick(
                Array.from(document.getElementsByTagName("button")).find(
                    (el) => el.textContent === "Start",
                ),
            );
            simulateClick(
                Array.from(document.getElementsByTagName("button")).find(
                    (el) => el.textContent === "Try again",
                ),
            );
        } else {
            simulateClick(keyToSquare(e.code));
        }
    });
    window.addEventListener("keyup", (e) => simulateLift(keyToSquare(e.code)));
})();
