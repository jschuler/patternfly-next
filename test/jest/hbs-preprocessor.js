module.exports = {
  process(src) {
    return `
      const { createHandlebars } = require('gatsby-theme-patternfly-org/helpers/createHandlebars');
      const glob = require('glob');
      const path = require('path');
      const fse = require('fs-extra');
      const srcDir = path.join('src/patternfly');
      const hbsFiles = glob.sync('**/*.hbs', {
        cwd: srcDir
      });
      let hbsNodes = [];
      hbsFiles.forEach(file => {
        const name = path.basename(file, '.hbs');
        const from = path.join(srcDir, file);
        const partial = fse.readFileSync(from).toString();
        hbsNodes.push({
          fields: {
            name,
            partial
          }
        });
      });
      const hbsInstance = createHandlebars(hbsNodes);
      const html = hbsInstance.compile(\`${src}\`)({});
      module.exports = html;
    `;
  }
};