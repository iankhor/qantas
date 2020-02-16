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

    it('is rendered as a list', async () => {
      const { getByTestId } = render(<App url={url} />);
      await act(() => wait());

      const list = getByTestId('airport-list');

      expect(list).toBeVisible();
      expect(list.children.length).toEqual(5);
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

    describe('clicking on an airport on the list', () => {
      it("shows an airport's details", async () => {
        const { queryByTestId, getByTestId, getAllByTestId } = render(<App url={url} />);
        await act(() => wait());
        const airport = getAllByTestId('airport-name')[0];
        fireEvent.click(airport);

        expect(getByTestId('airport-card')).toBeInTheDocument();
        expect(queryByTestId('airport-list')).not.toBeInTheDocument();
      });

      it('has a back button', async () => {
        const { getByTestId, getAllByTestId } = render(<App url={url} />);
        await act(() => wait());
        const airport = getAllByTestId('airport-name')[0];
        fireEvent.click(airport);

        expect(getByTestId('airport-card-back')).toBeInTheDocument();
      });

      describe('clicking on the back button', () => {
        it('does show the list of airports', async () => {
          const { queryByTestId, getByTestId, getAllByTestId } = render(<App url={url} />);
          await act(() => wait());

          const airport = getAllByTestId('airport-name')[0];
          fireEvent.click(airport);
          const backButton = getByTestId('airport-card-back');
          fireEvent.click(backButton);

          expect(queryByTestId('airport-card')).not.toBeInTheDocument();
          expect(queryByTestId('airport-list')).toBeInTheDocument();
        });
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
