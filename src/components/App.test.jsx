import React from 'react';
import { airportDetails } from 'testlib/fixtures';
import { mockAxiosGet } from 'testlib/test-utils';
import { act } from 'react-dom/test-utils';
import { render, wait, fireEvent } from '@testing-library/react';

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

    it('sees a list of airports', async () => {
      const { getByTestId, getAllByTestId, queryByText } = render(<App url={url} />);
      await act(() => wait());

      const list = getByTestId('airport-list');
      const airportNames = getAllByTestId('airport-name').map(li => li.textContent);
      const countryNames = getAllByTestId('airport-country').map(li => li.textContent);
      const pagination = getByTestId('pagination');

      expect(list).toBeVisible();
      expect(list.children.length).toEqual(5);
      expect(pagination).toBeVisible();
      expect(airportNames).toEqual(expect.arrayContaining(['Anaa', 'Bbbb']));
      expect(countryNames).toEqual(expect.arrayContaining(['Somewhere this world', 'French Polynesia']));
      expect(queryByText('Something went wrong! Please try again')).not.toBeInTheDocument();
    });

    describe('clicking on an airport on the list and returning to the airport list', () => {
      it("shows an airport's details and then returns to the airport list", async () => {
        const { queryByTestId, getByTestId, getAllByTestId, getByText } = render(<App url={url} />);
        await act(() => wait());
        const airport = getAllByTestId('airport-list-item')[0];
        fireEvent.click(airport);

        expect(getByTestId('airport-card')).toBeInTheDocument();
        expect(queryByTestId('airport-list')).not.toBeInTheDocument();
        expect(queryByTestId('airport-list')).not.toBeInTheDocument();

        expect(getByText('AAA')).toBeInTheDocument();
        expect(getByText('AnaaCityName, French Polynesia')).toBeInTheDocument();
        expect(getByText('Timezone: Pacific/Tahiti')).toBeInTheDocument();

        fireEvent.click(airport);

        expect(getByTestId('airport-card-back')).toBeInTheDocument();
        expect(getByText('Back to airport list')).toBeInTheDocument();

        const backButton = getByTestId('airport-card-back');
        fireEvent.click(backButton);

        expect(queryByTestId('airport-card')).not.toBeInTheDocument();
        expect(queryByTestId('airport-list')).toBeInTheDocument();
      });
    });

    describe('pagination of airport list', () => {
      it('has a pagination navigation bar', async () => {
        const { getByTestId } = render(<App url={url} />);
        await act(() => wait());

        const pagination = getByTestId('pagination');

        expect(pagination).toBeVisible();
      });

      it('has 2 pages on the navigation bar', async () => {
        // 6 list items, pagination page limit is 5
        const { queryByText } = render(<App url={url} />);
        await act(() => wait());

        const pageOne = queryByText('1');
        const pageTwo = queryByText('2');
        const pageThree = queryByText('3');
        const pageFour = queryByText('4');

        expect(pageOne).toBeInTheDocument();
        expect(pageTwo).toBeInTheDocument();
        expect(pageThree).not.toBeInTheDocument();
        expect(pageFour).not.toBeInTheDocument();
      });

      it('navigates to the second page', async () => {
        const { getByText, getAllByTestId } = render(<App url={url} />);
        await act(() => wait());

        fireEvent.click(getByText('⟩'));
        const airportNames = getAllByTestId('airport-name').map(li => li.textContent);

        expect(airportNames).toEqual(expect.arrayContaining(['FFFb']));
      });
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
