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

  describe('initial page view', () => {
    it('shows loading while fetching airport details', () => {
      const { getByText } = render(<App url={url} />);

      expect(getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('seeing a list of airports when when fetch is successful', () => {
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

    it('is rendered as a list', async () => {
      const { getByTestId } = render(<App url={url} />);
      await act(() => wait());

      const list = getByTestId('airport-list');

      expect(list).toBeVisible();
      expect(list.children.length).toEqual(2);
    });

    it('has airport names', async () => {
      const { getAllByTestId } = render(<App url={url} />);
      await act(() => wait());
      const airportNames = getAllByTestId('airport-name').map(li => li.textContent);

      expect(airportNames).toEqual(expect.arrayContaining(['Anaa', 'Bbbb']));
    });

    it('has country names', async () => {
      const { getAllByTestId } = render(<App url={url} />);
      await act(() => wait());
      const airportNames = getAllByTestId('airport-country').map(li => li.textContent);

      expect(airportNames).toEqual(expect.arrayContaining(['Somewhere this world', 'French Polynesia']));
    });

    it('does not show an error message', async () => {
      const { queryByText } = render(<App url={url} />);
      await act(() => wait());

      expect(queryByText('Something went wrong! Please try again')).not.toBeInTheDocument();
    });
  });

  describe('seeing a error message when fetch has failed', () => {
    beforeEach(() => {
      url = 'api.qantas.com/foobar';

      mockAxiosGet({
        mockAxios: axios,
        mockUrl: url,
        failResponse: {
          status: 500
        }
      });
    });

    it('shows an error message', async () => {
      const { queryByText } = render(<App url={url} />);
      await act(() => wait());

      expect(queryByText('Something went wrong! Please try again')).toBeInTheDocument();
    });

    it('does not show the list', async () => {
      const { queryByTestId } = render(<App url={url} />);
      await act(() => wait());

      expect(queryByTestId('airport-list')).not.toBeInTheDocument();
    });
  });
});