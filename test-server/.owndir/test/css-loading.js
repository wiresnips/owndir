
const _ = require('lodash');
const { resolve } = require('path');

import "@mdi/font/css/materialdesignicons.min.css";

export function Tests (fsNodeRoot) {
  test("css loading: import \"@mdi/font/css/materialdesignicons.min.css\"", async () => {
    const elem = document.createElement("span");
    elem.classList.add('mdi-ab-testing');
    document.body.appendChild(elem);

    const content = window.getComputedStyle(elem, "::before").content;
    // console.log({content});

    isEq(content, '"\u{f01c9}"',
       "importing the css directly from the package worked: the icon class generated the correct ::before content");

    document.body.removeChild(elem);
  })
}