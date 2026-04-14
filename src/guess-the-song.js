javascript: (function () {
    fetch(
        "https://raw.githubusercontent.com/owenmech/bookmarklets/main/src/raw/guess-the-song.js",
    )
        .then(function (r) {
            return r.text();
        })
        .then(function (code) {
            var p = trustedTypes.createPolicy("exec", {
                createScript: function (s) {
                    return s;
                },
            });
            var s = document.createElement("script");
            s.textContent = p.createScript(code);
            document.head.appendChild(s);
        });
})();
