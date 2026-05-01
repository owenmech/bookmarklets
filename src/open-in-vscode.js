javascript: (() => {
    const convertToVSCodeLink = (githubUrl, baseFolder) => {
        try {
            const url = new URL(githubUrl);
            const pathParts = url.pathname.split('/');

            const repoName = pathParts[2];

            const blobIndex = pathParts.indexOf('blob');
            if (blobIndex === -1) throw new Error("Not a standard GitHub file URL");

            const relativePath = pathParts.slice(blobIndex + 2).join('/');

            const lineMatch = url.hash.match(/L(\d+)/);
            const lineSuffix = lineMatch ? `:${lineMatch[1]}` : '';

            const cleanBase = baseFolder.endsWith('/') ? baseFolder.slice(0, -1) : baseFolder;

            return `vscode://file/${cleanBase}/${repoName}/${relativePath}${lineSuffix}`;
        } catch (e) {
            return `Error: ${e.message}`;
        }
    };

    const url = window.location.href;
    const saved = localStorage.getItem("vscode_repo_parent");
    const ASK_EVERY_TIME = false;
    if (!saved || ASK_EVERY_TIME) {
        const input = prompt("Repo parent folder:", saved);
        if (!input) return;
        localStorage.setItem("vscode_repo_parent", input);
    }

    const repoParent = localStorage.getItem("vscode_repo_parent");
    const result = convertToVSCodeLink(url, repoParent);
    window.location.href = result;
})();