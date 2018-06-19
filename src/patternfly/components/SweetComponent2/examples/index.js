import React from 'react';
import Documentation from '@siteComponents/Documentation';
import Example from '@siteComponents/Example';
import docs from '../docs/code.md';
import Sweetcomponent2Example1 from './sweet-component2-example1.hbs';
import Sweetcomponent2Example2 from './sweet-component2-example2.hbs';
import '../styles.scss';

export const Docs = docs;

export default () => {
  const sweetComponent2Example1 = Sweetcomponent2Example1();
  const sweetComponent2Example2 = Sweetcomponent2Example2();

  return (
    <Documentation docs={Docs}>
      <Example heading="Sweetcomponent2 Example 1">
        {sweetComponent2Example1}
      </Example>
      <Example heading="Sweetcomponent2 Example 2">
        {sweetComponent2Example2}
      </Example>
    </Documentation>
  );
};
