const AAT = require("@ibma/aat");
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');
const { createHandlebars } = require('gatsby-theme-patternfly-org/helpers/createHandlebars');
const { extractExamples } = require('gatsby-theme-patternfly-org/helpers/extractExamples');
const mdx = require(`@mdx-js/mdx`);

const pfCss = path.join('./dist/patternfly.css');
const pfCssString = fse.readFileSync(pfCss).toString();
const pfCssAddons = path.join('./dist/patternfly-addons.css');
const pfCssAddonsString = fse.readFileSync(pfCssAddons).toString();
const srcDir = path.join('./src/patternfly');
const mdFiles = glob.sync('**/*.md', {
  cwd: srcDir
});
const hbsFiles = glob.sync('**/*.hbs', {
  cwd: srcDir
});

// glob all .md files under src/patternfly
// const hbsNodes = glob all .hbs files
// const hbsInstance = createHandlebars(hbsNodes);

// 1. loop through .md files
// 2. for each .md files, get the mdxAst tree and the hbsInstance
// -> in each loop iteration: const examples = extractExamples(mdxAST, hbsInstance, fileRelativePath);
// now for each md examples file, we have an array of HTML examples?

let individualExamples = [];

function parseAllMd() {
  let mdExamples = [];
  let hbsNodes = [];
  /*
  {
    "fields": {
      "name": "spacing",
      "partial": "<div class=\"item{{#if spacing--modifier}} {{spacing--modifier}}{{/if}}\"\n  {{#if spacing--attribute}}\n    {{{spacing--attribute}}}\n\t{{/if}}>\n\t{{> @partial-block}}\n</div>"
    }
  }
  */
  hbsFiles.forEach(file => {
    // console.log('Converting file', path.basename(file, '.hbs'));
    const name = path.basename(file, '.hbs');
    const from = path.join(srcDir, file);
    const partial = fse.readFileSync(from).toString();
    // console.log(partial);
    hbsNodes.push({
      fields: {
        name,
        partial
      }
    });
  });
  const hbsInstance = createHandlebars(hbsNodes);
  // console.log(JSON.stringify(hbsInstance));
  mdFiles.forEach(file => {
    // console.log('Converting file', file);
    const from = path.join(srcDir, file);
    const sourceText = fse.readFileSync(from).toString();
    // console.log(sourceText);
    const compiler = mdx.createMdxAstCompiler({
      mdPlugins: null,
      remarkPlugins: []
    });
    const mdxAST = compiler.parse(sourceText);
    // console.log(mdxAST);
    const name = path.basename(file, '.md');
    const example = extractExamples(mdxAST, hbsInstance, name);
    // console.log(JSON.stringify(examples));
    // console.log(`length: ${examples.length}`);
    // getResults(examples);
    mdExamples.push({
      name,
      file,
      example
    })
  });

  for (let i = 0; i < mdExamples.length; i++) {
    const { name, file, example } = mdExamples[i];
    Object.entries(example).forEach(([oneExample, html]) => {
      // console.log(oneExample);
      individualExamples.push({
        mdName: name,
        mdFile: file,
        exampleName: oneExample,
        exampleHtml: html
      });
    });
  }
}

async function getResults() {
  console.log(`length: ${individualExamples.length}`);
  for (let i = 0; i < individualExamples.length; i++) {
    let failures = [];
    let errors = 0;
    // const result = await AAT.getCompliance(`file://${input}`, 'my test');
    // const result = await AAT.getCompliance('<html><img src="smiley.gif" height="42" width="42"></html>', 'my test');
    // const example = '<span id="normal" class="test">The five boxing wizards jump quickly.</span>';
    const { mdName, mdFile, exampleName, exampleHtml } = individualExamples[i];
    // console.log();
    // console.log(example);
    // console.log();
    const result = await AAT.getCompliance(`
      <html lang="en">
        <head>
          <style>
            ${pfCssString}
          </style>
          <style>
            ${pfCssAddonsString}
          </style>
          <title>Test</title>
        </head>
        <body>
          <div role="main">${exampleHtml}</div>
        </body>
      </html>
      `, `${mdFile} > ${exampleName}`);
    if (result) {
      if (AAT.assertCompliance(result.report) === 0) {
          console.log(`${i + 1}/${individualExamples.length} Passed:`, `${mdFile} > ${exampleName}`);
      } else {
          failures.push({
              file: `${mdFile} > ${exampleName}`,
              report: result.report
          });
          console.log(`${i + 1}/${individualExamples.length} Failed:`, `${mdFile} > ${exampleName}`);
      }
    } else {
      ++errors;
      console.log(`${i + 1}/${individualExamples.length} Error:`, `${mdFile} > ${exampleName}`);
    }

    if (failures.length > 0) {
      console.log();
      console.log("Failing scan details:");
      console.log();
      for (const fail of failures) {
          console.log(AAT.stringifyResults(fail.report));
      }
    }
    console.log();
    // console.log(`${rptInputFiles.length-failures.length-errors} of ${rptInputFiles.length} passed.`)
    await AAT.close();
    if (failures.length !== 0 || errors !== 0) {
        process.exitCode = 1;
    }
  }
}

parseAllMd();
getResults();

module.exports = {
  getResults
}