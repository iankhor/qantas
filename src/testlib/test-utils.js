/* istanbul ignore file */

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

export const mockPostAxios = ({ mockAxios, mockUrl, successResponse = {}, failResponse = {} }) => {
  mockAxios.post.mockImplementationOnce(url => {
    if (url === mockUrl) {
      Object.keys(successResponse).length ? Promise.resolve(successResponse) : Promise.resolve(failResponse);
    } else {
      return Promise.reject({ status: 400 });
    }
  });
};
