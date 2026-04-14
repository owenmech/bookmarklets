javascript: (() => {
    /*
     * ignore this one, strangers
     */

    navigator.clipboard.readText().then(async (clipContents) => {
        const DONE_EMOJI = ":roblox-verified:";
        const [plUrl, displayText] = clipContents.split("\n");
        const mList = /[?&]v=([^&]+)/.exec(plUrl);
        const extracted = mList ? mList[1] : null;
        const container = document
            .getElementsByClassName("c-message_list")[0]
            .getElementsByClassName("c-virtual_list__scroll_container")[0];
        let headers = container.getElementsByClassName("c-message__sender");
        let header = headers[headers.length - 1];
        const lastBlock =
            header.parentElement.getElementsByClassName("p-rich_text_block")[0];

        const htmlContent = lastBlock.innerHTML;
        const cloned = document.createElement("div");
        cloned.innerHTML = htmlContent;

        const ulTags = cloned.getElementsByTagName("ul");
        for (let i = ulTags.length - 1; i >= 0; i--) {
            ulTags[i].remove();
        }

        const links = cloned.getElementsByTagName("a");
        const musicLink = Array.from(links).find((link) =>
            link.href.includes("music.youtube"),
        );
        if (musicLink) {
            musicLink.textContent = displayText;
            musicLink.href = "https://music.youtube.com/watch?v=" + extracted;
            musicLink.setAttribute(
                "url",
                "https://music.youtube.com/watch?v=" + extracted,
            );
            musicLink.setAttribute(
                "data-stringify-link",
                "https://music.youtube.com/watch?v=" + extracted,
            );
        }

        const date = new Date();
        const options = {
            weekday: "long",
            month: "numeric",
            day: "numeric",
            year: "2-digit",
        };
        cloned.children[0].children[0].textContent = date.toLocaleDateString(
            "en-US",
            options,
        );

        const editedLabels = cloned.getElementsByClassName(
            "c-message__edited_label",
        );
        for (let i = editedLabels.length - 1; i >= 0; i--) {
            editedLabels[i].remove();
        }

        const textSections = cloned.getElementsByClassName(
            "p-rich_text_section",
        );
        [...textSections].forEach((section) => {
            const emojiIndices = [];
            [...section.childNodes].forEach((child, index) => {
                if (child.tagName === "B") {
                    child = child.children[0];
                }
                if (
                    child &&
                    child.classList &&
                    child.classList.contains("c-emoji--inline") &&
                    child.children[0].getAttribute("data-stringify-emoji") ===
                        DONE_EMOJI
                ) {
                    emojiIndices.push(index);
                }
            });

            for (let i = emojiIndices.length - 1; i >= 0; i--) {
                const emojiIndex = emojiIndices[i];
                let nextSibling = section.childNodes[emojiIndex + 1];
                while (nextSibling) {
                    const currentSibling = nextSibling;
                    nextSibling = currentSibling.nextSibling;
                    currentSibling.remove();
                    if (currentSibling.tagName === "BR") {
                        break;
                    }
                }
                section.childNodes[emojiIndex].remove();
            }
        });

        let textbox =
            document.getElementsByClassName("ql-editor")[0].children[0];

        let htmlData = cloned.outerHTML;
        let plainData = cloned.textContent;

        const dataTransfer = new DataTransfer();
        dataTransfer.setData("text/html", htmlData);
        dataTransfer.setData("text/plain", plainData);

        const pasteEvent = new ClipboardEvent("paste", {
            clipboardData: dataTransfer,
            bubbles: true,
            cancelable: true,
        });

        textbox.dispatchEvent(pasteEvent);

        await new Promise((resolve) => setTimeout(resolve, 100));

        const sendButton = [...document.getElementsByTagName("button")].find(
            (b) => b.getAttribute("data-qa") === "texty_send_button",
        );
        sendButton.click();

        await new Promise((resolve) => setTimeout(resolve, 100));

        textbox = document.getElementsByClassName("ql-editor")[0].children[0];
        const command = "/status :headphones:" + displayText;
        textbox.textContent = command;
        await new Promise((resolve) => setTimeout(resolve, 100));
        sendButton.click();

        await new Promise((resolve) => setTimeout(resolve, 1000));

        headers = container.getElementsByClassName("c-message__sender");
        header = headers[headers.length - 1];

        await new Promise((resolve) => setTimeout(resolve, 100));

        header.parentElement.dispatchEvent(
            new MouseEvent("contextmenu", {
                bubbles: true,
                cancelable: true,
                view: window,
                button: 2,
                buttons: 2,
            }),
        );

        await new Promise((resolve) => setTimeout(resolve, 100));

        const deleteEvent = new KeyboardEvent("keydown", {
            key: "Delete",
            code: "Delete",
            keyCode: 46,
            which: 46,
            bubbles: true,
            cancelable: true,
        });

        (document.activeElement || window).dispatchEvent(deleteEvent);

        await new Promise((resolve) => setTimeout(resolve, 100));

        const deleteButton = Array.from(
            document.querySelectorAll('button, a, [role="button"]'),
        ).find((el) => el.textContent.trim() === "Delete");
        deleteButton.click();
    });
})();
