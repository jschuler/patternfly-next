import React from 'react';
import Documentation from '@siteComponents/Documentation';
import Example from '@siteComponents/Example';
import docs from '../docs/code.md';
import Sweetcomponent3Example1 from './sweet-component3-example1.hbs';
import Sweetcomponent3Example2 from './sweet-component3-example2.hbs';
import '../styles.scss';

export const Docs = docs;

export default () => {
  const sweetComponent3Example1 = Sweetcomponent3Example1();
  const sweetComponent3Example2 = Sweetcomponent3Example2();

  return (
    <Documentation docs={Docs}>
      <Example heading="Sweetcomponent3 Example 1">
        {sweetComponent3Example1}
      </Example>
      <Example heading="Sweetcomponent3 Example 2">
        {sweetComponent3Example2}
      </Example>
    </Documentation>
  );
};
