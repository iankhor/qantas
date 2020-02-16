import { testHook } from 'testlib/test-utils';
import usePaginator from 'hooks/usePaginator';
import { act } from 'react-dom/test-utils';

describe('usePaginator', () => {
  let hooksOpts;

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  beforeEach(() => {
    testHook(() => {
      hooksOpts = usePaginator([]);
    });
  });

  it('returns a list of 10 items by default for the first page', () => {
    const [_, paginate] = hooksOpts;
    act(() => paginate({ list, pageNumber: 1 }));
    const [{ paginatedList }] = hooksOpts;

    expect(paginatedList).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  });

  describe('if page number not supplied', () => {
    it('returns a list of 10 items by default for the first page', () => {
      const [_, paginate] = hooksOpts;
      act(() => paginate({ list }));
      const [{ paginatedList }] = hooksOpts;

      expect(paginatedList).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    });
  });

  describe('the second page', () => {
    it('returns the next 10 items in the list', () => {
      const [_, paginate] = hooksOpts;
      act(() => paginate({ list, pageNumber: 2 }));
      const [{ paginatedList }] = hooksOpts;

      expect(paginatedList).toEqual([11, 12, 13, 14, 15]);
    });
  });
});
