import React from 'react';
import { render } from '@testing-library/react';

const TestHook = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback, testSetup = () => {}) => {
  testSetup();
  render(<TestHook callback={callback} />);
};
