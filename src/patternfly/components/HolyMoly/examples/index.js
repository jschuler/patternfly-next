import React from 'react';
import Documentation from '@siteComponents/Documentation';
import Example from '@siteComponents/Example';
import docs from '../docs/code.md';
import HolymolyExample1 from './holy-moly-example1.hbs';
import HolymolyExample2 from './holy-moly-example2.hbs';
import '../styles.scss';

export const Docs = docs;

export default () => {
  const holyMolyExample1 = HolymolyExample1();
  const holyMolyExample2 = HolymolyExample2();

  return (
    <Documentation docs={Docs}>
      <Example heading="Holymoly Example 1">{holyMolyExample1}</Example>
      <Example heading="Holymoly Example 2">{holyMolyExample2}</Example>
    </Documentation>
  );
};
