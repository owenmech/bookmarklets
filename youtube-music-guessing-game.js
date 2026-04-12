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

    const style = document.createElement("style");
    style.textContent = `
        .mg-setting-row { display: flex; align-items: center; gap: 12px; cursor: pointer;
            color: white; font-family: sans-serif; font-size: 14px; user-select: none; }
        .mg-setting-row input[type="checkbox"] { display: none; }
        .mg-toggle-track { width: 40px; height: 22px; background: #555; border-radius: 11px;
            position: relative; transition: background 0.2s; flex-shrink: 0; }
        .mg-setting-row input:checked ~ .mg-toggle-track { background: #4caf50; }
        .mg-toggle-thumb { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px;
            background: white; border-radius: 50%; transition: transform 0.2s; }
        .mg-setting-row input:checked ~ .mg-toggle-track .mg-toggle-thumb { transform: translateX(18px); }
    `;
    document.head.appendChild(style);

    function styleCornerBtn(btn, { top, right, left, fontSize }) {
        Object.assign(btn.style, {
            position: "fixed",
            top,
            right,
            left,
            zIndex: 100000,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#333",
            color: "white",
            fontSize,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            fontWeight: "bold",
            lineHeight: "1",
        });
        btn.addEventListener("mouseenter", () => {
            btn.style.backgroundColor = "#484848";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.backgroundColor = "#333";
        });
        btn.addEventListener("mousedown", () => {
            btn.style.backgroundColor = "#666";
        });
        btn.addEventListener("mouseup", () => {
            btn.style.backgroundColor = "#484848";
        });
    }

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "✕";
    styleCornerBtn(closeBtn, { top: "20px", right: "20px", fontSize: "24px" });
    overlay.appendChild(closeBtn);

    const settingsBtn = document.createElement("button");
    settingsBtn.textContent = "⚙";
    styleCornerBtn(settingsBtn, {
        top: "20px",
        left: "20px",
        fontSize: "20px",
    });
    overlay.appendChild(settingsBtn);

    const settingsPanel = document.createElement("div");
    Object.assign(settingsPanel.style, {
        position: "fixed",
        top: "70px",
        left: "20px",
        zIndex: 100000,
        backgroundColor: "#222",
        border: "1px solid #555",
        borderRadius: "8px",
        padding: "16px",
        display: "none",
        minWidth: "200px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    });
    const settingsPanelTitle = document.createElement("div");
    Object.assign(settingsPanelTitle.style, {
        color: "#aaa",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        marginBottom: "12px",
    });
    settingsPanelTitle.textContent = "Settings";
    settingsPanel.appendChild(settingsPanelTitle);

    const titleOnlyLabel = document.createElement("label");
    titleOnlyLabel.className = "mg-setting-row";
    const titleOnlyCheckbox = document.createElement("input");
    titleOnlyCheckbox.type = "checkbox";
    const toggleTrack = document.createElement("div");
    toggleTrack.className = "mg-toggle-track";
    const toggleThumb = document.createElement("div");
    toggleThumb.className = "mg-toggle-thumb";
    toggleTrack.appendChild(toggleThumb);
    const labelText = document.createElement("span");
    labelText.textContent = "Reveal Artist";
    titleOnlyLabel.append(titleOnlyCheckbox, toggleTrack, labelText);
    settingsPanel.appendChild(titleOnlyLabel);
    overlay.appendChild(settingsPanel);

    settingsBtn.onclick = () => {
        settingsPanel.style.display =
            settingsPanel.style.display === "none" ? "block" : "none";
    };

    const infoSection = document.createElement("div");
    Object.assign(infoSection.style, {
        textAlign: "center",
        width: "50%",
        marginBottom: "20px",
    });

    const imgWrapper = document.createElement("div");
    Object.assign(imgWrapper.style, {
        borderRadius: "8px",
        marginBottom: "20px",
        width: "200px",
        height: "200px",
        backgroundColor: "#888",
        margin: "auto",
    });

    const img = document.createElement("img");
    Object.assign(img.style, {
        borderRadius: "8px",
        width: "200px",
        height: "200px",
        visibility: "hidden",
    });
    imgWrapper.appendChild(img);

    const setImgSrc = (src) => {
        img.src = src || "";
        img.style.visibility = src ? "visible" : "hidden";
    };

    const title = document.createElement("h2");
    title.textContent = "?????";
    Object.assign(title.style, {
        margin: "10px 0 5px 0",
        fontSize: "24px",
    });

    const artist = document.createElement("p");
    artist.textContent = "?????";
    Object.assign(artist.style, {
        color: "#aaa",
        margin: "0 0 30px 0",
        fontSize: "16px",
    });

    infoSection.append(imgWrapper, title, artist);
    overlay.appendChild(infoSection);

    const guessPage = document.createElement("div");
    guessPage.style.width = "50%";
    overlay.appendChild(guessPage);

    const row1 = document.createElement("div");
    row1.style.marginBottom = "20px";

    const barBg = document.createElement("div");
    Object.assign(barBg.style, {
        width: "100%",
        height: "8px",
        backgroundColor: "#444",
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
    });
    const unplayableArea = document.createElement("div");
    Object.assign(unplayableArea.style, {
        position: "absolute",
        right: "0",
        width: "0%",
        height: "100%",
        backgroundColor: "#111",
        cursor: "not-allowed",
    });
    barBg.appendChild(unplayableArea);

    const fill = document.createElement("div");
    Object.assign(fill.style, {
        position: "absolute",
        left: "0",
        width: "0%",
        height: "100%",
        backgroundColor: "rgb(0, 186, 215)",
        cursor: "pointer",
    });
    barBg.appendChild(fill);
    row1.appendChild(barBg);

    barBg.addEventListener("click", (e) => {
        const fraction = e.offsetX / barBg.offsetWidth;
        const playable = getCurrentLength() / getNextLength();
        if (fraction > playable) return;
        console.log(fraction);
        getVideo().currentTime = fraction * getNextLength();
    });
    unplayableArea.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

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

    guessPage.append(row1, row2);

    const btn = (text) => {
        const el = document.createElement("button");
        el.textContent = text;
        Object.assign(el.style, {
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "4px",
            border: "2px solid #666",
            backgroundColor: "#333",
            color: "white",
            transition: "backgroundColor 0.15s",
            fontWeight: "bold",
        });

        el.addEventListener("mouseenter", () => {
            el.style.backgroundColor = "#484848";
        });
        el.addEventListener("mouseleave", () => {
            el.style.backgroundColor = "#333";
        });
        el.addEventListener("mousedown", () => {
            el.style.backgroundColor = "#666";
        });
        el.addEventListener("mouseup", () => {
            el.style.backgroundColor = "#484848";
        });
        return el;
    };
    const playButton = btn("Play [ ⏎ ]");
    const skipButton = btn("More [ ⌦ ]");
    const revealButton = btn("Reveal [ = ]");

    const buttonRow = document.createElement("div");
    Object.assign(buttonRow.style, {
        display: "flex",
        justifyContent: "space-between",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    });
    buttonRow.append(playButton, skipButton, revealButton);
    guessPage.appendChild(buttonRow);

    const nextButton = btn("Next Song [ ⏎ ]");

    let titleOnly = false;
    titleOnlyCheckbox.onchange = () => {
        titleOnly = titleOnlyCheckbox.checked;
        if (titleOnly && getPage() === "guess") {
            fetchCurrentSong();
            artist.textContent = currentArtist || "?????";
        } else if (!titleOnly && getPage() === "guess") {
            const artistTokens = buildTokens(currentArtist);
            const artistHasMatch = artistTokens.some((t) =>
                revealedWords.has(getTokenWord(t)),
            );
            artist.textContent = artistHasMatch
                ? renderTokens(artistTokens, revealedWords)
                : "?????";
        }
    };

    let _state = null;
    const setPage = (state) => {
        _state = state;
        if (state === "guess") {
            while (buttonRow.firstChild) {
                buttonRow.removeChild(buttonRow.firstChild);
            }
            buttonRow.append(playButton, skipButton, revealButton);
            buttonRow.style.justifyContent = "space-between";
            playButton.style.width = "initial";
            skipButton.style.width = "initial";
            revealButton.style.width = "initial";
        } else {
            while (buttonRow.firstChild) {
                buttonRow.removeChild(buttonRow.firstChild);
            }
            buttonRow.append(nextButton);
            buttonRow.style.justifyContent = "center";
        }
    };
    const getPage = () => _state;
    const setProgress = (progress) => {
        fill.style.width = progress * 100 + "%";
    };
    const notches = [];
    const addNotch = (progress, text) => {
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
    const removeNotch = (notchObj) => {
        notchObj.mark.remove();
        notchObj.label.remove();
    };
    const clearNotches = () => {
        while (notches.length > 0) {
            removeNotch(notches.pop());
        }
    };
    const setStatus = (status) => {
        const statusMap = {
            none: { icon: "⦾", color: "#555", borderColor: "#555" },
            correct: { icon: "✔", color: "#00ff00", borderColor: "green" },
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

    _v = null;
    const getVideo = () => {
        if (!_v || !_v.parentElement) {
            _v = document.querySelector("video");
            _v.addEventListener("play", () => {
                refreshBar();
            });
        }
        return _v;
    };
    const LENGTHS = [0.2, 0.5, 1, 5, 10, 30, 60, 120, 240, 480];
    let _currentLevel = 0;
    const _getLengthForLevel = (level) => {
        let duration = getVideo().duration;
        if (!duration || isNaN(duration) || !isFinite(duration)) {
            duration = 30;
        }
        const length = Math.min(LENGTHS[level] || Infinity, duration - 1);
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
        if (!isFinite(_currentLevel)) {
            unplayableArea.style.width = "0%";
            return;
        }
        const current = getCurrentLength();
        const end = getNextLength();
        unplayableArea.style.width = (1 - current / end) * 100 + "%";
        addNotch(current / end, `${current.toFixed(current < 1 ? 1 : 0)}s`);
        addNotch(1, `${end.toFixed(end < 1 ? 1 : 0)}s`);
    };
    const nextLevel = () => {
        setCurrentLevel(_currentLevel + 1);
    };
    const refreshBar = () => {
        setCurrentLevel(_currentLevel);
        if (titleOnly) {
            fetchCurrentSong();
            artist.textContent = currentArtist || "?????";
        }
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
    };
    playButton.onclick = () => {
        getVideo().currentTime = 0;
        setProgress(0);
        getVideo().play();
    };
    skipButton.onclick = () => {
        nextLevel();
        getVideo().play();
    };
    revealButton.onclick = () => {
        fetchCurrentSong();
        title.textContent = currentTitle || "Unknown Title";
        artist.textContent = currentArtist || "Unknown Artist";
        setImgSrc(currentImage);
        setPage("answer");
        setCurrentLevel(Infinity);
        getVideo().play();
    };
    nextButton.onclick = () => {
        setImgSrc("");
        title.textContent = "?????";
        artist.textContent = "?????";
        setPage("guess");
        setStatus("none");
        textInput.value = "";
        revealedWords = new Set();
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "N",
                shiftKey: true,
                bubbles: true,
            }),
        );
        setCurrentLevel(0);
        setProgress(0);
    };
    setPage("guess");
    setStatus("none");
    setCurrentLevel(0);
    document.body.appendChild(overlay);
    let open = true;

    function loop() {
        if (!open) return;
        const v = getVideo();
        if (v.currentTime >= getCurrentLength()) {
            v.pause();
            v.currentTime = getCurrentLength();
        }
        setProgress(v.currentTime / getNextLength());
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    const normalizeString = (str) => {
        return str
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9\s]/g, "");
    };

    const buildTokens = (str) => {
        if (!str) return [];
        const chunks = str.trim().split(/\s+/);
        const tokens = [];
        let pending = [];
        for (const chunk of chunks) {
            if (/[a-zA-Z0-9]/.test(chunk)) {
                tokens.push(
                    pending.length > 0
                        ? pending.join(" ") + " " + chunk
                        : chunk,
                );
                pending = [];
            } else {
                pending.push(chunk);
            }
        }
        if (pending.length > 0) {
            if (tokens.length > 0)
                tokens[tokens.length - 1] += " " + pending.join(" ");
            else tokens.push(pending.join(" "));
        }
        return tokens;
    };

    const getTokenWord = (token) =>
        normalizeString(token)
            .split(/\s+/)
            .filter((w) => w.length > 0)[0] || "";

    const renderTokens = (tokens, revealed) =>
        tokens
            .map((token) => {
                const word = getTokenWord(token);
                return !word || revealed.has(word)
                    ? token
                    : "_".repeat(word.length);
            })
            .join(" ");

    let revealedWords = new Set();

    const checkInput = () => {
        fetchCurrentSong();
        const guess = normalizeString(textInput.value);
        const guessWords = guess.split(/\s+/).filter((w) => w.length > 0);

        if (guessWords.length === 0) {
            textInput.blur();
            return;
        }

        const titleTokens = buildTokens(currentTitle);
        const artistTokens = buildTokens(currentArtist);
        const allWords = new Set(
            (titleOnly ? titleTokens : [...titleTokens, ...artistTokens])
                .map(getTokenWord)
                .filter((w) => w.length > 0),
        );

        guessWords.forEach((w) => revealedWords.add(w));

        const titleHasMatch = titleTokens.some((t) =>
            revealedWords.has(getTokenWord(t)),
        );
        const artistHasMatch = artistTokens.some((t) =>
            revealedWords.has(getTokenWord(t)),
        );

        title.textContent = titleHasMatch
            ? renderTokens(titleTokens, revealedWords)
            : "?????";
        artist.textContent = titleOnly
            ? currentArtist || "?????"
            : artistHasMatch
              ? renderTokens(artistTokens, revealedWords)
              : "?????";

        const allRevealed = [...allWords].every((w) => revealedWords.has(w));
        const anyMatched = guessWords.some((w) => allWords.has(w));

        const status = allRevealed
            ? "correct"
            : anyMatched
              ? "partial"
              : "wrong";
        setStatus(status);

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
        open = false;
    };
})();
