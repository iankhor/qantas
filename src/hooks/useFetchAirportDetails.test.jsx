import { testHook } from 'testlib/test-utils';
import useFetchAirportDetails from 'hooks/useFetchAirportDetails';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));

describe('useFetchAirportDetails', () => {
  let hooksOpts;

  describe('initial states', () => {
    beforeEach(() => {
      testHook(() => {
        hooksOpts = useFetchAirportDetails();
      });
    });

    it('is all false', () => {
      const [{ isLoading, isComplete, isSuccess, isError }] = hooksOpts;

      expect(isLoading).toEqual(false);
      expect(isComplete).toEqual(false);
      expect(isSuccess).toEqual(false);
      expect(isError).toEqual(false);
    });
  });
});
