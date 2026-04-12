javascript: (function () {
    const overlay = document.createElement("div");
    overlay.id = "ui-overlay";
    Object.assign(overlay.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000ff",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "sans-serif",
    });

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    Object.assign(closeBtn.style, {
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 100000,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#444",
        color: "white",
        fontSize: "24px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0",
    });
    overlay.appendChild(closeBtn);

    const guessPage = document.createElement("div");
    guessPage.style.width = "50%";
    overlay.appendChild(guessPage);

    const row1 = document.createElement("div");
    row1.style.marginBottom = "20px";

    const barBg = document.createElement("div");
    Object.assign(barBg.style, {
        width: "100%",
        height: "8px",
        backgroundColor: "#333",
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
    });
    const fill = document.createElement("div");
    Object.assign(fill.style, {
        width: "0%",
        height: "100%",
        backgroundColor: "red",
    });
    barBg.appendChild(fill);
    row1.appendChild(barBg);

    const row2 = document.createElement("div");
    Object.assign(row2.style, {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        gap: "10px",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    });

    const textInput = document.createElement("input");
    Object.assign(textInput.style, {
        flex: 1,
        padding: "8px",
        borderRadius: "4px",
        border: "2px solid #555",
        outline: "none",
        backgroundColor: "#222",
        color: "white",
        transition: "backgroundColor 0.15s, borderColor 0.15s",
    });
    textInput.placeholder = "partial guess... (press [ \\ ] to focus)";
    textInput.addEventListener("focus", () => {
        textInput.style.backgroundColor = "#333";
        textInput.style.borderColor = "#555";
    });
    textInput.addEventListener("blur", () => {
        textInput.style.backgroundColor = "#222";
    });
    const inputStatus = document.createElement("span");
    Object.assign(inputStatus.style, {
        fontSize: "20px",
        minWidth: "24px",
        textAlign: "center",
        color: "#555",
    });
    row2.appendChild(textInput);
    row2.appendChild(inputStatus);

    const row3 = document.createElement("div");
    Object.assign(row3.style, {
        display: "flex",
        justifyContent: "space-between",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    });
    const btn = (t) => {
        const el = document.createElement("button");
        el.innerText = t;
        Object.assign(el.style, {
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#444",
            color: "white",
            transition: "backgroundColor 0.15s",
        });
        el.addEventListener("mouseenter", () => {
            el.style.backgroundColor = "#555";
        });
        el.addEventListener("mouseleave", () => {
            el.style.backgroundColor = "#444";
        });
        el.addEventListener("mousedown", () => {
            el.style.backgroundColor = "#666";
        });
        el.addEventListener("mouseup", () => {
            el.style.backgroundColor = "#555";
        });
        return el;
    };
    const playButton = btn("Play [ ⏎ ]");
    const skipButton = btn("Skip [ ⌦ ]");
    const revealButton = btn("Reveal [ = ]");
    row3.append(playButton, skipButton, revealButton);

    guessPage.append(row1, row2, row3);

    const answerPage = document.createElement("div");
    answerPage.style.textAlign = "center";
    const img = document.createElement("img");
    Object.assign(img.style, {
        borderRadius: "8px",
        marginBottom: "20px",
        width: "200px",
        height: "200px",
        backgroundColor: "#888",
    });

    const title = document.createElement("h2");
    title.textContent = "Song Title";
    Object.assign(title.style, {
        margin: "10px 0 5px 0",
        fontSize: "24px",
    });

    const artist = document.createElement("p");
    artist.textContent = "Artist Name";
    Object.assign(artist.style, {
        color: "#aaa",
        margin: "0 0 30px 0",
        fontSize: "16px",
    });

    const nextButton = btn("Next [ ⏎ ]");
    nextButton.style.width = "100%";

    answerPage.append(img, title, artist, nextButton);

    overlay.appendChild(answerPage);

    setPage = (page) => {
        guessPage.style.display = page === "guess" ? "block" : "none";
        answerPage.style.display = page === "answer" ? "block" : "none";
    };
    getPage = () => {
        if (guessPage.style.display === "block") return "guess";
        if (answerPage.style.display === "block") return "answer";
        return null;
    };
    setProgress = (progress) => {
        fill.style.width = progress * 100 + "%";
    };
    const notches = [];
    addNotch = (progress, text) => {
        const label = document.createElement("div");
        label.textContent = text || progress.toFixed(1);
        Object.assign(label.style, {
            position: "absolute",
            left: progress * 100 + "%",
            top: "-20px",
            transform: "translateX(-50%)",
            textAlign: "center",
            fontSize: "12px",
            color: "white",
            whiteSpace: "nowrap",
        });
        row1.style.position = "relative";
        row1.appendChild(label);

        const mark = document.createElement("div");
        Object.assign(mark.style, {
            position: "absolute",
            left: progress * 100 + "%",
            top: 0,
            width: "2px",
            height: "100%",
            backgroundColor: "white",
        });
        barBg.appendChild(mark);

        const notch = { mark, label };
        notches.push(notch);
        return notch;
    };
    removeNotch = (notchObj) => {
        notchObj.mark.remove();
        notchObj.label.remove();
    };
    clearNotches = () => {
        while (notches.length > 0) {
            removeNotch(notches.pop());
        }
    };
    setStatus = (status) => {
        const statusMap = {
            none: { icon: "⦾", color: "#555", borderColor: "#555" },
            correct: { icon: "✔", color: "green", borderColor: "green" },
            wrong: { icon: "✘", color: "red", borderColor: "red" },
            partial: { icon: "◒", color: "orange", borderColor: "orange" },
        };
        const config = statusMap[status] || statusMap.none;
        inputStatus.textContent = config.icon;
        inputStatus.style.color = config.color;
        textInput.style.borderColor = config.borderColor;
        if (status === "correct") {
            revealButton.click();
        }
    };

    let _v = null;
    const getVideo = () => {
        if (!_v) {
            _v = document.querySelector("video");
            _v.addEventListener("play", () => {
                refreshBar();
            });
        }
        return _v;
    };
    const LENGTHS = [0.2, 0.5, 1, 5, 10, 30, 60];
    let _currentLevel = 0;
    const _getLengthForLevel = (level) => {
        const length = LENGTHS[level] || getVideo().duration;
        if (!length || isNaN(length) || !isFinite(length)) {
            return 240;
        }
        return length;
    };
    const getCurrentLength = () => {
        return _getLengthForLevel(_currentLevel);
    };
    const getNextLength = () => {
        return _getLengthForLevel(_currentLevel + 1);
    };
    const setCurrentLevel = (level) => {
        _currentLevel = level;
        clearNotches();
        const current = getCurrentLength();
        let duration = getVideo().duration;
        if (isNaN(duration) || !isFinite(duration)) {
            duration = 240;
        }
        const end = Math.min(getNextLength(), duration);
        addNotch(current / end, `${current.toFixed(1)}s`);
        addNotch(1, `${end.toFixed(1)}s`);
    };
    const nextlevel = () => {
        setCurrentLevel(_currentLevel + 1);
    };
    const refreshBar = () => {
        setCurrentLevel(_currentLevel);
    };
    const clearBar = () => {
        clearNotches();
        setProgress(0);
    };
    let currentTitle = "";
    let currentArtist = "";
    let currentImage = "";
    const fetchCurrentSong = () => {
        const nowPlayingTitle = document.querySelector(
            "[data-testid='now-playing-metadata'] .yt-formatted-string",
        );
        const nowPlayingArtist = document.querySelector(
            "[data-testid='now-playing-metadata'] .subtitle",
        );
        if (nowPlayingTitle?.textContent) {
            currentTitle = nowPlayingTitle.textContent.trim();
            currentArtist = nowPlayingArtist?.textContent.trim() || "";
        }
        const playerTitle = document.querySelector(
            ".yt-simple-endpoint.title .yt-formatted-string",
        );
        const playerArtist = document.querySelector(
            ".yt-simple-endpoint.byline .yt-formatted-string",
        );
        if (playerTitle?.textContent) {
            currentTitle = playerTitle.textContent.trim();
            currentArtist = playerArtist?.textContent.trim() || "";
        }
        if (navigator.mediaSession?.metadata) {
            const meta = navigator.mediaSession.metadata;
            if (meta.title) {
                currentTitle = meta.title;
                currentArtist = meta.artist || "";
            }
            if (meta.artwork && meta.artwork.length > 0) {
                currentImage = meta.artwork[meta.artwork.length - 1].src;
            }
        }
        const playerImage = document.querySelector(".yt-img-shadow img");
        if (playerImage?.src) {
            currentImage = playerImage.src;
        }
        const nowPlayingImage = document.querySelector(
            "[data-testid='now-playing-metadata'] img",
        );
        if (nowPlayingImage?.src) {
            currentImage = nowPlayingImage.src;
        }
        title.textContent = currentTitle || "Unknown Title";
        artist.textContent = currentArtist || "Unknown Artist";
        img.src = currentImage;
    };
    playButton.onclick = () => {
        getVideo().currentTime = 0;
        setProgress(0);
        getVideo().play();
    };
    skipButton.onclick = () => {
        nextlevel();
        getVideo().play();
    };
    revealButton.onclick = () => {
        fetchCurrentSong();
        setPage("answer");
        setCurrentLevel(Infinity);
        getVideo().play();
        setStatus("none");
        textInput.value = "";
    };
    nextButton.onclick = () => {
        setPage("guess");
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "N",
                shiftKey: true,
                bubbles: true,
            }),
        );
        setCurrentLevel(0);
        clearBar();
    };
    setPage("guess");
    setStatus("none");
    setCurrentLevel(0);
    document.body.appendChild(overlay);

    function loop() {
        const v = getVideo();
        if (v.currentTime >= getCurrentLength()) {
            v.pause();
            v.currentTime = getCurrentLength();
        }
        setProgress(v.currentTime / getNextLength());
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    const EXCLUDE_WORDS = [
        "the",
        "a",
        "an",
        "and",
        "or",
        "but",
        "feat",
        "featuring",
    ];
    checkInput = () => {
        fetchCurrentSong();
        const guess = textInput.value.trim().replace(/[^\w\s]|_/g, "");
        if (guess) {
            const words = guess
                .toLowerCase()
                .split(/\s+/)
                .filter((w) => !EXCLUDE_WORDS.includes(w));
            const titleWords = currentTitle
                .toLowerCase()
                .replace(/[^\w\s]|_/g, "")
                .split(/\s+/)
                .filter((w) => w.length > 0 && !EXCLUDE_WORDS.includes(w));
            const artistWords = currentArtist
                .toLowerCase()
                .replace(/[^\w\s]|_/g, "")
                .split(/\s+/)
                .filter((w) => w.length > 0 && !EXCLUDE_WORDS.includes(w));
            const artistMatch = artistWords.some((w) => words.includes(w));
            const titleMatch = titleWords.some((w) => words.includes(w));
            const status =
                titleMatch && artistMatch
                    ? "correct"
                    : artistMatch || titleMatch
                      ? "partial"
                      : "wrong";
            setStatus(status);
        }
        textInput.blur();
    };

    const listener = (e) => {
        if (e.key === "\\") {
            if (document.activeElement === textInput) return;
            textInput.focus();
            textInput.select();
            e.preventDefault();
        } else if (e.key === "Enter") {
            if (document.activeElement === textInput) {
                checkInput();
            } else if (getPage() === "guess") {
                playButton.click();
            } else if (getPage() === "answer") {
                nextButton.click();
            }
        } else if (e.key === "Backspace") {
            if (document.activeElement === textInput) return;
            skipButton.click();
        } else if (e.key === "=") {
            if (document.activeElement === textInput) return;
            revealButton.click();
        } else if (e.key === "Escape") {
            if (document.activeElement === textInput) {
                textInput.blur();
            }
            e.preventDefault();
        }
    };
    document.addEventListener("keydown", listener);

    closeBtn.onclick = () => {
        overlay.remove();
        document.removeEventListener("keydown", listener);
    };
})();
