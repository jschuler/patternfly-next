const path = require('path');
// const fse = require('fs-extra');
// const pfCss = path.join('./dist/patternfly.css');
// const pfCssString = fse.readFileSync(pfCss).toString();
// const pfCssAddons = path.join('./dist/patternfly-addons.css');
// const pfCssAddonsString = fse.readFileSync(pfCssAddons).toString();

module.exports = {
  render(html) {
    return `
    <html lang="en">
      <head>
        <title>Test</title>
      </head>
      <body>
        <div role="main">${html}</div>
      </body>
    </html>
    `;
  }
};