import { testHook } from 'testlib/test-utils';
import usePaginator from 'hooks/usePaginator';
import { act } from 'react-dom/test-utils';

describe('usePaginator', () => {
  let hooksOpts;

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  beforeEach(() => {
    testHook(() => {
      hooksOpts = usePaginator([]);
    });
  });

  it('returns a list of 5 items by default for the first page', () => {
    const [_, paginate] = hooksOpts;
    act(() => paginate({ list, pageNumber: 1 }));
    const [{ paginatedList }] = hooksOpts;

    expect(paginatedList).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
  });

  it('returns the total pages', () => {
    const [_, paginate] = hooksOpts;
    act(() => paginate({ list }));
    const [{ totalPages }] = hooksOpts;

    expect(totalPages).toEqual(3);
  });

  describe('if page number not supplied', () => {
    it('returns a list of 5 items by default for the first page', () => {
      const [_, paginate] = hooksOpts;
      act(() => paginate({ list }));
      const [{ paginatedList }] = hooksOpts;

      expect(paginatedList).toEqual(expect.arrayContaining([1, 2, 3, 4, 5]));
    });
  });

  describe('the second page', () => {
    it('returns the next 5 items in the list', () => {
      const [_, paginate] = hooksOpts;
      act(() => paginate({ list, pageNumber: 2 }));
      const [{ paginatedList }] = hooksOpts;

      expect(paginatedList).toEqual([6, 7, 8, 9, 10]);
    });
  });
});
