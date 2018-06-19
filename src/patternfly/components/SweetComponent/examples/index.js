import React from 'react';
import Documentation from '@siteComponents/Documentation';
import Example from '@siteComponents/Example';
import docs from '../docs/code.md';
import SweetcomponentExample1 from './sweet-component-example1.hbs';
import SweetcomponentExample2 from './sweet-component-example2.hbs';
import '../styles.scss';

export const Docs = docs;

export default () => {
  const sweetComponentExample1 = SweetcomponentExample1();
  const sweetComponentExample2 = SweetcomponentExample2();

  return (
    <Documentation docs={Docs}>
      <Example heading="Sweetcomponent Example 1">
        {sweetComponentExample1}
      </Example>
      <Example heading="Sweetcomponent Example 2">
        {sweetComponentExample2}
      </Example>
    </Documentation>
  );
};
