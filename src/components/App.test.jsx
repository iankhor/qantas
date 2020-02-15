import React from 'react';
import { airportDetails } from 'testlib/fixtures';
import { mockAxiosGet } from 'testlib/test-utils';
import { act } from 'react-dom/test-utils';
import { render, wait } from '@testing-library/react';

import App from 'components/App';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));

describe('App', () => {
  let url;
  beforeEach(() => {
    url = 'api.qantas.com/foobar';

    mockAxiosGet({
      mockAxios: axios,
      mockUrl: url,
      successResponse: {
        status: 200,
        data: airportDetails
      }
    });
  });

  describe('initial page view', () => {
    it('shows a loader while fetching airport details', () => {
      const { getByText } = render(<App url={url} />);

      expect(getByText('Loading...')).toBeVisible();
    });

    // TODO: simple test to wire things up. to refactor
    it('shows json payload when fetch is complete', async () => {
      const { getByText } = render(<App url={url} />);

      await act(() => wait());
      expect(getByText('AAA')).toBeVisible();
    });
  });
});
