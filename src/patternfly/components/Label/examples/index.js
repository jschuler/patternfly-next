import React from 'react';
import Documentation from '@siteComponents/Documentation';
import Example from '@siteComponents/Example';
import labelExampleRaw from '!raw!./label-example.hbs';
import LabelExample from './label-example.hbs';
import docs from '../docs/code.md';

export const Docs = docs;

export default () => {
  const labelExample = LabelExample();
  const headingText = 'Label';

  return (
    <Documentation docs={Docs} heading={headingText}>
      <Example heading="Label Component" handlebars={labelExampleRaw}>
        {labelExample}
      </Example>
    </Documentation>
  );
};
