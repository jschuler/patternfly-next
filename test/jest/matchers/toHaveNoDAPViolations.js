// copied from https://github.com/carbon-design-system/carbon/

const AAT = require('@ibma/aat');

async function toHaveNoDAPViolations(node, label) {
  const results = await AAT.getCompliance(node, label);
  if (AAT.assertCompliance(results.report) === 0) {
    return {
      pass: true,
    };
  } else {
    return {
      pass: false,
      message: () => AAT.stringifyResults(results.report),
    };
  }
}

module.exports = toHaveNoDAPViolations;