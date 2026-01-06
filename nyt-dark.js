const style = document.createElement("style");

style.textContent = `
:root {
  --bg-page: #010001;
  --bg-modal: #010001;
  --bg-hover: #2d2c2d;
  --bg-active: #484748;
  --bg-menu: #181718;
  --bg-scrim: #01000160;
  --stroke-tertiary: #3a393a;
  --color-tone-1: #fff;
  --text: #fff;
  --highlighted: #493f81;
  --highlighted-bar: #393364;
  --selected: #4779ab;
  --related: #586c82;
  --fg-page: #fff;
  --key-text-color: var(--fg-page);
  --fg-secondary: #d6d6d6;
  --fg-ternary: #969696;
  --cell: #595863;
  --block: #18161a;
  --lines: #18161a;
  --light-white: #deddde;
  --bg-btn-emphasis-constant: var(--light-white);
  --stroke-constant: var(--light-white);
  --text-constant: var(--light-white);
  --text-alternate-constant: #090809;
  --obscured: #353435;
  --scrollbar-fg: #484748;
  --scrollbar-bg: #181718;
}

body {
  background: var(--bg-page);
  color: var(--fg-page);
}

ol {
  scrollbar-color: var(--scrollbar-fg) var(--scrollbar-bg);
}

.pz-ad-box {
  background-color: var(--bg-page);
  display: none;
}
.xwd__toolbar--wrapper {
  background-color: var(--bg-page)
}

.xwd__tool--button :hover {
  background-color: var(--bg-hover);
}

.xwd__tool--active :hover {
  background-color: var(--bg-active);
}

.xwd__tool--active {
  background-color: var(--bg-active);
}

.xwd__tool--texty {
  color: var(--fg-page);
}

.xwd__tool--texty :hover {
  color: var(--fg-page);
}

.xwd__printtools--button {
  border: 1px solid var(--fg-page);
  background-color: var(--bg-page);
  color: var(--fg-page);
}

.xwd__printtools--button:hover {
    background-color: #3a3a3a;
    color: var(--fg-page);
}

.pz-footer {
  background-color: var(--bg-page);
}

.xwd__cell--cell {
  fill: var(--cell);
}

.xwd__cell--block {
  fill: var(--block);
}

.xwd__clue--related {
  background-color: var(--related);
}

.xwd__cell--related {
  fill: var(--related)
}

.xwd__clue--selected {
  background-color: var(--highlighted);
}

.xwd__clue-bar-desktop--bar {
  background: var(--highlighted-bar);
}

.xwd__clue--highlighted {
  border-left-color: var(--highlighted);
}

.xwd__cell--highlighted {
  fill: var(--highlighted);
}

.xwd__cell--selected {
  fill: var(--selected);
}


.xwd__cell--cell+circle, .xwd__cell--cell+path {
  stroke: var(--lines);
}

.xwd__cell text {
  fill: var(--fg-page)
}

.pz-nav__logo rect {
  fill: var(--bg-page)
}

.pz-nav__logo path {
  fill: var(--fg-page)
}

.pz-nav__hamburger-inner, .pz-nav__hamburger-inner::before, .pz-nav__hamburger-inner::after {
  background-color: var(--fg-page);
}

.xwd__tool--open {
  background-color: var(--bg-menu);
  color: var(--fg-page);
}

.xwd__menu--item {
  background-color: var(--bg-menu);
  color: var(--fg-page);
  border-top: 1px solid var(--stroke-tertiary);
}

.xwd__tool--open:hover {
  background-color: var(--bg-menu);
  color: var(--fg-page);
}

.xwd__menu--container {
  border: 1px solid var(--stroke-tertiary);
}

.xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header {
  border-top: solid 6px var(--fg-page);
}

.xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header a {
  color: var(--fg-page);
}

.xwd__editorial-content--editorialCard {
  color: var(--fg-page);
}

.xwd__editorial-content--editorialCard .xwd__editorial-content--kicker {
  color: var(--fg-secondary);
}

.xwd__editorial-content--editorialCard .xwd__editorial-content--byline {
  color: var(--fg-ternary);
}

.ccpa-opt-out a, .ccpa-california-notice a {
  color: var(--fg-secondary)
}

.xwd__clue-list--obscured li span:last-child {
  background-color: var(--obscured);
  color: var(--obscured);
}

.xwd__clue-bar-desktop--bar.obscured {
  background-color: var(--obscured);
  color: var(--obscured);
}

`;
document.head.appendChild(style);

const monoIcons = [
  "print",
  "settings",
  "help",
  "pencil",
  "daily",
  "pause"
];

const icons = document.getElementsByTagName("i");
for (const icon of icons) {
  const url = getComputedStyle(icon).backgroundImage;
  const address = url.slice(5, -2)
  if (monoIcons.some(mono => address.includes(mono))) {
    icon.style.backgroundImage = "none";
    icon.style.backgroundColor = "#fff";
    icon.style.maskImage = url;
    icon.style.maskSize = "contain";
    icon.style.maskRepeat = "no-repeat";
    icon.style.maskPosition = "center";
  }
  if (address.includes("daily")) {
    icon.style.maskImage = "url(\"data:image/svg+xml;utf+8,<svg width=\\\"20\\\" height=\\\"20\\\" viewBox=\\\"0 0 20 20\\\" fill=\\\"none\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M18.2821 2.2228C18.1962 2.10685 18.0984 2.00024 17.9903 1.9047C17.6251 1.55876 17.1499 1.35217 16.6479 1.32104C16.6041 1.32104 16.5632 1.32104 16.5195 1.32104H3.46888C3.42511 1.32104 3.38425 1.32104 3.34048 1.32104C2.79284 1.35235 2.27793 1.59199 1.90135 1.99082C1.52476 2.38965 1.31504 2.91746 1.31519 3.46599V16.5341C1.31596 17.1043 1.5428 17.6509 1.94599 18.0541C2.34917 18.4572 2.89578 18.6841 3.46596 18.6849H16.5341C17.1045 18.6833 17.6511 18.4558 18.0542 18.0522C18.4573 17.6485 18.6841 17.1016 18.6848 16.5312V3.4689C18.6838 3.02171 18.543 2.58603 18.2821 2.2228ZM6.80157 12.2442H2.28406V7.66832H6.80157V12.2442ZM6.80157 6.75198H2.28406V3.4689C2.28406 3.15467 2.40889 2.85331 2.63108 2.63111C2.85328 2.40891 3.15465 2.28408 3.46888 2.28408H6.80157V6.75198ZM12.2967 17.716H7.71207V13.2014H12.2967V17.716ZM12.2967 6.75198H7.71207V2.28408H12.2967V6.75198ZM17.716 16.5312C17.7152 16.8452 17.5904 17.1463 17.3687 17.3687C17.2014 17.534 16.9894 17.6466 16.7588 17.6926C16.6799 17.7079 16.5998 17.7157 16.5195 17.716H13.2101V13.2014H17.716V16.5312ZM17.716 12.2442H13.2101V7.66832H17.716V12.2442Z\\\" fill=\\\"black\\\"/></svg>\")";
  }
}

document.getElementsByClassName("xwd__svg")[0].children[3].children[0].setAttribute("stroke", "var(--lines)")
document.getElementsByClassName("xwd__svg")[0].children[3].children[1].setAttribute("stroke", "var(--block)")
