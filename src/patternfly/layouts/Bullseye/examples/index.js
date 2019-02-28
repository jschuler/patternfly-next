import React from 'react';
import Documentation from '@siteComponents/Documentation';
import Example from '@siteComponents/Example';
import BullseyeRaw from '!raw!./bullseye-example.hbs';
import Bullseye from './bullseye-example.hbs';
import docs from '../docs/code.md';

export const Docs = docs;

export default () => {
  const bullseye = Bullseye();
  const headingText = 'Bullseye';
  const variablesRoot = 'pf-l-bullseye';

  return (
    <Documentation docs={Docs} heading={headingText} variablesRoot={variablesRoot} className="is-layout-page">
      <Example heading="Bullseye Example" handlebars={BullseyeRaw}>
        {bullseye}
      </Example>
    </Documentation>
  );
};
