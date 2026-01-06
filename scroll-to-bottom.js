id = window.setInterval(() => {
  window.scrollTo(0, document.body.scrollHeight)
}, 500);
window.addEventListener("wheel", () => window.clearInterval(id));
